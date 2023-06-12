import { ValidationError } from "yup";
import createHttpError from "http-errors";
const mongoose = require("mongoose");

export default function errorHandler(err, res) {
  console.log(createHttpError.isHttpError(err) && err.expose);
  // Errors with statusCode >= 500 are should not be exposed
  if (createHttpError.isHttpError(err) && err.expose) {
    // Handle all errors thrown by http-errors module
    return res.status(err.statusCode).json({
      message: err.message,
    });
  } else if (err instanceof ValidationError) {
    // Handle yup validation errors
    return res.status(400).json({ message: err.errors.join(", ") });
  } else if (err instanceof mongoose.Error.ValidationError) {
    //Handle mongoose validation error
    return res.status(400).json({
      message: err.message,
    });
  } else if (err.name === "MongoError" && err.code === 11000) {
    //handle mongoDB error
    return res.status(400).json({
      message: "Duplicate record found",
    });
  } else if (err.name === "UnauthorizedError") {
    //handle jwt error
    if (err.inner.message === "jwt expired") {
      return res.status(401).json({
        message: err.inner.message,
      });
    }
    if (err.inner.message === "No authorization token was found") {
      return res.status(401).json({
        message: err.inner.message,
      });
    }
  } else {
    // default to 500 server error
    return res.status(500).json({
      message: "Internal Server Error",
      err: err,
      status: createHttpError.isHttpError(err) ? err.statusCode : 500,
    });
  }
}
