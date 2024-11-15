import { LogEntity, LogEntityOptions, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallback = (( error: Error ) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase{
    private ORIGIN_LOG_STRING = "CheckService.ts"
    constructor(
        private readonly logRepositories: LogRepository[], 
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallback
    ) {}

    public async execute( url: string ): Promise<boolean> {
        let newLogOptions: LogEntityOptions = { 
            level:   LogSeverityLevel.low, 
            message: "", 
            origin:  this.ORIGIN_LOG_STRING  
        };
        let success = true;
        
        try {
            const response = await fetch(url);
            if(! response.ok) throw new Error("Error on check service " + url);
            
            newLogOptions.message = `Service ${url} working`;
        } catch (error) {
            newLogOptions.level   = LogSeverityLevel.high;
            newLogOptions.message = `Service ${url} working`;
            
            success               = false

            this.errorCallBack && this.errorCallBack(error as Error);
            
        } finally {
            const newLog = new LogEntity(newLogOptions);

            this.saveLog(newLog);            

            if(success){
                this.successCallBack && this.successCallBack();
            }
        }
        return success;
    }

    private saveLog( log: LogEntity) {
        this.logRepositories.forEach( logRepository => {
            logRepository.saveLog(log);
        })
    }

}