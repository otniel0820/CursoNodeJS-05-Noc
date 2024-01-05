
import { CheckService } from "../domain/useCases/checks/checksService";
import { FileSystemDatasource } from "../infrastructure/datasources/fileSystem.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cronService";
import { EmailService } from "./email/emailService";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

export class Server {
  public static start() {
    console.log("Server started...");
    
    
    //Mandar email
    const emailService = new EmailService()

    // Manda un correo con el cuerpo que nosotros le digamos en este caso es el htmlBody
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
    emailService.sendEmailWithFileSystemLogs([
      'otniellascano@gmail.com','otniel.lascano.dev@gmail.com'
    ])

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
