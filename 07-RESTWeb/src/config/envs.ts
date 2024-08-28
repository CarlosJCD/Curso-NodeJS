import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_DIR_NAME: get('PUBLIC_DIR_NAME').default('public').asString(),

}


