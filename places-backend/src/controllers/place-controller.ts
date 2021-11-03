import * as placeRepo from "../repo/place.repository";
import { Request, Response } from "express";
import Place from "../repo/models/place";
import { BadRequestError } from "../errors/error-handler";
import { createResponse } from "../utils/create-response";

class PlaceController {
  addPlace = async (req: Request, res: Response) => {
    const place: Place = req.body;

    //check if a place with same lat and long exists
    const placeExists: Place = <Place><unknown>await placeRepo.getAPlaceWithLatLng(place.latitude, place.longitude);
    if (placeExists != null)
      throw new BadRequestError("A place with same latitude and longitude exists");
    
    const created: boolean = await placeRepo.createPlace(place);
  
    if (created) {
      return createResponse(res, 200, "place Created",null);
    } else {
      throw new BadRequestError(" Place creation failed ");
    }
  };

  getPlaces = async (req: Request, res: Response) => {
    const places: Place = <Place><unknown>await placeRepo.getAllPlaces();
    return createResponse(res, 200, "Fetched Places", places);
  }

  getAPlace = async (req: Request, res: Response) => {
    const place: Place = <Place><unknown>await placeRepo.getPlaceById(req.params.placeId);
    return createResponse(res, 200, "fetched place", place);
  }

  updateAPlace = async (req: Request, res: Response) => {
    const place: Place = req.body;
    const updated: boolean = await placeRepo.updatePlace(place)

    if (updated) {
      return createResponse(res, 200, "place Updated",null);
    } else {
      throw new BadRequestError(" Place Update failed ");
    }
  }
  
  deleteAPlace = async (req: Request, res: Response) => {
    const deleted: boolean = await placeRepo.deletePlace(req.params.placeId);
    if (deleted) {
      return createResponse(res, 200, "place Deleted",null);
    } else {
      throw new BadRequestError(" Place Deletion failed ");
    }
  }
  getAPlaceWithLatLng = async (req: Request, res: Response) => {
    const place: Place = <Place><unknown>await placeRepo.getAPlaceWithLatLng(req.params.latitude, req.params.longitude);
    return createResponse(res, 200, "fetched Place", place);
  }
}

export const placeController = new PlaceController();