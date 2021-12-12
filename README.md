# Learning GraphQL on the backend side

## With
- Node.js
- TypeScript
- Helix
- Prisma

## Tutorial
Following the [howtographql](https://www.howtographql.com/) tutorial

## Installation instructions
- `npm install`
- `npx prisma migrate dev`
- `npm run dev` / `npm run start`

## Usage
Simply make some graphQL query / mutations / subscriptions to `http://localhost:3000/graphql`

## API
Here are some examples
### Signup
```graphql
mutation {
  signup(email: "johndoe@mail.com", password: "azerty", name: "John Doe") {
    token
    user {
      id
      name
      email
    }
  }
}
```
### Login
```graphql
mutation {
  login(email: "johndoe@mail.com", password: "azerty") {
    token
    user {
      id
      name
      email
    }
  }
}
```
### Me
```graphql
# Headers
Content-Type: application/json
Authorization: Bearer token # where token comes from login mutation

query {
  me {
    id
    name
    links {
      id
      description
      url
    }
  }
}
```
### Feed
```graphql
query {
  feed(filter: "QL", take: 2, skip: 2, orderBy: { createdAt: desc }) {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
    }
  }
}
```
### Create Link
```graphql
# Headers
Content-Type: application/json
Authorization: Bearer token # where token comes from login mutation

mutation {
  post(url: "www.google.com", description: "Why not!") {
    id
  }
}
```
### Create Vote
```graphql
# Headers
Content-Type: application/json
Authorization: Bearer token # where token comes from login mutation

mutation {
  vote(linkId: "3") {
    user {
      name
      email
    }
    link {
      url
      description
    }
  }
}
```
### Subscribe to Vote
```graphql
subscription {
  newVote {
    id
    link {
      url
      description
    }
    user {
      name
      email
    }
  }
}
```
