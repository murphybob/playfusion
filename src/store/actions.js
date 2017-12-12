import api from "../api.js"
import store from "./index.js"

const defaultOrders = {
  name: "asc",
  distance: "asc",
  numberOfPlanets: "desc"
}

function defaultOrder (field) {
  return defaultOrders[field] || "asc"
}

function toggleOrder (order) {
  return order === "asc" ? "desc" : "asc"
}

export default {
  dismissError ({commit}) {
    commit("dismissError")
  },
  
  async sortBy ({commit}, field) {
    const stars = store.state.stars
    const currentField = stars.sortField
    const currentOrder = stars.sortOrder
    const order = field === currentField ? toggleOrder(currentOrder) : defaultOrder(field)
    const queryHasChanged = currentField !== field || currentOrder !== order
    commit("setSorting", {field, order})
    if (queryHasChanged) {
      commit("resetResults")
    }
  },
  
  changeShowWithAtLeastPlanets ({commit}, number) {
    commit("setShowWithAtLeastPlanets", number)
    commit("resetResults")
  },
  
  async moreStars ({commit}) {
    const stars = store.state.stars
    commit("startLoading")
    
    try {
      const method = stars.searching ? api.searchStars : api.getStars
      const result = await method({
        size: stars.pageSize,
        page: stars.nextPage,
        sortField: stars.sortField,
        sortOrder: stars.sortOrder,
        // Note the change from >= in our state to > in the API usage
        numberOfPlanetsGreaterThan: stars.showWithAtLeastPlanets - 1,
        searchTerm: stars.searchTerm
      })
      commit("moreStars", result)
    } catch (e) {
      commit("setError", "Failed to retrieve stars. " + e)
    } finally {
      commit("stopLoading")
    }
  },
  
  selectStar ({commit}, star) {
    commit("selectStar", star)
    // Don't use await here because we want them both handled async to avoid one blocking the other if slow
    // Get planets
    api.callApi(api.getLink(star, "planets")).then((resp) => {
      commit("addPlanetsToSelectedStar", {
        star,
        planets: resp._embedded.planets
      })
    }, (err) => {
      commit("setError", `Failed to retrieve planet information for star ${star.name} (${err})`)
    })
    // Get alternate names
    api.callApi(api.getLink(star, "additionalNames")).then((resp) => {
      commit("addAltsToSelectedStar", {
        star,
        alts: resp._embedded.alternateNames
      })
    }, (err) => {
      commit("setError", `Failed to retrieve additional name information for star ${star.name} (${err})`)
    })
  },
  
  deselectStar ({commit}) {
    commit("deselectStar")
  },
  
  changeSearchTerm ({commit}, term) {
    commit("changeSearchTerm", term)
  },
  
  async search ({commit}) {
    try {
      const result = await api.searchStars({
        searchTerm: store.state.search.term
      })
      commit("searchResults", result)
    } catch (e) {
      commit("setError", "Failed to search stars. " + e)
    }
  },
  
  selectStarFromSearch ({commit}, result) {
    // Make an alternate name search result into the same format as a star from the default getStars results
    const star = result.star
    star._links = result._links
    store.dispatch("selectStar", star)
  }
}
