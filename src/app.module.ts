import 'reflect-metadata'
import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CourseModule } from './course/course.module';
import { DiplomaModule } from './diploma/diploma.module';
import { InstituitionModule } from './instituition/instituition.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    AuthModule,
    UserModule,
    RoleModule,
    CourseModule,
    DiplomaModule,
    InstituitionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {};
