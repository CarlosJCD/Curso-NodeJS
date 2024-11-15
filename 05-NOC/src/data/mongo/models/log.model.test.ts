import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe("log.model.ts", () => {

    beforeEach( async() => {
        await MongoDatabase.connect( {
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        });
    })
    
    afterEach( () => mongoose.connection.close())

    it("should return LogModel", async() => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        }
      
        const log = await LogModel.create( logData );
          
        expect( log ).toEqual( expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }))
        
        await LogModel.findByIdAndDelete( log.id );
    })

    it('should return the schema object', () => {

        const schema = LogModel.schema.obj;
    
        expect( schema ).toEqual( expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            origin: { type: expect.any(Function) },
            level: {
                type: expect.any(Function),
                enum: [ 'low', 'medium', 'high' ],
                default: 'low'
            },
            createdAt: expect.any(Object)
        })
        )
    });

})