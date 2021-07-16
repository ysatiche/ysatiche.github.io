

```js
const service = new Vue({
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
  }
})


function mapGetters(getterNameArray) {
  if (!getterNameArray || !getterNameArray.length) {
    return;
  }
  const getters = {};
  getterNameArray.forEach(getterName => {
    getters[getterName] = () => service[getterName];
  });
  return getters;
}
function mapActions(actionNameArray) {
  if (!actionNameArray || !actionNameArray.length) {
    return;
  }
  const actions = {};
  actionNameArray.forEach(actionName => {
    actions[actionName] = (...params) => {
      return service[actionName](...params);
    };
  });
  return actions;
}
export { mapActions, mapGetters, service };
```