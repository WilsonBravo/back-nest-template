import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CalculatorModule } from './calculator/calculator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CalculatorModule,
  ],
})
export class AppModule {}
