//to replace xpring
const bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const RippleKeypairs = require("ripple-keypairs");

var mnemonic =
  "novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap";
// Or generate:
mnemonic = bip39.generateMnemonic();
console.log(mnemonic);

const seed = bip39.mnemonicToSeedSync(mnemonic);
const m = bip32.fromSeedBuffer(seed);
const keyPair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs();
const address = RippleKeypairs.deriveAddress(keyPair.publicKey);

console.log("privateKey: " + keyPair.privateKey);
console.log("publicKey: " + keyPair.publicKey);
console.log("address: " + address);

// for signing and sending tx
// const RippleKeypairs = require("ripple-keypairs");
const RippleBinaryCodec = require("ripple-binary-codec");
const RippleHashes = require("ripple-hashes");


const SignTransaction = (Transaction, keypair) => {
  let TxBlob;
  let TxId;
  Transaction.SigningPubKey = keyPair.publicKey;
  Transaction.TxnSignature = RippleKeypairs.sign(
    RippleBinaryCodec.encodeForSigning(Transaction),
    keyPair.privateKey
  );

  TxBlob = RippleBinaryCodec.encode(Transaction);
  TxId = RippleHashes.computeBinaryTransactionHash(TxBlob);

  return {
    tx_blob: TxBlob,
    tx_id: TxId
  };
};

//to submit tx:
const RippledWsClient = require('rippled-ws-client')

new RippledWsClient('wss://s1.ripple.com').then(Connection => {
  console.log('<< Connected >>')

  Connection.send({
    command: 'submit',
    tx_blob: 'AABBCCDDEEFF00112233445566778899...'
  }).then(r => {
    console.log('Done!', r)
  }).catch(e => {
    console.log('Err', e)
  }).finally(() => {
    Connection.close()
  })

}).catch(r => {
  // E.g.: when WebSocket URI is faulty
  console.log('Couldn\'t connect', r)
})
