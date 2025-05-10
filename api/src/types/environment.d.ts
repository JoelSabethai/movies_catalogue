interface IEnvironmentVariables {
    // Project
    environment: 'dev' | 'prod';
    httpPort: number;
    baseUrl: string;

    // Cors
    corsAllowOrigins: string | string[];

    // MongoDB
    mongo_uri: string;
    mongodbName: string;
    mongodbHost: string;
    mongodbPort: number;
    mongodbUsername: string;
    mongodbPassword: string;

    // TMDB
    tmdbBaseUrl: string;
    tmdbApiKey: string;

    // Clerk
    clerkPublishableKey: string;
    clerkSecretKey: string;
}