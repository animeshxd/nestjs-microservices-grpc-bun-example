import { ValidateDto } from '@app/validator';
import { Injectable } from '@nestjs/common';
import { IsString, MinLength, IsEmail } from 'class-validator';

class HelloDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;
}

@Injectable()
export class UsersService {
  sayHello(name: string): { message: string } {
    return { message: `Hello ${name}!` };
  }
  @ValidateDto(HelloDto)
  sayBye(obj: HelloDto) {
    console.log(obj);
    return '';
  }
}
