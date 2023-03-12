# Sample Full Stack App for managing users. This app is built using following stacks:

1. NodeJS Backend with Fastify
2. Angular Frontend with Angular Material + Tailwind
3. MySQL Database
4. Redis Cache

To run using docker:
`docker compose up`

Additional unit tests
- UserValidator.test.ts in Backend using Jest
- full-name.pipe.ts in Frontend using Jasmine + Karma

To run unit tests:
- Go to appropriate folder (backend/fronted)
- Run `yarn test`