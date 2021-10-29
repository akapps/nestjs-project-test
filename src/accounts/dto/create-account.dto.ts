import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OptInStruct {
  @IsBoolean()
  news_offers: boolean;

  @IsBoolean()
  device_info_upload: boolean;

  @IsBoolean()
  analytics: boolean;
}

export class CreateAccountDto {
  /**
   * @example foo@bar.com
   */
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'google' })
  @IsString()
  auth_provider: string;

  @IsEmail()
  auth_provider_email: string;

  @IsOptional()
  @IsMongoId()
  organization_id?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  lang?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  notes?: string;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  company?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => OptInStruct)
  opt_in?: OptInStruct;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roles: string[];
}
