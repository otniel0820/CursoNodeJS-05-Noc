import mongoose from "mongoose";

// export interface LogEntityOptions{
//     level: LogSeverityLevel; //enum
//     message: string;
//     createdAt?: Date;
//     origin: string;
//  }

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  message: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  origin: {
    type: String,
  },
});

export const LogModel = mongoose.model("Log", logSchema);
