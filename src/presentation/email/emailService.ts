import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachements[];
}

interface Attachements {
  filename: string;
  path: string;
}

//todo: Attachements:
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(
    
  ){

  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Email send ${to}`,
        origin: 'email.service.ts'
      })
     
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Email not send`,
        origin: 'email.service.ts'
      })
      
      return false;
    }
  }

 async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
    <h1>Logs de sistema</h1>
    <p>Este es un log de prueba.</p>
    <p>Soy tu papa en Programando</p>
    <p>Esta es una prueba de enviar correos electronicos mediante una aplicacion de monitoreo NOC para comprobar los errores del sistema mediante logs y para demostrarte una vez mas que soy tu papa tanto en frontend como en backend jajaja  ahi te adjunto los archivos de los logs pa que veas los errores que tienes en el sistema ajjajaja </p>
    `;
    const attachements: Attachements[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ];
   return this.sendEmail({ to, subject, attachements, htmlBody  });
  }
}
