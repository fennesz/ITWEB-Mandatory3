import * as fs from 'fs';

export interface ConfigSettings {
    DBConnectionString: string;
    WorkoutProgramsCollection: string;
}

const defaultConf: ConfigSettings = {
    DBConnectionString: "",
    WorkoutProgramsCollection: ""
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
                            let connectionString = process.env.CONNECTION_STRING != undefined ? process.env.CONNECTION_STRING : curConf.DBConnectionString;
                            curConf.DBConnectionString = connectionString;
                            console.log(curConf);
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