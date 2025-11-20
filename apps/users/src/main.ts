import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';
import proto from '@app/grpc-contracts/proto/definations/greeter/v1/hello.proto';
import { GREETER_V1_PACKAGE_NAME } from '@app/grpc-contracts/proto/generated/greeter/v1/hello';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        package: GREETER_V1_PACKAGE_NAME,
        protoPath: proto,
      },
    },
  );
  await app.listen();
}

await bootstrap();
