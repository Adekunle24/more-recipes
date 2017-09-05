
import jwtVerify from './verify_webtoken';

const middlewares = { verifyWebToken: jwtVerify };
export default middlewares;
