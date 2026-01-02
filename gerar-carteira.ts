import { Keypair } from "@solana/web3.js";
import * as fs from 'fs';

async function criarIdentidade() {
    console.log("--- GERANDO NOVA IDENTIDADE DE DESENVOLVEDOR ---");

    // Cria um par de chaves aleatorio
    const carteira = Keypair.generate();

    const dados = {
        publicKey: carteira.publicKey.toBase58(),
        secretKey: Array.from(carteira.secretKey) // Converte para array de numeros para salvar no JSON
    };

    // Salva localmente para usarmos nos proximos scripts
    fs.writeFileSync('carteira-dev.json', JSON.stringify(dados, null, 2));

    console.log("SUCESSO: Carteira gerada e salva em 'carteira-dev.json'");
    console.log("Endereco Publico:", dados.publicKey);
    console.log("AVISO: Adicione 'carteira-dev.json' ao seu .gitignore para seguranca.");
}

criarIdentidade();