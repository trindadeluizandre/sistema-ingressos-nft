import { Connection, clusterApiUrl } from '@solana/web3.js';

/**
 * Serviço de Conexão com a Solana
 * Este módulo centraliza a comunicação com a rede (Devnet).
 */
export class SolanaConnection {
    private static instance: Connection;

    private constructor() {}

    /**
     * Retorna uma instância única de conexão (Singleton)
     */
    public static getInstance(): Connection {
        if (!SolanaConnection.instance) {
            // "confirmed" garante que a transação foi validada pela maioria dos nós
            SolanaConnection.instance = new Connection(
                clusterApiUrl('devnet'), 
                'confirmed'
            );
            console.log("Conexão estabelecida com Solana Devnet.");
        }
        return SolanaConnection.instance;
    }
}

// Exportamos a instância pronta para uso
export const connection = SolanaConnection.getInstance();