import { CronJob } from "cron";

type CronTime = string | Date; 
type OnTickCallback = () => void;

export class CronService {
    static createJob(cronTime: CronTime, onTick: OnTickCallback) {
        const job = new CronJob( cronTime, onTick );

        job.start();

        return job;
    }
}