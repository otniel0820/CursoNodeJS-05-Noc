
import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabse } from "./data/mongoDb";

import { Server } from "./presentation/server";


(async () => {
  main();
})();

async function main() {

  //cadena de conexion a mongo
  await MongoDatabse.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level:'HIGH',
  //     message: 'Test Message with prisma',
  //     origin: 'App.ts'
  //   }
  // })

  // console.log(newLog);

  // const logs = await prisma.logModel.findMany({
  //   where:{
  //     level:'HIGH'
  //   }
  // });
  // console.log(logs);
  


  

  // Crear una coleccion = tables(een base de datos relacionales), documento = registro (een base de datos relacionales)

  // const newLog = await LogModel.create({
  //   message: 'Test Message with mongo',
  //   origin: 'App.ts',
  //   level: 'low'
  // })
  
  // await newLog.save()

  // console.log(newLog);

  // const logs = await LogModel.find()
  // console.log(logs[1].message);
  
  

  Server.start();
  // console.log( envs);
  
}
