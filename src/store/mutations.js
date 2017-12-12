import Vue from "vue"

export default {
  setError (state, msg) {
    state.error.unread = true
    state.error.message = msg
  },
  
  dismissError (state) {
    state.error.unread = false
  },
  
  startLoading (state) {
    state.stars.loading = true
  },
  
  stopLoading (state) {
    state.stars.loading = false
  },
  
  setSorting (state, {field, order}) {
    state.stars.sortField = field
    state.stars.sortOrder = order
  },
  
  resetResults (state) {
    state.stars.nextPage = 0
    state.stars.truncated = true
    state.stars.results = []
  },
  
  moreStars (state, result) {
    state.stars.results = state.stars.results.concat(result.stars)
    state.stars.nextPage = result.page.number + 1
    state.stars.truncated = !(result.page.number === result.page.totalPages - 1) // (pages are zero indexed)
  },
  
  setShowWithAtLeastPlanets (state, n) {
    state.stars.showWithAtLeastPlanets = n
  },
  
  selectStar (state, star) {
    state.stars.selected = star
  },
  
  addPlanetsToSelectedStar (state, {star, planets}) {
    // TODO: In a production app this should check the star has not changed since the request was made
    // otherwise you get the annoying feature of updating the information on the wrong star as the user
    // has since selected another. Web app classic.
    //
    // Use Vue.set as this is a new property
    Vue.set(state.stars.selected, "planets", planets)
  },
  
  addAltsToSelectedStar (state, {star, alts}) {
    // Use Vue.set as this is a new property
    Vue.set(state.stars.selected, "alternateNames", alts)
  },
  
  deselectStar (state) {
    state.stars.selected = false
  },
  
  changeSearchTerm (state, term) {
    state.search.term = term
  },
  
  searchResults (state, results) {
    state.search.results = results
  }
}
