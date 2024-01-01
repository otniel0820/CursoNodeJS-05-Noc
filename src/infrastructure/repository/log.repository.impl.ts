import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogDatasource } from '../../domain/datasources/log.datasouce';


export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDatasource: LogDatasource // esto se hace para poderlo cambiar facilmente por cualquier datasorce cuando sea necesario
    ){}
    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
       return this.logDatasource.getLogs(severityLevel)
    }

}