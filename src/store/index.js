import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions.js"
import mutations from "./mutations.js"

Vue.use(Vuex)

const state = {
  error: {
    unread: false,
    message: ""
  },
  stars: {
    nextPage: 0,
    truncated: true,
    pageSize: 100,
    sortField: "numberOfPlanets",
    sortOrder: "desc",
    showWithAtLeastPlanets: 0,
    loading: false,
    results: [],
    selected: false
  },
  search: {
    term: "",
    results: []
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
