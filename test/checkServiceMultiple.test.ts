import { LogEntity } from '../src/domain/entities/log.entity'
import { CheckServiceMultiple } from '../src/domain/useCases/checks/checksServiceMultiple';


describe('CheckServiceUseCaseMultiple',()=>{

    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepository3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()
    
    const checkService = new CheckServiceMultiple(
        [mockRepository1, mockRepository2, mockRepository3],
        successCallback,
        errorCallback
    )

    beforeEach(()=>{
        jest.clearAllMocks()
    })
    test('should call successCallback when fetch return true', async () => {
      

       const wasOk= await checkService.execute('https://google.com')

        expect(wasOk).toBe(true)
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
    test('should call errorCallback when fetch return false', async () => {
      

       const wasOk= await checkService.execute('https://googleasdasd.com')

        expect(wasOk).toBe(false)
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()

        expect(mockRepository1.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    })
    
})