from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from rsa import newkeys
import rsa

from blockchain.block import Block
from blockchain.blockchain import Blockchain
from database import load_blockchain_from_supabase, load_keys_from_supabase, save_blockchain_to_supabase, store_keys_in_supabase, user_login_to_supabase, user_signup_to_supabase

app = FastAPI()

# Instead of initializing the blockchain here, we'll load it on demand
blockchain = None


class BlockData(BaseModel):
    data: List[str] = Field(
        default=[
            '{"timestamp": "2023-07-15T15:30:00Z", "P_AC": 1234, "I_AC": 5.2, "I_DC": 6.1, "V_AC": 230, "V_DC": 400, "P_AC_Group1": 200, "P_AC_Group2": 210, "P_AC_Group3": 220, "P_AC_Group4": 230, "P_AC_Group5": 240, "P_AC_Group6": 250, "I_AC_Group1": 1.1, "I_AC_Group2": 1.2, "I_AC_Group3": 1.3, "I_AC_Group4": 1.4, "I_AC_Group5": 1.5, "I_AC_Group6": 1.6, "I_DC_Group1": 2.1, "I_DC_Group2": 2.2, "I_DC_Group3": 2.3, "I_DC_Group4": 2.4, "I_DC_Group5": 2.5, "I_DC_Group6": 2.6, "V_AC_Group1": 230, "V_AC_Group2": 231, "V_AC_Group3": 232, "V_AC_Group4": 233, "V_AC_Group5": 234, "V_AC_Group6": 235, "V_DC_Group1": 400, "V_DC_Group2": 401, "V_DC_Group3": 402, "V_DC_Group4": 403, "V_DC_Group5": 404, "V_DC_Group6": 405}',
            '{"timestamp": "2023-07-15T15:31:00Z", "P_AC": 1250, "I_AC": 5.3, "I_DC": 6.2, "V_AC": 231, "V_DC": 401, "P_AC_Group1": 201, "P_AC_Group2": 211, "P_AC_Group3": 221, "P_AC_Group4": 231, "P_AC_Group5": 241, "P_AC_Group6": 251, "I_AC_Group1": 1.2, "I_AC_Group2": 1.3, "I_AC_Group3": 1.4, "I_AC_Group4": 1.5, "I_AC_Group5": 1.6, "I_AC_Group6": 1.7, "I_DC_Group1": 2.2, "I_DC_Group2": 2.3, "I_DC_Group3": 2.4, "I_DC_Group4": 2.5, "I_DC_Group5": 2.6, "I_DC_Group6": 2.7, "V_AC_Group1": 231, "V_AC_Group2": 232, "V_AC_Group3": 233, "V_AC_Group4": 234, "V_AC_Group5": 235, "V_AC_Group6": 236, "V_DC_Group1": 401, "V_DC_Group2": 402, "V_DC_Group3": 403, "V_DC_Group4": 404, "V_DC_Group5": 405, "V_DC_Group6": 406}',
            '{"timestamp": "2023-07-15T15:32:00Z", "P_AC": 1266, "I_AC": 5.4, "I_DC": 6.3, "V_AC": 232, "V_DC": 402, "P_AC_Group1": 202, "P_AC_Group2": 212, "P_AC_Group3": 222, "P_AC_Group4": 232, "P_AC_Group5": 242, "P_AC_Group6": 252, "I_AC_Group1": 1.3, "I_AC_Group2": 1.4, "I_AC_Group3": 1.5, "I_AC_Group4": 1.6, "I_AC_Group5": 1.7, "I_AC_Group6": 1.8, "I_DC_Group1": 2.3, "I_DC_Group2": 2.4, "I_DC_Group3": 2.5, "I_DC_Group4": 2.6, "I_DC_Group5": 2.7, "I_DC_Group6": 2.8, "V_AC_Group1": 232, "V_AC_Group2": 233, "V_AC_Group3": 234, "V_AC_Group4": 235, "V_AC_Group5": 236, "V_AC_Group6": 237, "V_DC_Group1": 402, "V_DC_Group2": 403, "V_DC_Group3": 404, "V_DC_Group4": 405, "V_DC_Group5": 406, "V_DC_Group6": 407}',
            '{"timestamp": "2023-07-15T15:33:00Z", "P_AC": 1282, "I_AC": 5.5, "I_DC": 6.4, "V_AC": 233, "V_DC": 403, "P_AC_Group1": 203, "P_AC_Group2": 213, "P_AC_Group3": 223, "P_AC_Group4": 233, "P_AC_Group5": 243, "P_AC_Group6": 253, "I_AC_Group1": 1.4, "I_AC_Group2": 1.5, "I_AC_Group3": 1.6, "I_AC_Group4": 1.7, "I_AC_Group5": 1.8, "I_AC_Group6": 1.9, "I_DC_Group1": 2.4, "I_DC_Group2": 2.5, "I_DC_Group3": 2.6, "I_DC_Group4": 2.7, "I_DC_Group5": 2.8, "I_DC_Group6": 2.9, "V_AC_Group1": 233, "V_AC_Group2": 234, "V_AC_Group3": 235, "V_AC_Group4": 236, "V_AC_Group5": 237, "V_AC_Group6": 238, "V_DC_Group1": 403, "V_DC_Group2": 404, "V_DC_Group3": 405, "V_DC_Group4": 406, "V_DC_Group5": 407, "V_DC_Group6": 408}',
            '{"timestamp": "2023-07-15T15:34:00Z", "P_AC": 1298, "I_AC": 5.6, "I_DC": 6.5, "V_AC": 234, "V_DC": 404, "P_AC_Group1": 204, "P_AC_Group2": 214, "P_AC_Group3": 224, "P_AC_Group4": 234, "P_AC_Group5": 244, "P_AC_Group6": 254, "I_AC_Group1": 1.5, "I_AC_Group2": 1.6, "I_AC_Group3": 1.7, "I_AC_Group4": 1.8, "I_AC_Group5": 1.9, "I_AC_Group6": 2.0, "I_DC_Group1": 2.5, "I_DC_Group2": 2.6, "I_DC_Group3": 2.7, "I_DC_Group4": 2.8, "I_DC_Group5": 2.9, "I_DC_Group6": 3.0, "V_AC_Group1": 234, "V_AC_Group2": 235, "V_AC_Group3": 236, "V_AC_Group4": 237, "V_AC_Group5": 238, "V_AC_Group6": 239, "V_DC_Group1": 404, "V_DC_Group2": 405, "V_DC_Group3": 406, "V_DC_Group4": 407, "V_DC_Group5": 408, "V_DC_Group6": 409}'
        ],
        example=[
            '{"timestamp": "2023-07-15T15:30:00Z", "P_AC": 1234, "I_AC": 5.2, "I_DC": 6.1, "V_AC": 230, "V_DC": 400, "P_AC_Group1": 200, "P_AC_Group2": 210, "P_AC_Group3": 220, "P_AC_Group4": 230, "P_AC_Group5": 240, "P_AC_Group6": 250, "I_AC_Group1": 1.1, "I_AC_Group2": 1.2, "I_AC_Group3": 1.3, "I_AC_Group4": 1.4, "I_AC_Group5": 1.5, "I_AC_Group6": 1.6, "I_DC_Group1": 2.1, "I_DC_Group2": 2.2, "I_DC_Group3": 2.3, "I_DC_Group4": 2.4, "I_DC_Group5": 2.5, "I_DC_Group6": 2.6, "V_AC_Group1": 230, "V_AC_Group2": 231, "V_AC_Group3": 232, "V_AC_Group4": 233, "V_AC_Group5": 234, "V_AC_Group6": 235, "V_DC_Group1": 400, "V_DC_Group2": 401, "V_DC_Group3": 402, "V_DC_Group4": 403, "V_DC_Group5": 404, "V_DC_Group6": 405}',
            '{"timestamp": "2023-07-15T15:31:00Z", "P_AC": 1250, "I_AC": 5.3, "I_DC": 6.2, "V_AC": 231, "V_DC": 401, "P_AC_Group1": 201, "P_AC_Group2": 211, "P_AC_Group3": 221, "P_AC_Group4": 231, "P_AC_Group5": 241, "P_AC_Group6": 251, "I_AC_Group1": 1.2, "I_AC_Group2": 1.3, "I_AC_Group3": 1.4, "I_AC_Group4": 1.5, "I_AC_Group5": 1.6, "I_AC_Group6": 1.7, "I_DC_Group1": 2.2, "I_DC_Group2": 2.3, "I_DC_Group3": 2.4, "I_DC_Group4": 2.5, "I_DC_Group5": 2.6, "I_DC_Group6": 2.7, "V_AC_Group1": 231, "V_AC_Group2": 232, "V_AC_Group3": 233, "V_AC_Group4": 234, "V_AC_Group5": 235, "V_AC_Group6": 236, "V_DC_Group1": 401, "V_DC_Group2": 402, "V_DC_Group3": 403, "V_DC_Group4": 404, "V_DC_Group5": 405, "V_DC_Group6": 406}',
            '{"timestamp": "2023-07-15T15:32:00Z", "P_AC": 1266, "I_AC": 5.4, "I_DC": 6.3, "V_AC": 232, "V_DC": 402, "P_AC_Group1": 202, "P_AC_Group2": 212, "P_AC_Group3": 222, "P_AC_Group4": 232, "P_AC_Group5": 242, "P_AC_Group6": 252, "I_AC_Group1": 1.3, "I_AC_Group2": 1.4, "I_AC_Group3": 1.5, "I_AC_Group4": 1.6, "I_AC_Group5": 1.7, "I_AC_Group6": 1.8, "I_DC_Group1": 2.3, "I_DC_Group2": 2.4, "I_DC_Group3": 2.5, "I_DC_Group4": 2.6, "I_DC_Group5": 2.7, "I_DC_Group6": 2.8, "V_AC_Group1": 232, "V_AC_Group2": 233, "V_AC_Group3": 234, "V_AC_Group4": 235, "V_AC_Group5": 236, "V_AC_Group6": 237, "V_DC_Group1": 402, "V_DC_Group2": 403, "V_DC_Group3": 404, "V_DC_Group4": 405, "V_DC_Group5": 406, "V_DC_Group6": 407}',
            '{"timestamp": "2023-07-15T15:33:00Z", "P_AC": 1282, "I_AC": 5.5, "I_DC": 6.4, "V_AC": 233, "V_DC": 403, "P_AC_Group1": 203, "P_AC_Group2": 213, "P_AC_Group3": 223, "P_AC_Group4": 233, "P_AC_Group5": 243, "P_AC_Group6": 253, "I_AC_Group1": 1.4, "I_AC_Group2": 1.5, "I_AC_Group3": 1.6, "I_AC_Group4": 1.7, "I_AC_Group5": 1.8, "I_AC_Group6": 1.9, "I_DC_Group1": 2.4, "I_DC_Group2": 2.5, "I_DC_Group3": 2.6, "I_DC_Group4": 2.7, "I_DC_Group5": 2.8, "I_DC_Group6": 2.9, "V_AC_Group1": 233, "V_AC_Group2": 234, "V_AC_Group3": 235, "V_AC_Group4": 236, "V_AC_Group5": 237, "V_AC_Group6": 238, "V_DC_Group1": 403, "V_DC_Group2": 404, "V_DC_Group3": 405, "V_DC_Group4": 406, "V_DC_Group5": 407, "V_DC_Group6": 408}',
            '{"timestamp": "2023-07-15T15:34:00Z", "P_AC": 1298, "I_AC": 5.6, "I_DC": 6.5, "V_AC": 234, "V_DC": 404, "P_AC_Group1": 204, "P_AC_Group2": 214, "P_AC_Group3": 224, "P_AC_Group4": 234, "P_AC_Group5": 244, "P_AC_Group6": 254, "I_AC_Group1": 1.5, "I_AC_Group2": 1.6, "I_AC_Group3": 1.7, "I_AC_Group4": 1.8, "I_AC_Group5": 1.9, "I_AC_Group6": 2.0, "I_DC_Group1": 2.5, "I_DC_Group2": 2.6, "I_DC_Group3": 2.7, "I_DC_Group4": 2.8, "I_DC_Group5": 2.9, "I_DC_Group6": 3.0, "V_AC_Group1": 234, "V_AC_Group2": 235, "V_AC_Group3": 236, "V_AC_Group4": 237, "V_AC_Group5": 238, "V_AC_Group6": 239, "V_DC_Group1": 404, "V_DC_Group2": 405, "V_DC_Group3": 406, "V_DC_Group4": 407, "V_DC_Group5": 408, "V_DC_Group6": 409}'
        ]
    )


