import * as fs from 'fs';

export interface ConfigSettings {
}

const defaultConf: ConfigSettings = {
};

let curConf: ConfigSettings = null;

export function CurrentConfig(): ConfigSettings {
    return curConf;
}

export function LoadConfig(): Promise<ConfigSettings> {
    return new Promise((resolve, reject) => {
        if (curConf != null) {
            console.log("CurrentConf exists");
            resolve(CurrentConfig());
            return;
        }
        let path = "./conf.json";

        fs.readFile(path, (err, data) => {
            if (err) {
                if (err.code == "ENOENT") {
                    fs.writeFile(path, JSON.stringify(defaultConf), (err) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log("File doesn't exist, creating default");
                            curConf = defaultConf;
                            resolve(CurrentConfig());
                        }
                    });
                }
                else {
                    throw err;
                }
            }
            else {
                console.log("Current conf file exists, use it");
                curConf = JSON.parse(data.toString()) as ConfigSettings;
                resolve(CurrentConfig());
            }
        });
    });
}