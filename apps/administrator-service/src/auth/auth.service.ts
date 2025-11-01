import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  CreateAuthUserRequest,
  SERVICE_NAMES,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private authServiceClient: AuthServiceClient;

  constructor(@Inject(SERVICE_NAMES.AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async createAuthUser(request: CreateAuthUserRequest) {
    await lastValueFrom(this.authServiceClient.createAuthUser(request));

    return { status: 200 };
  }
}
