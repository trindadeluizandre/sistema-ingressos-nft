import { Connection, Keypair, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';
import fs from 'fs';

async function validarCarteiraAdmin() {
    try {
        // LER: O fs.readFileSync lê o array de números do seu ficheiro JSON
        const secretKeyRaw = fs.readFileSync('./carteira-admin.json', 'utf-8');
        const secretKey = JSON.parse(secretKeyRaw);

        // CONVERTER: Transforma o array em um formato que a Solana entende (Uint8Array)
        const adminKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
        
        // CONECTAR: Usa a Devnet (rede de testes)
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

        console.log("\n--- STATUS DA CARTEIRA ADMIN ---");
        console.log(`Endereço Público (Mint Authority): ${adminKeypair.publicKey.toBase58()}`);

        // CHECAR SALDO: O saldo vem em Lamports (1 SOL = 1.000.000.000 Lamports)
        let saldo = await connection.getBalance(adminKeypair.publicKey);
        console.log(`Saldo Atual: ${saldo / LAMPORTS_PER_SOL} SOL`);

        // SOLICITAR FUNDOS: Se tiver menos de 0.5 SOL, pede 1 SOL à rede
        if (saldo < 0.5 * LAMPORTS_PER_SOL) {
            console.log("Ação: Saldo insuficiente para taxas. Solicitando Airdrop...");
            const signature = await connection.requestAirdrop(
                adminKeypair.publicKey,
                1 * LAMPORTS_PER_SOL
            );
            
            // AGUARDAR: Precisamos esperar a rede confirmar o recebimento
            await connection.confirmTransaction(signature);
            
            saldo = await connection.getBalance(adminKeypair.publicKey);
            console.log(`Novo Saldo após Airdrop: ${saldo / LAMPORTS_PER_SOL} SOL`);
        }

        console.log("Resultado: Carteira pronta para emitir ingressos NFT.");
        console.log("-----------------------------------\n");

    } catch (error) {
        console.error("ERRO CRÍTICO AO CARREGAR CARTEIRA:");
        console.error("Verifique se o arquivo 'carteira-admin.json' está na raiz do projeto.");
    }
}

validarCarteiraAdmin();