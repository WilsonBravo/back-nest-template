import { Controller, Get } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private calculatorService: CalculatorService) {}

  @Get()
  calculate() {
    return this.calculatorService.calculate();
  }
}
