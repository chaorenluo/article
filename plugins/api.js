export default ({ app }, inject) => {
  const axios = app.$axios;
  const api ={
    login : (data)=>axios.post('/auth/login', { ...data }),
    register :(data) =>axios.post('/auth/register',{...data}),
    getCodes :(data) =>axios.post('/codes',{...data}),
    resetPassword:(data) => axios.post('/reset_password',{...data}),
    userInfo:() => axios.get('/info'),
    feedbacks:(data)=>axios.post('/feedbacks',{...data}),
    categories:(data)=>axios.get('/categories'),

    collectionList:(data)=>axios.get('/collection_list'),
    collections:(data)=>axios.post('/collections',{...data}),
    collectionsUser:(data)=>axios.get('/user/collections',{params:data}),
    resources:(data)=>axios.post('/user/resources',{...data}),
    subResources:(data)=>axios.get('/resources',{params:data}),
    userCollect:(data)=>axios.post('/user_collect',{...data}),
    historyArticles:(data)=>axios.get('/history_articles',{params:data}),
    newArticles:(data)=>axios.get('/new_articles',{params:data}),
    nreadArticles:(data)=>axios.get('/unread_articles',{params:data}),
    collectArticles:(data)=>axios.get('/collect_articles',{params:data}),
    articles:(data)=>axios.get('/articles',{params:data}),
    articlesContent:(id)=>axios.get(`/articles/${id}`),
    userBrowses:(data)=>axios.post('/user_browses',{...data}),

  }


  inject('api', api);
}
