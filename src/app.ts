import express, {Express} from 'express';
import { asClass, asValue, createContainer, InjectionMode} from 'awilix';
import config from './config';
import cors from 'cors';
import { MysqlConnection } from './database/MysqlConnection';
import { MysqlStudentRepository } from './repositories/MysqlStudentRepository';

const app: Express = express();

const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
});

container.register({
    dbConfig: asValue(config.dbConfig),
    dbConnection: asClass(MysqlConnection).singleton(),
    studentRepository: asClass(MysqlStudentRepository).scoped(),
});

app.use(cors());