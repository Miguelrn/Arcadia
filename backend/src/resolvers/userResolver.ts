import { User } from '../entity/User';
import { Arg, Query, Resolver} from 'type-graphql';

@Resolver()
export class UserResolver {
  /**
   * 
   * @returns List of users
   */
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => [User], {nullable: true})
  async user(
    @Arg("userId", () => Number) userId: number,
  ): Promise<User | null> {
    return await User.findOne({ where: { id: userId } });
  }

  // @Mutation(() => Boolean)
  // async createUser(
  //   @Arg("id", () => Number) id: number,
  //   @Arg("identifier", () => String) identifier: string, // ie. email (In-service)
  //   @Arg("others", () => GraphQLJSONObject) others: JSON,
  // ): Promise<boolean> {
  //   const user = await User.findOne({where: {userId: identifier}});
  //   if(user) throw new Error('User already exits');

  //   const newUser = await User.create({id: id, userId: identifier, others: others});
  //   await newUser.save();

  //   return true;
  // }

  // @Mutation(() => Boolean)
  // async asignProject(
  //   @Arg("identifier", () => String) identifier: string,
  //   @Arg("projectName", () => String) projectName: string,
  // ): Promise<boolean> {
  //   const user = await User.findOne({where: {userId: identifier}});
  //   const project = await Project.findOne({where: {name: projectName}, relations: ['workers']});
  //   if(!user || !project) throw new Error('User or project does not exits');

  //   project.workers?.push(user);  
  //   await project.save();
  //   return true;
  // }

  // @Mutation(() => LoginResponse)
  // async login(
  //   @Arg("email", () => String) email: string,
  //   @Arg("password", () => String) password: string,
  //   // @Ctx() { res }: MyContext
  // ): Promise<LoginResponse> {
  //   // const user = await User.findOne({ where: { email: email } });
  //   // if (!user) throw new Error("Invalid login");

  //   // const valid = await compare(password, user.password);
  //   // if (!valid) throw new Error("Invalid login");

  //   // // success logged in
  //   // SendRefreshToken(res, createRefreshToken(user));

  //   // return {
  //   //   accessToken: createAccessToken(user),
  //   // };

  //   // llamar al endpoint de ftrs
  //   // si es valido, comprobar datos de user en nuestra bbdd
  //   // actualizar o añadir en caso de cambio de datos del user en nuestra bbdd
  //   // devolver el access token ??

  //   // curl -X 'POST' \
  //   // 'https://ftrs-frontend.dev.localhost/api/v1/users/login/token/' \
  //   // -H 'accept: application/json' \
  //   // -H 'Content-Type: application/x-www-form-urlencoded' \
  //   // -d 'grant_type=&username=admin%40ftrs.com&password=12341234&scope=&client_id=&client_secret='

  //   console.log(email, password)

  //   const httpsAgent = new https.Agent({
  //     rejectUnauthorized: false,
  //   });

  //   let validUser = false;
  //   const res = await fetch('https://ftrs-frontend.dev.localhost/api/v1/users/login/token/', {
  //     // const res = await fetch('https://random-data-api.com/api/omniauth/google_post', {
  //     method: 'POST',
  //     agent: httpsAgent,
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     body: `username=${email}&password=${password}`,
  //   })
  //   .then(res => {
  //       validUser = res.ok;
  //       return res.json();
  //   })
  //   .catch(e => console.log(e))

  //   if(validUser)
  //     return {accessToken: res.access_token}
  //   else
  //     return {accessToken: ''}
  // }

  // @Mutation(() => Boolean)
  // async register(
  //   @Arg("email", () => String) email: string,
  //   @Arg("password", () => String) password: string
  // ) {
  //   try {
  //     const hashPassword = await hash(password, 12);
  //     await User.insert({
  //       email: email,
  //       password: hashPassword,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }

  //   return true;
  // }

  // @Mutation(() => Boolean)
  // async revokeRefreshTokenForUser(@Arg("userId", () => Int) userId: number) {
  //   await getConnection()
  //     .getRepository(User)
  //     .increment({ id: userId }, "tokenVersion", 1);
    
  //     return true;
  // }

  // @Query(() => String)
  // hello() {
  //   return "Hi!";
  // }

  // @Query(() => String)
  // @UseMiddleware(isAuth)
  // bye(
  //   @Ctx() { payload } : MyContext
  // ) {
  //   return "Bye " + payload!.userId;
  // }

  
}