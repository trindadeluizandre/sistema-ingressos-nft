export interface Ticket {
    id: string;             // ID único do ingresso
    ownerName: string;      // Nome do comprador (Andre, Suga, etc)
    ownerWallet: string;    // Endereço da carteira Solana
    eventDate: string;      // Data do evento
    price: number;          // Preço em SOL ou Real
    nftMintAddress: string; // O endereço do NFT na rede Solana
    isTransferred: boolean; // Se o ingresso foi passado para outra pessoa
}

export const createTicket = (name: string, wallet: string): Ticket => {
    return {
        id: `TICK-${Math.floor(Math.random() * 10000)}`,
        ownerName: name,
        ownerWallet: wallet,
        eventDate: "2026-12-30",
        price: 100,
        nftMintAddress: "Ainda não gerado",
        isTransferred: false
    };
};