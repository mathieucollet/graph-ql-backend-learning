import {PrismaClient, User} from "@prisma/client";
import {authenticateUser} from "./auth";
import {FastifyRequest} from "fastify";
import { pubSub } from "./pubsub";

const prisma = new PrismaClient()

export type GraphQLContext = {
  prisma: PrismaClient,
  currentUser: User | null,
  pubSub: typeof pubSub,
}

export const contextFactory = async (request: FastifyRequest): Promise<GraphQLContext> => ({
  prisma,
  currentUser: await authenticateUser(prisma, request),
  pubSub,
})
