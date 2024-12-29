import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { CustomJwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(private readonly customJwtService: CustomJwtService) {}
  async login({ username }: LoginDto) {
    const accessToken = await this.customJwtService.generateAccessJwtToken({
      username,
    });

    return { accessToken };
  }
}
