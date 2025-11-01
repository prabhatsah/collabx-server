import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { Roles } from '../common/decorators/roles.decorator';
import { OrgRoleGuard } from '../common/guards/org-role.guard';
import {
  AcceptInvitationRequestDto,
  InviteUserRequestDto,
  InviteUserServiceDto,
} from './dto/invitation.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type SessionUser } from '@app/common/interfaces';
import { ApiResponseDto } from '@app/common/dto/response.dto';

@Controller('/api/v1')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post('/invitation')
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN')
  @UseGuards(OrgRoleGuard)
  async inviteUser(
    @Body() dto: InviteUserRequestDto,
    @CurrentUser() user: SessionUser,
  ) {
    const req: InviteUserServiceDto = {
      ...dto,
      invitedById: user.userInfo.id,
      organizationId: user.currentOrg?.id || '',
      organizationName: user.currentOrg?.name || '',
    };

    const res = await this.invitationService.inviteUser(req);
    return ApiResponseDto.success(res, 'Invitation sent successfully');
  }

  @Post('accept-invitation')
  @HttpCode(HttpStatus.OK)
  async acceptInvitation(@Body() dto: AcceptInvitationRequestDto) {
    const res = await this.invitationService.acceptInvitation(dto);
    return ApiResponseDto.success(res, 'Invitation accepted');
  }
}
