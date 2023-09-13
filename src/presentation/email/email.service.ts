import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';

interface SendMailOptions {
  to: string | string[]
  subject: string
  html: string
  attachments?: Attachment[]
}

interface Attachment {
  filename: string
  path: string
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

    const { to, subject, html, attachments = [] } = options

    try {

      const sendInformation = await this.transporter.sendMail({ to, subject, html, attachments })

      console.log(sendInformation)

      return true
    
    } catch (error) {
    
      return false
    
    }

  }

  sendEmailWithFileSystemLogs( to: string | string[] ) {

    const subject = 'Logs del servidor'
    const html = `
      <h3>Logs de sistema - NOC</h3>
      <p>Lorem velit non veniam ullamco ex eu laborum deserunt est amet elit nostrud sit. Dolore ullamco duis in ut deserunt. Ad pariatur labore exercitation adipisicing excepteur elit anim eu consectetur excepteur est dolor qui. Voluptate consectetur proident ex fugiat reprehenderit exercitation laboris amet Lorem ullamco sit. Id aute ad do laborum officia labore proident laborum. Amet sit aliqua esse anim fugiat ut eu excepteur veniam incididunt occaecat sit irure aliquip. Laborum esse cupidatat adipisicing non et cupidatat ut esse voluptate aute aliqua pariatur.</p>
      <p>Ver logs adjuntos</p>
    `;
    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
    ]

    return this.sendEmail({ to, subject, html, attachments })

  }

}