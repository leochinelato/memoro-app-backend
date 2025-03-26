import { FastifyReply, FastifyRequest } from "fastify"

const JWT_SECRET = process.env.JWT_SECRET || 'adsk09sadm21='

interface JwtPayload {
    id: string
}

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
    } catch (error) {
        return reply.status(401).send({message: 'Invalid or expired token.'})
    }
}