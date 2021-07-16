title: Vue2 Route
categories:
- web前端
- vue
tags:
- vue
- vue2
- route
---

# route

## Basic Route

Simple route if we have a `<a href="#bar"></a>` when we click it, we can notify window `hashchange` event.

Let's do an simple EXERCISE.

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

## Using Route Table

we can use route table to store route info.

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

## Complex Route Rules