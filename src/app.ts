import Koa from "koa"
const app = new Koa();

const util = require('util');
const json = require('koa-json');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const https = require('https');

// const Result = require('./Result');
const routers = require('./router');
import Result from "./Result";


app.use(bodyParser());
app.use(json());
app.use(logger());
//解决跨域
app.use(cors());

// app.use(async (ctx, next) => {
//     await next();
// console.log(ctx.response);
// ctx.body = new Result(0, 'ok');
// });


//
// //在koa中使用socket.io
// const IO = require('koa-socket');
// let io = new IO;
// io.attach(app);
//
// io.on('connection', (ctx, id) => {
//     // console.log(ctx);
//     // console.log(util.inspect(ctx, {depth: null}));
//     console.log('已建立连接', id);
// });
//
// io.on('disconnect', (ctx, data) => {
//     // console.log(ctx);
//     console.log('断开连接', data);
// });
//
// io.on('news', (ctx, data) => {
//     console.log('news:', data);
// });


//连接后触发事件之前执行
// io.use(async (ctx, next) => {
//     let start = new Date();
//     await next();
//     console.log(`response time: ${ new Date() - start }ms`)
// });

//原始的socket.io调用
// app._io.on('connection', (socket) => {
//     console.log('已建立连接');
//     // console.log(io.sockets);
//     socket.emit('news', {hello: 'world'});
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });

app.use(async (ctx: Koa.Context, next: Function) => {
    let start = new Date().getTime();
    await next();
    console.log(`response time: ${ new Date().getTime() - start }ms`);
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        const status = e.status || 500;
        const message = e.message || '服务器错误';
        ctx.response.status = status;

        ctx.body = new Result(status, message, e);

        app.emit('error', e, app);
    }
});

app.on('error', (err, ctx) => {
    console.error('service error', err, ctx);
});

app.use(routers.routes());

const port = 3000;
app.listen(port, () => {
    console.log(`Koa 服务正运行于 ${port} 端口`);
    console.info('http://localhost:3000/');
});


module.exports = app;
