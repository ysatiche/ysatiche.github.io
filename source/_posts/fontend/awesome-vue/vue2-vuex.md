title: Vue2 Vuex
categories:
- web前端
- vue
tags:
- vue
- vue2
- vuex
---

# VUEX

## shared object

if we want to have a shared object in more reuseful vue component.we can get the object out like this.

```js
const state = {
  count: 0
}

const Counter = {
  data () {
    return state
  },
  render (h) {
    return h('div', this.count)
  }
}

new Vue({
  el: '#app',
  components: { Counter }
})
```

## shared object to be reactivity

if `count` can be reactivity, using Vue, we know the data defined in vue is reactivity. 

```html
<script src="./node_modules/vue/dist/vue.js"></script>

<div id="app">
  <counter></counter>
  <counter></counter>
  <counter></counter>
  <button @click="inc">inc</button>
</div>
<script>
const state = new Vue({
  data: {
    return () {
      count: 0
    }
  },
  methods: {
    inc () {
      this.count++
    }
  }
})
const Counter = {
  render (h) {
    return h('div', state.count)
  }
}

new Vue({
  el: '#app',
  components: { Counter },
  methods: {
    inc () {
      state.inc()
    }
  }
})
</script>
```

we can change the syntax style. make it more like vuex syntax

```html
<script src="./node_modules/vue/dist/vue.js"></script>

<div id="app">
  <counter></counter>
  <counter></counter>
  <counter></counter>
  <button @click="inc">inc</button>
</div>
<script>
function createStore ({ state, mutations }) {
  return new Vue({
    data: { state },
    methods: {
      commit (mutationType) {
        mutations[mutationType](this.state)
      }
    }
  })
}

const store = createStore({
  state: { count: 0 },
  mutations: {
    inc (state) {
      state.count++
    }
  }
})
const Counter = {
  render (h) {
    return h('div', store.state.count)
  }
}

new Vue({
  el: '#app',
  components: { Counter },
  methods: {
    inc () {
      store.commit('inc')
    }
  }
})
</script>
```


