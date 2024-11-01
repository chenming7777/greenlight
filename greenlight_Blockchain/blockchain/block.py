import binascii
import hashlib
import time
from fastapi import HTTPException
import rsa


class Block:
    def __init__(self, index, previous_hash, timestamp, data, hash, nonce=0, merkle_root=None):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.hash = hash
        self.nonce = nonce
        self.merkle_root = merkle_root or self.calculate_merkle_root(data)

    @staticmethod
    def calculate_hash(index, previous_hash, timestamp, data, nonce, merkle_root):
        value = f"{index}{previous_hash}{timestamp}{data}{nonce}{merkle_root}"
        return hashlib.sha256(value.encode('utf-8')).hexdigest()

    @staticmethod
    def calculate_merkle_root(data):
        if not data:
            return ''
        if len(data) == 1:
            return hashlib.sha256(data[0].encode('utf-8')).hexdigest()

        def merkle_pair_hash(a, b):
            return hashlib.sha256((a + b).encode('utf-8')).hexdigest()

        merkle_tree = [hashlib.sha256(
            d.encode('utf-8')).hexdigest() for d in data]
        while len(merkle_tree) > 1:
            if len(merkle_tree) % 2 == 1:
                merkle_tree.append(merkle_tree[-1])
            merkle_tree = [merkle_pair_hash(
                merkle_tree[i], merkle_tree[i+1]) for i in range(0, len(merkle_tree), 2)]
        return merkle_tree[0]

    @classmethod
    def create_genesis_block(cls):
        return cls(0, "0", int(time.time()), ["Genesis Block"], cls.calculate_hash(0, "0", int(time.time()), ["Genesis Block"], 0, cls.calculate_merkle_root(["Genesis Block"])))

    @classmethod
    def create_new_block(cls, previous_block, data, private_key):
        index = previous_block.index + 1
        timestamp = int(time.time())
        data = data
        # encrypted_data = [rsa.encrypt(
        #     d.encode('utf-8'), private_key).hex() for d in data]
        merkle_root = cls.calculate_merkle_root(data)
        nonce = 0
        hash = cls.calculate_hash(
            index, previous_block.hash, timestamp, data, nonce, merkle_root)
        while not hash.startswith('0000'):  # Proof of Work difficulty
            nonce += 1
            hash = cls.calculate_hash(
                index, previous_block.hash, timestamp, data, nonce, merkle_root)
        return cls(index, previous_block.hash, timestamp, data, hash, nonce, merkle_root)

    def to_dict(self):
        return {
            'index': self.index,
            'previous_hash': self.previous_hash,
            'timestamp': self.timestamp,
            'data': self.data,
            'hash': self.hash,
            'nonce': self.nonce,
            'merkle_root': self.merkle_root
        }

    @classmethod
    def from_dict(cls, block_dict):
        return cls(
            block_dict['index'],
            block_dict['previous_hash'],
            block_dict['timestamp'],
            block_dict['data'],
            block_dict['hash'],
            block_dict['nonce'],
            block_dict.get('merkle_root')
        )
        
    # @staticmethod
    # def decrypt_data(block, public_key):
    #     decrypted_data = []
    #     errors = []
    #     for i, encrypted_data in enumerate(block.data):
    #         decrypted = Block.decrypt_with_public_key(encrypted_data, public_key)
    #         if decrypted is None:
    #             errors.append(f"Decryption failed for item {i}")
    #         else:
    #             decrypted_data.append(decrypted)
        
    #     if errors:
    #         raise HTTPException(status_code=400, detail=f"Decryption errors: {'; '.join(errors)}")
    #     return decrypted_data

       
    # @staticmethod 
    # def decrypt_with_public_key(encrypted_data_hex, public_key):
    #     try:
    #         encrypted_int = int(encrypted_data_hex, 16)
    #         decrypted_int = pow(encrypted_int, public_key.e, public_key.n)
    #         decrypted_bytes = decrypted_int.to_bytes((decrypted_int.bit_length() + 7) // 8, byteorder='big')
            
    #         # Check for and remove PKCS#1 v1.5 padding
    #         if decrypted_bytes[0] != 0 or decrypted_bytes[1] != 1:
    #             raise ValueError("Invalid padding")
            
    #         padding_end = decrypted_bytes.find(b'\x00', 2)
    #         if padding_end == -1:
    #             raise ValueError("Padding delimiter not found")
            
    #         return decrypted_bytes[padding_end+1:].decode('utf-8')
    #     except ValueError as ve:
    #         print(f"Decryption failed: {ve}")
    #         return None
    #     except Exception as e:
    #         print(f"Unexpected error during decryption: {e}")
    #         return None
    
    # @staticmethod
    # def decrypt_data(block, public_key_pem):
    #     """
    #     Decrypts the data within a block using the provided RSA public key.

    #     :param block: The block whose data needs to be decrypted.
    #     :param public_key_pem: The RSA public key in PEM format used for decryption.
    #     :return: List of decrypted data strings if successful, None otherwise.
    #     """
    #     try:
    #         binary_key = Block.pem_to_binary(public_key_pem)
    #         public_key = rsa.PublicKey.load_pkcs1(binary_key)
            
    #         # Decrypt each piece of data in the block
    #         decrypted_data = []
    #         for encrypted_data_hex in block.data:
    #             encrypted_data_bytes = bytes.fromhex(encrypted_data_hex)
    #             decrypted_data_bytes = rsa.decrypt(encrypted_data_bytes, public_key)
    #             decrypted_data.append(decrypted_data_bytes.decode('utf-8'))

    #         return decrypted_data
    #     except Exception as e:
    #         raise HTTPException(f"Decryption failed: {e}")
        
    # @staticmethod
    # def pem_to_binary(pem):
    #     # Remove the header and footer and decode the base64 content
    #     return binascii.a2b_base64(pem.replace("-----BEGIN RSA PUBLIC KEY-----", "").replace("-----END RSA PUBLIC KEY-----", "").encode())
