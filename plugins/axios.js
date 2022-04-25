export default function({ app, error, store }) {
  const $axios = app.$axios;

  $axios.onRequest(config => {
    const access_token = app.$cookies.get('access_token')
    config.headers['Authorization']='Bearer '+access_token;
    console.log("Authorization---",access_token)
    return config
  });

  $axios.onError(response=>{
    console.log("---4")
    error('axios拦截错误')
  })

  $axios.onResponse(response => {
    const code = response.data.status_code;
    const access_token = response.headers.authorization;
    if (code === 401) {
      response.status = code;
      app.$cookies.remove('access_token');
      return Promise.reject({ response });
      // throw new Error('您還未登入，請登入後操作')
    }
    if(code!=200 && process.browser){
       alert(response.data.message)
    }
    return response.data;
  });
}
