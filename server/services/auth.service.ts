import { DataSource } from "typeorm";
import { DatabaseConnection } from "../repository";
import crypto from "crypto";
import { IUsers } from "../interface/interface";
import { User } from "../entity";

class AuthRepository {
  private static instance: AuthRepository;
  private db: DataSource;

  constructor() {
    this.initializeDB();
  }
  async initializeDB() {
    this.db = await DatabaseConnection.getDB();
  }

  hash(password: string) {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  getUserByEmail(email: string) {
    return this.db
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  }

  auth = async (
    token: string,
    done: (err: Error | null, user?: IUsers | boolean) => void
  ) => {
    if (!token) {
      return done(new Error("Token not provided"));
    }
    try {
      const unHashedToken = Buffer.from(token, "base64").toString("utf-8");
      let [email, password] = unHashedToken.split(":");
      password = this.hash(password);
      let err: Error | null = null;
		
      const user = await this.db
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .getOne();

      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password !== password) {
        return done(null, false);
      }
      console.log(user);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };

  async comparePasswords(password: string, hashedPassword: string) {
    return this.hash(password) === hashedPassword;
  }

  async generateToken(email: string, password: string) {
    const salt = process.env.SALT || "12345";
    const unHashedToken = `${email}:${password}:${salt}`;
    const hash = Buffer.from(unHashedToken).toString("base64");
    return hash;
  }

  static getInstance() {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository();
    }
    return AuthRepository.instance;
  }
}
export default AuthRepository.getInstance();
