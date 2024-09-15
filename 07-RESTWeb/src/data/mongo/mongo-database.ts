import mongoose from "mongoose"

export interface MongoConnectionOptions {
    mongoUrl: string,
    dbName: string
}

export class MongoDatabase {
    static async connect({mongoUrl, dbName}: MongoConnectionOptions){
        try {
            await mongoose.connect(mongoUrl, { dbName  });

            return true;
        } catch (error) {
            console.log("Mongo Connection Error");
            throw error;
        }
    }
}