export const checkAdmin = async (req, res, next) => {
    try {
      const user = req.user
    //   console.log(user)
      if(user.role !== 'admin') res.status(403).json({ msg: 'Este endpoint es para usuarios administradores' })
      else next();
    } catch (error) {
      next(error)
    }
  };