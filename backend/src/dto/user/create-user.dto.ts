import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Flen',
    description: 'Prénom utilisateur',
  })
  readonly firstname: string;
  @ApiProperty({
    example: 'Ben Flen',
    description: "Nom d'utilisateur",
  })
  readonly lastname: string;
  @ApiProperty({
    example: 'flen.ben.flen@gmail.com',
    description: 'Email utilisateur',
  })
  readonly mail: string;
  @ApiProperty()
  readonly password: string;
}
