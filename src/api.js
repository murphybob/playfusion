import assert from "assert"

const _ = require("lodash")
const apiBase = "http://webdevelopertest.playfusionservices.com/webapptest"

function toQueryString (options) {
  return _.map(options, (v, k) => {
    return encodeURIComponent(k) + "=" + encodeURIComponent(v)
  }).join("&")
}

async function callApi (resource, options) {
  const qs = toQueryString(options)
  const resp = await fetch(`${apiBase}/${resource}?${qs}`)
  if (resp.status === 200) {
    const data = await resp.json()
    assert.ok(data["_embedded"], "Malformed api response, no data.")
    assert.ok(data.page, "Malformed api response, no paging info.")
    assert.ok(data["_links"], "Malformed api response, no links")
    // Transpose data into a nicer format
    return {
      page: data.page,
      links: data["_links"],
      data: data["_embedded"]
    }
  } else {
    throw new Error(resp)
  }
}

function withIds (data) {
  return data.map((r) => {
    r.id = r["_links"].self.href
    return r
  })
}

async function getStars ({size = 100, page = 0, sortField = "", sortOrder = ""}) {
  const resp = await callApi("stars", {
    size,
    page,
    sort: [sortField, sortOrder].join(",")
  })
  let stars = resp.data.stars
  assert.ok(stars, "Unexpected response, no stars.")
  try {
    stars = withIds(stars)
  } catch (e) {
    console.log(e)
    throw new Error("Malformed api data, items must have self link.")
  }
  return {
    stars,
    page: resp.page,
    links: resp.self
  }
}

export default {getStars}
