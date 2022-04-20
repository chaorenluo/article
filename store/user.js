export const state = () => ({
  access_token: '',
  userDetails:{

  }
});

export const actions = {
  getUserDetails({ commit },access_token){
    return this.$api.userInfo().then(res=>{
      commit('setUserDetails',{access_token,data:res.data});
    })
  },
  logout({ commit }){
    this.$cookies.remove("access_token");
    commit('removeData');
    this.$router.replace('/login')
  }
}
export const getters = {
  is_login(state){
    return state.access_token
  }
}
export const mutations = {
  setUserDetails(state,data){
    state.userDetails = data.data;
    state.access_token = data.access_token
  },
  removeData(state){
    state.userDetails = {};
    state.access_token = ''
  }
}

