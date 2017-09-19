export interface IMongoRepository<T> {
    Connect(): Promise<boolean>
    Disconnect(): void
    Create(...data: T[]) : Promise<string[]>
    Read(filter?: any, projection?: any): Promise<T[]>
    Update(filter: any, data: any): Promise<boolean>
    Delete(filter: any): Promise<boolean>
    GetAll(): Promise<T[]>
}