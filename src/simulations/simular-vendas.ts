import { storage } from '../database/storageService.js';
import { IngressoNFT } from '../types/ingressoTypes.js';

async function iniciarSimulacao() {
    console.log("\n--- SIMULACAO DE VENDAS (EXECUTANDO VIA TSX) ---");
    
    const compradores = [
        { nome: "Andre", carteira: "6m7LJcSSYE6qxdip34CJ2DWhMNuByXmqUChFYCCfu2f6", qtd: 1 },
        { nome: "Suga", carteira: "WALLET-SUGA-999", qtd: 5 }
    ];

    try {
        console.log("Status: Gerando ingressos e atualizando db.json...");

        for (const comprador of compradores) {
            for (let i = 0; i < comprador.qtd; i++) {
                const novoIngresso: IngressoNFT = {
                    mint: `MINT-TSX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
                    owner: comprador.carteira,
                    ticketId: `NFT-${1000 + Math.floor(Math.random() * 9000)}`,
                    batch: "LOTE_TSX_FINAL",
                    price: 0.5,
                    royaltyPercent: 5,
                    isLocked: false
                };
                await storage.salvarIngresso(novoIngresso);
            }
        }

        const todos = await storage.listarIngressos();
        console.table(todos);
        console.log("\nSUCESSO: O sistema de módulos está operando perfeitamente.");
    } catch (error) {
        console.error("Erro na execução da simulação:", error);
    }
}

iniciarSimulacao();