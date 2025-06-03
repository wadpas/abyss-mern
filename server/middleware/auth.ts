import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import APIError from '../utils/api-error.js'
import { auth } from 'express-oauth2-jwt-bearer'
import User from '../models/user.js'

const authentication = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  // const token = req.signedCookies.token

  const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256',
  })

  if (!jwtCheck) {
    throw new APIError('Authentication Invalid', 401)
  }

  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new APIError('Authentication Invalid', 401)
  }

  const token = authorization.split(' ')[1]

  try {
    // req.user = isTokenValid(token) as any
    const decoded = jwt.decode(token) as jwt.JwtPayload
    const auth0Id = decoded.sub

    const user = await User.findOne({ auth0Id })

    if (!user) {
      return res.sendStatus(401)
    }

    req.auth0Id = auth0Id as string
    req.userId = user._id.toString()
    next()
  } catch (error) {
    throw new APIError('Authentication Invalid', 401)
  }
}

const authorization = (...roles: any[]): any => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new APIError('Unauthorized to access this route', 401)
    }
    next()
  }
}

export { authentication, authorization }
