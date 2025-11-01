import { PROTO_PATHS, SERVICE_NAMES } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAMES.AUTH_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.get<string>('AUTH_GRPC_PACKAGE') || 'auth',
            protoPath: PROTO_PATHS.AUTH,
            url: `${configService.get<string>('AUTH_GRPC_SERVICE_HOST')}:${configService.get<number>('AUTH_GRPC_SERVICE_PORT')}`,
          },
        }),
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
