import { CheckService } from "../domain/useCases/checks/checksService";
import { CronService } from "./cron/cronService";



export class Server{
    public static start(){
        console.log('Server started...');
        CronService.createJob('*/5 * * * * *',()=>{
            new CheckService().execute('https://www.google.com')
            
        })
       
    }
}

