import { IngressoNFT, OrdemVenda } from "../types/ingressoTypes.js";

export class Marketplace {
    private ordens: OrdemVenda[] = [];

    criarOferta(ingresso: IngressoNFT, preco: number) {
        const novaOrdem: OrdemVenda = {
            id: `ORDEM-${Math.random().toString(36).substr(2, 5)}`,
            ticketMint: ingresso.mint,
            vendedor: ingresso.owner,
            precoSolicitado: preco
        };
        this.ordens.push(novaOrdem);
        console.log(`Oferta registrada: ${ingresso.ticketId} por ${preco} SOL`);
        return novaOrdem.id;
    }

    processarVenda(ordemId: string) {
        const ordem = this.ordens.find(o => o.id === ordemId);
        if (!ordem) return;

        const taxaSuga = ordem.precoSolicitado * 0.05;
        console.log(`Venda Processada!`);
        console.log(`Royalties (5%) para Suga: ${taxaSuga.toFixed(4)} SOL`);
    }
}