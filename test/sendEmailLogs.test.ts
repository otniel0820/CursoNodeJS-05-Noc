import { LogEntity } from '../src/domain/entities/log.entity';
import { SendEmailLogs } from '../src/domain/useCases/email/sendEmailLogs';
import { EmailService } from '../src/presentation/email/emailService';




describe('SendEmailLogs',()=>{

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)

    }

    const mockLogRepository = {
        saveLog : jest.fn(),
        getLogs : jest.fn()
    }
    const senEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    )

    beforeEach(()=>{
        jest.clearAllMocks()
    })
    test('should call sendEmail and saveLogs',async () => {
      

        const result = await senEmailLogs.execute('otniellascano@gmail.com')

        expect(result).toBe(true)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1)
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log email sent",
            origin: "send-email-logs.ts",
        })
    })
    test('should log in case of error',async () => {
      
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)
        const result = await senEmailLogs.execute('otniellascano@gmail.com')

        expect(result).toBe(false)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1)
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: "high",
            message: "Error: Email log not sent",
            origin: "send-email-logs.ts",
        })
    })
    
})