<template>
  <div class="categories-main">
    <div class="title"><a-icon type="left" @click="$router.go(-1)"  class="cursor icon-20" /><div>源市场</div></div>
    <div class="mt20 menu-list">
      <div v-for="(item,key) in categories" :key="key" :class="`menu-item ${filter_category_id==item.id ? 'active' : ''}`" @click="getResources(item.id)">{{item.name}}</div>
    </div>
    <a-spin tip="加载中" :spinning="spinning">
      <div class="mt47 categories-list">
        <div v-for="(item,index) in resources" :key="index" :class="`categories-item ${(index+1)%4 === 0 ? '' : 'mr15'}`">
         <div class="categories-row">
           <div class="categories-icon"></div>
           <div class="categories-title ellipsis">{{item.name}}</div>
         </div>
          <div class="categories-description">
            <div class=" ellipsis2 wd80">
              {{item.description ? item.description : '暂无'}}
            </div>
            <div class="plus-icon" @click="addSubscribe(item)">
              <a-icon type="plus" :style="{ fontSize: '12px', color: '#fff' }" />
            </div>
          </div>
        </div>
      </div>
    </a-spin>
    <a-modal
      title="添加订阅"
      :visible="subscribeVisible"
      cancelText="取消"
      okText="获取订阅"
      @ok="subscribeHandleOk"
      @cancel="subscribeHandleCancel"
      :confirm-loading="subscribeConfirmLoading"
    >
      <div style="display: flex;margin:10px 0">
        <div>源名称：</div>
        <div style="margin-left: 10px;">{{subscribeItem.name}}</div>
      </div>
      <div style="display: flex;align-items: center;justify-content: space-between">
        <div>选择订阅归类</div>
        <div>
          <a-select v-model="subscribeData.collection_id" :default-value="0" style="width: 120px" >
            <a-select-option v-for="(item,key) in collectionList" :key="key" :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "subscribe",
  middleware: 'authenticated',
  data(){
    return{
      categories:[],
      filter_category_id:0,
      resources:[],
      collectionList:[],
      subscribeVisible:false,
      spinning:false,
      subscribeConfirmLoading:false,
      subscribeItem:{},
      subscribeData:{
        collection_id:'',
        resource_id:''
      }

    }
  },
  methods:{
    getCategories(filter_category_id){
      this.$api.categories({}).then(res=>{
        this.categories = res.data;
        res.data.length>0 &&  this.getResources(res.data[0].id)
      })
    },
    getResources(filter_category_id){
      this.filter_category_id = filter_category_id;
      this.spinning= true;
      this.$api.subResources({filter_category_id}).then(res=>{
        this.resources = res.data;
        this.spinning= false;
      })
    },
    getCollectionList(){
      this.$api.collectionList().then(res=>{
        console.log('res.data---',res)
        this.collectionList = res.data
        this.subscribeData.collection_id = res.data[0].id
      })
    },
    addSubscribe(item){
      this.subscribeData.resource_id = item.id
      this.subscribeItem = item;
      this.subscribeVisible = true;
    },
    subscribeHandleOk(){
      if(!this.subscribeData.collection_id){
        this.$message.error("订阅分类不能为空");
        return
      }
      this.subscribeConfirmLoading=true;
      this.$api.userCollect(this.subscribeData).then(res=>{
        if(res.status_code!=200){
          this.$message.error(res.message);
          return
        }
        this.$message.success("订阅成功");
        this.subscribeConfirmLoading=false;
        this.subscribeHandleCancel()
        this.$EventBus.$emit('updateSubscribe')
      })
    },
    subscribeHandleCancel(){
      this.subscribeVisible = false;
    }
  },
  mounted() {
    this.getCategories()
    this.getCollectionList()
    this.$EventBus.$on("updateCollectionList",()=>{
      this.getCollectionList()
    })
  }
}
</script>

<style scoped lang="scss">
  .categories-main{
    color: black;
    margin-left: 90px;
    margin-top:40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .ellipsis {
      text-overflow: ellipsis;

      white-space: nowrap;

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
    .plus-icon{
      width: 20px;
      height: 20px;
      background: #CCCCCC;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
    }
    .categories-list{
      width: 690px;
      display: flex;
      flex-wrap: wrap;
      .mr15{
        margin-right: 16px;
      }
      .wd80{
        width: 90px;
      }
      .categories-item{
        display: flex;
        width: 160px;
        height: 85px;
        background: #FFFFFF;
        box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.05);
        border-radius: 8px 8px 8px 8px;
        padding: 10px;
        opacity: 1;
        font-size: 12px;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 20px;
        cursor: pointer;
        .categories-description{
          font-size: 12px;
          color: #CCCCCC;
          width: 110px;
          text-align: left;
          margin-left: 30px;
          margin-top: 5px;
          display: flex;
        }
        .categories-row{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 20px;
        }
        .categories-title{
          font-size: 12px;
          width: 85px;
          margin-left: 10px;
          text-align: left;
        }
        .categories-icon{
          width: 20px;
          height: 20px;
          background:red;
        }
      }
      .categories-item:hover {
        margin-top: -10px;
        transition: all 0.3s;
        .plus-icon{
          background: #333333;
        }
      }
    }
    .title{
      font-size: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mt20{
      margin-top: 20px;
    }
    .mt47{
      margin-top:47px
    }
    .menu-list{
      width: 690px;
      display: flex;
      flex-wrap: wrap;
      .menu-item{
        margin-right: 15px;
        padding: 5px 8px;
        background: #CCCCCC;
        border-radius: 8px 8px 8px 8px;
        opacity: 1;
        cursor: pointer;
        font-size: 12px;
        margin-bottom: 10px;
        &.active{
          background: #000000;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
