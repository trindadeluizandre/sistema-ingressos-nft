import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import fs from "fs";

async function testarConexao() {
    console.log("Conectando à rede Solana Devnet...");
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");

    try {
        // Lendo sua carteira
        const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync("./carteira-admin.json", "utf-8")));
        const wallet = Keypair.fromSecretKey(secretKey);

        const balance = await connection.getBalance(wallet.publicKey);
        
        console.log(`Conectado com sucesso!`);
        console.log(`Carteira Admin: ${wallet.publicKey.toBase58()}`);
        console.log(`Saldo: ${balance / LAMPORTS_PER_SOL} SOL`);

        if (balance === 0) {
            console.log("\nAtenção: Você está sem SOL de teste! Quer que eu te ensine a pegar (Airdrop)?");
        }
    } catch (error) {
        console.error("Erro ao conectar:", error);
    }
}

testarConexao();