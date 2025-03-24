import { type } from "arktype";
import { userSchema } from "../schema/user.schema.js";
export const usersQuerySchema = type({
    /** limits the max rows to get */
    limit: "number > 1 = 10",
    /** used e.g. for pagination */
    offset: "number >= 0 = 0",
});
export async function userRoutes(fastify) {
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
            // TODO: remove yolo mode - infer options form query schema
            const { limit, offset } = request.query;
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
