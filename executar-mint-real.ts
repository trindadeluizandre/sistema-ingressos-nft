import { MintService } from './src/services/mintService.js';

async function testarMint() {
    try {
        const mintService = new MintService();
        
        // Substitua pelo endereço da sua carteira para receber o NFT
        const meuEndereco = "J7p1ncxFLPt5L7yCLZuA7NSWcNcNfzGmfakmKhe7hvLs";
        
        console.log("Conectando e iniciando transação...");
        
        const resultado = await mintService.emitirIngressoNFT(
            "Ingresso: Suga Invest", 
            meuEndereco
        );

        console.log("---------------------------------------");
        console.log("SUCESSO NA EMISSÃO DO INGRESSO!");
        console.log(`Endereço do NFT: ${resultado.mintAddress}`);
        console.log(`Link no Explorer: https://explorer.solana.com/address/${resultado.mintAddress}?cluster=devnet`);
        console.log("---------------------------------------");

    } catch (error) {
        console.error("Falha na execução do teste:");
        console.error(error);
    }
}

testarMint();