import { Controller } from '@nestjs/common';
import {
  type GreeterServiceController,
  GreeterServiceControllerMethods,
  type SayHelloRequest,
  type SayHelloResponse,
} from '@app/grpc-contracts/proto/generated/greeter/v1/hello';
import type { Observable } from 'rxjs';

@Controller()
@GreeterServiceControllerMethods()
export class UsersController implements GreeterServiceController {
  sayHello(
    request: SayHelloRequest,
  ):
    | Promise<SayHelloResponse>
    | Observable<SayHelloResponse>
    | SayHelloResponse {
    return { message: `Hello ${request.name}!` };
  }
}
