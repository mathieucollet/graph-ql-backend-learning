import {makeExecutableSchema} from "@graphql-tools/schema"
import typeDefs from "./schema.graphql"
import {Link} from "./@types/Link";

const links: Link[] = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'www.u.nified.com',
    description: 'The best webstire ever'
  }
]

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
  },
  Mutation: {
    post: (parent: unknown, args: {url: string, description: string}) => {
      const id = links.length
      const link: Link = {
        id: `link-${id}`,
        url: args.url,
        description: args.description,
      }

      links.push(link)

      return link
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
