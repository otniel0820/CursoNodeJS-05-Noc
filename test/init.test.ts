import mongoose from "mongoose";
import { MongoDatabse } from "../src/data/mongoDb/init";

describe("init MongoDB", () => {
  afterAll(() => {
    mongoose.connection.close();
  });
  test("should connetc to MongoDB", async () => {
    const connected = await MongoDatabse.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBe(true);
  });

  test("should trow an error", async () => {
    try {
      const connected = await MongoDatabse.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: process.env.MONGO_URL!,
      });

      expect(true).toBe(false);
    } catch (error) {}
  });
});
