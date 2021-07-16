---
title: Vue Basic Intro
categories:
- web前端
- vue
tags:
- vue
---
# Reactivity

let us show an example on relationship with variables.

```js
let a = 3
let b = a * 10
console.log(b) // 30
a = 4
console.log(b) // 30
// if we want b to change when a changed
b = a * 10
console.log(b) // 40

```

so if we have a function to exec when a changed. let us say.
```js
onAChanged(() => {
  b = a * 10
})
```

now, when we move to DOM.
```html
<span class="cell b1">{{ b }}</span>
<script>
// when a change
onStateChanged(() => {
  document.querySelector('cell.b').textContent = state.a * 10
})
// in other expression
onStateChanged(() => {
  view = render(state)
})
</script>

```

in react.
```js
onStateChanged(() => {
  view = render(state)
})
setState({ a: 5 })
```

### EXERCISE

Implement a convert function that

- take an Object as the argument

- convert the Object's property to place into getter/setters using Object.defineProperty.

- The converted object should retain origin behavior, but at the sanme time log all the get/set operations.

```js
function convert (obj) {
  Object.keys(obj).forEach(key => {
    let internalVal = obj[key]
    Object.defineProperty(obj, key, {
      get () {
        console.log(`getting key "${key}": "${internalVal}"`)
        return internalVal
      },
      set (newValue) {
        console.log(`set key "${key}": "${newValue}"`)
        internalVal = newValue 
      }
    })
  })
}

```

### EXERCISE Dependency

- create Dep class with two methods: depend and notify

- create an autorun function that takes an updater function.

- Inside the update function, you can explicitly depend on an instance of Dep by calling dep.depend()

- later, you can triggle the update function to run aigain by calling dep.notify()

```js
window.Dep = class Dep {
  constructor () {
    this.subcribers = new Set()
  }
  depend () {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

let activeUpdate
function autorun (update) {
  function wrappedUpdate () {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}

```

### EXERCISE Observer

Combine the previous two functions, renaming convert() to observe() and keeping autorun():

- observe(): converts the properties in the received object and make them reactive.For each converted peroperty, it gets assigned a Dep instance which keeps tracks of a list of subscribing update function, and triggers them to re-run when its setter is invoked.

- autorun(): takes an update function and re-runs it when properties that the update function subcribes to have been mutated. An update function is said to be "subscribe" to a property if it relies on that property during its evalution.

```js
function observe(obj) {

}

function autorun (update) {

}
```

# Plugins

two methods to write plugins
```js
function (Vue, options) {
  // plugin code
}

Vue.mixin(options)
```

### EXERCISE simple plugin

create a plugin that teaches Vue components to handle a custom "rules" option. The rules option expects an object that specifies validation rules for data in the component.

Expected usage:

```js

const RulesPlugin = {
  install (Vue) {
    Vue.mixin({
      created () {
        if (this.$options.rules) {
          Object.keys(this.$options.rules).forEach(key => {
            const rule = this.$options.rules[key]
            this.$watch(key, newValue => {
              const result = rule.validate(newValue)
              if (!result) {
                console.log(rule.message)
              }
            })
          })
        }
      }
    })
  }
}

Vue.use(RulesPlugin)

const vm = new Vue({
  data: { foo: 10 },
  rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater than one'
    }
  }
})

```


# Render

Template
-> (compiled into) Render Function
-> (returns) Virtual DOM
-> (generates) Actual DOM

> Actual DOM

```
document.createElement('div')

"[Object HTMLDivElement]" Browser Native Object (expensive)
```

> Virtual DOM

```
vm.$createElement('div')
{ tag: 'div', data: { attrs: {}}, children: [] } Plain Javascript Object (cheap)
```

### Vue Render Function API

```js
export default {
  render (h) {
    return h('div', {}, [])
  }
}
```

> examples

```js
h('div', 'some text')

h('div', { class: 'foo' }, 'some text' )

h('div' { }, [
  'some text',
  h('span', 'bar')
])
```

> h can directly render a component

```js
import MyComponent from '...'

h(MyComponent, {
  props: {}
})
```

### EXERCISE render tags

Implement the 'example' component which given the following usage:

```html
<example :tags="['h1', 'h2', 'h3']"></example>
```

which renders the expected output:

```html
<div>
  <h1>0</h1>
  <h2>1</h2>
  <h3>2</h3>
</div>
```

> Solution

