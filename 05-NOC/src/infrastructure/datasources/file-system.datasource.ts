import fs, { write } from "fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource{
    private readonly LOG_PATH      = "logs/"
    private readonly ALL_LOGS_PATH = "logs/logs-all.log";
    private readonly MEDIUM_LOGS_PATH = "logs/logs-medium.log";
    private readonly HIGH_LOGS_PATH = "logs/logs-high.log";


    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if( ! this.logPathExists( this.LOG_PATH )) this.createLogPath();
        
        if( ! this.logPathExists( this.ALL_LOGS_PATH )) this.createLogFile(this.ALL_LOGS_PATH);
        
        if( ! this.logPathExists( this.MEDIUM_LOGS_PATH )) this.createLogFile(this.MEDIUM_LOGS_PATH);
        
        if( ! this.logPathExists( this.HIGH_LOGS_PATH)) this.createLogFile(this.HIGH_LOGS_PATH);
    }

    private logPathExists = (logFilePath: string) => {
        return fs.existsSync(logFilePath);
    }

    private createLogPath(){
        fs.mkdirSync(this.LOG_PATH )
    }

    private createLogFile(logFilePath: string){
        fs.writeFileSync(logFilePath, "")
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        this.writeInLogFile(this.ALL_LOGS_PATH, newLog);
        
        
        if(newLog.level === LogSeverityLevel.medium){
            this.writeInLogFile(this.MEDIUM_LOGS_PATH, newLog);
            return;
        }
        
        if(newLog.level === LogSeverityLevel.high){
            this.writeInLogFile(this.HIGH_LOGS_PATH, newLog);
            return;
        } 

    }

    private writeInLogFile(logFilePath: string, newLog: LogEntity){
        fs.appendFileSync( logFilePath, newLog.toString() );
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.ALL_LOGS_PATH);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.MEDIUM_LOGS_PATH);
            
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.HIGH_LOGS_PATH);

            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    } 

    private getLogsFromFile(logsFilePath: string): LogEntity[] {
        const logFileContent = fs.readFileSync(logsFilePath, {encoding: "utf8"});

        return logFileContent.split("\n").map(LogEntity.fromJson);
    }

}