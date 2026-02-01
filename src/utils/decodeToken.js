import jwt from "jsonwebtoken";

const decodeToken = (token) => {
  try {
    // Decode the token
    const decodedToken = jwt.decode(token);
    // Return the decoded user information
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return null;
  }
};

export { decodeToken };
