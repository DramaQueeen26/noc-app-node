import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';

interface SendMailOptions {
  to: string
  subject: string
  html: string
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const { to, subject, html } = options

    try {

      const sendInformation = await this.transporter.sendMail({ to, subject, html })

      console.log(sendInformation)

      return true
    } catch (error) {
      return false
    }

  }

}