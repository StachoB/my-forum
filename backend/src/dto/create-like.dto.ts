import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsMongoId()
  post: string;
}
