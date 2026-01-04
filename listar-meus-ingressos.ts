import { connection } from './src/services/solanaConnection.js';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Keypair, PublicKey } from '@solana/web3.js';
import fs from 'fs';

async function listarIngressos() {
    try {
        // 1. Carregar a identidade
        const rawData = fs.readFileSync('./carteira-dev.json', 'utf-8');
        const secretKeyArray = JSON.parse(rawData);
        const wallet = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));

        const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));

        console.log(`--- CONSULTANDO INGRESSOS PARA: ${wallet.publicKey.toBase58()} ---`);

        // 2. Buscar todos os NFTs da carteira
        const meusNfts = await metaplex.nfts().findAllByOwner({
            owner: wallet.publicKey
        });

        if (meusNfts.length === 0) {
            console.log("Nenhum ingresso encontrado nesta carteira.");
            return;
        }

        console.log(`Sucesso! Encontrei ${meusNfts.length} ingressos:\n`);

        meusNfts.forEach((nft, index) => {
            // Usamos 'address' que é a propriedade padrão para o Mint Address no Metaplex JS
            const mintAddress = nft.address.toBase58();
            
            console.log(`${index + 1}. Nome: ${nft.name}`);
            console.log(`   Endereço (Mint): ${mintAddress}`);
            console.log('---------------------------------------');
        });

    } catch (error) {
        console.error("Erro ao listar ingressos:");
        console.error(error);
    }
}

listarIngressos();