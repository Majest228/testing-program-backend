import { IsEmail, MinLength, } from "class-validator";

export class AuthDto {

    login: string

    @MinLength(4)
    password: string

    name: string

    surname: string

}