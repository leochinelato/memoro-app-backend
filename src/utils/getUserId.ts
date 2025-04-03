import { FastifyRequest } from "fastify";

export function getUserId(request: FastifyRequest): string {
  return request.user.id;
}