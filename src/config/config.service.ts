import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(pathToEnv: string = '.env') {
        this.envConfig = dotenv.parse(fs.readFileSync(pathToEnv))
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}