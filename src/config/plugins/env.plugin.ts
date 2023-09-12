import 'dotenv/config'
import * as env from 'env-var'

export const envs = {

  URL: env.get('URL').required().asUrlString(),

}