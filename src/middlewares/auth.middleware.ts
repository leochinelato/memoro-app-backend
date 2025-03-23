import { FastifyReply, FastifyRequest } from "fastify"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'adsk09sadm21='

interface JwtPayload {
    id: string
}

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.status(401).send({message: 'Token not provided.'})
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
        request.user = { id: decoded.id }
    } catch (error) {
        return reply.status(401).send({message: 'Invalid or expired token.'})
    }
}