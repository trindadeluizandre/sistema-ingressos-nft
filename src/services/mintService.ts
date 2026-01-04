import { connection } from './solanaConnection.js';
import { Metaplex, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

export class MintService {
    private metaplex: Metaplex;

    constructor() {
        // Lendo o arquivo que agora contém apenas o array de números
        const rawData = fs.readFileSync('./carteira-dev.json', 'utf-8');
        const secretKeyArray = JSON.parse(rawData);
        const secretKey = Uint8Array.from(secretKeyArray);

        const wallet = Keypair.fromSecretKey(secretKey);

        this.metaplex = Metaplex.make(connection)
            .use(keypairIdentity(wallet))
            .use(bundlrStorage({
                address: 'https://devnet.bundlr.network',
                providerUrl: 'https://api.devnet.solana.com',
                timeout: 60000,
            }));
    }

    async emitirIngressoNFT(nomeEvento: string, proprietario: string) {
        try {
            console.log(`Iniciando processo de Mint para: ${nomeEvento}`);

            const { nft } = await this.metaplex.nfts().create({
                name: `Ticket: ${nomeEvento}`,
                uri: "", 
                sellerFeeBasisPoints: 0,
                symbol: "INGRESSO",
            });

            return {
                mintAddress: nft.address.toBase58(),
                status: 'sucesso'
            };
        } catch (error) {
            console.error("Erro na emissão do NFT:", error);
            throw error;
        }
    }
}