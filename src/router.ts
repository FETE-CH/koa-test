import Koa from "koa";
import Router from "koa-router";
import Result from "./Result";


const router = new Router();


router
    .get('/', async (ctx: Koa.Context, next: Function) => {
        ctx.body = new Result(0, '首页~~~');
    })
    .post('/login', async (ctx: Koa.Context, next: Function) => {
        ctx.body = 'hello';
        console.log(ctx);
    })
    .post('/signup', (ctx: Koa.Context) => {
        ctx.body = 'hello';
    });


module.exports = router;
