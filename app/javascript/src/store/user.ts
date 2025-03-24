import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import {
  signin as _signin,
  verify,
  signout as _signout,
} from "@/services/AuthServices";
import { useModalStore } from "@/store/modal";
import type { LoginForm } from "@/types/types";

export type UserInfo = {
  id: string;
  username: string;
  email: string;
};

export type UserState = {
  userInfo: UserInfo | null;
  token: string | null;
};

export const useUserStore = defineStore("user", () => {
  // State
  const state = reactive<UserState>({
    token: null,
    userInfo: null,
  });

  // Getters
  const isAuthenticated = computed<boolean>(
    () => state.userInfo !== null && state.token !== null,
  );
  const getUserInfo = computed<UserInfo | null>(() => state.userInfo);
  const getUserToken = computed<string | null>(() => state.token);

  // Actions
  const signin = async (user: LoginForm) => {
    try {
      const response = await _signin(user);
      await attemp(response.data.token);
    } catch (error) {
      state.token = null;
      state.userInfo = null;
    }
  };

  const signout = async () => {
    try {
      _signout();
    } finally {
      state.token = null;
      state.userInfo = null;
    }
  };

  const attemp = async (token: string) => {
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
      state.token = null;
      state.userInfo = null;
    }
  };

  return {
    state,
    signin,
    signout,
    attemp,
    isAuthenticated,
    getUserInfo,
    getUserToken,
  };
});
