/**
 * Created by syen on 2017/12/25.
 */
import Vue from 'vue'
import  Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import  state from './states'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'


Vue.use(Vuex)

const  debug  = process.env.NODE_ENV !=='production'

export default  new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict:debug,
  plugins:debug? [createLogger()]:[]
})

