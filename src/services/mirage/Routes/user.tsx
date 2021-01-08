import { Response,Request } from 'miragejs';
import { handleErrors } from '../Server';
import { User } from '../../../interfaces/User.interface';
import { randomBytes } from 'crypto';

const generateToken = () => randomBytes(8).toString('hex');

export interface AuthResponse{
    token: string;
    user: User;
}
const login = (schema: any, req: Request): AuthResponse | Response => {
  const { username,password } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({username});
  if(!user){
      return handleErrors(null, 'No user with that username exists');
  }
  if(password !== user.password){
     return handleErrors(null, "Password is incorrect");
  }
}