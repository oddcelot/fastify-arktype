import { type } from "arktype";
import { userSchema } from "../schema/user.schema";

export const usersQuerySchema = type({
  "limit?": "number>1",
  "offset?": "number>0",
});

export default async function userRoutes(fastify) {
  fastify.post("/users", {
    schema: {
      body: userSchema,
    },
    handler: async (request, reply) => {
      const user = request.body;
      return {
        success: true,
        message: "User created successfully",
        data: user,
      };
    },
  });

  fastify.get("/users", {
    schema: {
      querystring: usersQuerySchema,
    },
    handler: async (request, reply) => {
      const { limit = 10, offset = 0 } = request.query;
      return {
        success: true,
        data: {
          limit,
          offset,
          users: [
            { name: "John Doe", email: "john@example.com", age: 30 },
            { name: "Jane Smith", email: "jane@example.com", age: 25 },
          ],
        },
      };
    },
  });
}
