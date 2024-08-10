import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallback = (( error: Error ) => void) | undefined;


export class CheckService implements CheckServiceUseCase{
    
    constructor(
        private readonly logRepository: LogRepository, 
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallback
    ) {}

    public async execute( url: string ): Promise<boolean> {
        try {
            const response = await fetch(url);
            if(!  response.ok) throw new Error("Error on check service " + url);
            
            const newLog = new LogEntity(LogSeverityLevel.low ,`Service ${url} working`)
            this.logRepository.saveLog(newLog);

            this.successCallBack && this.successCallBack();
            
            return true;
        } catch (error) {

            const newLog = new LogEntity(LogSeverityLevel.high ,`${url} error: ${error}`)
            this.logRepository.saveLog(newLog);
            
            this.errorCallBack && this.errorCallBack(error as Error);
            
            return false
        }
    }

}