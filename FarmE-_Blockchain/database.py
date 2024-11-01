import io
import json
import os
import tempfile
import time
from dotenv import load_dotenv
from fastapi import HTTPException
import rsa
from supabase import create_client, Client
from supabase.client import ClientOptions
from blockchain.block import Block

load_dotenv()

url: str = os.getenv('SUPABASE_URL')
key: str = os.getenv('SUPABASE_KEY')

supabase: Client = create_client(url, key,
                                 options=ClientOptions(
                                     postgrest_client_timeout=10,
                                     storage_client_timeout=10,
                                     schema="public",
                                 ))

### User Management ###


def user_signup_to_supabase(username, password):
    try:
        response = supabase.table('user').insert(
            [{'username': username, 'password': password}]).execute()
        print(response)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error inserting user: {e}")


def user_login_to_supabase(username, password):
    try:
        response = supabase.table('user').select('*').eq('username', username).execute()
        
        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        user = response.data[0]
        stored_password = user['password']

        # Assuming the passwords are stored in plaintext (not recommended)
        # If passwords are hashed, use a proper password hashing library for comparison
        if stored_password != password:
            raise HTTPException(status_code=401, detail="Invalid username or password")
        
        return {"message": "Login successful"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error selecting user: {e}")

### Blockchain Management ###


def save_blockchain_to_supabase(blockchain, filename):
    timestamp = int(time.time())
    file_name = f"{filename}_{timestamp}.json"

    # Convert blockchain to JSON string
    blockchain_json = json.dumps(blockchain.to_dict())

    try:
        # Create a temporary file to store the JSON content
        with tempfile.NamedTemporaryFile(mode='w', delete=False) as tmp_file:
            tmp_file.write(blockchain_json)
            tmp_file_path = tmp_file.name

        # Now, upload the temporary file to Supabase
        with open(tmp_file_path, 'rb') as file:
            response = supabase.storage.from_('blockchain').upload(
                path=file_name,
                file=file,
                file_options={"content-type": "application/json"}
            )
            print(f"Blockchain saved to Supabase: {file_name}")

        # Remove the temporary file after uploading
        os.remove(tmp_file_path)

    except Exception as e:
        # Raise an exception to properly handle the error in FastAPI
        raise HTTPException(
            status_code=500, detail=f"Error uploading file: {e}")

    # After saving, check and manage the number of records
    manage_blockchain_records(filename)


def load_blockchain_from_supabase(filename):
    from blockchain.blockchain import Blockchain

    # List all files in the 'blockchain' bucket
    file_list = supabase.storage.from_('blockchain').list()

    # Filter files that start with the given filename
    matching_files = [
        file for file in file_list if file['name'].startswith(filename)]

    if not matching_files:
        raise FileNotFoundError(
            f"No files found with name starting with {filename}")

    # Sort the matching files by name (which includes the timestamp) in descending order
    latest_file = sorted(
        matching_files, key=lambda x: x['name'], reverse=True)[0]

    latest_filename = latest_file['name']

    # Download the latest file
    response = supabase.storage.from_('blockchain').download(latest_filename)

    # Parse the JSON data
    blockchain_data = json.loads(response)

    # Create a new Blockchain instance
    blockchain = Blockchain()

    # Check if blockchain_data is a list (direct chain) or a dict (full blockchain structure)
    if isinstance(blockchain_data, list):
        # If it's a list, assume it's the chain directly
        blockchain.chain = [Block(**block) for block in blockchain_data]
    elif isinstance(blockchain_data, dict):
        # If it's a dict, assume it has 'chain' and possibly 'difficulty' keys
        blockchain.chain = [Block(**block)
                            for block in blockchain_data.get('chain', [])]
        blockchain.difficulty = blockchain_data.get(
            'difficulty', blockchain.difficulty)
    else:
        raise ValueError(
            f"Unexpected data structure in file: {latest_filename}")

    print(f"Loaded blockchain from Supabase: {latest_filename}")
    return blockchain


def manage_blockchain_records(filename):
    # List all files in the 'blockchain' bucket
    file_list = supabase.storage.from_('blockchain').list()

    # Filter files that start with the given filename
    matching_files = [
        file for file in file_list if file['name'].startswith(filename)]

    # If we have more than 5 records, remove the oldest 10
    if len(matching_files) > 20:
        # Sort files by name (which includes timestamp) in ascending order
        sorted_files = sorted(matching_files, key=lambda x: x['name'])
        files_to_remove = sorted_files[:5]  # Get the oldest 20 files

        for file in files_to_remove:
            try:
                # Remove from Supabase
                supabase.storage.from_('blockchain').remove(file['name'])
                print(f"Removed old record: {file['name']}")
            except Exception as e:
                print(f"Error removing file {file['name']}: {e}")

    print("Blockchain records managed successfully")

### RSA Key Management ###


def store_keys_in_supabase(public_key, private_key):
    """
    Stores the RSA keys securely in Supabase.
    """
    # Convert RSA keys to PEM format for storage
    public_key_pem = public_key.save_pkcs1().decode()
    private_key_pem = private_key.save_pkcs1().decode()

    try:
        response = supabase.table('keys').insert([
            {'public_key': public_key_pem, 'private_key': private_key_pem}
        ]).execute()
        print(response)
    except Exception as e:
        print(f"Unexpected error: {e}")


def load_keys_from_supabase():
    """
    Loads RSA keys from Supabase.
    """
    try:
        response = supabase.table('keys').select('*').limit(1).execute()
        if len(response.data) > 0:
            # Assuming the keys are stored in PEM format
            public_key_pem = response.data[0]['public_key']
            private_key_pem = response.data[0]['private_key']

            # Convert PEM strings back to RSA key objects
            public_key = rsa.PublicKey.load_pkcs1(public_key_pem.encode())
            private_key = rsa.PrivateKey.load_pkcs1(private_key_pem.encode())

            return public_key, private_key
        else:
            raise Exception("Keys not found in Supabase")
    except Exception as e:
        raise Exception(f"Error loading keys from Supabase: {e}")
