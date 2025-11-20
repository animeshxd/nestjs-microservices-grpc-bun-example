import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import {
  type GreeterServiceClient,
  GREETER_SERVICE_NAME,
} from '@app/grpc-contracts/proto/generated/greeter/v1/hello';

@Injectable()
export class GreeterService implements OnModuleInit {
  private greeterService: GreeterServiceClient;
  @Inject(GREETER_SERVICE_NAME) private readonly client: ClientGrpc;

  onModuleInit() {
    this.greeterService =
      this.client.getService<GreeterServiceClient>(GREETER_SERVICE_NAME);
  }

  hello() {
    return this.greeterService.sayHello({ name: 'World' });
  }
}
