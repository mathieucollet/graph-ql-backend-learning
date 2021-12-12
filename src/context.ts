import {PrismaClient, User} from "@prisma/client";
import {authenticateUser} from "./auth";
import {FastifyRequest} from "fastify";

const prisma = new PrismaClient()

export type GraphQLContext = {
  prisma: PrismaClient,
  currentUser: User | null,
}

export const contextFactory = async (request: FastifyRequest): Promise<GraphQLContext> => ({
  prisma,
  currentUser: await authenticateUser(prisma, request)
})
