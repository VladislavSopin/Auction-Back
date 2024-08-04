import { ConfigService } from '@nestjs/config'
import { createTransport, Transporter } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>
  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      service: configService.get('MAIL_SERVICE'),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    })
  }
  async send(target: string, title: string, message: string) {
    const mailOptions: MailOptions = {
      to: target,
      html: message,
      subject: title,
      from: `"Аукцион" <${this.configService.get('MAIL_USER')}@${this.configService.get('MAIL_SERVICE')}.ru`,
    }
    try {
      console.log('отправка сообщения...')
      await this.transporter.sendMail(mailOptions)

      console.log('сообщение отправлено')
    } catch (error) {
      console.warn('сообщение не отправлено', error)
    }
  }
}
