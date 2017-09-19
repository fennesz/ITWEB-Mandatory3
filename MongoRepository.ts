import { MongoClient, Db, Collection, Cursor, ObjectID} from 'mongodb';
import { IMongoRepository } from './IMongoRepository';

export class MongoRepository<T> implements IMongoRepository<T> {
    Url: string;
    CollectionString: string;
    Db: Db;

    constructor(url: string, collectionString: string) {
        if(url == "") {
            throw new Error("url can't be empty");
        }
        this.Url = url;

        if(collectionString == ""){
            throw new Error("Collection can't be empty");
        }
        this.CollectionString = collectionString;
    }

    public Connect(): Promise<boolean> {
        if(this.Db != null) {
            this.Disconnect();
        }

        return MongoClient.connect(this.Url).then(db => {
            this.Db = db;
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }

    public Disconnect() {
        this.Db.close();
        this.Db = null;
    }

    public Create(...data: T[]) : Promise<string[]> {
        if(data.length < 1) {
            return Promise.resolve([]);
        }
        let collection: Collection<T> = this.Db.collection(this.CollectionString);        
        return collection.insertMany(data).then((res) => {
            let ids: string[] = [];
            res.insertedIds.forEach(id => ids.push(id.toString()));
            return ids;
        });
    }

    public Update(filter: any, data: any): Promise<boolean> {
        let collection: Collection<T> = this.Db.collection(this.CollectionString);
        this.FixFilter(filter);        
        return collection.updateOne(filter, {$set: data}).then(res => res.result.ok == 1);
    }

    public Read(filter?: any, projection?: any): Promise<T[]> {
        filter = filter != undefined ? filter : {};
        let collection: Collection<T> = this.Db.collection(this.CollectionString);
        this.FixFilter(filter);
        let cursor = collection.find(filter) as Cursor<T>;
        if(projection) {
            cursor = cursor.project(projection);
        }
        return cursor.toArray();
    }

    public Delete(filter: any): Promise<boolean> {
        let collection: Collection<T> = this.Db.collection(this.CollectionString);
        this.FixFilter(filter);
        return collection.findOneAndDelete(filter)
        .then((res) => res.ok == 1);
    }

    public GetAll(): Promise<T[]> {
        return this.Read({});
    }

    private FixFilter(filter: any): any{
        if(filter["id"]) {
            filter["_id"] = filter["id"];
            filter["id"] = undefined;
        }
        if(filter["_id"]) {
            filter["_id"] = new ObjectID(filter["_id"]);
        }
        return filter;
    }
}