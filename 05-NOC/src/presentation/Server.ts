import { CheckService } from "../domain/use-cases/checks/CheckService";
import { CheckServiceMultiple } from "../domain/use-cases/checks/CheckServiceMultiple";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/CronService";

const logRepository = new LogRepositoryImpl( new MongoLogDataSource() );


export class Server {
    private static SERVICE_URL = "https://google.com";

    public static start()  {
        console.log("Server Started");
        
        CronService.createJob(
            "*/5 * * * * *", 
            () => {
                new CheckService(
                    logRepository,
                    () => console.log(this.SERVICE_URL + " is ok"),
                    (error: Error) => console.log(error)
                ).execute(this.SERVICE_URL)
            } 
        );
        
        CronService.createJob(
            "*/5 * * * * *", 
            () => {
                new CheckServiceMultiple(
                    [logRepository],
                    () => console.log(this.SERVICE_URL + " is ok"),
                    (error: Error) => console.log(error)
                ).execute(this.SERVICE_URL)
            } 
        );
    }
}