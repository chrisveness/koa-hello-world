/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* app.js; minimal 'hello world' app (using router & handlebars)                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const Koa    = require('koa');          // koa framework
const router = require('koa-router')(); // router middleware for koa
const hbs    = require('koa-hbs');      // handlebars templating
const co     = require('co');           // generator async control flow goodness

const app = new Koa();

app.use(hbs.middleware({
    extname:  '.html',
    viewPath: __dirname + '/',
}));
app.use(async function(ctx, next) { // for koa-hbs@0.9.0, convert ctx.render to return a promise
    const render = ctx.render;
    ctx.render = async function _convertedRender() {
        return co.call(ctx, render.apply(ctx, arguments))
    }
    await next();
});

router.get('/', async function(ctx, next) {
    const context = { version: process.version, time: new Date() };
    console.log('router.get /', context);
    await ctx.render('hello-world', context);
});

app.use(router.routes());

app.listen(3000);
console.log('listening on 3000');
