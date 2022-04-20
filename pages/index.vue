<template>
<div>
  <div class="article-icon">
    <div style="cursor:pointer"><a-icon type="reload" style="color:#333" @click="getArticlesContent(id)"  /></div>
  </div>
  <a-spin :spinning="spinning">
    <div :class="`articleContent ${loading ? 'show' : ''}`"  id="main" v-html="articlesDetail"></div>
  </a-spin>
</div>
</template>

<script>
import Mercury from '@postlight/mercury-parser';
import {mapState} from "vuex";
export default {
  middleware: 'authenticated',
  name: "index",
  data(){
    return{
      articlesDetail:'xx1',
      loading:false,
      spinning:false,
      id:0,
    }
  },
  computed:{
    ...mapState(['user']),
  },
  methods:{
    getArticlesContent(id){
      if(!id)return
      this.loading=false;
      this.spinning=true;
      this.$api.userBrowses({article_id:id});
      document.getElementsByClassName('articleContent')[0].scrollTo(0,0)
      this.$api.articlesContent(id).then(res=>{
        Mercury.parse('',{html: res.data.detail}).then(result => {
          this.loading=true;
          this.spinning=false;
          this.articlesDetail = result.content;
        }).catch(err=>console.log(err));

      })
    }
  },
  mounted() {
    this.$EventBus.$on("getArticlesContent",(id)=>{
      this.id=id;
      this.getArticlesContent(id)
    })
  }
}
</script>

<style  lang="scss">
.articleContent{
  color: #000000;
  overflow-y: auto;
  height: 800px;
  padding-bottom: 50px;
}



:root {

  --gray: #484644;
  --primary: #0078d4;
  --primary-alt: #004578;
}
@media (prefers-color-scheme: dark) {
  :root {
    color: #f8f8f8;
    --gray: #a19f9d;
    --primary: #4ba0e1;
    --primary-alt: #65aee6;
  }
}

.article-icon{
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 40px;
}

h1, h2, h3, h4, h5, h6, b, strong {
  font-weight: 600;
}
a {
  color: var(--primary);
  text-decoration: none;
}
a:hover, a:active {
  color: var(--primary-alt);
  text-decoration: underline;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
#main {
  max-width: 700px;
  margin: 0 auto;
  display: none;
}
#main.show {
  display: block;
  animation-name: fadeIn;
  animation-duration: 0.367s;
  animation-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
  animation-fill-mode: both;
}

#main > p.title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-block-end: 0;
}
#main > p.date {
  color: var(--gray);
  font-size: .875rem;
}

article {
  line-height: 1.6;
}
article * {
  max-width: 100%;
}
article img {
  height: auto;
}
article figure {
  margin: 16px 0;
  text-align: center;
}
article figure figcaption {
  font-size: .875rem;
  color: var(--gray);
  -webkit-user-modify: read-only;
}
article iframe {
  width: 100%;
}
article code {
  font-family: Monaco, Consolas, monospace;
  font-size: .875rem;
  line-height: 1;
}
article blockquote {
  border-left: 2px solid var(--gray);
  margin: 1em 0;
  padding: 0 40px;
}
</style>
