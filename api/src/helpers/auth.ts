import * as jwt from 'jsonwebtoken';
import conf from '../helpers/conf';

export function decodeToken(token: string): Promise<void> {
  // Create a promise
  return new Promise((resolve, reject) => {
    // Verify/decode the token with the JWT sercet
    jwt.verify(token, conf.JWTSecret, (err, decoded) => {
      // On error
      if (err) {
        reject(err);
      } else {
        // On success
        resolve(decoded);
      }
    });
  });
}

export function generateToken(payload) {
  // Generate a token containing the payload
  return jwt.sign(payload, conf.JWTSecret);
}
