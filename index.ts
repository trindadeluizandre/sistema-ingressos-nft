import { storage } from "./src/database/storageService.js";
import { IngressoNFT } from "./src/types/ingressoTypes.js";

async function iniciarSistema() {
    console.log("--- SISTEMA DE INGRESSOS NFT (PROJETO SUGA) ---");
    console.log("Status: Inicializando modulos de controle...");

    const novoIngresso: IngressoNFT = {
        mint: "MINT-BASE-INITIAL-001",
        owner: "6m7LJcSSYE6qxdip34CJ2DWhMNuByXmqUChFYCCfu2f6",
        ticketId: "NFT-SUGA-000",
        batch: "INICIALIZACAO",
        price: 0,
        royaltyPercent: 5,
        isLocked: false
    };

    // Salvando usando o metodo da classe
    await storage.salvarIngresso(novoIngresso);

    console.log("Registro inicial criado com sucesso.");

    const total = await storage.listarIngressos();
    console.log("Total de ingressos no sistema: " + total.length);
    console.log("--- SISTEMA OPERACIONAL ---");
}

iniciarSistema().catch((erro) => {
    console.error("Falha critica na inicializacao do sistema:", erro);
});