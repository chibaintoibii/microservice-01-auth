import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: "localhost", port: 3001 }
    });
  }

  async validateUser(email: string): Promise<any> {
    return this.client.send({ cmd: "get_users" }, {}).toPromise().then(users => {
      return users.find(user => user.email === email);

    });
  }
}
