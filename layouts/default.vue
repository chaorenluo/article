<template>

 <div class="book-main"
   >
   <div class="directory-main" :style="{
      '--bg-image': `url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.2008php.com%2F2013_Website_appreciate%2F2013-08-08%2F20130808001525.jpg&refer=http%3A%2F%2Fwww.2008php.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650968724&t=ce05bd668b9eadd79c0a546bf63adc05')`,
    }">
     <div class="primary-navigation">
       <div style="flex:1">
         <div class="right-icon">
           <a-icon type="message" @click="showUser" class="cursor" />
           <a-icon type="plus" class="mr10 cursor" @click="showSubscribeVisible" />
           <div @click="goSubscribe" class="subscribe-btn">订阅</div>
         </div>
          <div class="scroll-y">
            <div class="card-body">
              <div class="space-between">
                <div class="font14 cursor">{{userDetails.nickname ? userDetails.nickname : '未登入'}} </div>
              </div>
              <div class="space-between">
                <div class="font10">邀请码 <span>{{userDetails.nickname ? userDetails.share_code : '未登入'}}</span></div>
              </div>
              <div class="card-details">
                <div class="space-between mt8 cursor" @click="getHistoryArticles">
                  <div class="title">正在阅读</div>
                  <div class="badge">{{historyArticlesData.meta.total}}</div>
                </div>
                <div class="space-between mt8 cursor" @click="getNewArticles">
                  <div class="title">今日更新</div>
                  <div class="badge">0</div>
                </div>
                <div class="space-between mt8 cursor" @click="getNreadArticles">
                  <div class="title">所有未读</div>
                  <div class="badge">0</div>
                </div>
                <div class="space-between mt8 cursor" @click="getCollectArticles">
                  <div class="title">所有星标</div>
                  <div class="badge">0</div>
                </div>
              </div>
            </div>
            <client-only>
              <div v-if="is_login" v-for="(item,key) in userCollection" :key="key" class="card-body">
                <div class="space-between ">
                  <div class="font14">{{item.name}}</div>
                </div>
                <div class="card-details">
                  <div class="space-between mt8 cursor" @click="getArticles(resources.id)" @contextmenu.prevent="$refs.ctxMenu.open" v-for="resources in item.resources">
                    <div class="title ellipsis">{{resources.name}}</div>
                    <div class="badge">{{resources.un_visit_count}}</div>
                  </div>
                </div>
              </div>
            </client-only>

          </div>
       </div>
       <div class="new-classification" @click="showAddVisible">+ 新建信息分类</div>
     </div>
    <div>
      <div class="secondary-navigation">
        <template v-if="userShow && is_login">
          <nuxt-link :to="userPath" :class="`menu-item mt40 ${$route.name==='login' || $route.name==='userInfo' ? '' : 'active-color'}`">我的账号</nuxt-link>
          <nuxt-link v-if="is_login" to="/payUser" :class="`menu-item mt5 ${$route.name==='payUser' ? '' : 'active-color'}`">付费会员</nuxt-link>
        </template>
        <template v-else-if="!is_login">
          <nuxt-link :to="userPath" :class="`menu-item mt40 ${$route.name==='login' || $route.name==='userInfo' ? '' : 'active-color'}`">我的账号</nuxt-link>
        </template>
        <template v-else-if="!userShow && is_login">
          <div class="article-list">
            <div class="article-item" v-for="(item,key) in articlesList" @click=" $EventBus.$emit('getArticlesContent',item.id)" :key="key">
              <div class="article-title ellipsis2">{{item.title}}</div>
              <div class="article-description ellipsis3">{{item.description}}</div>
            </div>
          </div>
        </template>
      </div>

    </div>
     <div class="article-body">
       <nuxt/>
     </div>
   </div>
   <img class="background" :src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.2008php.com%2F2013_Website_appreciate%2F2013-08-08%2F20130808001525.jpg&refer=http%3A%2F%2Fwww.2008php.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650968724&t=ce05bd668b9eadd79c0a546bf63adc05'" alt="" />
   <a-modal
     title="添加订阅分类"
     :visible="addVisible"
     cancelText="取消"
     okText="确定添加"
     @ok="branchHandleOk"
     @cancel="branchHandleCancel"
     :confirm-loading="confirmLoading"
   >
     <a-input v-model="branchName"  :maxLength="10"  placeholder="填入分类名">
       <a-tooltip slot="suffix" title="Extra information">
         {{branchName.length}}/10
       </a-tooltip>
     </a-input>
   </a-modal>
   <a-modal
     title="添加订阅"
     :visible="subscribeVisible"
     cancelText="取消"
     okText="获取订阅"
     @ok="subscribeHandleOk"
     @cancel="subscribeHandleCancel"
     :confirm-loading="subscribeConfirmLoading"
   >
     <p>
       <a-input v-model="resourcesData.name"    placeholder="源名称">
       </a-input>
     </p>
    <p>
      <a-input v-model="resourcesData.link"    placeholder="请将订阅地址粘贴到此…例：https://feed.zhihu.com">
      </a-input>
    </p>
    <p>
      <a-input v-model="resourcesData.description"  :maxLength="30"  placeholder="描述一下新加的订阅">
        <a-tooltip slot="suffix" title="Extra information">
          {{branchName.length}}/30
        </a-tooltip>
      </a-input>
    </p>
     <div style="display: flex;align-items: center;justify-content: space-between">
       <div>选择订阅归类</div>
       <div>
         <a-select v-model="resourcesData.collection_id" :default-value="0" style="width: 120px" >
           <div slot="dropdownRender" slot-scope="menu">
             <v-nodes :vnodes="menu" />
             <a-divider style="margin: 4px 0;" />
             <div
               style="padding: 4px 8px; cursor: pointer;"
               @mousedown="e => e.preventDefault()"
               @click="addVisible=true"
             >
               <a-icon type="plus" />新建信息分类
             </div>
           </div>
           <a-select-option v-for="(item,key) in collectionList" :key="key" :value="item.id">
             {{item.name}}
           </a-select-option>
         </a-select>
       </div>
     </div>
   </a-modal>
   <client-only>
     <context-menu id="context-menu" ref="ctxMenu">
       <li>删除</li>
     </context-menu>
   </client-only>
 </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  data(){
    return{
      userShow:false,
      collectionList:[],
      addVisible:false,
      branchName:'',
      confirmLoading:false,
      subscribeVisible:false,
      subscribeConfirmLoading:false,
      historyArticlesData:{meta:{total:0}},
      newArticlesData:{},
      nreadArticlesData:{},
      collectArticlesData:{},
      articleArr:[],
      articlesList:[],
      articlesDetail:'',
      resourcesData:{
        name:'',
        link:'',
        description:'',
        collection_id:1
      },
      userCollection:[]
    }
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    }
  },
  computed: {
    ...mapGetters({
      is_login: 'user/is_login'
    }),
    ...mapState(['user']),
    userPath(){
     return this.is_login ? '/userInfo' : '/login'
    },
    userDetails(){
      return this.user.userDetails || {}
    },
    userAccount(){
      return this.user.userDetails.user_account
    }
  },
  methods:{
    showUser(){
      if(this.is_login){
        this.userShow = true;
        this.$router.push('/userInfo')
      }
    },
    showAddVisible(){
      if(!this.is_login){
        this.$message.error("请先登录")
        return
      }
      this.addVisible = true;
    },
    showSubscribeVisible(){
      if(!this.is_login){
        this.$message.error("请先登录")
        return
      }
      this.subscribeVisible = true
    },
    goSubscribe(){
      if(!this.is_login){
        this.$message.error("请先登录")
        return
      }
      this.$router.push('/subscribe')
    },
    branchHandleOk(){
      if(!this.branchName){
        this.$message.error("请填写分类名称");
        return
      }
      this.confirmLoading=true;
      this.$api.collections({name:this.branchName}).then(res=>{
        this.confirmLoading=false;
        if(res.status_code!=200){
          this.$message.error(res.message);
          return
        }
        this.$message.success(res.data.message);
        this.addVisible=false;
        this.branchName = '';
        this.getCollectionList();
        this.$EventBus.$emit('updateCollectionList')
      })
    },
    branchHandleCancel(){
      this.addVisible=false;
    },
    subscribeHandleOk(){
      if(!this.resourcesData.name){
        this.$message.error("请填写订阅源名称");
        return
      }
      if(!this.resourcesData.name){
        this.$message.error("请填写订阅源链接");
        return
      }
      this.subscribeConfirmLoading=true;
      this.$api.resources(this.resourcesData).then(res=>{
          if(res.status_code!=200){
            this.$message.error(res.message);
            return
          }
          this.$message.success("订阅成功");
          this.subscribeConfirmLoading=false;
          this.subscribeHandleCancel()
      })
    },
    subscribeHandleCancel(){
      this.subscribeVisible = false;
    },
    getCollectionList(){
      this.$api.collectionList().then(res=>{
        console.log('res.data---',res)
        this.collectionList = res.data
        this.resourcesData.collection_id = res.data[0].id;
      })
    },
    getCollectionsUser(){
      this.$api.collectionsUser().then(res=>{
        this.userCollection = res.data
      })
    },
    getHistoryArticles(){
      if(!this.is_login){
        this.$message.error("请先登录")
        return
      }
      this.$api.historyArticles().then(res=>{
          this.articlesList = res.data;
      })
    },
    getNewArticles(){
      if(!this.is_login){
        this.$message.error("请先登录")
        return
      }
      this.$api.newArticles().then(res=>{
        this.articlesList = res.data;
      })
    },
    getNreadArticles(){
      if(!this.is_login){
        this.$message.error("请先登录")
        return
      }
      this.$api.nreadArticles().then(res=>{
        this.articlesList=res.data;
      })
    },
    getCollectArticles(){
      if(!this.is_login){
        this.$message.error("请先登录")
        return
      }
      this.$api.collectArticles().then(res=>{
        this.articlesList =res.data;
      })
    },
    getArticles(resource_id){
      this.$api.articles({resource_id}).then(res=>{
        this.$router.replace('/')
          this.articlesList = res.data;
      })
    }
  },
  mounted() {
    if(this.is_login){
      this.getCollectionList()
      this.getCollectionsUser()
      this.$EventBus.$on("updateSubscribe",()=>{
        this.getCollectionsUser()
      })
    }
  },
  watch:{
    is_login(){
      if(this.is_login){
        this.getCollectionList()
        this.getCollectionsUser()
      }
    },
    $route(){
      const path = this.$route.path;
      if(path == '/payUser' || path=='/userInfo'){
        this.userShow = true;
      }else{
        this.userShow = false;
      }
    }
  }
}
</script>
<style  lang="scss">
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:2px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
  border-radius:10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgba(0,0,0,0.1);
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background:rgba(255,0,0,0.4);
}
.ellipsis {
  text-overflow: ellipsis;

  white-space: nowrap;

  overflow: hidden;
}
.article-list{
  margin-top: 40px;
  height: 100%;
  overflow-y: auto;
  .article-item{
    width: 190px;
    height: 117px;
    background: #FEFFFE;
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    margin-bottom: 5px;
    padding: 10px;
    cursor: pointer;
    .article-title{
      font-size: 13px;
      color: #000000;
      text-align: left;
    }
    .article-description{
      font-size: 11px;
      font-weight: 100;
      color: #666666;
      text-align: left;
      margin-top: 5px;
    }
  }
}
.ctx-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 60px !important;
  padding: 5px 0;
  margin: 2px 0 0;
  color: #373a3c ;
  text-align: center;
  list-style: none;
  background: #9AA5A7 !important;
  border-radius: 5px 5px 5px 5px;
  -webkit-background-clip: padding-box;
  border:none !important;
  cursor: pointer;
  /* background-clip: padding-box; */
  /* border: 1px solid rgba(0,0,0,.15); */
  /* border-radius: .25rem; */
  -moz-box-shadow: 0 0 5px #ccc;
  /* -webkit-box-shadow: 0 0 5px #ccc; */
  /* box-shadow: 0 0 5px #ccc; */
  box-shadow: none !important;
  li{
    font-size: 12px;
    color: #FAFAFA;
    text-align: center;
  }
}
.ctx-menu-container{
  border: none !important;
}
#__nuxt,#layouts{
  height: 100%;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.ellipsis2{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ellipsis3{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
.book-main{

  font-family: PingFang SC-Regular, PingFang SC;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, .3);
  .background {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .scroll-y{
    height: 750px;
    overflow-y: auto;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left:3px;
  }
  .right-icon{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
  }
  .article-body{
    width: 880px;
    height: 800px;
    background: #FFFFFF;

    z-index: 1111;
  }
  .active-color{
    color: #999999 !important;
  }
  .directory-main {
    font-size: 16px;
    z-index: 999;

    border-radius: 8px;
    width: 1280px;
    height: 800px;
    position: relative;

    box-shadow: 10px 20px 80px rgba(0, 0, 0, 0.5);
    display: flex;

    overflow: hidden;
    .space-between{
      display: flex;
      justify-content: space-between;
    }

    .card-body{
      width: 190px;
      background-color:RGBA(176, 195, 192, 0.5);
      border-radius: 8px;
      opacity: 1;
      filter: blur(0.2px);
      margin-bottom: 5px;
      padding:  15px;
      .font14{
        font-size: 14px;
        color:  #000000;
        font-weight: bold;
      }
      .font10{
        font-size: 10px;
        color: #cccc;
        margin-top: 3px;
      }
      .card-details{
        margin-top: 9px;
        .title{
          font-size: 12px;
          color:  #000000;
          font-weight: 500;
          width: 130px;
          text-align: left;
        }
        .mt8{
          margin-top: 8px;
        }

        .badge{
          padding: 0px 5px;
          background: #CCCCCC;
          border-radius: 8px;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .primary-navigation{
      width: 205px;
      height: 800px;
      .new-classification{
        width: 205px;
        height: 29px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #CCCCCC;
        border-radius: 0px 0px 0px 8px;
        opacity: 1;
        position: absolute;
        bottom: 0;
        font-size: 12px;
      }
      .cursor{
        cursor: pointer;
      }
      .mr10{
        margin-left: 13px;
        margin-right: 13px;
      }
      .subscribe-btn{
        width: 38px;
        height: 24px;
        background: #FC6132;
        border-radius: 5px 5px 5px 5px;
        opacity: 1;
        font-size: 10px;
        font-family: PingFang SC-Regular, PingFang SC;
        color: #FFFFFF;
        cursor: pointer;
        margin-right: 5px;
      }
    }
    .mt40{
      margin-top: 40px;
    }

    .mt5{
      margin-top: 5px;
    }
    .secondary-navigation{
      width: 200px;
      height: 800px;
      background: #CBCBCB;
      display: flex;
      flex-direction: column;
      align-items: center;
      .menu-item{
        width: 190px;
        height: 37px;
        background: #FEFFFE;
        padding: 10px;
        border-radius: 8px;
        font-size: 12px;
        font-family: PingFang SC-Semibold, PingFang SC;
        color: black;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
  .space-between::before {
    background:url("http://www.jq22.com/demo/circleMagic201710082042/dest/img/bg.jpg") 0 / cover fixed;
  }
  .directory-main::after {
    content: '';
    background: var(--bg-image) 0 / cover fixed;
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: blur(21px);
    transform: scale(2.08) ;
    z-index: -1;
  }
}

</style>
