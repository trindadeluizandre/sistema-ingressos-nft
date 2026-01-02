import { IngressoNFT } from "../types/ingressoTypes.js";

export class SecurityGuard {
    static validarTransacao(ingresso: IngressoNFT): boolean {
        if (ingresso.isLocked) {
            console.error(`FRAUDE: Ingresso ${ingresso.ticketId} já está em uso.`);
            return false;
        }
        ingresso.isLocked = true; // Trava o ingresso
        return true;
    }

    static liberarIngresso(ingresso: IngressoNFT) {
        ingresso.isLocked = false;
    }
}