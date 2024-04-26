import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, Keypair, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL} from "@solana/web3.js";
import * as dotenv from "dotenv";

dotenv.config({path: __dirname + "/../.env"});


const keyPair = getKeypairFromEnvironment("SECRET_KEY");

const publicKey = "33aFRQKgH7YvaTQk5JkwnAb6B9cP3BwNneoP4iDGWT1r";


const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

connection.getAccountInfo(new PublicKey(publicKey)).then((accountInfo) => {
    console.log("Account info: ", accountInfo);
    // convert lamports to SOL

    if(accountInfo) {
        console.log("Balance: ", accountInfo.lamports / LAMPORTS_PER_SOL);
    }

})
