import express from 'express'
const router = express.Router();
import { validateRequest } from '../validators/validate-request';


/*
|-------------------------------------------------------------------------------
| Controller, Validator, Middleware, Utils Import
|-------------------------------------------------------------------------------
*/
import { authController } from '../controllers';
import * as v from '../validators'



/*
|-------------------------------------------------------------------------------
| Route Declaration
|-------------------------------------------------------------------------------
*/

router.post("/signup", v.signUpValidator, validateRequest, authController.signup);
router.post("/login", v.logInValidator, validateRequest, authController.login);









/*
|-------------------------------------------------------------------------------
| Route Export
|-------------------------------------------------------------------------------
*/
export { router as authRoutes }