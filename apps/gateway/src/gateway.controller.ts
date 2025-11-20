import { Controller, Get } from '@nestjs/common';
import { GreeterService } from './gateway.service';

@Controller()
export class GreeterController {
  constructor(private readonly greeterService: GreeterService) {}

  @Get()
  Hello() {
    return this.greeterService.hello();
  }
}
