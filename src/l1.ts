import {Keypair} from '@solana/web3.js';
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import * as dotenv from "dotenv";

dotenv.config({path: __dirname + "/../.env"});

const keyPair = getKeypairFromEnvironment("SECRET_KEY");

console.log(keyPair.publicKey.toBase58() == "ELTKVCx3nowCTwE3G9AaHUGuMizQT7bzqVW72C5Qby1A");

console.log("Public key: ", keyPair.publicKey.toBase58());