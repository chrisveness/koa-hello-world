/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* app.js; minimal 'hello world' app (using router & handlebars)                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const Koa        = require('koa');            // koa framework
const router     = require('koa-router')();   // router middleware for koa
const handlebars = require('koa-handlebars'); // handlebars templating

const app = new Koa();

app.use(handlebars({
    extension: [ 'html' ],
    viewsDir:  '.'
}));

router.get('/', async function(ctx, next) {
    const context = { version: process.version, time: new Date() };
    console.log('router.get /', context);
    await ctx.render('hello-world', context);
});

app.use(router.routes());

app.listen(3000);
console.log('listening on 3000');
