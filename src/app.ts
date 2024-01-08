
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabse } from "./data/mongoDb";

import { Server } from "./presentation/server";


(async () => {
  main();
})();

async function main() {

  await MongoDatabse.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  // Crear una coleccion = tables(een base de datos relacionales), documento = registro (een base de datos relacionales)

  // const newLog = await LogModel.create({
  //   message: 'Test Message with mongo',
  //   origin: 'App.ts',
  //   level: 'low'
  // })
  
  // await newLog.save()

  // console.log(newLog);

  const logs = await LogModel.find()
  console.log(logs[1].message);
  
  

  // Server.start();
  // console.log( envs);
  
}
