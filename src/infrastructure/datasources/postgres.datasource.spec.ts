import { PrismaClient } from '@prisma/client'
import { PostgresDatasource } from './postgres.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

const prismaClient = new PrismaClient()

describe('Pruebas en PostgresDatasource', () => {
  
  const logDataSource = new PostgresDatasource()
  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'postgres-log.datasource.test.ts'
  })

  afterEach(async() => {
    await prismaClient.log.deleteMany()
  })


  test('should create a log', async() => {

    const logSpy = jest.spyOn(console, 'log')

    await logDataSource.saveLog(log)

    expect( logSpy ).toHaveBeenCalled()
    expect( logSpy ).toHaveBeenCalledWith("Postgres Log created: ", expect.any(Number) )

  })

  test('should get logs', async()=>{

    await logDataSource.saveLog(log)
    await logDataSource.saveLog(log)

    const logs = await logDataSource.getLogs( LogSeverityLevel.medium )

    expect(logs.length).toBe(2)
    expect(logs[0].level).toBe(LogSeverityLevel.medium.toUpperCase())

  })

})