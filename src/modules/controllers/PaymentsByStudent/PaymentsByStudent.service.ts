import { Injectable } from "@nestjs/common";
import { PaymentsByStudentRequest } from "./dto/request";
import { PaymentsByStudentResponse } from "./dto/response";
import { PaymentsByStudentRepository } from "./PaymentsByStudent.repository";

@Injectable()
export class PaymentsByStudentService{
    constructor(private readonly dataService: PaymentsByStudentRepository) { }

    async request (req:PaymentsByStudentRequest){
        const {period, studentId} = req;
        const data = await this.dataService.find(studentId,period);
    
        return data
    }
     
    

}