import { defineStore } from 'pinia'
import { reactive, computed } from 'vue';
import { signin as _signin, verify, signout as _signout } from '../services/AuthServices'
import { useModalStore } from '../store/modal'


export type UserInfo = {
  id: string;
  username: string;
  email: string;
}

export type UserState = {
  userInfo: UserInfo | null;
  token: string | null;
}

export const useUserStore = defineStore('user', () => {
  // State
  const state = reactive<UserState>({
    token: null,
    userInfo: null
  })

  // Getters
  const isAuthenticated = computed<boolean>(() => state.userInfo !== null && state.token !== null)
  const getUserInfo = computed<UserInfo>(() => state.userInfo)
  const getUserToken = computed<string>(() => state.token)

  // Actions
  const signin = async (user: LoginForm) => {
    try {
      const response = await _signin(user)
      await attemp(response.data.token)
    } catch (error) {
      useModalStore.open({
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: 'alert'
      })
    }
  }

  const signout = async () => {
    try {
      await _signout()
      state.token = null
      state.userInfo = null
    } catch (error) {
      useModalStore.open({
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: 'alert'
      })
    }
  }

  const attemp = async (token) => {
    if (token) {
      state.token = token;
    }

    if (!state.token) {
      return;
    }

    try {
      const payload = await verify();
      state.userInfo = payload.data;
    } catch (error) {
      state.token = null
      state.userInfo = null

      useModalStore.open({
        title: `${error.response.status} Error`,
        message: error.response.data.message,
        type: 'alert'
      })
    }
  }

  return { 
    state,
    signin,
    signout,
    attemp,
    isAuthenticated,
    getUserInfo,
    getUserToken
  }
})