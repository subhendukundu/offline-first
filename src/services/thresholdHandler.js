import { syncAll } from "./syncDB";
import { removeParticluar } from './DBService';

export async function sumitAll(data) {
    const done = await syncAll(data);
    if(done) {
        removeParticluar(data);
    }
}