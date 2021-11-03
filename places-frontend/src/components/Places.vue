<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center text-info">Places</h1>
      </div>
      <!-- /.col-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
      <div class="col-12">
        <PlacesMap :places="places" @add-place="addPlace"  @update-place-event="updateEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import PlacesMap from "./PlacesMap";

export default {
  name: "Places",
  components: { PlacesMap },
  data: function () {
    return {
      childDataLoaded: false,
      places: [],
      addSuccessful: false,
    };
  },
  //watch for a mount and get all places
  mounted: async function () {
    this.getPlaces();
  },
  methods: {
    //send a get request to the endpoint to get all registered places
    async getPlaces() {
      const res = await fetch("http://localhost:3007/api/place/getAllPlaces");
      const data = await res.json();
      //asign the result to places
      this.places = data.data;
    },

    //send a post request to the endpoint to create a new place. 
    async addPlace(newPlace) {
      const res = await fetch("http://localhost:3007/api/place/addPlace", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newPlace),
      });
      const data = await res.json();
      //reload the getPlaces method
      await this.getPlaces()
    },
    //fetches existing places when an update is made to a place
    async updateEvent(){
      await this.getPlaces()
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
