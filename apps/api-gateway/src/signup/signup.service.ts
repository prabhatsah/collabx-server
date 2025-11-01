import { Injectable, Logger } from '@nestjs/common';
import { SignupDto } from './dto/sign.dto';
import { UserOrgService } from '../user-org/user-org.service';
import { ApiResponseDto } from '@app/common/dto/response.dto';

@Injectable()
export class SignupService {
  private readonly logger = new Logger(SignupService.name);

  constructor(private readonly userOrgService: UserOrgService) {}

  async signup(dto: SignupDto) {
    try {
      this.logger.log('Signup workflow initiated');

      //Create user + org in UserOrg service
      const argUserOrg: SignupDto = {
        organizationName: dto.organizationName,
        fullName: dto.fullName,
        email: dto.email,
        password: dto.password,
      };
      const userOrgRes = await this.userOrgService.createUserAndOrg(argUserOrg);

      if (!userOrgRes.success) {
        this.logger.error(
          `Error occured while creating user and organization: ${userOrgRes.message}`,
        );
        return {
          success: userOrgRes.success,
          message: userOrgRes.message,
        };
      }

      return ApiResponseDto.success(
        {
          userId: userOrgRes.data?.userId,
          organizationId: userOrgRes.data?.organizationId,
          membershipId: userOrgRes.data?.membershipId,
        },
        'Signup completed.',
      );
    } catch (error) {
      this.logger.error('Signup flow failed, starting rollback...', error);

      throw error;
    }
  }
}
