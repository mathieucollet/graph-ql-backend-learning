import { makeExecutableSchema } from "@graphql-tools/schema"
import { GraphQLContext } from "./context";
import typeDefs from "./schema.graphql"
import { Link } from "@prisma/client";

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: async (parent: unknown, args: {}, context: GraphQLContext) => {
      return context.prisma.link.findMany()
    },
  },
  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url,
  },
  Mutation: {
    post: async (
      parent: unknown,
      args: {url: string, description: string},
      context: GraphQLContext,
    ) => {
      return context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      })
    }
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