```html
<script src="./node_modules/vue/dist/vue.js"></script>

<div id="app">
  <example :tags="['h1', 'h2', 'h3']"></example>
</div>

<script>
  Vue.component('example', {
    props: ['tags']
    render (h) {
      return h('div', this.tags.map((tag, i) => h(tag, i)))
    }
  })

  new Vue({
    el: '#app'
  })
</script>
```

if example is a functional component, code may write like this

```js
Vue.component('example', {
  props: ['tags']
  functional: true,
  render (h, context) {
    return h('div', context.props.tags.map((tag, i) => h(tag, i)))
  }
})
```

### EXERCISE render Component

- Implement a Foo component wihich simple render `<div>foo</div>`, and a Bar component which simple renders `<div>bar</div>` (using render function obviously)

- Implement an <example> component which renders the Foo component or the Bar component based on its `ok` prop. For <example> if ok is true, the final renderd dom should be `<div>foo</div>`

- Implement a button in the root component that toggles `<example>` between `Foo` and `Bar` by controlling its `ok` prop.

> Solution

```html
<script src="./node_modules/vue/dist/vue.js"></script>

<div id="app">
  <example :ok="ok"></example>
  <button @click="ok = !ok"></button>
</div>

<script>
  const Foo = {
    render: h => h('div', 'foo')
  }
  const Bar = {
    render: h => h('div', 'bar')
  }
  Vue.component('example', {
    props: ['ok']
    render (h) {
      return this.ok ? h(Foo) : h(Bar)
    }
  })

  new Vue({
    el: '#app',
    data: { ok: true }
  })
</script>
```
### EXERCISE Higher Order Component

- Implement a withAvatarURL helper which takes an inner component that expects a `url` prop, and return a higher-order component that accepts a `username` prop instead. The higher-order component should be responsible for fetching the curresponding svatar url from a mocked API.

- Before the API returns, the higher-order component should be passing a placeholder URL http://test.com/test.png to the inner component.

The exercise provides a base `Avatar` component. The usage should look like this.

```js
const SmartAvatar = withAvatarURL(Avatar)
```

> Solution

```html
<script src="./node_modules/vue/dist/vue.js"></script>

<div id="app">
  <smart-avatar username="vuejs"></smart-avatar>
</div>

<script>

  function fetchURL (username, cb) {
    setTiemout(() =>{
      cb('http://test.url')
    }, 500)
  }
  const Avatar = {
    props: ['src'],
    template: '<img :src="src">'
  }

  function withAvatarURL (InnerComponent) {
    return {
      props: ['username'],
      created () {
        fetchURL(this.username, url => {
          this.url = url
        })
      },
      data () {
        return { url: 'http://test.com/test.png' }
      },
      render (h) {
        return h (Avatar, {
          props: {
            src: this.url
          }
        })
      }
    }
  }

  const SmartAvatar = withAvatarURL(Avatar)

  new Vue({
    el: '#app',
    component: { SmartAvatar }
  })
</script>
```

# VUEX

### shared object

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
if `count` can be reactivity, using Vue

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

we can use more vuex like sytax

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

# vue route

### EXERCISE 

- display foo component when url is #foo

- display bar component when url is #bar

```html
<script src="./node_modules/vue/dist/vue.js"></script>

<div id="app">
  <component :is="url"></component>
  <a href="#bar"></a>
  <a href="#foo"></a>
</div>
<script>
window.addEventListener('hashchange', () => {
  app.url = window.location.hash.slice(1)
})

const app = new Vue({
  el: '#app',
  data: {
    url: window.location.hash.slice(1)
  },
  components: {
    foo: { template: `<div>foo</div>` },
    bar: { template: `<div>bar</div>` }
  }
})
</script>
```

using route table

```html
<script src="./node_modules/vue/dist/vue.js"></script>

<div id="app">
  <component :is="url"></component>
  <a href="#bar"></a>
  <a href="#foo"></a>
</div>
<script>
window.addEventListener('hashchange', () => {
  app.url = window.location.hash.slice(1)
})

const Bar = { template: `<div>bar</div>`}
const Foo = { template: `<div>foo</div>`}
const NotFound = { template: `<div>not found</div>`}

const routeTable = {
  'bar': Bar,
  'foo': Foo,
  'notfound': NotFound
}

const app = new Vue({
  el: '#app',
  data: {
    url: window.location.hash.slice(1)
  },
  render (h) {
    h(routeTable[this.url])
  }
})
</script>
```

