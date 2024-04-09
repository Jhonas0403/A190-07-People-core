import { Injectable } from '@nestjs/common';
import { PaymentsCulqiByStudentRepository } from './payments-culqi-by-student.repository';

@Injectable()
export class PaymentsCulqiByStudentService {
    constructor(private readonly dataService: PaymentsCulqiByStudentRepository) { }

    async request(req: any){
        const { studentId } = req;
        const data = await this.dataService.find(studentId);

        return data;
    }
}
