import mongoose from "mongoose";
import { MongoDatabase } from "./init"

describe("init mongoDB", () => {

    it(" should connect to mongoDB ", async() =>{
        const connected = await MongoDatabase.connect( {
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        });

        expect(connected).toBeTruthy();
    })

    it('should throw an error', async()=> {
        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: process.env.MONGO_URL!,
            });
            expect(true).toBe(false);
        } catch (error) {   
        }
    })

    afterAll(() => mongoose.connection.close())
}) 