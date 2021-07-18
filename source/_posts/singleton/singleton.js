


class Singleton {
  constructor () {
    this.tips = 'hello' // 作为区别是否是不同实例的变量
  }

  static val = null // 静态资源跟类绑定，跟实例无关

  static get Singleton () {
    if (!this.val) {
      this.val = new Singleton()
    }
    return this.val
  }

  getTips () {
    return this.tips
  }

  setTips (t) {
    this.tips = t
  }
}

const ins1 = Singleton.Singleton
const ins2 = Singleton.Singleton

console.log(ins1.getTips())
ins1.setTips('world')
console.log(ins1.getTips())
console.log(ins2.getTips())

