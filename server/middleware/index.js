
import jwt from 'jsonwebtoken';
/** This Class holds methods for all my middlewares */
const Wares = class MiddleWares {
  /**
   */
  constructor() {
    this.verifyJsonWebToken = (routes) => {
      // validate token below
      if (process.env.NODE_ENV !== 'test') {
        routes.use((req, res, next) => {
        // check header or url parameters or post parameters for token
          const token = req.body.token || req.query.token || req.headers['x-access-token'];

          // decode token
          if (token) {
          // verifies secret and checks exp
            jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
              if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
              }
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;
              next();
            });
          } else {
          // if there is no token
          // return an error
            return res.status(403).send({
              status: 'fail',
              tokenVerification: false,
              message: 'Signin on /api/signin to generate token for authentication. Add it to headers e.g x-access-token = token',
            });
          }
        });
      }
    };
    this.encrypt = (req,res) => {
      if(req.body.key)
      {
          const token = jwt.sign(req.body.key,process.env.API_SECRET);
          res.json({status:'success',data:{result:token}});
      }
      else{
        res.json({status:'fail',message:'Please provide a key to encrypt'});
      }
    };
  }
};
export default Wares;