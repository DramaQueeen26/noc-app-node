import { envs } from "../config/plugins/env.plugin";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasource() )
const emailService = new EmailService()

export class ServerApp {

  public static start() {

    console.log('Server started...');

    // new SendEmailLogs( emailService, fileSystemLogRepository ).execute('mariangel.yajure@gmail.com')

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = envs.URL
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${ url } is working`),
    //       ( error ) => console.log( error )
    //     ).execute( url )
    //   }
    // )

  }

}