/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* app.js; minimal 'hello world' app (using router & handlebars)                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const koa    = require('koa');          // koa framework
const router = require('koa-router')(); // router middleware for koa
const hbs    = require('koa-hbs');      // handlebars templating

const app = koa();

app.use(hbs.middleware({
    extname:  '.html',
    viewPath: __dirname + '/',
}));

router.get('/', function*(next) {
    const context = { version: process.version, time: new Date() };
    console.log('router.get /', context);
    yield this.render('hello-world', context);
});

app.use(router.routes());

app.listen(3000);
console.log('listening on 3000');
