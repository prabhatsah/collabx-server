import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Patch,
} from '@nestjs/common';
import { UserOrgService } from './user-org.service';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { SessionUser } from '@app/common/interfaces/sesion-user.interface';
import { SessionService } from '../session/session.service';

@Controller('/api/v1/organizations')
export class UserOrgController {
  private readonly logger = new Logger(UserOrgController.name);

  constructor(
    private readonly userOrgService: UserOrgService,
    @Inject(forwardRef(() => SessionService))
    private readonly sessionService: SessionService,
  ) {}

  @Get(':organizationId/users')
  @HttpCode(HttpStatus.OK)
  async getUsersInOrganization(
    @Param('organizationId') organizationId: string,
  ) {
    const res = await this.userOrgService.getUsersInOrg({ organizationId });
    console.log('res:', res);
    return res;
  }

  @Patch('default-org')
  @HttpCode(HttpStatus.OK)
  async updateDefaultOrg(
    @Body('organizationId') organizationId: string,
    @CurrentUser() user: SessionUser,
  ) {
    const userId = user.userInfo.id;

    const res = await this.userOrgService.updateDefaultOrg({
      userId,
      organizationId,
    });

    const authUserId = user.userInfo.authUserId;
    await this.sessionService.updateCurrentOrg(
      authUserId,
      organizationId,
      true,
    );

    return res;
  }
}
