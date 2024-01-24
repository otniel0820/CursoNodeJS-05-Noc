import { LogEntity, LogSeverityLevel } from "../src/domain/entities/log.entity";
import { LogRepositoryImpl } from "../src/infrastructure/repository/log.repository.impl";
describe("LogRepositoryImpl", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("saveLog should call the datasource with arguments", async () => {
    const log = { level: LogSeverityLevel.high, message: "hola" } as LogEntity;
    await logRepository.saveLog(log);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource with arguments",async () => {
    await logRepository.getLogs(LogSeverityLevel.low)
    expect(mockLogDatasource.getLogs).toBeCalledWith(LogSeverityLevel.low)
  });
});