def get_blockchain():
    global blockchain
    if blockchain is None:
        try:
            blockchain = load_blockchain_from_supabase("blockchain")
        except FileNotFoundError:
            blockchain = Blockchain()
    return blockchain


# @app.get("/get_public_key")
# def get_public_key():
#     try:
#         public_key, private_key = load_keys_from_supabase()
#         return {"public_key": str(public_key)}
#     except Exception as e:
#         return {"message": "Public key not found, please check your db"}
#         # If key is not found, generate and store new one
#         # print("Key not found, generating new one...")
#         # public_key, private_key = newkeys(512)
#         # store_keys_in_supabase(public_key, private_key)
#         # return {"public_key": str(public_key)}

# @app.get("/get_private_key")
# def get_private_key():
#     try:
#         public_key, private_key = load_keys_from_supabase()
#         return {"private_key": str(private_key)}
#     except Exception as e:
#         return {"message": "Private key not found, please check your db"}
#         # If key is not found, generate and store new one
#         # print("Key not found, generating new one...")
#         # public_key, private_key = newkeys(512)
#         # store_keys_in_supabase(public_key, private_key)
#         # return {"public_key": str(public_key)}

# @app.get("/get_key_pair")
# def get_key_pair():
#     try:
#         public_key, private_key = load_keys_from_supabase()
#         return {"public_key": str(public_key), "private_key": str(private_key)}
#     except Exception as e:
#         # If keys are not found, generate and store new ones
#         print("Keys not found, generating new ones...")
#         public_key, private_key = newkeys(512)
#         store_keys_in_supabase(public_key, private_key)
#         return {"public_key": str(public_key), "private_key": str(private_key)}

