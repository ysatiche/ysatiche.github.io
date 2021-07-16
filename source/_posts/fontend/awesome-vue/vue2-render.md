title: Vue2 Render
categories:
- web前端
- vue
tags:
- vue
- vue2
- render
---

# Render

## what's render?(include DOM and virtual DOM)

Let's see the Vue Reactivity System.

![Vue Reactivity System](../IMAGES/vue2-render-renderSystem.png)

In Vue2, Template (when we write *.vue file) it would be

-> (compiled into) Render Function

-> (returns) Virtual DOM

-> (generates) Actual DOM

so, what's diffirence between Virtual DOM and Actual DOM

> Actual DOM

```js
document.createElement('div')

"[Object HTMLDivElement]" Browser Native Object (expensive)
```

> Virtual DOM

```js
vm.$createElement('div')
{ tag: 'div', data: { attrs: {}}, children: [] } Plain Javascript Object (cheap)
```

As picture shows, vue2 use Component Render Function to generate Virtual DOM Tree, so we should understand Component Render Function first if we want to understand whole Vue Render System.

## Vue Render Function API usage

Render Function `h()` in Vue is the Key Function to render DOM.

there are basic usages below.


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

## Render Exercise in Vue2.

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
