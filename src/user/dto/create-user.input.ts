import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

@InputType()
export class UserCreateInput {
    @Field()
    @IsEmail()
    @IsNotEmpty({ message: 'Email cannot be empty.' })
        email: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty.' })
        name: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'CPF cannot be empty.' })
        cpf: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Phone number cannot be empty.' })
        phone: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'Password cannot be empty.' })
    @Matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&:;<>?_\-=+])[0-9a-zA-Z*.!@$%&:;<>?_\-=+]{8,20}$/,
        {
            message:
                'A senha deve ter entre 8 e 20 caracteres, ' +
                'deve conter, pelo menos, ' +
                'uma letra minúscula, uma letra maiúscula, ' +
                'um número e um caracter especial.',
        },
    )
        password: string;

    @Field()
    @IsNumber()
    @IsNotEmpty({ message: 'User role id cannot be empty.' })
        roleId: number;

    @Field()
    @IsNumber()
    @IsNotEmpty({ message: 'User instituition id cannot be empty.' })
        instituitionId: number;
}
