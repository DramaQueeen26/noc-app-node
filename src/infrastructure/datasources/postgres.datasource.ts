import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient()

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}

export class PostgresDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {

    const level = severityEnum[log.level]

    const prismaClient = new PrismaClient()

    const newLog = await prismaClient.log.create({ data: {...log, level } })

    console.log('Postgres Log created: ', newLog.id)

  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
    const level = severityEnum[severityLevel]

    const logs = await prismaClient.log.findMany({ where: { level } })

    return logs.map( LogEntity.fromObject )


  }

}