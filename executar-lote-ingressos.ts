import { MintService } from './src/services/mintService.js';

async function simularVendaLote() {
    try {
        const mintService = new MintService();
        const meuEndereco = "J7p1ncxFLPt5L7yCLZuA7NSWcNcNfzGmfakmKhe7hvLs";
        const quantidade = 3; // Simulação inicial de 3 ingressos
        
        console.log(`--- INICIANDO SIMULAÇÃO DE VENDA: ${quantidade} INGRESSOS ---`);

        for (let i = 1; i <= quantidade; i++) {
            console.log(`Processando Ingresso #${i}...`);
            
            const resultado = await mintService.emitirIngressoNFT(
                `Suga VIP #${i}`, 
                meuEndereco
            );

            console.log(`[OK] Ingresso #${i} emitido! Mint: ${resultado.mintAddress}`);
            console.log(`Link: https://explorer.solana.com/address/${resultado.mintAddress}?cluster=devnet`);
            console.log('---------------------------------------');
        }

        console.log("SIMULAÇÃO DE LOTE CONCLUÍDA COM SUCESSO.");

    } catch (error) {
        console.error("Erro na simulação de lote:");
        console.error(error);
    }
}

simularVendaLote();