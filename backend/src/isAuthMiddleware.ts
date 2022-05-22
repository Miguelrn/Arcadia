import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    const auth = context.req.headers['authorization'];

    if(!auth) throw new Error('not authenticated');

    try {
        const token = auth?.split(' ')[1]; // bearer df6g54df
        const payload = verify(token, process.env.ACCESS_TOKEN!);
        context.payload = payload as any;
    }
    catch(e) {
        console.log(e);
        throw new Error('not authenticated');
    }
    return next();
}