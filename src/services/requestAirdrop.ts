import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function pedirSaldo() {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const minhaCarteira = new PublicKey("456uJpAMnf7z36XfqLenEA6ePuh4WzfnhpvNxmhRAVg9");

    console.log(`Solicitando 1 SOL de teste para: ${minhaCarteira.toBase58()}...`);

    try {
        // Solicita o airdrop
        const signature = await connection.requestAirdrop(
            minhaCarteira,
            1 * LAMPORTS_PER_SOL
        );

        // Aguarda a confirmação da rede
        const latestBlockHash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: signature,
        });

        console.log("Sucesso! 1 SOL foi depositado na sua carteira de testes.");
        console.log("Verifique aqui: https://explorer.solana.com/address/456uJpAMnf7z36XfqLenEA6ePuh4WzfnhpvNxmhRAVg9?cluster=devnet");
    } catch (error) {
        console.error("Falha no Airdrop. A rede pode estar congestionada. Tente novamente em alguns minutos.");
        console.error(error);
    }
}

pedirSaldo();