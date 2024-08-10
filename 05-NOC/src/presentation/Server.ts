import { CheckService } from "../domain/use-cases/checks/CheckService";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/CronService";

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDataSource() );


export class Server {
    private static SERVICE_URL = "https://google.com";

    public static start()  {
        console.log("Server Started");
        
        CronService.createJob(
            "*/5 * * * * *", 
            () => {
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(this.SERVICE_URL + " is ok"),
                    (error: Error) => console.log(error)
                ).execute(this.SERVICE_URL)
            } 
        );
        
        CronService.createJob(
            "*/5 * * * * *", 
            () => {
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(this.SERVICE_URL + " is ok"),
                    (error: Error) => console.log(error)
                ).execute("http://localhost:3000")
            } 
        );
    }
}