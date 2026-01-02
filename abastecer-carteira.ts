import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as fs from 'fs';

async function solicitarFundos() {
    // 1. Carrega sua carteira criada no passo anterior
    const carteiraLocal = JSON.parse(fs.readFileSync('carteira-dev.json', 'utf8'));
    const pubKey = new PublicKey(carteiraLocal.publicKey);

    // 2. Conecta a Devnet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    console.log(`Solicitando 2 SOL para: ${pubKey.toBase58()}...`);

    try {
        // 3. Pede o Airdrop (Limite de 2 SOL por vez na Devnet)
        const signature = await connection.requestAirdrop(pubKey, 1 * LAMPORTS_PER_SOL);
        
        // 4. Aguarda a confirmacao na rede
        await connection.confirmTransaction(signature);

        const novoSaldo = await connection.getBalance(pubKey);
        console.log("--- AIRDROP CONCLUIDO ---");
        console.log(`Novo Saldo: ${novoSaldo / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
        console.error("Erro no Airdrop: A rede pode estar instavel ou voce atingiu o limite diario.", error);
    }
}

solicitarFundos();