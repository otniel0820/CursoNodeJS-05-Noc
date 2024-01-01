import { CheckService } from "../domain/useCases/checks/checksService";
import { CronService } from "./cron/cronService";

export class Server {
  public static start() {
    console.log("Server started...");
    CronService.createJob("*/5 * * * * *", 
    () => {
        const url = "https://www.google.com"
      new CheckService(
        () => console.log(`${url} is ok`),
        (error) => console.error(`Error: ${error}`)
      ).execute(url);
      // new CheckService().execute('http://localhost:3000') //! Servidor y endpoint con json-Server
    });
  }
}
