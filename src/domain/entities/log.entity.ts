export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel; //enum
  message: string;
  createdAt?: Date;
  origin: string;
}
export class LogEntity {
  public level: LogSeverityLevel; //enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  //Con este metodo deberiamos estar recibiendo toda la data de los log en formato json como tipo string y con el json parse lo convertimos a objeto
  static fromJson = (json: string ): LogEntity => {
    json = (json === '')? '{}':json
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      message: message,
      level: level,
      createdAt: new Date(createdAt),
      origin: origin,
    });

    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });

    return log;
  };
}
