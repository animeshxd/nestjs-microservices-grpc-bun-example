import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import userProto from '@app/grpc-contracts/proto/definations/greeter/v1/hello.proto';
import {
  GREETER_SERVICE_NAME,
  GREETER_V1_PACKAGE_NAME,
} from '@app/grpc-contracts/proto/generated/greeter/v1/hello';
import { GreeterController } from './gateway.controller';
import { GreeterService } from './gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GREETER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: GREETER_V1_PACKAGE_NAME,
          protoPath: userProto,
        },
      },
    ]),
  ],
  controllers: [GreeterController],
  providers: [GreeterService],
})
export class GatewayModule {}
