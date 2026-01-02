import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import * as fs from 'fs';

async function realizarPrimeiraMintagem() {
    console.log("--- INICIANDO MINTAGEM REAL DE INGRESSO NFT ---");

    // 1. Configurar Conexao e Carregar Identidade
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const dadosCarteira = JSON.parse(fs.readFileSync('carteira-dev.json', 'utf8'));
    const minhaCarteira = Keypair.fromSecretKey(new Uint8Array(dadosCarteira.secretKey));

    // 2. Configurar Metaplex (O padrao para NFTs na Solana)
    const metaplex = Metaplex.make(connection).use(keypairIdentity(minhaCarteira));

    try {
        console.log("Registrando metadados na Blockchain...");
        
        // 3. Executar o Mint
        const { nft } = await metaplex.nfts().create({
            name: "Ingresso VIP - Suga",
            symbol: "SUGA",
            sellerFeeBasisPoints: 500, // 5% Royalties
            uri: "https://arweave.net/123", // Link para imagem/json (usaremos simulado agora)
            isMutable: true
        });

        console.log("------------------------------------------");
        console.log("SUCESSO: NFT CRIADO COM PROVA DE PROPRIEDADE!");
        console.log(`Endereco do Mint (ID Unico): ${nft.address.toBase58()}`);
        console.log(`Dono atual: ${minhaCarteira.publicKey.toBase58()}`);
        console.log("------------------------------------------");
        console.log("Este ingresso agora existe oficialmente na Solana Devnet.");

    } catch (error) {
        console.error("Erro durante a mintagem:", error);
    }
}

realizarPrimeiraMintagem();