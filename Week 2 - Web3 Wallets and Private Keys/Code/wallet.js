import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { HDNodeWallet, Mnemonic } from "ethers";

const mnemonic = generateMnemonic();
console.log("Generated Mnemonic:", mnemonic);
console.log("\n");

const seed = mnemonicToSeedSync(mnemonic);

// Generate Solana Wallets
console.log("🟣 SOLANA WALLETS:");
for (let i = 0; i < 4; i++) {
  const path = `m/44'/501'/${i}'/0'`; // Solana derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
  console.log(`Wallet ${i + 1}: ${publicKey}`);
}

console.log("\n");

// Generate Ethereum Wallets
console.log("🔵 ETHEREUM WALLETS:");
const mnemonicObj = Mnemonic.fromPhrase(mnemonic);
for (let i = 0; i < 4; i++) {
  const path = `m/44'/60'/0'/0/${i}`; // Ethereum derivation path
  const wallet = HDNodeWallet.fromMnemonic(mnemonicObj, path);
  console.log(`Wallet ${i + 1}: ${wallet.address}`);
  console.log(`Private Key ${i + 1}: ${wallet.privateKey}`);
}