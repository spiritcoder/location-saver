import express from 'express'
const router = express.Router();
import { validateRequest } from '../validators/validate-request';




/*
|-------------------------------------------------------------------------------
| Controller, Validator, Middleware, Utils Import
|-------------------------------------------------------------------------------
*/
import { placeController } from '../controllers';
import * as v from '../validators'





/*
|-------------------------------------------------------------------------------
| Route Declaration
|-------------------------------------------------------------------------------
*/
router.post('/addPlace', v.addPlaceValidator,  validateRequest, placeController.addPlace);
router.post('/updateAPlace', v.updatePlaceValidator, validateRequest, placeController.updateAPlace);
router.get('/getAllPlaces', validateRequest, placeController.getPlaces);
router.get('/getAPlace/:placeId', v.validatePlaceID, validateRequest,  placeController.getAPlace)
router.delete('/deleteAPlace/:placeId', v.validatePlaceID, validateRequest, placeController.deleteAPlace)
router.get('/getAPlaceWithLatLng/:latitude/:longitude', validateRequest, placeController.getAPlaceWithLatLng)










/*
|-------------------------------------------------------------------------------
| Route Export
|-------------------------------------------------------------------------------
*/
export { router as placeRoutes }