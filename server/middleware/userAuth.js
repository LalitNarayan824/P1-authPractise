import jwt from 'jsonwebtoken'

const userAuth = async (req , res, next)=>{
  const {token} = req.cookies;

  if(!token){
    return res.status(400).json({success : false , message : "User is not authorized , please login again"})
  }

  try {
    const decodedToken = jwt. verify(token , process.env.JWT_SECRET)

    if(decodedToken.id){
      req.userId = decodedToken.id
    }
    else{
      return res.status(400).json({success : false , message : "User is not authorized , please login again"})


    }

    next();
  } catch (error) {
    console.log(error)
    return res.json({success : false , message : error.message })
  }
};

export default userAuth;