import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const verifyTokenMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(403).send({ message: 'No token provided.' });

  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!JWT_SECRET) {
    return res.status(500).send({ message: 'JWT Secret not configured.' });
  }

  jwt.verify(token, JWT_SECRET as Secret, (err:any, decoded:any) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(500).send({ message: 'Failed to authenticate token.' });
  }

    req.userId = decoded.id;  // Store user ID from JWT payload for further use
    next();
  });
};

export default verifyTokenMiddleware;