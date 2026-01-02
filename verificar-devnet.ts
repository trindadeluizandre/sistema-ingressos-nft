import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

async function verificarSaldoDevnet() {
    // 1. Conectando explicitamente a Devnet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const enderecoSuga = "6m7LJcSSYE6qxdip34CJ2DWhMNuByXmqUChFYCCfu2f6";

    console.log("--- BUSCANDO INVESTIMENTO NA DEVNET (SOLANA) ---");
    console.log("Endereco:", enderecoSuga);

    try {
        const pubKey = new PublicKey(enderecoSuga);
        const balance = await connection.getBalance(pubKey);
        const sol = balance / LAMPORTS_PER_SOL;

        console.log("------------------------------------------");
        console.log(`SALDO LOCALIZADO: ${sol} SOL`);
        console.log("------------------------------------------");

        if (sol > 0) {
            console.log("SUCESSO: O sistema identificou os fundos na Devnet!");
            console.log("Podemos prosseguir para a criacao automatizada dos NFTs.");
        } else {
            console.log("AVISO: Saldo 0. Verifique se o envio na Devnet foi concluido.");
        }
    } catch (error) {
        console.error("Erro tecnico ao consultar a blockchain:", error);
    }
}

verificarSaldoDevnet();