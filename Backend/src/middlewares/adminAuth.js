import jwt from 'jsonwebtoken';

const canteenAuth = async (req, res, next) => {
  try {
    
    const canteenToken = req.headers['authorization']?.split(' ')[1];  
       
    if (!canteenToken) {
      return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }

    const decoded = jwt.verify(canteenToken, process.env.JWT_SECRET);

     req.user = { canteenId: decoded.id };

    
    next();
  } catch (error) {
    // Handle any errors that occur during token verification
    console.error(error.message);
    return res.status(401).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

export default canteenAuth;
