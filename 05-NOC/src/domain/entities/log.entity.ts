export enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high"
}

export class LogEntity {
    constructor(
        public level: LogSeverityLevel,
        public message: string,
        public createdAt: Date = new Date()
    ){}

    public toString(): string {
        return `${JSON.stringify(this)}\n`
    }
    
    static fromJson( json: string): LogEntity {
        const { message, level, createdAt } = JSON.parse(json)
        
        const log = new LogEntity(level, message, new Date(createdAt));
        
        return log;
    }
}