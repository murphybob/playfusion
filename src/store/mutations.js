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
  }
}
