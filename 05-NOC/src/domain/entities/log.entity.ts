export enum LogSeverityLevel {
    low     = "low",
    medium  = "medium",
    high    = "high"
}

export interface LogEntityOptions {
    level:      LogSeverityLevel,
    message:    string, 
    origin:     string
    createdAt?: Date,
}

export class LogEntity {
    public level:       LogSeverityLevel;
    public message:     string;
    public origin:      string;
    public createdAt:   Date;
    
    constructor(options: LogEntityOptions){
        const { level, message, createdAt, origin } = options
        this.level      = level;
        this.message    = message;
        this.origin     = origin;
        this.createdAt  = createdAt ?? new Date();
    }

    public toString(): string {
        return `${JSON.stringify(this)}\n`
    }
    
    static fromJson( json: string): LogEntity {
        const { message, level, createdAt, origin } = JSON.parse(json)
        
        const log = new LogEntity({
            level, 
            message, 
            origin,
            createdAt: new Date(createdAt)
        });
        
        return log;
    }
}