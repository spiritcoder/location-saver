import dao from "./dao";
import Place from "./models/place";

export async function getAllPlaces(): Promise<Place[]> {
  const places = await dao.all("SELECT * FROM places", []);
  return <Place[]>places;
}

export async function getPlaceById(id: string): Promise<Place> {
  const place = await dao.get("SELECT * FROM places WHERE id = ?", [id]);
  return <Place>place;
}

export async function createPlace(place: Place): Promise<boolean> {
  const stmt = `INSERT INTO places (name, image_url, latitude, longitude) VALUES (?,?,?,?);`;
  try {
    await dao.run(stmt, [
      place.name,
      place.image_url,
      place.latitude,
      place.longitude,
    ]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function updatePlace(place: Place): Promise<boolean> {
  const stmt = `UPDATE places SET name = ?, image_url= ?, latitude= ?, longitude=? WHERE id = ?;`;
  try {
    await dao.run(stmt, [
      place.name,
      place.image_url,
      place.latitude,
      place.longitude,
      place.id,
    ]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function deletePlace(placeId: string) {
  const stmt = `DELETE FROM places WHERE id = ?;`;
  try {
    await dao.run(stmt, [placeId]);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getAPlaceWithLatLng(latitude: string, longitude: string): Promise<Place> {
  const place = await dao.get("SELECT * FROM places WHERE latitude = ? and longitude = ?", [latitude, longitude]);
  return <Place>place;
}