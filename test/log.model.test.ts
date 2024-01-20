import mongoose from "mongoose";
import { envs } from "../src/config/plugins/envs.plugin";
import { MongoDatabse } from "../src/data/mongoDb/init";
import { LogModel } from '../src/data/mongoDb/models/log.model';

describe("log.model.test.ts", () => {
  beforeAll(async () => {
    await MongoDatabse.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(()=>{
    mongoose.connection.close()
  })
  test("should return LogModel", async () => {

    const logData = {
        origin: 'log.model.test.ts',
        message: 'test-message',
        level: 'low'
    }

    const log = await LogModel.create(logData)

    expect(log).toEqual(expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String)
    }))
    
    await LogModel.findByIdAndDelete(log.id)
  });

  test('should return the schema object', () => {
    
    const schema = LogModel.schema.obj
    expect(schema).toEqual(expect.objectContaining({
        level: {
          type: expect.any(Function),
          enum: [ 'low', 'medium', 'high' ],
          default: 'low'
        },
        message: { type: expect.any(Function), require: true },
        createdAt:  expect.any(Object),
        origin: { type: expect.any(Function) }
      }))
    
  })
  
});
