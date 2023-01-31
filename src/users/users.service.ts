import { User } from './users.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

    private users: User[] = [];

    getUsers() {
        return [...this.users];
    }

    createUser(name: string, age: number, surname: string, email: string) {
        const id = uuidv4();
        const newUser = new User(id, name, age, surname, email);
        this.users.push(newUser);
        return id;
    }

    getUser(userId: string) {
        const [user] = this.findUser(userId);
        return {...user};
    }

    updateUser(
        userId: string,
        name: string,
        age: number,
        surname: string,
        email: string
    ) {
        const [user, index] = this.findUser(userId);
        this.users[index] = {...user, name, age, surname, email};
    }

    deleteUser(userId: string) {
        const index = this.findUser(userId)[1];
        this.users.splice(index, 1);
    }

    private findUser(userId: string): [User, number] | never {
        const index = this.users.findIndex((u) => u.id === userId);
        const user = this.users[index];
        if (!user) {
            throw new NotFoundException(`Could not find user with id: ${userId}` );
        }
        return [user, index];
    }
}
