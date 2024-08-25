import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDataSource } from './log.datasource';

class MockLogDatasource implements LogDataSource {   
    constructor(
        private mockLogs: LogEntity[]
    ){}
    async saveLog( log: LogEntity ): Promise<void> {
        return;
    }
    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        return this.mockLogs
    }
}

describe('log.datasource.ts LogDatasource', ()=> {

    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    })


    it('should test the abstract class', async() => {
        const mockLogDatasource = new MockLogDatasource([newLog]);

        expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
        expect( typeof mockLogDatasource.saveLog ).toBe( 'function' );
        expect( typeof mockLogDatasource.getLogs ).toBe( 'function' );

        await mockLogDatasource.saveLog( newLog );
        const logs = await mockLogDatasource.getLogs( LogSeverityLevel.high );
        expect( logs ).toHaveLength(1)
        expect( logs[0]).toBeInstanceOf( LogEntity );
    })


})