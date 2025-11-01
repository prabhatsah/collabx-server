import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InviteUserRequestDto {
  @ApiProperty({
    example: 'Invitee Email',
    description: 'Invitee Email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'User role', description: 'User role' })
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class InviteUserServiceDto {
  @ApiProperty({ example: 'Organization Id', description: 'Organization Id' })
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({
    example: 'Invited by user Id',
    description: 'Invited by user Id',
  })
  @IsString()
  @IsNotEmpty()
  invitedById: string;

  @ApiProperty({
    example: 'Invitee Email',
    description: 'Invitee Email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'User role', description: 'User role' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: 'Acme Inc.', description: 'Organization Name' })
  @IsString()
  @IsNotEmpty()
  organizationName: string;
}

export class AcceptInvitationRequestDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
