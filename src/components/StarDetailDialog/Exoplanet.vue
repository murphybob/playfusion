<template>
  <div class="exoplanet">
    <h4>{{planet.name}}</h4>
    <!-- Probably this should be a <ul> to be more semantically correct -->
    <info-item display-name="Description" :data="planet.description"></info-item>
    <info-item display-name="Radius" :data="radiusInKm" unit="km"></info-item>
    <info-item display-name="Age" :data="planet.age" unit="gigayears"></info-item>
    <info-item display-name="Temperature" :data="planet.temperature" unit="kelvin"></info-item>
    <info-item display-name="Mass" :data="planet.mass" unit="jupiter masses"></info-item>
    <info-item display-name="Discovery" :data="planet.discoveryMethod"></info-item>
    <info-item display-name="Discovered" :data="discovered"></info-item>
    <info-item display-name="List" :data="planet.list"></info-item>
  </div>
</template>

<script>
  import InfoItem from "./InfoItem"
  import util from "@/util"

  export default {
    components: {InfoItem},
    name: "exoplanet",
    props: ["planet"],
    computed: {
      radiusInKm () {
        const r = this.planet.radius
        return r ? util.jupiterRadiiToKilometres(r) : null
      },
      discovered () {
        const d = this.planet.discoveryDate
        return d ? new Date(d).toDateString() : null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .exoplanet {
    h4 {
      margin-bottom: 0;
    }
    .info-item {
      font-size: 0.8em;
    }
  }
</style>
