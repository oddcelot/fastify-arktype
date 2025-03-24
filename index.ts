import Fastify from "fastify";
import { userRoutes } from "./routes/users.routes.ts";
import { healthRoutes } from "./routes/health.routes.ts";

const fastify = Fastify({
  logger: true,
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

fastify.register(userRoutes);
fastify.register(healthRoutes);

// Start server
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
