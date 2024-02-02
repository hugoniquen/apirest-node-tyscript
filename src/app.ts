import express, {Express} from 'express';
import { asValue, createContainer, InjectionMode} from 'awilix';
import config from './config';
import cors from 'cors';

const app: Express = express();

const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
});

container.register({
    dbConfig: asValue(config.dbConfig)
});

app.use(cors());