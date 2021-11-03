import { v4 as uuidv4 } from "uuid";

export default class {
  constructor(id = null) {
    this.id = id || uuidv4();
  }

  id!: string;
  name!: string;
  image_url!: string;
  latitude!: string;
  longitude!: string;
}