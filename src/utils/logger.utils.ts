import { ENV } from "../environments/environment";

export default class Logger {
    static log(info: string, ...value: any[]) {
        info = new Date().toISOString() + ' ' + info;
        if (!ENV.PRODUCTION_MODE) {
            console.log(info, ...value)
        }
    }

    static clear() {
        if (!ENV.PRODUCTION_MODE) {
            console.clear();
        }
    }
}

