
# VueJS 2 Example Project (and Tutorial)

A scalable Single Page Application (SPA) example. This example uses Vue-cli, VueRouter, Vuex, VueResource and more. Clone the repo, do `npm install`, and use right away or read through this tutorial below to get an idea of how to build the project from scratch and setup Sublime Text.

## Table of Contents
1. [Todo](#todo)
2. [Install Node](#install-node)
3. [Install Vue-CLI](#install-vue-cli)
4. [Add Dependencies](#add-dependencies)
5. [Configure JQuery and Lodash and Tether](#configure-jquery-and-lodash-and-tether)
6. [Global Utilities](#global-utilities)
7. [Configure Sublime Text 3](#configure-sublime-text-3)
8. [Configure ESLint](#configure-eslint)
9. [Setup Main and Routes](#setup-main-and-routes)
10. [Setup Authentication (OAuth2), User Profile, and Vuex](#setup-authentication-user-profile-and-vuex)
11. [Proxy Api Calls in Webpack Dev Server](#proxy-api-calls-in-webpack-dev-server)
12. [Components](#components)
13. [Twitter Bootstrap 4 Configuration](#twitter-bootstrap-4-configuration)
14. [Fonts and Font-Awesome](#fonts-and-font-awesome)
15. [Images and Other Assets](#images-and-other-assets)
16. [App.scss](#app-scss)
17. [Unit Testing and End-to-End Testing](#unit-testing-and-end-to-end-testing)
18. [Run the Dev Server](#run-the-dev-server)
19. [Vue Dev Tools](#vue-dev-tools)
20. [Create & Publish a Component/Library for Other Developers to Use](#create-and-publish-a-library-for-other-developers-to-use) 
21. [Quick Learning Webpack Resources](#quick-learning-webpack-resources)

## Todo

- Currently, remote calls are made to an online example OAuth2 demo server [here](http://brentertainment.com/oauth2/) by Brent Shaffer. We can remove this and instead setup up a Node.js Express OAuth2. 
- Add a section in this tutorial about working in a production environment.
- File splitting (Webpack's CommonChunksPlugin and etc.) and improving page load times.

## Install Node

#### Install Node and NPM (Using PPA to get latest version)

Get the setup script:

```shell
$ cd ~
$ curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
```

Inspect that you have the script, then run with `sudo`:

```shell
$ vim nodesource_setup.sh
$ sudo bash nodesource_setup.sh
```

Now install Nodejs:

```shell
$ sudo apt-get install nodejs
```

The nodejs package contains the nodejs binary as well as npm, so you don't need to install npm separately. However, in order for some npm packages to work (such as those that require compiling code from source), you will need to install the build-essential package:

```shell
$ sudo apt-get install build-essential
```

## Install Vue-CLI

Change directory to the directory where you want this example project to reside:

```shell
# an example folder will be created here on the next step...
$ cd ~
``` 
  
Install Vue-cli with webpack:

```shell
$ sudo npm install -g vue-cli
$ vue init webpack example-vue-project
```

(Note: If you've already installed the cli before and when you init a new project you get the message: `A newer version of vue-cli is available`, then ctrl+c at the prompt and then: `sudo npm install vue-cli -g` to update (re-install) vue-cli to the latest version.)

Now you'll get some output like this:

```
? Project name: example-vue-project
? Project description: A Vue.js project
? Author: Your Name <your-name@email.com>
? Vue build: Runtime-only  # saves you 6kb
? Install vue-router? Y
? Use ESLint to lint your code? Y
? Pick an ESLint preset: none # we'll use a vue specific preset based on Standard
? Setup unit tests with Karma + Mocha? Y
? Setup e2e tests with Nightwatch? Y

vue-cli Generated "example-vue-project"
```

Install dependencies in `package.json`:

```shell
$ cd example-vue-project 
$ npm install  # do this first before you add more dependencies (to avoid peer warns)
```

## Add Dependencies

(Note: We are installing most dependencies into the devDependencies section of package.json using `--save-dev`. The production server will not need those dependencies. Most of these dependencies are used to build a set of files into your `dist` folder for your production server to use.)

Install Vuex and Vue Resource (Vue Router was installed from vue-cli earlier)

```shell
$ npm install vuex vue-resource --save
``` 

Install jQuery, Tether (required by Boostrap), Bootstrap, Font-Awesome, Roboto and Lodash

```shell
$ npm install jquery tether bootstrap@next font-awesome roboto-fontface lodash --save-dev
```

Install Vue Multiselect (a vendor component used in an example)

```shell
$ npm install vue-multiselect@next --save-dev
```

Install Vue ESLint plugin

```shell
$ npm install eslint-config-vue eslint-plugin-vue --save-dev
```

Install babel-polyfill (for example, transpiling es6 promises, so that tests will work in testing browsers...see section on "Unit Testing and End-to-End Testing" further down).

```shell
npm install babel-polyfill --save-dev 
```

 Install sass builders:

```shell
$ npm install sass-loader node-sass --save-dev
```
  
 Install stylus (optional):

 ```shell
 $ npm install stylus -g # install stylus globally for Sublime
 $ stylus -V # this confirms that stylus has been added to your path, if not, you need to do so for it to work correctly with Sublime
 $ npm install stylus stylus-loader --save-dev # also install locally
 ```

 See Sublime Text 3 section further down for installing the Stylus package for it.

 *(This concludes all extra dependencies, however feel free to check the `package.json` in the Github repo)*

## Configure JQuery and Lodash and Tether

#### Option #1: Use ProvidePlugin

Add the [ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin) to the plugins array in both `build/webpack.dev.conf.js` and `build/webpack.prod.conf.js` so that jQuery and Lodash become globally available to all your modules (and also Tether for Bootstrap):

#### build/webpack.dev.conf.js, build/webpack.prod.conf.js

```js
  plugins: [
    
    // ...
      
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      '_': 'lodash',
      'Tether': 'tether',
      utils: 'utils'
    })
  ]
```

*Note: The `utils` property is for a set of utility functions we want global to all modules. See the section [Global Utilities](#global-utilities) for more information on how this is set up.*

#### Option #2: Use Expose Loader module for webpack

Alternatively you can add the [Expose Loader](https://www.npmjs.com/package/expose-loader)  package:

```shell
npm install expose-loader --save-dev
```

Use in your entry point `main.js` like this:

```shell
import 'expose?$!expose?jQuery!jquery'

// ...
```
## Global Utilities

Using the `ProvidePlugin` in the previous section, we were able to include jQuery and Lodash in all modules that used it. But these were from node_modules. What if we want to do this with one of our own modules from our project (so we don't have to directly require it each time we need it). In the previous section you can see we added `utils` to the ProvidePlugin. Now let's actually create a module (in the Node form) in our `src/` directory for keeping these utilities we want globally:

#### src/utils.js

```js

module.exports = {

  /**
   * Get the error from a response.
   *
   * @param {Response} response The Vue-resource Response that we will try to get errors from.
   */
  getError: function (response) {
    return response.body['error_description']
      ? response.body.error_description
      : response.statusText
  }
}

``` 

In the section [Configure ESLint](#configure-eslint) you will notice we have added **utils** to the globals so that the linter will not complain when we use it. 

For the `utils` to work in the ProvidePlugin you could just require it directly, but it gives a warning and build fails (because it's an expression). So let's work around this by adding it to the set of aliases in `webpack.base.conf.js`:

#### build/webpack.base.conf.js

```js

module.exports = {
  
  // ...
  
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'utils': resolve('src/utils')
    }
  },

  // ...
  
 }

```

So we use the `utils` alias in the plugin:

#### build/webpack.dev.conf.js, build/webpack.prod.conf.js

```js
  plugins: [
    
    // ...
      
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      '_': 'lodash',
      'Tether': 'tether',
      utils: 'utils'
    })
  ]
```

Take a look in the `Login.vue` component to see how we use this utility to display an error message (when login credentials are invalid). Note: A more scalable way to handle responses/errors in your app would be to standardize them in your backend API. For example, when an error happens, the backend API can still return a 200, but include an error property with detail in the returned response JSON.

## Configure Sublime Text 3

#### Install Package Control
https://packagecontrol.io/installation

#### Install Babel syntax definitions for ES6 JavaScript

 * Go to `Preferences > Package Control > Install Package` or press `ctrl+shift+p` (Win, Linux) or `cmd+shift+p` (OS X) and  search for "Package Control: Install Package".
 * Search for the package "Babel" and install it.
 * Open any .js file in Sublime. Then go to `View > Syntax > Open all with current extension as... > Babel > Javascript (Babel)`.

#### Install a theme that works well with Babel. 
For example, here's how you can install the **Oceanic Next** theme:

 * Try the Oceanic Next theme: `Open Package Control -> Install Package` and search for Oceanic Next color theme.
 * Go to `Preferences > Oceanic Next Color theme > Oceanic next`.

#### Setup soft tabs and 2 space indention

 * Open any .js file. Go to `Preferences > Settings - More > Syntax Specific - User`.
 * It should open a file like `JavaScript (Babel).sublime-settings`
 * Add these parameters to the file:  

```
{
  "extensions":
  [
    "js"
  ],
  "tab_size": 2,
    "translate_tabs_to_spaces": true
}

```
 * Open any .vue file and repeat this process.

#### Install Stylus package for Sublime

 * Open `Package Control: Install Package` and search for `Stylus` and install it (should be billymoon/Stylus package).
 * Restart Sublime.

#### Install Sublime-linter and ESLinter

 * Open `Package Control: Install Package` and search for `SublimeLinter` and install it.
 * Search for `SublimeLinter-contrib-eslint` and install it as well.
 * Restart Sublime.

 *Note: In the next section you'll configure eslint. If you install eslint into the same directory you are modifying Sublime files from (and same machine), then Sublimelinter will have no problem using it. Or you can also install eslint (and all the other eslint-* packages) globally on the same machine as Sublime. But if you are using a server or a virtual machine (Vagrant/Virtualbox) configuration, then you need to tell sublimelinter where eslint is. You can change the path with `Sublime Text -> Prefences -> Package Settings -> SublimeLinter -> Settings-User`.*

## Configure ESLint

Let's add some more things to eslint from the default given. You'll need to restart Sublime each time you makes changes to this file. One thing to point out is the `env` and `globals` properties. These are necessary so eslint doesn't complain about use of these globals in our JS files (and so we don't have to add something like `/* globals localStorage */` to the top of those files to suppress the errors). See other sections in this tutorial, [Configure JQuery](#configure-jquery) and [Global Helpers](#global-helpers) for information about working in a global context in Webpack.

Make sure you installed the additional eslint dependencies:

```shell
$ npm install eslint-config-vue eslint-plugin-vue --save-dev
```

Now open up your eslintrc.js file and make the following changes:

#### eslintrc.js

```js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // required for eslint-config-vue
  extends: 'vue',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  env: {
    browser: true
  },
  globals: {
    '$': true,
    '_': true,
    'utils': true
  }, 
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
```

#### .eslintignore

You can tell ESLint to [ignore specific files and directories](http://eslint.org/docs/user-guide/configuring.html#ignoring-files-and-directories) by using an `.eslintignore` file in your project’s root directory: 

**.eslintignore**

    build/*.js
    config/*.js

The ignore patterns behave according to the `.gitignore` specification.
(Don't forget to restart your editor, ie. SublimeText3)

## Setup Main and Routes

#### src/main.js

```js
/* Twitter Bootstrap JS (this could also be handled in an app.js file) */
require('bootstrap')

/* Vue */
import Vue from 'vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false

/* App sass */
import './assets/style/app.scss'

/* App component */
import App from './components/App.vue'

/* Auth plugin */
import Auth from './auth'
Vue.use(Auth)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // Attach the Vue instance to the window,
  // so it's available globally.
  created: function () {
    window.Vue = this
  },
  router,
  store,
  render: h => h(App)
})

```
#### src/router/index.js

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Each of these routes are loaded asynchronously, when a user first navigates to each corresponding endpoint.
    // The route will load once into memory, the first time it's called, and no more on future calls.
    // This behavior can be observed on the network tab of your browser dev tools.
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require(['@/components/login/Login.vue'], resolve)
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: function (resolve) {
        require(['@/components/signup/Signup.vue'], resolve)
      }
    },
    {
      path: '/',
      name: 'dashboard',
      component: function (resolve) {
        require(['@/components/dashboard/Dashboard.vue'], resolve)
      },
      beforeEnter: guardRoute
    }
  ]
})

function guardRoute (to, from, next) {
  // work-around to get to the Vuex store (as of Vue 2.0)
  const auth = router.app.$options.store.state.auth

  if (!auth.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default router

```

## Setup Authentication, User Profile, and Vuex

Create a folder called `store` in the `src` directory:

```shell
$ mkdir store
``` 
  
Now let's create the following files that will comprise our central Vuex storage.

### Vuex State

Let's setup the state of our central data storage. We'll want some state to be available accross browser tabs (and when the app is closed/reopened) so let's sync this state with LocalStorage. When the app bootstraps, we want to first check in the browser's localStorage and retrieve all of our previously stored data. We'll also have other state we can use for to make component-to-component communication easier (for situations where you don't have a simple parent-child communication, but more complex sibling-to-sibling or other component relationships). Let's just add a property for storing the search text and button press on the navbar for demonstration purposes. 

#### src/store/state.js

```js
// Set the key we'll use in local storage.
// Go to Chrome dev tools, application tab, click "Local Storage" and "http://localhost:8080"
// and you'll see this key set below (if logged in):
export const STORAGE_KEY = 'example-vue-project'

let initialState = {}

// Local storage sync state
if (localStorage.getItem(STORAGE_KEY)) {
  initialState = JSON.parse(localStorage.getItem(STORAGE_KEY))
} else {
  initialState = {
    auth: {
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null
    },
    user: {
      name: null
    }
  }
}

// Other state (not synced in local storage)
initialState.appnav = {
  searchText: '',
  searchTimestamp: null
}

export const state = initialState

```

### Vuex Mutations, Getters, and Actions

Now create a file to hold all the methods that will change the state in our Vuex store:

#### src/store/mutations.js

```js
export const UPDATE_AUTH = (state, auth) => {
  state.auth = auth
}

export const UPDATE_USER = (state, user) => {
  state.user = user
}

export const APPNAV_SEARCH = (state, searchData) => {
  state.appnav = searchData
}

/**
 * Clear each property, one by one, so reactivity still works.
 *
 * (ie. clear out state.auth.isLoggedIn so Navbar component automatically reacts to logged out state,
 * and the Navbar menu adjusts accordingly)
 *
 * TODO: use a common import of default state to reset these values with.
 */
export const CLEAR_ALL_DATA = (state) => {
  // Auth
  state.auth.isLoggedIn = false
  state.auth.accessToken = null
  state.auth.refreshToken = null

  // User
  state.user.name = ''
}


```

And some getters (although you can accesss the Vuex state directly as we'll see shortly):

#### src/store/getters.js

```js
export const user = state => state.user
```

We'll also go ahead and add an actions file (but leave it empty for this project since we don't need it):

#### src/store/actions.js

```js
// Here is where you can put async operations.
// See the Vuex official docs for more information.

// ...

```

### Vuex Plugins
Plugins offer a nice approach to hook into mutations and do things like logging or syncing with another store such as `localStorage` or `websockets`:

#### src/store/plugins.js

```js
import { STORAGE_KEY } from './state'

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    const syncedData = { auth: state.auth, user: state.user }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(syncedData))

    if (mutation.type === 'CLEAR_ALL_DATA') {
      localStorage.removeItem(STORAGE_KEY)
    }
  })
}

// TODO: setup env
// export default process.env.NODE_ENV !== 'production' ? [localStoragePlugin] : [localStoragePlugin]
export default [localStoragePlugin]

```

### Vuex index.js

And bring it all together in the index.js file:

#### src/store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins
})

export default store
```
### Auth Script

Now let's add our auth script. Here we handle getting **OAuth2** access_tokens and automatically refreshing them.

#### src/auth.js

```js
import Vue from 'vue'
import router from './router'
import store from './store'

/**
 * @var{string} LOGIN_URL The endpoint for logging in. This endpoint should be proxied by Webpack dev server
 *    and maybe nginx in production (cleaner calls and avoids CORS issues).
 */
const LOGIN_URL = '/auth'

/**
 * @var{string} REFRESH_TOKEN_URL The endpoint for refreshing an access_token. This endpoint should be proxied
 *    by Webpack dev server and maybe nginx in production (cleaner calls and avoids CORS issues).
 */
const REFRESH_TOKEN_URL = '/auth'

/**
 * TODO: This is here to demonstrate what an OAuth server will want. Ultimately you don't want to
 * expose a client_secret here. You want your real project backend to take a username/password
 * request and add the client secret on the server-side and forward that request
 * onto an OAuth server. Your backend acts as a middle-man in the process, which is better, for
 * example in situations like DDoS attacks.
 *
 * @var{Object} AUTH_BASIC_HEADERS The options to pass into a Vue-resource http call. Includes
 *    the headers used for login and token refresh and emulateJSON flag since we are hitting an
 *    OAuth server directly that can't handle application/json.
 */
const AUTH_BASIC_HEADERS = {
  headers: {
    'Authorization': 'Basic ZGVtb2FwcDpkZW1vcGFzcw==' // Base64(client_id:client_secret) "demoapp:demopass"
  },
  emulateJSON: true
}

/**
* Auth Plugin
*
* (see https://vuejs.org/v2/guide/plugins.html for more info on Vue.js plugins)
*
* Handles login and token authentication using OAuth2.
*/
export default {

  /**
   * Install the Auth class.
   *
   * Creates a Vue-resource http interceptor to handle automatically adding auth headers
   * and refreshing tokens. Then attaches this object to the global Vue (as Vue.auth).
   *
   * @param {Object} Vue The global Vue.
   * @param {Object} options Any options we want to have in our plugin.
   * @return {void}
   */
  install (Vue, options) {
    Vue.http.interceptors.push((request, next) => {
      const token = store.state.auth.accessToken
      const hasAuthHeader = request.headers.has('Authorization')

      if (token && !hasAuthHeader) {
        this.setAuthHeader(request)
      }

      next((response) => {
        if (this._isInvalidToken(response)) {
          return this._refreshToken(request)
        }
      })
    })

    Vue.prototype.$auth = Vue.auth = this
  },

  /**
   * Login
   *
   * @param {Object.<string>} creds The username and password for logging in.
   * @param {string|null} redirect The name of the Route to redirect to.
   * @return {Promise}
   */
  login (creds, redirect) {
    const params = { 'grant_type': 'password', 'username': creds.username, 'password': creds.password }

    return Vue.http.post(LOGIN_URL, params, AUTH_BASIC_HEADERS)
      .then((response) => {
        this._storeToken(response)

        if (redirect) {
          router.push({ name: redirect })
        }

        return response
      })
      .catch((errorResponse) => {
        return errorResponse
      })
  },

  /**
   * Logout
   *
   * Clear all data in our Vuex store (which resets logged-in status) and redirect back
   * to login form.
   *
   * @return {void}
   */
  logout () {
    store.commit('CLEAR_ALL_DATA')
    router.push({ name: 'login' })
  },

  /**
   * Set the Authorization header on a Vue-resource Request.
   *
   * @param {Request} request The Vue-Resource Request instance to set the header on.
   * @return {void}
   */
  setAuthHeader (request) {
    request.headers.set('Authorization', 'Bearer ' + store.state.auth.accessToken)
    // The demo Oauth2 server we are using requires this param, but normally you only set the header.
    /* eslint-disable camelcase */
    request.params.access_token = store.state.auth.accessToken
  },

  /**
   * Retry the original request.
   *
   * Let's retry the user's original target request that had recieved a invalid token response
   * (which we fixed with a token refresh).
   *
   * @param {Request} request The Vue-resource Request instance to use to repeat an http call.
   * @return {Promise}
   */
  _retry (request) {
    this.setAuthHeader(request)

    return Vue.http(request)
      .then((response) => {
        return response
      })
      .catch((response) => {
        return response
      })
  },

  /**
   * Refresh the access token
   *
   * Make an ajax call to the OAuth2 server to refresh the access token (using our refresh token).
   *
   * @private
   * @param {Request} request Vue-resource Request instance, the original request that we'll retry.
   * @return {Promise}
   */
  _refreshToken (request) {
    const params = { 'grant_type': 'refresh_token', 'refresh_token': store.state.auth.refreshToken }

    return Vue.http.post(REFRESH_TOKEN_URL, params, AUTH_BASIC_HEADERS)
      .then((result) => {
        this._storeToken(result)
        return this._retry(request)
      })
      .catch((errorResponse) => {
        if (this._isInvalidToken(errorResponse)) {
          this.logout()
        }
        return errorResponse
      })
  },

  /**
   * Store tokens
   *
   * Update the Vuex store with the access/refresh tokens received from the response from
   * the Oauth2 server.
   *
   * @private
   * @param {Response} response Vue-resource Response instance from an OAuth2 server.
   *      that contains our tokens.
   * @return {void}
   */
  _storeToken (response) {
    const auth = store.state.auth
    const user = store.state.user

    auth.isLoggedIn = true
    auth.accessToken = response.body.access_token
    auth.refreshToken = response.body.refresh_token
    // TODO: get user's name from response from Oauth server.
    user.name = 'John Smith'

    store.commit('UPDATE_AUTH', auth)
    store.commit('UPDATE_USER', user)
  },

  /**
   * Check if the Vue-resource Response is an invalid token response.
   *
   * @private
   * @param {Response} response The Vue-resource Response instance received from an http call.
   * @return {boolean}
   */
  _isInvalidToken (response) {
    const status = response.status
    const error = response.data.error

    return (status === 401 && (error === 'invalid_token' || error === 'expired_token'))
  }
}

```

Checkout out `Login.vue` component to see how we use `Auth`. Also take a look at `Dashboard.vue` component, you can see the Vue-resource http interceptors let us not worry about including authorization headers in our AJAX calls. The interceptors also take care of refreshing tokens behind the scenes. See the comments marked "TODO" for some caveats with this demo and your own project. I hope to update this demo using a Node Express OAuth2 server for better demonstration of Auth flow. 

## Proxy Api Calls in Webpack Dev Server

When using Webpack for Hot Reloading, we'll need to tell the webpack dev server that `/api` calls need to be reverse proxied to another server (ie. running on node express, nginx, or some embedded server in your backend IDE). For production you would just use nginx to do the proxying. The big advantage is we don't have to worry about CORS and also we don't expose the true API endpoints to the client.

Notice in `build/dev-server.js` this line:

```js
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})
```
  
In this setup we are using: https://github.com/chimurai/http-proxy-middleware (you can see examples there). So let's add options to our config to make this work:

In `config/index.js`, update the *proxyTable* object to look like this:

```js
dev:  {

    // ...
    
    proxyTable: {
      '/auth': {
        // TODO: Update to use node express oauth2 server for better example.
        target: 'http://brentertainment.com/oauth2/lockdin/token',  // <-- demo oauth2 server, https://github.com/bshaffer/oauth2-demo-php
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/auth': ''
        },
        router: {
        }
      },
      '/api': {
        target: 'http://brentertainment.com/oauth2',  // api server
        changeOrigin: true,                           // needed for virtual hosted sites
        ws: true,                                     // proxy websockets
        pathRewrite: {
          '^/api': '/lockdin'     // rewrite path localhost:8080/api to http://brentertainment.com/oauth2/lockdin
        },
        router: {
          // when request.headers.host == 'dev.localhost:3000',
          // override target 'http://www.example.org' to 'http://localhost:8000'
          // 'dev.localhost:3000': 'http://localhost:8000'
        }
      }
    },
    
    // ...
}
```
      
## Components

Delete the `App.vue` file located in /src folder:

```shell
$ rm App.vue
```
  
In the `/src/components` folder create the following folders and .Vue files (just copy these directly from this repo):

```
/src
  /components
    - App.vue
    - AppFooter.vue
    - AppNav.vue
    - Hello.vue
    /common
      - Countries.vue
      - Spinner.vue
      - countries.data.js
    /dashboard
      - Dashboard.vue
      - AddressModal.vue
    /login
      - Login.vue
    /signup
      - Signup.vue
    /users

```

Here we use a folder for each "page" in our SPA. This allows us to represent "pages" with more than a single .Vue file. We can ad other supporting .Vue components, .js files, or data files. There's also a `common` folder to put any components we feel don't necessarily belong to a page parent. If over time you feel there are too many folders, you can further group/consolidate pages into folders ("page group folders").


## Twitter Bootstrap 4 Configuration

 - Install Bootstrap 4 and Tether.js, see section: [Add Dependencies](#add-dependencies).
 - Add Tether to providePlugin, see section: [Configure JQuery and Lodash and Tether](#configure-jquery-and-lodash-and-tether)
 - Require in main.js: see section: [Setup Main and Routes](#setup-main-and-routes)
 - Add a folder `style` (if you haven't already) to your `/assets` directory and create the following file:

#### src/assets/style/_variables.scss

```scss
// copy and paste here everything from the node_modules/bootstrap/scss/_variables.scss
// Then make adjustments to variables for your specific app.

```
 - Import into your app.scss, see section: [App scss](#app-scss).

## Fonts and Font-Awesome

Install packages (if you haven't already from earlier section ):

```
npm install font-awesome roboto-fontface --save-dev
```

Then add `_fonts.scss` stylesheet. We'll setup your fonts and also `font-awesome` here:

#### src/assets/style/_fonts.scss

```scss
/* Font Awesome */
$fa-font-path: '../../../node_modules/font-awesome/fonts';
@import '../../../node_modules/font-awesome/scss/font-awesome';

/* Roboto */
$roboto-font-path: '../../../node_modules/roboto-fontface/fonts';
@import '../../../node_modules/roboto-fontface/css/roboto/sass/roboto-fontface';

```

## Images and Other Assets

Create an images folder at `src/assets/images` then cut an paste the Vue `logo.png` file that resides in the assets folder by default. The Navbar component uses a relative link to this image, which Webpack will resolve for us automatically.

You can read more about static assets here: https://vuejs-templates.github.io/webpack/static.html

## App scss

Bring everything to together into an `app.scss` file that we import in our main entry:

#### src/assets/style/app.scss

```
@import 'fonts';
@import 'variables';
@import '../../../node_modules/bootstrap/scss/bootstrap';
@import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';

```

Of course if this file gets too big, you can break it up into different supporting files: `_forms.scss`, `_blah-blah.scss`, etc.

## Unit Testing and End-to-End Testing

Make sure you installed `babel-polyfill` earlier in this tutorial or es6 promises won't work in PhantomJS. If you didn't, you can install it with:  

```shell
npm install babel-polyfill --save-dev 
```

Then update your `test/unit/karma.conf.js` file to include the polyfill:


#### test/unit/karma.conf.js

```js

    //...

    files: [
      '../../node_modules/babel-polyfill/dist/polyfill.js',
      './index.js'
    ],
```

A unit test is included from the Webpack template already. It's a simple example that tests the content outputted from the Hello vue component:

#### test/unit/specs/Hello.spec.js

```js
import Vue from 'vue'
import Hello from 'src/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Hello)
    })
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})

```

#### End-to-End Testing with Nightwatch.js and Selenium server

I find End-to-End testing and Integration testing even more beneficial. Vue-cli has put together a nice setup that includes Nightwatch.js (which uses Selenium and a Chrome driver) for e2e testing right out of the box. Let's remove the existing test located at `test/e2e/specs/test.js` since it will no longer work with the changes we have made. Let's add a new test that tests that our login form works and that we can reach the dashboard:

#### test/e2e/specs/loginTest.js

```js
// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

/**
 * Test that user can login and see dashboard.
 */
module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)

      // Assert that user can see login.
      .assert.elementPresent('.login')
      .setValue('.js-login__username', 'demouser')
      .setValue('.js-login__password', 'testpass')
      .click('.js-login__submit')
      .pause(1000)

      // Assert that user can see dashboard.
      .assert.containsText('.ev-dashboard__heading h1', 'This is the dashboard')
      .pause(2000)
      .end()
  }
}

```

*Note: You may wish to add another `assert` that asserts the dashboard is unreachable when a user is logged out.*

#### Running the Tests

Now let's run both the unit test and the e2e test. Make sure you are in your project directory, then:

```shell
npm run test
```

You should see some output initially showing the results of each unit test ran:

> Hello.vue  
    ✓ should render correct contents  
    ...  
    PhantomJS 2.1.1 (Linux 0.0.0): Executed 1 of 1 SUCCESS (0.018 secs / 0.004 secs)
TOTAL: 1 SUCCESS     
    
Then the Selenium server will fire up Chrome browser and run the e2e tests to see if those pass:

>  ✔ Element <#app> was visible after 65 milliseconds.  
 ✔ Testing if element <.ev-login> is present.  
 ✔ Testing if element <.ev-dashboard__heading> contains text: "This is the dashboard".  
 ...  
OK. 3 assertions passed. (18.522s)  

You can of course run unit tests and e2e tests seperately with: `npm run unit` and `npm run e2e`.

## Run the Dev Server

Run the dev server:

```shell
$ cd ~/example-vue-project 
$ npm run dev
```

Open your browser and visit http://localhost:8080 . You should see something like this:
    
          
<img src="docs/images/home-page.png" width=1200 />

## Vue Dev Tools

Visit the Chrome Web Store to get the [Vue Dev Tools extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)  for helping debug Vue.js applications.

Once installed, Open Chrome dev tools and go to the "Vue" tab.

#### Vuex Tab
If you click on the "Vuex" tab, you can see all data from the store in the right pane. Click the `export button` to copy the data to the clipboard. Click the `import button` and paste the clipboard data there. 

For example, you can alter the *accessToken* to something invalid (to simulate an expired *oauth access_token* without waiting on actual expiration) in the pasted data. Then click the `import button` again and the Vuex store will live update. Now you can confirm that the automatic refreshToken interceptor works.

## Create and Publish a Library for Other Developers to Use

So now you want to go further and develop a component that others can `npm install` and import into their own project?  
Here you go: https://github.com/prograhammer/vue-library-template  

## Quick Learning Webpack Resources

- SurviveJs: https://survivejs.com/webpack/introduction/  
- Official Webpack Tutorial: https://webpack.js.org/guides/get-started/  
