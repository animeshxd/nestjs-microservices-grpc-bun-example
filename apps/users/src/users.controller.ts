import { Controller } from '@nestjs/common';
import {
  type GreeterServiceController,
  GreeterServiceControllerMethods,
  type SayHelloRequest,
  type SayHelloResponse,
} from '@app/grpc-contracts/proto/generated/greeter/v1/hello';
import type { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Controller()
@GreeterServiceControllerMethods()
export class UsersController implements GreeterServiceController {
  constructor(private readonly usersService: UsersService) {}
  sayHello(
    request: SayHelloRequest,
  ):
    | Promise<SayHelloResponse>
    | Observable<SayHelloResponse>
    | SayHelloResponse {
    return this.usersService.sayHello(request.name);
  }
}
