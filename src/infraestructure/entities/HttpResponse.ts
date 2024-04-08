import { Response } from 'express-serve-static-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpResponse implements IHttpResponse {
  statusCode: number;
  body: any;
  headers: any;

  constructor(body: any, statusCode: number, headers?: any) {
    this.headers = {
      'Content-Type': 'application/json',
    };
    this.body = body;
    this.statusCode = statusCode;
  }

  send(res: Response) {
    res
      .set(this.headers)
      .status(this.statusCode)
      .json(this.body);
  }

}

interface IHttpResponse {
  body: any;
  headers: any;
  statusCode: number;
}