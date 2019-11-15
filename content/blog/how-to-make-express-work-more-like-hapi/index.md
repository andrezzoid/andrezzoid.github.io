---
title: How to make Express work more like hapi
date: "2016-07-19"
---

Like most people doing Node.js, I started building servers and APIs with Express. It feels minimal, fast and requires very little effort to start building. But then it starts requiring a lot of effort building features around it instead of building the actual business logic. That’s why I’ve since moved to hapi.

As the [hapi website](https://hapi.dev/) states:

> hapi enables developers to focus on writing reusable application logic instead of spending time building infrastructure.

What this means is that hapi was built around the idea of configuration over code, with the right set of built-in functionality (cookies, cache, authentication, input validation, etc.) that can be configured and a powerful plugin system that allows you to very easily break your application up into isolated pieces of code.

Nowadays I use hapi to build web APIs but sometimes clients have already spent a lot of time and money in Express apps and the migration costs, for both people and time, may not seem like it’s worth the effort, so what I end up doing is trying to adapt some of the already built-in functionality I love from hapi into express.

In this article I’m going to show some of the easiest packages/techniques I’ve used to make Express work more like hapi. I assume you have a working knowledge of both frameworks.

***

Consider the given hapi plugin registration and route definitions:

```js
server.register(require('hapi-auth-basic'), (err) => {
  server.auth.strategy('simple', 'basic', { 
    validateFunc: validate 
  });
  server.route({
    method: 'GET',
    path: '/hello',
    config: {
      auth: 'simple',
      handler: function (request, reply) {
        reply('hello, ' + request.auth.credentials.name);
      }
    }
  });
});server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler: function (request, reply) {
    reply('Hello ' + request.params.name + '!');
  },
  config: {
    validate: {
      params: {
        name: Joi.string().min(3).max(10)
      }
    }
  }
});
```

Here we are registering an authentication plugin plus two routes, one that uses the registered authentication and another that does not need authentication. This is a very basic example but it’ll lay the foundation for the remainder of the article.


## Plugins

hapi’s powerful plugin system is one of it’s greatest strengths. It allows you to very easily break your application up into isolated pieces of business logic, and reusable utilities. Plugins can add routes, authentication strategies, register extension functions, among others.

Although most plugin-like functionality in Express can be added via middlewares, it can get messy pretty quickly. We can easily break an existing Express solution into several pieces by having files exporting a function that gets an Express app as the first parameter.

```js
// middleware.js
module.exports = (app) => {
  app.use(cors()); // Support for Cross-Origin Resource Sharing
  app.use(bodyParser.json()); // Support for Parsing JSON payload
  app.use(compression()); // Compress responses
};
```

Now you can just import it in your application main file:

```js
// index.js
const app = express();
require('./middleware')(app);
require('./database')(app);
require('./routes')(app);
```

This leads to cleaner and more modular code where everyone can collaborate. If you’re ever built anything with Express, you’ve probably done this already but I had to get it out there.

**Edit:** [Lenny Martin](https://medium.com/@lennym) has commented on a better approach by having each module exports an Express Router where you can mount middlewares or routes, which allows nesting of middlewares and routes, module reusability and composability. We can use it like this:

```js
// middlewares.js
const router = require('express').Router();router.use(cors());
router.use(bodyParser.json());
router.use(compression());module.exports = router;
```

And import it like:

```js
// index.js
const app = express();  
app.use(require('./middlewares'));
app.use(require('./routes'));
```

Take a look at [his response](https://medium.com/@lennym/when-nesting-middlewares-like-you-mention-in-the-plugins-section-i-tend-to-prefer-an-approach-of-eefe8a66c802) and [example gist](https://gist.github.com/lennym/4b91c07f2a0fb25dd29bc65408ab8669).

### Caveats

The hapi plugin system offer other functionality harder to replicate on Express like error handling and managing dependencies between plugins.


## Validation

hapi has great built-in validation with Joi for payload, path parameters and query strings. You can specify it in the route configuration, as seen in the first example in the config.validate object. If for some reason validation fails, the request won’t reach the route handler, so we can be pretty sure that when it does we can trust whatever data we read from it, which makes the handler code much smaller and precise.

This second topic is actually very easy to achieve in Express with the following package:

```bash
npm i --save express-joi-validator
```

You now have route validations as a middleware:

```js
const validate = require('express-joi-validator');router.get('/hello/:name',
  validate({
    params: {
      name: Joi.string().min(3).max(10)
    }
  }),
  (req, res) => {
    res.send('Hello ' + req.params.name + '!');
  });
```

Pretty neat, right?! You can even pass a Joi options object as the second parameter for the validate function. If validation fails, the client gets a 400 status code and the request does not reach the route handler, which is very similar to how hapi works.

### Caveats

Nothing to add here, which is great!


## Authentication

Authentication within hapi is based on the concept of schemes and strategies. A scheme is a general type of authentication, like “basic”. A strategy is a pre-configured named instance of a scheme. In the initial example we’re using the basic authentication scheme and we’re registering a “simple” strategy. What it does exactly is not relevant here.

For Express we can use Passport, which is probably the best authentication middleware available. It can be integrated with a plethora of strategies so we just have to install the right package. For basic authentication, let’s do the following:

```bash
npm i --save passport passport-http
```

Then in the code:

```js
const passport = require('passport');
const BasicStrategy = require('passport-http');passport.use(new BasicStrategy((username, password, done) => {
  // Some Basic authentication...
}));
```

Now the same route definition in Express would be something like:

```js
app.get('/hello', 
  passport.authenticate('basic', { session: false }), 
  (req, res) => { 
    res.send('hello, ' + request.user.name);
  });
```

You can even have multiple pre-configured named strategies for the same scheme like you can have with hapi by using passport named strategies like this:

```js
passport.use('my-basic-authz', new BasicStrategy(...));
```

### Caveats

What’s cool about hapi’s authentication strategies is that you can set a default authentication for all routes and then change or remove strategies for a specific route in it’s own configuration (i.e. configure all routes to use basic authentication, configure /login route to use no authentication). This is, to my knowledge, impossible to do with Express since you either register a middleware to authenticate all routes, or register the authentication middleware for each route where required. A somewhat simple way to get around it is to have a list of all routes that don’t require authentication and encapsulate the authentication middleware like this:

```js
const auth = function (opts) {
  return (req, res, next) => {
    if (opts.ignore.indexOf(req.path) !== -1) {
      // It belongs to the ignore list, move next.
      return next();
    }    // Requires authentication, execute passport middleware.
    const middleware = passport.authenticate('basic', { session: false });
    middleware(req, res, next);
  };
};
 
app.use(auth({ ignore: ['/login'] }));
```

## Testing

Testing endpoints with hapi is a breeze with the server.inject function (although it can be used for other tasks as well), whether I’m using Mocha, Lab or any other testing framework. This is probably the thing I miss the most when working with other frameworks:

```js
const opts = {
  method: 'GET',
  url: '/hello',
  credentials: {
    name: 'André Jonas'
  }  
}
server.inject(opts, (res) => {
  console.log(res.result);
  // Your assertions here...
});
```

those of you who are not familiar with the example above, we’re injecting a request (I say inject because Hapi is faking an incoming HTTP request and injecting it into the request pipeline) to the `/hello` endpoint while also mocking the credentials object available in `req.auth.credentials`. This allows us to test the endpoint without having to setup the database with users, log in the user, make the request with the authenticated user and all that jazz.

The closest I got to this with Express was with supertest, an http assertions library. Let’s install it with:

```bash
npm i --save-dev supertest
```

Now we can do a similar request like:

```js
const app = require('./app.js');
const request = require('supertest');request(app)
  .get('/hello')
  .set('Authorization', 'Basic [YOUR CREDENTIALS HERE]')
  .expect(200)
  .end((err, res) => {
    console.log(res.result);
    // Your assertions here...
  });
```

Supertest can also do a nice thing for you, it can bound your server to an ephemeral port for you so you don’t need to keep track of ports.

### Caveats

As you can see, we have to setup a valid authorization header that’ll go through the entire authentication flow. Although it’s nice to test this functionality, it can be very cumbersome to be forced to always set this up.


## Conclusions

Both Express and hapi meet the same goal — building web APIs — but they try to accomplish it in different ways. As a matter of fact, hapi was originally built on top of express as Eran Hammer states in his blog back in 2012.

If you're working on some express project and cannot make the jump to hapi, I really hope you can benefit from these easy tips. Use and abuse them! Depending on your reaction I might write a part II covering session management, security headers, cookie encryption and other cool hapi features we can adapt to Express.

Do you know a better way of doing any of these things in Express? Please, let me know! Happy coding!

Thanks [José Nogueira](https://medium.com/@thatportugueseguy) and [Pedro Teixeira](https://medium.com/@pgte) for reviewing.