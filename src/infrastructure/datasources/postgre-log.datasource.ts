import { LogDatasource } from "../../domain/datasources/log.datasouce";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PosgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const levelConverted = severityEnum[log.level];
    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level: levelConverted,
      },
    });
    console.log('Postgre Log Created', newLog.id);
    
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const levelConverted = severityEnum[severityLevel]
    const logs = await prismaClient.logModel.findMany({
      where: {
        level: levelConverted,
      },
    });
    return logs.map((postgreLog) => LogEntity.fromObject(postgreLog));
  }
}
