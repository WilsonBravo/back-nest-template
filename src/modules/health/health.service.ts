import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  calculate() {
    return {
      message: '1+1=2',
    };
  }
}
