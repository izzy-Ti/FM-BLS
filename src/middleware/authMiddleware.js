import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.json({ success: false, message: 'Not authorized please login again' })
  }
  try {
    const tokenDecoded = jwt.verify(token, process.env.HASH_KEY)
    if (tokenDecoded.id) {
      // Initialize req.body if it doesn't exist (needed for GET requests)
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