import 'dotenv/config'
import * as env from 'env-var'

export const envs = {

  PROD: env.get('PROD').required().asBool(),
  URL: env.get('URL').required().asUrlString(),
  MONGO_URL: env.get('MONGO_URL').required().asUrlString(),
  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString()

}