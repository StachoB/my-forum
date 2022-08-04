import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsMongoId()
    user: string;

    @IsNotEmpty()
    @IsMongoId()
    post: string;
}