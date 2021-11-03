import jwt from "jsonwebtoken";

//generate a jwt token
export const encodeToken = (userId: string, userEmail: string) => {
  const token = jwt.sign({userId, userEmail}, "APP_SECRET");
  return token;
};

//decode a generated jwt token
export const decodeToken = (token: string) => {
  return jwt.verify(token, "APP_SECRET");
};