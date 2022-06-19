import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class InstituitionCreateInput {
    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty.' })
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Address cannot be empty.' })
    address: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'City cannot be empty.' })
    city: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'State cannot be empty.' })
    state: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Keeper cannot be empty.' })
    keeper: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'MEC Credibility cannot be empty.' })
    mecCredibility: string;

    @Field()
    @IsBoolean()
    @IsNotEmpty({ message: 'Is Partner Institution cannot be empty.' })
    isPartner: boolean;
}
