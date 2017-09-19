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
                            return resolve(CurrentConfig());
                        }
                    });
                }
                else {
                    throw err;
                }
            }
            else {
                console.log("Config file exists, use it");
                let conf = JSON.parse(data.toString()) as ConfigSettings;
                if(!ConfContainsAllFields(conf)){
                    console.log("Current config missing fields, adding");
                    FillConfWithDefaultValues(conf);
                }
                curConf = conf;
                return resolve(CurrentConfig());
            }
        });
    });
}

function ConfContainsAllFields(conf: ConfigSettings) {
    for(let field in defaultConf) {
        if(conf[field] == undefined) {
            return false;
        }
    }
    return true;
}

function FillConfWithDefaultValues(conf: ConfigSettings) {
    for(let field in defaultConf) {
        if(conf[field] == undefined) {
            conf[field] = defaultConf[field];
        }
    }
}