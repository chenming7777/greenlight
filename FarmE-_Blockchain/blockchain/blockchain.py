from blockchain.block import Block
from database import load_keys_from_supabase


class Blockchain:
    def __init__(self):
        self.chain = [Block.create_genesis_block()]
        self.public_key, self.private_key = load_keys_from_supabase()
    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, data):
        new_block = Block.create_new_block(
            self.get_latest_block(), data, self.private_key) # Add private key to create new block
        self.chain.append(new_block)

    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]
            if current_block.hash != Block.calculate_hash(current_block.index, current_block.previous_hash, current_block.timestamp, current_block.data, current_block.nonce, current_block.merkle_root):
                return False
            if current_block.previous_hash != previous_block.hash:
                return False
        return True

    def to_dict(self):
        return [block.to_dict() for block in self.chain]

    @classmethod
    def from_dict(cls, chain_dict):
        blockchain = cls()
        blockchain.chain = [Block.from_dict(block) for block in chain_dict]
        return blockchain

    # def save_to_file(self, filename):
    #     with open(filename, 'w') as file:
    #         json.dump(self.to_dict(), file, indent=4)

    # @classmethod
    # def load_from_file(cls, filename):
    #     with open(filename, 'r') as file:
    #         chain_dict = json.load(file)
    #         return cls.from_dict(chain_dict)
