/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/** biome-ignore-all lint/suspicious/noExplicitAny: ignore */
import { RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function ValidateDto(dtoClass: any) {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const dto = plainToInstance(dtoClass, args[0]);
      const errors = validateSync(dto);
      if (errors.length) {
        throw new RpcException({
          message: 'Validation failed',
          details: errors.flatMap((e) => Object.values(e.constraints || {})),
        });
      }
      return original.apply(this, args);
    };
  };
}
