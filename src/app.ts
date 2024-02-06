import express, {Express} from 'express';
import { asClass, asValue, createContainer, InjectionMode} from 'awilix';
import config from './config';
import cors from 'cors';
import { MysqlConnection } from './database/MysqlConnection';
import { MysqlStudentRepository } from './repositories/MysqlStudentRepository';
import { StudentService } from './services/StudentService';
import { StudentController } from './controllers/StudentController';
import { scopePerRequest } from 'awilix-express';

const app: Express = express();

const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
});

container.register({
    dbConfig: asValue(config.dbConfig),
    dbConnection: asClass(MysqlConnection).singleton(),
    studentRepository: asClass(MysqlStudentRepository).scoped(),
    studentService: asClass(StudentService).scoped(),
    studentController: asClass(StudentController).scoped(),
});

app.use(cors());
app.use(scopePerRequest(container));
app.use(express.json());


// cuando se usa esto (req, res, next) se le suele llamar Meddleware.
app.use('/students',(req, res, next)=>{
    container.resolve('studentController').router(req, res, next);
});

const PORT = process.env.PORT;
const server = app.listen(PORT, ()=>{
    console.log(`Server ejecutandose en http:localhost:${PORT}`);    
});

export = {app, server}