export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel; //enum
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  //Con este metodo deberiamos estar recibiendo toda la data de los log en formato json como tipo string y con el json parse lo convertimos a objeto
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;
  };
}
