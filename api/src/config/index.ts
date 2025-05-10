// Libs
import dotenv from 'dotenv';
import envVar from 'env-var';
// Middleware
import { log } from '../middlewares/logger';

dotenv.config();

let env: IEnvironmentVariables;

try {
    // Project
    const environment = envVar.get('ENV').default('env').required().asEnum(["dev", "prod"]);
    const httpPort = envVar.get('HTTP_PORT').default(3000).required().asPortNumber();
    const baseUrl = envVar.get('BASE_URL').default('http://localhost:3000').required().asUrlString();

    // Cors
    const corsOriginsRaw = envVar.get('CORS_ALLOWED_ORIGINS').asString();
    const corsAllowOrigins = corsOriginsRaw?.length && corsOriginsRaw !== '*'
        ? corsOriginsRaw.split(',').map(origin => origin.trim()).filter(origin => origin.length > 0)
        : '*';

    // MongoDB
    const mongo_uri = envVar.get('MONGO_URI').default('').asString();
    const mongodbName = envVar.get('MONGODB_NAME').default('').asString();
    const mongodbHost = envVar.get('MONGODB_HOST').default('').asString();
    const mongodbPort = envVar.get('MONGODB_PORT').default('').asPortNumber();
    const mongodbUsername = envVar.get('MONGODB_USERNAME').default('').asString();
    const mongodbPassword = envVar.get('MONGODB_PASSWORD').default('').asString();
    
    // TMDB
    const tmdbBaseUrl = envVar.get('TMDB_BASE_URL').required().asUrlString();
    const tmdbApiKey = envVar.get('TMDB_API_KEY').required().asString();

    // Clerk
    const clerkPublishableKey = envVar.get('CLERK_PUBLISHABLE_KEY').required().asString();
    const clerkSecretKey = envVar.get('CLERK_SECRET_KEY').required().asString();

    env = {
        // Project
        environment,
        httpPort,
        baseUrl,

        // Cors
        corsAllowOrigins,

        // MongoDB
        mongo_uri,
        mongodbName,
        mongodbHost,
        mongodbPort,
        mongodbUsername,
        mongodbPassword,

        // TMDB
        tmdbBaseUrl,
        tmdbApiKey,

        // Clerk
        clerkPublishableKey,
        clerkSecretKey,
    };
} catch(error: unknown) {
    if(error instanceof Error) {
        log.error(`Error loading environment variables: ${error.message}`);
    } else {
        log.error('Unknown error occurred while loading environment variables');
    }

    process.exit(1);
}

export { env };