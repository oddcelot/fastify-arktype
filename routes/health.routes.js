export async function healthRoutes(fastify) {
    fastify.get("/health", async (request, reply) => {
        return { status: "ok" };
    });
}
