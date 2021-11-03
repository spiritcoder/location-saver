<template>
  <!-- .row map -->
  <div class="row">
    <div class="col-6 offset-col-3 map">
      <l-map @click="addMarker" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker
          :key="index"
          v-for="(place, index) in places"
          :lat-lng="latLng(place.latitude, place.longitude)"
        >
          <l-icon :iconUrl="place.image_url" />
          <l-tooltip> {{ place.name }} </l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>
  <!-- /.row map -->

  <!-- /add modal -->
  <div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="isOpen = false">
          <div class="modal">
            <form @submit="onSubmit" class="add-form">
              <div class="form-control">
                <label>Name</label>
                <input
                  type="text"
                  v-model="placeName"
                  name="text"
                  placeholder="Name"
                />
              </div>
              <div class="form-control">
                <label>Latitude</label>
                <input
                  type="text"
                  v-model="placeLatitude"
                  name="text"
                  placeholder="Latitude"
                />
              </div>
              <div class="form-control">
                <label>Longitude</label>
                <input
                  type="text"
                  v-model="placeLongitude"
                  name="text"
                  placeholder="Longitude"
                />
              </div>
              <div class="form-control">
                <label>Image URL</label>
                <input
                  type="text"
                  v-model="image_url"
                  name="text"
                  placeholder="image url"
                />
              </div>

              <input type="submit" value="Save Place" class="btn btn-block" />
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- /.add modal -->

  <!-- /Details modal -->
  <div>
    <transition name="modal">
      <div v-if="isDetailOpen">
        <div class="overlay" @click.self="isDetailOpen = false">
          <div class="modal">
            <table>
              <tr>
                <td>Name of Place: {{ placeName }}</td>
                <td><img :src="image_url" width="100" height="100" /></td>
                <td>
                  <button @click="editPlace">Edit</button> |
                  <button class="btn btn-danger" @click="deletePlace">
                    Delete
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- /.add modal -->

  <!-- /Edit modal -->
  <div>
    <transition name="modal">
      <div v-if="isEditOpen">
        <div class="overlay" @click.self="isEditOpen = false">
          <div class="modal">
            <form @submit="onEditSubmit" class="add-form">
              <div class="form-control">
                <label>Name</label>
                <input type="hidden" name="" />
                <input
                  type="text"
                  v-model="placeName"
                  name="text"
                  placeholder="Name"
                />
              </div>
              <div class="form-control">
                <label>Latitude</label>
                <input
                  type="text"
                  v-model="placeLatitude"
                  name="text"
                  placeholder="Latitude"
                />
              </div>
              <div class="form-control">
                <label>Longitude</label>
                <input
                  type="text"
                  v-model="placeLongitude"
                  name="text"
                  placeholder="Longitude"
                />
              </div>
              <div class="form-control">
                <label>Image URL</label>
                <input
                  type="text"
                  v-model="image_url"
                  name="text"
                  placeholder="image url"
                />
              </div>

              <input type="submit" value="Save Place" class="btn btn-block" />
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- /.edit modal -->
</template>

<script>
import "leaflet/dist/leaflet.css";
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import logo from "../assets/logo.png";

export default {
  name: "PlacesMap",
  props: { places: { type: Array } },
  data: function () {
    return {
      center: latLng(51.1657, 10.4515),
      url: "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=e955b6c9bc0b4ec6a38495e3f90d87b5",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.41322, -1.219482),
      zoom: 7,
      currentCenter: latLng(47.41322, -1.219482),
      currentZoom: 7,
      icon: logo,
      iconSize: [15, 15],
      isOpen: false,
      isDetailOpen: false,
      isEditOpen: false,
      placeName: "",
      placeLatitude: "",
      placeLongitude: false,
      image_url: "",
      placeID: "",
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  methods: {
    latLng: function (lat, lng) {
      return L.latLng(lat, lng);
    },
    async addMarker(event) {
    //   this.placeLatitude = "51.83195874569887";
    //   this.placeLongitude = "14.304199218750002";
        this.placeLatitude = event.latlng.lat;
        this.placeLongitude = event.latlng.lng;

      //get the latitude and longitude of the clicked portion and make a request to check if the portion has been saved before
      const result = await this.checkDetails(
        this.placeLatitude,
        this.placeLongitude
      );
      //if there is a result, it means the place exists, and so, we show the details modal, else we show the add modal
      if (result != undefined) {
        this.placeName = result.name;
        this.image_url = result.image_url;
        this.placeLatitude = result.latitude;
        this.placeLongitude = result.longitude;
        this.placeID = result.ID;
        this.isDetailOpen = !this.sDetailOpen;
      } else {
        this.isOpen = !this.sOpen;
      }
    },

    //makes a get request to fetch a place using its latitude and longitude
    async checkDetails(latitude, longitude) {
      const res = await fetch(
        `http://localhost:3007/api/place/getAPlaceWithLatLng/${latitude}/${longitude}`
      );
      const data = await res.json();
      return data.data;
    },

    //a function to handle the submitting of a new place
    onSubmit(e) {
      e.preventDefault();
      if (!this.placeName) {
        alert("please add a name");
      }

      //create a new place object to be emitted
      const newPlace = {
        name: this.placeName,
        latitude: this.placeLatitude.toString(),
        longitude: this.placeLongitude.toString(),
        image_url: this.image_url,
      };
      //emit the add-place event to the parent component
      this.$emit("add-place", newPlace);

      //close the open modal
      this.isOpen = false;

      //reset the variables to empty for further usage
      this.placeName = "";
      this.placeLatitude = "";
      this.placeLongitude = "";
      this.image_url = "";
    },

    //brings up an edit modal if someone wants to edit a place
    editPlace() {
      this.isEditOpen = !this.sEditOpen;
    },

    //is called when one wants to save a new place
    async onEditSubmit(e) {
      e.preventDefault();
      if (!this.placeName) {
        alert("please add a name");
      }

      //create a new place object to be emitted
      const editPlace = {
        id: this.placeID,
        name: this.placeName,
        latitude: this.placeLatitude,
        longitude: this.placeLongitude,
        image_url: this.image_url,
      };
      //call updatePlace to update the place
      await this.updatePlace(editPlace);

      //close all open modals
      this.isEditOpen = false;
      this.isDetailOpen = false;

      //reset the variables to empty for further usage
      this.placeName = "";
      this.placeLatitude = "";
      this.placeLongitude = "";
      this.image_url = "";

      //emit an event to trigger a re-fetch of the places
      this.$emit("update-place-event", null);
    },

    //post a request to the endpoint to edit a place
    async updatePlace(editPlace) {
      const res = await fetch("http://localhost:3007/api/place/updateAPlace", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(editPlace),
      });
      const data = await res.json();
    },

    //sends a request to delete a place
    async deletePlace() {
      const res = await fetch(
        `http://localhost:3007/api/place/deleteAPlace/${this.placeID}/`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      //close all open modals
      this.isDetailOpen = false;

      //emit an event to trigger a re-fetch of the places
      this.$emit("update-place-event", null);
    },
  },
};
</script>

<style type="scss" scoped>
.map {
  height: 100vh;
}
.modal {
  width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
.btn,
button {
  padding: 7px;
  margin-top: 10px;
  background-color: green;
  color: white;
  font-size: 1.1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 0.5px;
  padding: 3px 2px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
