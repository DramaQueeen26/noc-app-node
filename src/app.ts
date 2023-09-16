import { envs } from "./config/plugins/env.plugin"
import { PrismaClient } from "@prisma/client"
import { MongoDatabase } from "./data/mongo"
import { ServerApp } from "./presentation/server-app"

(async() => {

  main()

})()

async function main() {

  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL, dbName: envs.DB_NAME })

  ServerApp.start()

}