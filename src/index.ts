import 'graphql-import-node'
import fastify from "fastify";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  Request,
  sendResult,
  shouldRenderGraphiQL
} from "graphql-helix"
import {schema} from "./schema";

const main = async () => {
  const server = fastify()

  server.route({
    method: ["POST", "GET"],
    url: "/graphql",
    handler: async (req, reply) => {
      const request: Request = {
        headers: req.headers,
        method: req.method,
        query: req.query,
        body: req.body,
      }

      if (shouldRenderGraphiQL(request)) {
        reply.header("Content-Type", "text/html")
        reply.send(
          renderGraphiQL({
            endpoint: "/graphql"
          })
        )

        return
      }

      const { operationName, query, variables } = getGraphQLParameters(request)

      const result = await processRequest( {
        request,
        schema,
        operationName,
        query,
        variables,
      })

      await sendResult(result, reply.raw)
    }
  })

  server.listen(3000, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:3000/graphql`)
  })
}

main()
