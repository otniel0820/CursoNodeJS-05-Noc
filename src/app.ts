
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabse } from "./data/mongoDb";

import { Server } from "./presentation/server";


(async () => {
  main();
})();

async function main() {

  await MongoDatabse.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })
  


  // Server.start();
  // console.log( envs);
  
}
