import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  calculate() {
    return {
      message: '1+1=2',
    };
  }
}
