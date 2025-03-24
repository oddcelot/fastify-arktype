import type { FastifyInstance } from "fastify";

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get("/health", async (request, reply) => {
    return { status: "ok" };
  });
}
