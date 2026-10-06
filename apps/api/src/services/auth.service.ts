import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories';
import { config } from '../config';
import { UserRole, JWTPayload, AuthTokens } from '@gharstay/shared';
import { AppError } from '../utils/app-error';

const JWT_EXPIRES_IN = '7d' as const;

export const authService = {
  async register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
  }): Promise<{ user: Omit<typeof userRepository.findById, 'passwordHash'>; tokens: AuthTokens }> {
    const existingEmail = await userRepository.findByEmail(data.email);
    if (existingEmail) {
      throw new AppError('Email already registered', 409);
    }

    const existingPhone = await userRepository.findByPhone(data.phone);
    if (existingPhone) {
      throw new AppError('Phone number already registered', 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash,
      role: data.role,
    });

    const tokens = this.generateTokens(user.id, user.email, user.role as UserRole);

    const { passwordHash: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, tokens };
  },

  async login(email: string, password: string): Promise<{ user: Omit<typeof userRepository.findById, 'passwordHash'>; tokens: AuthTokens }> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const tokens = this.generateTokens(user.id, user.email, user.role as UserRole);

    const { passwordHash: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, tokens };
  },

  generateTokens(userId: string, email: string, role: UserRole): AuthTokens {
    const payload: JWTPayload = { userId, email, role };
    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return { accessToken };
  },

  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, config.jwtSecret) as JWTPayload;
    } catch {
      throw new AppError('Invalid or expired token', 401);
    }
  },

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};