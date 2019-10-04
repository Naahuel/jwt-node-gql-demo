import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from 'type-graphql';
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from './entity/User';
import { MyContext } from './MyContext';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    // Worked
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() {res}: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({where: {email}});

    if( !user ){
      throw new Error ("Invalid email")
    }

    const valid = await compare(password, user.password);

    if( !valid ){
      throw new Error ("Invalid password")
    }

    // Refresh token
    res.cookie(
      'jid',
      sign({userId: user.id}, "xyz456", {expiresIn: '7d'}),
      {
        httpOnly: true
      }
    )

    // Worked
    return {
      accessToken: sign({userId: user.id}, "asd123", {expiresIn: '15m'})
    };
  }
}