import { User } from '../entity/User';
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware} from 'type-graphql';
import { compare, hash } from 'bcrypt';
import { MyContext } from '../MyContext';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../auth';
import { isAuth } from '../isAuthMiddleware';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  /**
   * 
   * @returns List of users
   */
  @Query(() => [User])
  @UseMiddleware(isAuth)
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => [User], {nullable: true})
  @UseMiddleware(isAuth)
  async user(
    @Arg("userId", () => Number) userId: number,
  ): Promise<User | null> {
    return await User.findOne({ where: { id: userId } });
  }

  @Mutation(() => User)
  async createUser(
    @Arg("usercode", () => String) usercode: string, 
    @Arg("name", () => String) name: string,
    @Arg("password", () => String) password: string,
  ): Promise<User> {
    const user = await User.findOne({where: {usercode: usercode}});
    if(user) throw new Error('User already exits!');

    const hashedPassword = await hash(password, 12);

    const newUser = await User.create({usercode, name, password: hashedPassword});
    await newUser.save();

    return newUser;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("usercode", () => String) usercode: string,
    @Arg("password", () => String) password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { usercode: usercode } });
    if (!user) throw new Error("Invalid login");

    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Invalid username/Password");

    sendRefreshToken(res, createRefreshToken(user));

    return { // sign({userId: user.id})
      accessToken: createAccessToken(user),
    };    
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("usercode", () => String) usercode: string,
    @Arg("password", () => String) password: string
  ) {
    try {
      const hashPassword = await hash(password, 12);
      
      await User.insert({
        usercode: usercode,
        password: hashPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

}
