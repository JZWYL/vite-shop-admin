import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { IUserInfo } from '@/api/types/common'
import { getItem, setItem } from '@/utils/storage'
import { USER } from '@/utils/constants'
// export interface State {
//   count: number
//   isCollapse: boolean
// }
const state = {
  count: 0,
  isCollapse: false,
  user: getItem<{ token: string} & IUserInfo>(USER)
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
    },
    setUser (state, payload) {
      state.user = payload
      setItem(USER, state.user)
    }
  }
})

// 定义自己的userStore
export function useStore () {
  return baseUseStore(key)
}
