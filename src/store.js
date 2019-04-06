import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)




export default new Vuex.Store({
  state: {
    events: require('@/data/articles.json'),
    drawer: false,
    items: [
      {
        text: 'Home',
        to: '/'
      },
      {
        text: 'About',
        href: '#about'
      }
    ]
  },
  getters: {
    categories: state => {
      const categories = []

      for (const article of state.events) {
        if (
            !article.category ||
            categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          to: `/category/${text}`
        })
      }

      return categories.sort()
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories)
    },
    events: (state)=>state.events
    
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    setEvents: (state,newValue) => (state.events =newValue)
  },
  actions: {

  }
})