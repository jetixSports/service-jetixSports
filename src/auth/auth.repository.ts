import {
  Injectable,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ComparePasswordDto } from "./dto/ComparePassword.dto";
import { ValidateTokenDto } from "./dto/ValidateToken.dto";

@Injectable()
export class AuthRepository {
  constructor(private readonly jwtService: JwtService) {}

  async comparePasswords({ password, passwordCompare }: ComparePasswordDto) {
    const isPasswordValid = await bcrypt.compare(password,passwordCompare );
    return isPasswordValid;
  }

  async validateSessionToken({ token, _id, email }:ValidateTokenDto) {
    if (!token) return false;
    try{
      const verifyToken = await this.jwtService.verify(token);
      if (!verifyToken) return false;
    }catch(error){
      console.log(error);
      return false
    }
    const tokenData = await this.jwtService.decode(token);
    return tokenData?._id == _id && tokenData?.email == email;
  }


  async generateToken(tokenData: { [key: string]: string | number | unknown }) {
    return await this.jwtService.signAsync(tokenData);
  }
  async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
