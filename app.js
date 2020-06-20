/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* app.js; minimal 'hello world' app (using router & handlebars)                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

import Koa        from 'koa';            // koa framework
import Router     from 'koa-router';     // router middleware for koa
import handlebars from 'koa-handlebars'; // handlebars templating

const app = new Koa();

const router = new Router();

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