@app.post("/register")
def register(username: str, password: str):
    user_signup_to_supabase(username, password)
    return {"message": "User registered"}


@app.post("/login")
def login(username: str, password: str):
    user_login_to_supabase(username, password)
    return {"message": "User logged in"}


@app.get("/blocks")
def get_blocks():
    try:
        load_blockchain()
    except Exception as e:
        print(f"Error loading blockchain: {e}")
    return get_blockchain().to_dict()


@app.post("/add_block")
def add_block(block_data: BlockData):
    chain = get_blockchain()
    chain.add_block(block_data.data)
    save_blockchain_to_supabase(chain, "blockchain")
    return chain.to_dict()


@app.get("/validate")
def validate_chain():
    is_valid = get_blockchain().is_chain_valid()
    if not is_valid:
        raise HTTPException(status_code=400, detail="Blockchain is invalid")
    return {"message": "Blockchain is valid"}

# @app.post("/save")
# def save_blockchain():
#     save_blockchain_to_supabase(get_blockchain(), "blockchain")
#     return {"message": "Blockchain saved to Supabase"}


def load_blockchain():
    global blockchain
    blockchain = load_blockchain_from_supabase("blockchain")
    return {"message": "Blockchain loaded from Supabase", "blockchain": blockchain.to_dict()}

# @app.post("/decrypt")
# def decrypt_data_for_block(block_index: int):
#     chain = get_blockchain()
#     block = chain.chain[block_index]
#     print(block)
#     public_key, private_key = load_keys_from_supabase()
#     try:
#         decrypted_data = Block.decrypt_data(block, public_key)
#         return decrypted_data
#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
