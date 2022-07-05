import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

@InputType()
export class UserUpdatePasswordInput {
    @Field()
    @IsOptional()
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
}
