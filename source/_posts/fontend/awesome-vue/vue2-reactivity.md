title: Vue2 Reactivity
categories:
- web前端
- vue
tags:
- vue
- vue2
- reactivity
---
# Reactivity

## what's reactivity?

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

## Object.defineProperty

vue use `Object.defineProperty` to catch variable get and set.

> `Object.defineProperty` basic usage

`Object.defineProperty(obj, prop, descriptor)`

`obj` object to defined prop.

`prop` object prop to defined

`descriptor` descriptor for defination

### example

```js
var obj = {}
Object.defineProperty(obj, 'key', {
  // enumerable: true if and only if the type of this property descriptor may be changed and 
  // if the property may be deleted from the corresponding object
  enumerable: false,
  // configurable: true if and only if this property shows up during enumeration of the properties
  // on the corresponding object.
  configurable: false,
  // writable: true if and only if the value associated with the property may be changed
  // with an assignment operator.
  writable: false,
  // A function which serves as a getter for the property, or undefined if there is no getter.
  get () {

  },
  // A function which serves as a setter for the property, or undefined if there is no setter.
  set (newVal) {

  }
})
```

we can take an exercise for `Object.defineProperty`

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

if we want build a data reactivity system, as for a variable, we should know which other variable rely on this variable.Just like above

```js
let a = 3
let b = a * 10
```
- `b` is rely on `a`.But where can we find these dependency, yep, we can catch it by ` Object.defineProperty get` if `b` want to get `a`, now `b` is `a` dependency, we can catch `b` from `a` get function.

- if we have collect `a` dependency, next thing is that we should nofity `a` all dependency to update when `a` changed(just like tell `b` that `a` is different, so you should update), where can we do thiese thing, yep we can do this in `a` set function.

 these are two main rules in build reactivity system, you should undestand it.

 But what really we do in vue2, please keep watching.

## collect dependency

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

## set watcher

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
