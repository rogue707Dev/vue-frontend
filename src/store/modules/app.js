const app = {
  namespced: true,
  state: {
    language: 'zh'
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
    }
  },
  actions: {
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}
export default app
