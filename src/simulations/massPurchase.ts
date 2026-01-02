import { MintService } from "../services/mintService.js";
import { StorageService } from "../database/storageService.js";

async function simularCompraEmMassa() {
    console.log("--- INICIANDO SIMULACAO DE COMPRA EM MASSA ---");
    
    const mint = new MintService();
    const storage = new StorageService();

    // Quantidade reduzida para preservar saldo de teste na Devnet
    const quantidadeDesejada = 3; 
    const nomeDoLote = "LOTE_ESTRESSE_01";

    try {
        // Gera os NFTs reais na Blockchain
        const novosIngressos = await mint.gerarLote(quantidadeDesejada, nomeDoLote);

        console.log(`Salvando ${novosIngressos.length} ingressos no banco de dados local...`);
        
        for (const ingresso of novosIngressos) {
            await storage.salvarIngresso(ingresso);
        }

        console.log("--- SIMULACAO CONCLUIDA COM SUCESSO ---");
        console.log(`${novosIngressos.length} NFTs registrados na Blockchain e persistidos no DB.`);

    } catch (error) {
        console.error("Erro durante a simulacao de compra em massa:", error);
    }
}

simularCompraEmMassa();