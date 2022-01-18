import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'

// export interface State {
//   count: number
//   isCollapse: boolean
// }
const state = {
  count: 0,
  isCollapse: false
}

export type State = typeof state

export const key: InjectionKey<Store<State>> = Symbol('store')

export const store = createStore<State>({
  // state () {
  //   return {
  //     count: 0,
  //     isCollapse: false
  //   }
  // },
  state,
  mutations: {
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    }
  }
})

// 定义自己的userStore
export function useStore () {
  return baseUseStore(key)
}
