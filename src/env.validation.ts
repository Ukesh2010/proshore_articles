import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Matches, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;
  @IsString()
  @Matches(/^(postgres|postgresql):\/\//, {
    message: 'DATABASE_URL must start with "postgresql://"',
  })
  DATABASE_URL: string;
  @IsString()
  ACCESS_TOKEN_SECRET: string;
  @IsString()
  ACCESS_TOKEN_EXPIRES: string;
}

export interface IEnvironmentVariables {
  PORT: number;
  DATABASE_URL: string;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRES: string;
}

export function validate(
  config: Record<string, unknown>,
): IEnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  const { PORT, DATABASE_URL, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES } =
    validatedConfig;

  return {
    PORT,
    DATABASE_URL,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES,
  };
}
