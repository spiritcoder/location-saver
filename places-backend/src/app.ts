import express,{ Express } from 'express';

import 'express-async-errors' //for catching async errrors in express
import { json } from 'body-parser';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session'
import cors from 'cors';


// //require those routes and error handlers which I created seperately
import { authRoutes } from './routes/auth';
import { placeRoutes } from './routes/place';
import { errorHandler, NotFoundError } from './errors/error-handler'

const app: Express = express();
app.set('trust proxy', true)
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    signed:false
  })
)
dotenv.config();



//Routes imported here
app.use('/api/auth', authRoutes);
app.use('/api/place',placeRoutes);

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)


export {app}