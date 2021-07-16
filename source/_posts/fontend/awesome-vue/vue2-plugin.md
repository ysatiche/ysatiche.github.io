title: Vue2 Plugin
categories:
- web前端
- vue
tags:
- vue
- vue2
- plugin
---

# Plugin

## write plugins in vue2

there are two common methods to write plugins in vue2.

```js
function (Vue, options) {
  // plugin code
}
```

and use Vue.mixins

```js
Vue.mixin(options)
```

## write a simple validation plugin

create a plugin that teaches Vue components to handle a custom "rules" option. The rules option expects an object that specifies validation rules for data in the component.

Expected usage:

```js
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

Solution

In vue2, you can use `this.$options.rule` to get `rule` defined in Vue.

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
```