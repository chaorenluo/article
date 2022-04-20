export const state = () => ({
  banner: null,
  cover: null,
  popular: {},
  notice: null,
  appToast: false,
  focusOrNot: false, // 判斷是否只顯示商品關注
  focusGame: [], // 商品关注游戏
});

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { app, redirect }) {
    const env = this.$config.env_token;
    const access_token = app.$cookies.get('access_token');
    if(access_token){
     await dispatch('user/getUserDetails',access_token)
    }
  },
};


