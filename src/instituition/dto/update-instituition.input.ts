import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class InstituitionUpdateInput {
    @Field()
    @IsNumber()
    @IsNotEmpty({ message: 'ID cannot be empty.' })
        id: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty.' })
        name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Address cannot be empty.' })
        address?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'City cannot be empty.' })
        city?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'State cannot be empty.' })
        state?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Keeper cannot be empty.' })
        keeper?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'MEC Credibility cannot be empty.' })
        mecCredibility?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    @IsNotEmpty({ message: 'Is Partner Institution cannot be empty.' })
        isPartner?: boolean;
}
