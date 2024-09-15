import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_DIR_NAME: get('PUBLIC_DIR_NAME').default('public').asString(),
    MONGO_URL: get("MONGO_URL").required().asString(),
    MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
    JWT_SEED: get("JWT_SEED").required().asString()
}


