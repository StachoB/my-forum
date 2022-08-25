import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;
}
