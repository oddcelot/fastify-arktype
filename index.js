import Fastify from "fastify";
import { type } from "arktype";

const fastify = Fastify({
  logger: true,
});

const userSchemaArkType = type({
  name: "string",
  email: "string.email",
  age: "number>1",
});

const querySchemaArkType = type({
  "limit?": "number>1",
  "offset?": "number>0",
});

// Configure Fastify to use Arktype for validation
fastify.setValidatorCompiler(({ schema }) => {
  return (data) => {
    try {
      const value = schema(data);
      return { value };
    } catch (error) {
      return { error };
    }
  };
});

// Routes
fastify.post("/users", {
  schema: {
    body: userSchemaArkType.out,
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
    querystring: querySchemaArkType,
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

// Health check endpoint
fastify.get("/health", async (request, reply) => {
  return { status: "ok" };
});

// Start server
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
