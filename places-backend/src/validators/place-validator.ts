import { body, param } from 'express-validator';
import { BadRequestError } from '../errors/error-handler';
import { getPlaceById } from '../repo/place.repository';

//validates all payload data during creation of a place to make sure it fits
export const addPlaceValidator = [
  body('longitude').isString().withMessage('Longitude is required and must be a string'),
  body('name').isString().withMessage('Name is required and must be a string').isLength({ min: 2, max: 20 }),
  body('latitude').isString().withMessage('Latitude is required and must be a string')
]

//validates all payload data to make sure they fit in before making an update
export const updatePlaceValidator = [
  body('longitude').isString().withMessage('Longitude is required and must be a string'),
  body('name').isString().withMessage('Name is required and must be a string').isLength({ min: 2, max: 20 }),
  body('latitude').isString().withMessage('Latitude is required and must be a string'),
  body('id').isNumeric().withMessage("id is required and must be a string")
]

//validates all place ids sent as request to make sure they exist in the db
export const validatePlaceID = [
    param("placeId")
    .custom(async (value, { req }) => {
      let foundContent = await getPlaceById(value);
      if (foundContent == null)
        throw new BadRequestError("Please provide a valid place id");

      return true;
    }),
]