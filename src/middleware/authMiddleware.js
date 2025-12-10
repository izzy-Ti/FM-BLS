import jwt from 'jsonwebtoken'
import { user } from '../models/user.js'

const userAuth = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.json({ success: false, message: 'Not authorized please login again' })
  }
  try {
    const tokenDecoded = jwt.verify(token, process.env.HASH_KEY)
    if (tokenDecoded.id) {
      if (!req.body) {
        req.body = {}
      }
      req.body.userId = tokenDecoded.id
    } else {
      return res.json({ success: false, message: 'Not authorized please login again' })
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}
export default userAuth


export const isVerified = async (req, res, next) => {
  try {
    const userId = req.body.userId; // Should be set by isAuthenticated
    const User = await user.findById(userId);

    if (!User) {
      return res.json({ success: false, message: 'User not found' });
    }
    if (!User.IsAccVerified) {
      return res.json({ success: false, message: 'Please verify your account' });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}