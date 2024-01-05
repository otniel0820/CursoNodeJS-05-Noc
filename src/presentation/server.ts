import { CheckService } from "../domain/useCases/checks/checksService";
import { SendEmailLogs } from "../domain/useCases/email/sendEmailLogs";
import { FileSystemDatasource } from "../infrastructure/datasources/fileSystem.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cronService";
import { EmailService } from "./email/emailService";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server started...");

    //Mandar email
    const emailService = new EmailService();

    //! En este caso lo estamos haciendo igual que en el codigo de abajo epro haciendo la implementacion de nustro nuevo caso de uso que creamos que en este caso es sendEmailLogs
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      "otniel.lascano.dev@gmail.com",
      "otniellascano@gmail.com",
    ]);
    //! Manda un correo con el cuerpo que nosotros le digamos en este caso es el htmlBody
    // emailService.sendEmail({
    //   to: 'otniellascano@gmail.com',
    //   subject: 'logs de sistema',
    //   htmlBody: `
    //   <h1>Logs de sistema</h1>
    //   <p>Este es un log de prueba.</p>
    //   <p>Este es un log de prueba.</p>
    //   <p>Este es un log de prueba.</p>
    //   `
    // })

    //!Mandar correo con archivos
    // emailService.sendEmailWithFileSystemLogs([
    //   'delgadojose178@gmail.com','otniellascano@gmail.com'
    // ])

    // CronService.createJob("*/5 * * * * *",
    // () => {
    //     const url = "https://www.google.com"

    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(`Error: ${error}`)
    //   ).execute(url);

    //   // new CheckService().execute('http://localhost:3000') //! Servidor y endpoint con json-Server
    // });
  }
}
