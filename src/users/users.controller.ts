import { UsersService } from './users.service';
import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Put,
    Delete
} from '@nestjs/common';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    createUser(
        @Body('name') name: string,
        @Body('age') age: number,
        @Body('surname') surname: string,
        @Body('email') email: string
    ): any {
        const genId = this.usersService.createUser(name, age, surname, email);
        return {
            id: genId
        };
    }

    @Get()
    getUsers(): any {
        return this.usersService.getUsers();
    }

    @Get(':userId')
    getUser(@Param('userId') userId: string) {
        return this.usersService.getUser(userId);
    }

    @Put(':userId')
    updateUser(
        @Param('userId') userId: string,
        @Body('name') name: string,
        @Body('age') age: number,
        @Body('surname') surname: string,
        @Body('email') email: string
    ) {
        this.usersService.updateUser(userId, name, age, surname, email);
        return null;
    }

    @Delete(':userId')
    deleteUser(@Param('userId') userId: string) {
        this.usersService.deleteUser(userId);
        return null;
    }
}
