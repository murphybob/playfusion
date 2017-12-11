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
  
  async moreStars ({commit}) {
    const stars = store.state.stars
    commit("startLoading")
    
    try {
      const result = await api.getStars({
        size: stars.pageSize,
        page: stars.nextPage,
        sortField: stars.sortField,
        sortOrder: stars.sortOrder
      })
      commit("moreStars", result)
    } catch (e) {
      commit("setError", "Failed to retrieve stars. " + e)
    } finally {
      commit("stopLoading")
    }
  }
}
