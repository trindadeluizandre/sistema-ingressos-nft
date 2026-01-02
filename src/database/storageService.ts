import * as fs from 'fs';
import { IngressoNFT } from "../types/ingressoTypes.js";

export class StorageService {
    private dbPath = './db.json';

    constructor() {
        if (!fs.existsSync(this.dbPath)) {
            fs.writeFileSync(this.dbPath, JSON.stringify({ ingressos: [], ordensVenda: [] }, null, 2));
        }
    }

    private lerBanco() {
        const conteudo = fs.readFileSync(this.dbPath, 'utf8');
        return JSON.parse(conteudo);
    }

    private salvarBanco(dados: any) {
        fs.writeFileSync(this.dbPath, JSON.stringify(dados, null, 2));
    }

    async salvarIngresso(ingresso: IngressoNFT): Promise<void> {
        const dados = this.lerBanco();
        const existe = dados.ingressos.find((i: IngressoNFT) => i.mint === ingresso.mint);
        
        if (!existe) {
            dados.ingressos.push(ingresso);
            this.salvarBanco(dados);
        }
    }

    async listarIngressos(): Promise<IngressoNFT[]> {
        const dados = this.lerBanco();
        return dados.ingressos;
    }
}

// Exportação da instância para uso global nos scripts
export const storage = new StorageService();