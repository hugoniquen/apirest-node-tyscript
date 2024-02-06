import { GET, route } from "awilix-express";
import { Request, Response, Router } from 'express';
import { StudentService } from "../services/StudentService";

@route('/students')
export class StudentController {
    public router: Router;
    
    constructor(private readonly studentService : StudentService ) {        
        this.router = Router();
        this.router.get('/', this.all.bind(this));
    }

    @GET()
    public async all(req: Request, res: Response){
        const students = await this.studentService.getAllStudents();
        res.json(students);
    }
} 