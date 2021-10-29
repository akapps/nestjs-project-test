import { Injectable } from '@nestjs/common';

export type User = {
  readonly id: string;
  readonly email: string;
  password: string; // in real-world application, a salted hash instead (!)
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 'j2d4',
      email: 'john.doe@acme.com',
      password: 'changeme',
    },
    {
      id: 'a2b8',
      email: 'alice@acme.com',
      password: 'guess',
    },
  ];

  /**
   * Retrieves a user given its email, or returns `undefined` if none match in our "database"
   */
  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
