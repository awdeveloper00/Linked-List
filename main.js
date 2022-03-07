const SHA256 = require("crypto-js/sha256");

const Chain = [];
const InitialBlock = (index, timestamp, data, previousHash) => {
  const Block = {
    index: index,
    timestamp: timestamp,
    data: data,
    previousHash: previousHash,
    hash: calculateHash(index, timestamp, data, previousHash),
  };
  Chain.push(Block);
  return Block;
};

function calculateHash(index, timestamp, data, previousHash) {
  return SHA256(index + timestamp + data + previousHash).toString();
}

function getLatestBlock() {
  const chain = Chain.length - 1;
  return Chain[chain];
}

function AddBlock(index, timestamp, data) {
  const Block = {
    index: index,
    timestamp: timestamp,
    data: data,
    previousHash: getLatestBlock().hash,
    hash: calculateHash(index, timestamp, data, getLatestBlock().hash),
  };
  Chain.push(Block);
}

InitialBlock(1, 1, { data: 1 }, 0);

AddBlock(2, 2, { data: 2 });
AddBlock(3, 3, { data: 3 });

console.log(Chain, "CHain");
