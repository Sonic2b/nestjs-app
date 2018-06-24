import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, ValidateIf } from 'class-validator';
export class CreateUserDto {
  @ApiModelProperty({ required: false })
  @IsString()
  @IsOptional()
  @ValidateIf(o => !o.phone || !o.email)
  readonly phone: string;

  @ApiModelProperty({ required: false })
  @IsString()
  @IsOptional()
  @ValidateIf(o => !o.phone || !o.email)
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;
}
