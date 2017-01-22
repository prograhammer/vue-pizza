<template>
<div class="ev-dashboard">
<div class="h1">This is the dashboard</div>
<div class="card">
  <div class="card-header">
    Example #1
  </div>
  <div class="card-block">
    <h4 class="card-title">Parent-Child Flow</h4>
    <p class="card-text">Communication from the parent flows into the child via props. Parent data can be reactively connected to a child prop, so that when the parent changes a value the child prop is changed. Childs cannot change their own props, but can communicate to any parent by emitting events. Parents can choose to pick up that event and update their own data. <strong>This in turn updates the child prop, but Vue prevents a loop (stack overflow!) from happening here. Yay!</strong> </p>
    <a href="#" class="btn btn-primary">Open child modal</a>
  </div>
</div>
<br>
<div class="card">
  <div class="card-header">
    Example #2
  </div>
  <div class="card-block">
    <h4 class="card-title">No Need for an Event-Bus, use Vuex!</h4>
    <p class="card-text">
      Let's use Vue with Vuex to react and watch for changes in another component. I've stored four values in Vuex to represent different ways state and events can be handled.     

      <div class="alert alert-info" role="alert">
        <strong>Heads up!</strong> Use the search in the navbar and watch the changes in the code block below:
      </div>
      <pre class="text-muted">
        initialState.appnav = {
          searchText: {{ $store.state.appnav.searchText }},
          searchTimestamp: {{ $store.state.appnav.searchTimestamp }}
        }
      </pre>
      <p><strong>But Don't I Still Need an Event Bus?</strong><br>
      The purpose of listeners is to take an event and make a state change. So say you have a component that is emitting events. Why not make its direct parent responsible for any listening (and state change) your app needs? Other interested components can react to or watch that state change. The event may simply be something like "press a button to make ajax call" with no other information associated. A user may press this button over and over. You could still store some new timestamp representing each press. Most of the time you will probably have some better state representation. In the example above, the property <code>searchText</code> alone is enough state for a "results" component to watch for changes on. Even if a user wanted to re-submit the same search text, you could very easily commit a cleared search string to Vuex first, then follow with another commit of the actual text.</p>

      <p><strong>The Advantages</strong><br>The advantages are that you can explicitely list the state in Vuex that your app is interested in. Your app is probably not interested in all the events coming out of vendor components. This is an app that is much easer to reason about! You also get the Vuex dev-tools which makes debugging much nicer!</p>
    </p>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.ev-dashboard {
  margin-top: 60px;
}

</style>