# PlayFusion

Hi! 👋

## Setup

```
npm install
```

Dev mode:
```
# serve with hot reload at localhost:8081
npm run dev
```

Production build:
```
npm run build
```

This will produce build the app to the dist/ folder. Copy the results to the root of a web server and open.

Why the root?  Because webpack is absoluting all the urls and of course this can be turned off somehow I'm quite certain... :)


## Testing

Run unit tests

```
npm run unit
```

## Browser support

I haven't bothered worrying about browser support so please use something recent and hope for the best.

Tested in Chrome 62.

## Other notes

 - I bootstrapped the project from the Vue webpack template. There's certainly some config I would prefer to trim if this were a real project, but for this exercise I am content with something which works.
 - I developed this mobile first so it will look most pleasant on a mobile. It works fine on desktop, but looks a bit naff. Given more time I would enhance that with some more styles for big screens, but its always preferable to start with the most constrained.
 - Styling the settings form defeated my sense of making it look pretty for a coding test!
 - It is possible I misunderstood but it seems like no stars returned by the api actually have zero numberOfPlanets.
 - Searching by alt name and filtering by number of planets are exclusive of one another.
 - By the search stuff I was running out of steam for making things pretty, so it's really just functionality only I'm afraid.

## Extensions I did not have time to do

 - I would have liked to add some unit tests, especially around the business logic in actions and the api stuff. Its worth noting though I still would not unit test the views themselves. My experience is that they change so often its rarely worth the effort, as long as you keep them as dumb as a bag of hammers. I feel like the Vuex/Redux/Re-Frame paradigm of central state is helpful to that end, moving business logic into actions/Whatever Redux calls them/events and leaving views stupid.
 - Saving state to local storage (easy with a central store, hurray!)
 - All the usual ux bells and whistles like keyboard control.
 - The star detail popup should probably have loading icons for information which is being requested (planets, alt names) for slower connections.
