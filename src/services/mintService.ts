import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { IngressoNFT } from "../types/ingressoTypes.js";
import * as fs from 'fs';

export class MintService {
    private connection: Connection;
    private metaplex: Metaplex;
    private adminWallet: Keypair;

    constructor() {
        // 1. Configuração da Rede e Conexão na Devnet
        this.connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // 2. Carregamento Automático da Carteira de Desenvolvedor gerada
        const dadosCarteira = JSON.parse(fs.readFileSync('carteira-dev.json', 'utf8'));
        this.adminWallet = Keypair.fromSecretKey(new Uint8Array(dadosCarteira.secretKey));

        // 3. Inicialização do Metaplex com a identidade da carteira
        this.metaplex = Metaplex.make(this.connection).use(keypairIdentity(this.adminWallet));
    }

    async gerarLote(quantidade: number, nomeLote: string): Promise<IngressoNFT[]> {
        const lote: IngressoNFT[] = [];
        console.log(`--- INICIANDO MINTAGEM DE LOTE: ${nomeLote} ---`);

        for (let i = 1; i <= quantidade; i++) {
            const ticketId = `NFT-SUGA-${1000 + i}`;
            console.log(`Mintando ingresso ${i}/${quantidade} (${ticketId})...`);

            try {
                // Executa a mintagem real na Blockchain Solana
                // 'uri' é obrigatório para satisfazer a interface CreateNftInput
                const { nft } = await this.metaplex.nfts().create({
                    name: `Ingresso ${nomeLote} #${i}`,
                    symbol: "SUGA",
                    uri: "https://arweave.net/metadata-simulado",
                    sellerFeeBasisPoints: 500, // 5% royalties para o Suga
                    isMutable: false,
                });

                // Monta o objeto de acordo com a interface definida em ingressoTypes.ts
                lote.push({
                    mint: nft.address.toBase58(),
                    owner: this.adminWallet.publicKey.toBase58(),
                    ticketId: ticketId,
                    batch: nomeLote,
                    price: 0.5,
                    royaltyPercent: 5,
                    isLocked: false
                });

                console.log(`Sucesso: ${ticketId} registrado com Mint: ${nft.address.toBase58()}`);
            } catch (error) {
                console.error(`Falha técnica ao mintar ingresso ${i}:`, error);
            }
        }

        console.log(`--- LOTE ${nomeLote} CONCLUÍDO COM ${lote.length} UNIDADES ---`);
        return lote;
    }
}