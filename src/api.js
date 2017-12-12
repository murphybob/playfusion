import assert from "assert"

const _ = require("lodash")
const apiBase = "http://webdevelopertest.playfusionservices.com/webapptest"

function toQueryString (options) {
  return _.map(options, (v, k) => {
    return encodeURIComponent(k) + "=" + encodeURIComponent(v)
  }).join("&")
}

async function callApi (url, options) {
  const qs = toQueryString(options)
  const resp = await fetch(`${url}?${qs}`)
  if (resp.status === 200) {
    const json = await resp.json()
    assert.ok(json["_embedded"], "Malformed api response, no data.")
    assert.ok(json["_links"], "Malformed api response, no links")
    // Transpose data into a nicer format
    return json
  } else {
    throw new Error(resp)
  }
}

function sortQueryParam (sortField, sortOrder) {
  if (sortField && sortOrder) {
    return [sortField, sortOrder].join(",")
  } else if (sortField || sortOrder) {
    throw new Error("Sort field and order must both be set, or neither.")
  }
}

function buildRequest ({size = 100, page = 0, sortField = "numberOfPlanets", sortOrder = "asc", numberOfPlanetsGreaterThan}) {
  // Build some query options
  const options = {
    size,
    page,
    sort: sortQueryParam(sortField, sortOrder)
  }
  // Which resource do we need to use?
  let resource = apiBase + "/stars"
  if (numberOfPlanetsGreaterThan >= 0) {
    resource += "/search/findByNumberOfPlanetsGreaterThan"
    options.numberOfPlanets = numberOfPlanetsGreaterThan
  }
  return [resource, options]
}

async function getStars (opts) {
  /* It seems eslint is grumpy about the use of the array destructuring form
     [a, b] = c()...
     I'm sure it could be coerced back into happiness but I don't think that's a
     good use of time for this exercise so I've taken the coward's way out! :-O
   */
  const req = buildRequest(opts)
  const resource = req[0]
  const options = req[1]
  // Make the request
  const resp = await callApi(resource, options)
  assert.ok(resp.page, "Malformed api response, no paging info.")
  // Handle the response
  let stars = resp._embedded.stars
  assert.ok(stars, "Unexpected response, no stars object.")
  return {
    stars,
    page: resp.page,
    links: resp.links
  }
}

async function searchStars ({size = 100, page = 0, sortField = "numberOfPlanets", sortOrder = "asc", searchTerm}) {
  assert.ok(searchTerm, "No search term set")
  const resource = apiBase + "/alternateNames/search/findByNameLike"
  const options = {
    size,
    page,
    sort: sortQueryParam(sortField, sortOrder),
    name: "%" + searchTerm + "%",
    projection: "NameWithStar"
  }
  const resp = await callApi(resource, options)
  return resp._embedded.alternateNames
}

// To avoid api specific addressing being needed everywhere
function getLink (obj, type) {
  return obj._links[type].href
}

export default {callApi, getStars, getLink, searchStars}
