import { EmailService } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository"

interface SendEmailLogUseCase {
  execute: ( to: string | string[] ) => Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogUseCase {
  
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}
  async execute(to: string | string[]): Promise<boolean> {

    try {

      const sent = await this.emailService.sendEmailWithFileSystemLogs( to )

      if( !sent ) throw new Error("Email not sent");

      this.logRepository.saveLog( new LogEntity({
        message: `Email sent`, 
        level: LogSeverityLevel.low, 
        origin: 'send-email-logs.ts'
      }))
      
      return true
    
    } catch (error) {
      
      this.logRepository.saveLog( new LogEntity({
        message: `Email not sent`, 
        level: LogSeverityLevel.high, 
        origin: 'send-email-logs.ts'
      }))

      return false
    
    }

  }
  
}