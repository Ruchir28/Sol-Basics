import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {Transaction,SystemProgram, LAMPORTS_PER_SOL, PublicKey, Connection, sendAndConfirmTransaction, Keypair} from "@solana/web3.js"
import * as dotenv from "dotenv";
import * as bs58 from "bs58";

dotenv.config({path: __dirname + "/../.env"});

const connection = new Connection("https://api.devnet.solana.com", "confirmed");


const transaction = new Transaction()

const recipientPubKey = "Hm2GjYm6WhL7PwGeMFdks9GfvSi8iKumzz81N9HuSbEq";

const amount = 1;

const base58SecretKey = process.env.ACCOUNT_SECRET_KEY;

if(!base58SecretKey) {
  throw new Error("ACCOUNT_SECRET_KEY is not set in the .env file");
}

console.log(base58SecretKey);

console.log("LEN",base58SecretKey.length)



const unit8array = new Uint8Array(bs58.decode(base58SecretKey));

console.log(unit8array);
// conver hex string to unit8array

const arrayToHex = Buffer.from(unit8array).toString("hex");

// console.log("CHECK !! ",arrayToHex);

const senderKeyPair = Keypair.fromSecretKey(unit8array);


const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeyPair.publicKey,
  toPubkey: new PublicKey(recipientPubKey),
  lamports: LAMPORTS_PER_SOL * amount
});

transaction.add(sendSolInstruction)


sendAndConfirmTransaction(connection,transaction,
    [senderKeyPair]
).then((signature) => {
  console.log(
    `💸 Finished! Sent ${amount} SOL to the address ${recipientPubKey}. `
  );
  console.log(`Transaction signature is ${signature}!`);
});