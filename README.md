## Js-Quiz

### A website for learning Javascript

[**Demo**](https://js-quiz.me).

## I built this app in a monorepo, so both my server and client are in this same repo.

I actually really enjoyed this approach. In my experience it makes it quite a bit more complicated if you are dealing with many repositories.

## Tech stack:

-  Typescript

### server specific

-  Graphql api made with Apollo-Server
-  MongoDb database
-  Typogoose helping the integration between mongo, graphql and typescript
-  Redis for caching handling cookies and password resets

### client specific

-  Next.js
-  Urql for querying my Graphql api
-  Graphql codegen for helping with typescript
-  ace-builds for the code editor I used

In conclusion this tech stack worked well and I have to mention that client-side queries with Urql and the hooks that codegen generates is awesome!

### todo

-  when user submits false answer the server should return that and not display the placeholder
-  problem **_loops_** has some problems
