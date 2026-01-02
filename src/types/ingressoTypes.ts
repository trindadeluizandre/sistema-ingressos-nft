// src/types/ingressoTypes.ts

export interface IngressoNFT {
    mint: string;           // Endereço único na Blockchain
    owner: string;          // Carteira do dono atual
    ticketId: string;       // ID amigável (ex: NFT-SUGA-1001)
    batch: string;          // Nome do Lote
    price: number;          // Preço em SOL
    royaltyPercent: number; // 5% para o Suga
    isLocked: boolean;      // Trava de segurança (Double Spending)
}

export interface OrdemVenda {
    id: string;
    ticketMint: string;
    vendedor: string;
    precoSolicitado: number;
}