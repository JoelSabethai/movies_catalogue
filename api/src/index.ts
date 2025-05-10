import './config';
import loaders from './loaders';
import { log } from './middlewares/logger';

const start = async () => {
    await loaders();
    log.info('Server ready');
};

start();