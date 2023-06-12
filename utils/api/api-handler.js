import errorHandler from "./error-handler";
import dbConnect from "../../lib/monogConnect";
// import logger from "../../services/logger/logger";
import jwtMiddleware from "./jwt-middleware";
import apiGaurd from "../apiGaurd";
import verifyToken from "../verifyToken";
export default function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase();
    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      const db = await dbConnect();

      // route handler
      // logger.info(`Method:${req.method} URL:${req.url} `);
      //function to secure customer api
      await apiGaurd(req, res);
      //function to verify jwt
      await jwtMiddleware(req, res);
      const jwtToken = req?.headers?.authorization?.split(" ")[1];
      if (jwtToken) {
        const token = verifyToken(jwtToken, process.env.JWT_ACCESS_SECRET_KEY);
        req.userRole = token.role;
        req.userName = token.username;
      }

      await handler[method](req, res);
      // }
    } catch (err) {
      // global error handler
      // logger.error(err.stack);
      console.log(err);
      errorHandler(err, res);
    }
  };
}
