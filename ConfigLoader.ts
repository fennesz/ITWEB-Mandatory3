import * as fs from 'fs';

export interface ConfigSettings {
    dataBaseConnectionString: string;
    workoutProgramsCollection: string;
}

const defaultConf: ConfigSettings = {
    dataBaseConnectionString: "mongodb://localhost:27017",
    workoutProgramsCollection: "WorkoutPrograms"
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
                            let connectionString = process.env.CONNECTION_STRING != undefined ? process.env.CONNECTION_STRING : curConf.dataBaseConnectionString;
                            curConf.dataBaseConnectionString = connectionString;
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