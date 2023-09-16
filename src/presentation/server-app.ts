import { envs } from "../config/plugins/env.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDatasource } from "../infrastructure/datasources/mongo.datasource";
import { PostgresDatasource } from "../infrastructure/datasources/postgres.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource()
  // new MongoDatasource()
  new PostgresDatasource()
)
const emailService = new EmailService()

export class ServerApp {

  public static async start() {

    console.log('Server started...');

    // new SendEmailLogs( emailService, logRepository ).execute('mariangel.yajure@gmail.com')

    // * Obtener logs
    const logs = await logRepository.getLogs(LogSeverityLevel.low)
    console.log(logs);

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = envs.URL
    //     new CheckService(
    //       logRepository,
    //       () => console.log(`${ url } is working`),
    //       ( error ) => console.log( error )
    //     ).execute( url )
    //   }
    // )

  }

}