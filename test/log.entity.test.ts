import { LogEntity, LogSeverityLevel } from '../src/domain/entities/log.entity';


describe('LogEntity',()=>{

    const dataObj= {
        message: 'Hola Mundo',
        level: LogSeverityLevel.high,
        origin:'log.entity.test.ts'
    }
    test('should create a LogEntity instance', () => {
      

        const log = new LogEntity(dataObj)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test('should create a LogEntity instance fromjson', () => {
      
        const json =`{"message":"Service https://www.google.com working","level":"low","createdAt":"2024-01-19T23:15:05.080Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson(json)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe("Service https://www.google.com working")
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.origin).toBe("check-service.ts")
        expect(log.createdAt).toBeInstanceOf(Date)
    })
    

    test('should create a LogEntity instance from object', () => {
      
        const log = LogEntity.fromObject(dataObj)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)


    })
    
    
})