# Github GraphQL API Navigation

This project is an example of how to fetch repositories on Github using the GraphQL API with React. The project also provides an example of how to create a simple pagination feature using github cursors.

## Constraints

To run this project locally you need to create your own `.env` file and pass the following environment variables:

```env
VITE_GITHUB_ACCESS_TOKEN=<YOUR PERSONAL GITHUB ACCESS TOKEN>
VITE_GRAPHQL_ENDPOINT=https://api.github.com/graphql
```

## Running

```bash
npm install && npm run dev
```

