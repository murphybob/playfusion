<template>
  <div class="star-detail-dialog">
    <button class="close" @click="close()">[x]</button>
    <h2>{{star.name}}</h2>
    <p v-if="alts" class="alts">aka {{alts}}</p>
    <hr>
    <info-item display-name="Radius" :data="radiusInKm" unit="km"></info-item>
    <info-item display-name="Age" :data="star.age" unit="gigayears"></info-item>
    <info-item display-name="Temperature" :data="star.temperature" unit="kelvin"></info-item>
    <info-item display-name="Mass" :data="star.mass" unit="solar masses"></info-item>
    <info-item display-name="Distance" :data="distanceInLightYears" unit="light years"></info-item>
    <hr>
    <info-item display-name="# Exoplanets" :data="star.numberOfPlanets" unit=""></info-item>
    <exoplanet v-for="planet in star.planets" :key="planet.name" :planet="planet"></exoplanet>
  </div>
</template>

<script>
  import InfoItem from "./InfoItem"
  import Exoplanet from "./Exoplanet"
  import util from "@/util"

  export default {
    components: {
      Exoplanet,
      InfoItem
    },
    name: "star-detail-dialog",
    props: ["star"],
    computed: {
      radiusInKm () {
        const r = this.star.radius
        return r ? util.solarRadiiToKilometres(r).toFixed(2) : null
      },
      distanceInLightYears () {
        const d = this.star.distance
        return d ? util.parsecsToLightYears(d).toFixed(2) : null
      },
      alts () {
        const alts = this.star.alternateNames
        if (alts) {
          // Just show the names, and remove the canonical name
          return alts.map((a) => a.name).filter((n) => n !== this.star.name).join(", ")
        }
        return null
      }
    },
    methods: {
      close () {
        this.$store.dispatch("deselectStar")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .star-detail-dialog {
    position: fixed;
    left: 3%;
    top: 3%;
    width: 94%;
    height: 94%;
    background: rgba(56, 25, 25, 0.95);
    box-shadow: 0 0 4px black;
    padding: 0 1em 1em;
    overflow-y: scroll;
  
    .close {
      position: absolute;
      right: 1em;
      top: 1em;
      font-weight: bold;
      cursor: pointer;
    }
    
    h2 {
      text-align: center;
      margin: 1em 0 0.25em;
    }
    
    .alts {
      margin-top: 0;
      text-align: center;
    }
    
    hr {
      border-color: #897777;
    }
  }
</style>
