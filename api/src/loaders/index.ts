// Loaders
import { createApp } from './express';
// Middlewares
import { log } from './../middlewares/logger'; 
// Config
import { env } from './../config';

const app = createApp();

export default async function () {
    app.listen(env.httpPort, () => {
        log.info(`Server listening at ${env.baseUrl}`);
    });
}