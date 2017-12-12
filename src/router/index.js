import Vue from "vue"
import Router from "vue-router"
import HomePage from "@/components/HomePage"
import SettingsPage from "@/components/SettingsPage"
import SearchPage from "@/components/SearchPage"
import Error404Page from "@/components/Error404Page"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home-page",
      component: HomePage
    },
    {
      path: "/settings",
      name: "settings-page",
      component: SettingsPage
    },
    {
      path: "/search",
      name: "search-page",
      component: SearchPage
    },
    {
      path: "*",
      component: Error404Page
    }
  ]
})
