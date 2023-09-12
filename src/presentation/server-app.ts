import { envs } from "../config/plugins/env.plugin";
import { CheckService } from "../domain/use-cases/checks/check.service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron.service";

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasource() )

export class ServerApp {

  public static start() {

    console.log('Server started...');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = envs.URL
        new CheckService(
          fileSystemLogRepository,
          () => console.log(`${ url } is working`),
          ( error ) => console.log( error )
        ).execute( url )
      }
    )

  }

}