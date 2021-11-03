import * as userRepo from "../repo/user.repository";
import * as bcrypt from "bcrypt";
import { encodeToken, decodeToken } from "../utils/json-decoder";
import { Request, Response } from "express";
import User from "../repo/models/user";
import { BadRequestError } from "../errors/error-handler";
import { createResponse } from "../utils/create-response";

class Authentication {
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = <User>await userRepo.getUserByEmail(email);

    if (!user) {
      throw new BadRequestError(" User details supplied does not exist");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const accessToken = encodeToken(user.id, user.email);
        return createResponse(res, 200, "user logged in", accessToken, null);
      } else {
        throw new BadRequestError(" User authenticaiton failed ");
      }
    });
  };

  signup = async (req: Request, res: Response) => {
    const user: User = req.body;
    const created: boolean = await userRepo.createUser(user)
  
    if (created) {
      return createResponse(res, 200, "user Created",null);
    } else {
      throw new BadRequestError(" User creation failed ");
    }
  }

  getUser = async (req: Request, res: Response) => {
    const users: User = <User> <unknown>await userRepo.getAllUser();
    return createResponse(res, 200, "user Created", users);
  }
}

export const authController = new Authentication();