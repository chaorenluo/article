<template>
  <div class="detailed-main">
    <div class="title"><a-icon type="left" @click="$router.go(-1)"  class="cursor icon-20" /><div>我的账号</div></div>
    <div class="mt21">
      <div class="row">
        <div class="label">昵称：</div>
        <div class="content">{{userDetails.nickname}}</div>
      </div>
      <div class="row">
        <div class="label">注册时间：</div>
        <div class="content">{{userAccount.end_time}}</div>
      </div>
      <div class="row">
        <div class="label">电话：</div>
        <div class="content">{{userDetails.mobile}}</div>
      </div>
      <div class="row">
        <div class="label">无限卡：</div>
        <div class="content">剩余 {{userAccount.available_days}}天</div>
      </div>
      <div class="row">
        <div class="label">邀请码：</div>
        <div class="content">{{userDetails.share_code}}</div>
      </div>
      <div class="row">
        <div class="label">链接：</div>
        <div class="content">https://www.longway.uto.com/09683</div>
      </div>
      <div class="row">
        <div class="label">邀请获得无限卡：</div>
        <div class="content">累计 {{userAccount.invite_days}}天</div>
      </div>
      <div class="row ">
        <div class="label"></div>
        <div class="content mt21"><a-button type="primary" @click="logout">登出</a-button></div>
      </div>
      <div class="row">
        <div class="label">反馈&建议：</div>
        <div class="content mt21">
          <a-textarea v-model="content" maxlength="300"  style="resize:none"   class="advice-txt" :placeholder="prompt" :rows="5" />
          <div class="limit-number">{{content.length}}/300</div>
        </div>
      </div>
      <div class="row flex-end">
        <div class="label"></div>
        <div class="content mt21">
          <div><a-button type="primary" @click="feedbacks">提交</a-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userDetailed",
  middleware: 'authenticated',

  data(){
    return{
      prompt:`请写入您的反馈或意见，最好最好，可以描述在何种设备下产生的问题或改良建议；可留下您的手机号，我们将视您反馈问题，通过短信，奖励或补偿不同时长无限卡；感谢🙏`,
      content:''
    }
  },
  computed:{
    ...mapState(['user']),
    userDetails(){
      return this.user.userDetails
    },
    userAccount(){
      return this.user.userDetails.user_account
    }
  },
  methods:{
    feedbacks(){
      if(!this.content){
        this.$message.error("请输入反馈和意见");
        return
      }
      this.$api.feedbacks({content:this.content}).then(res=>{
          if(res.status_code!=200){
            this.$message.error(res.message);
            return
          }
        this.$message.success(res.data.message);
      })
    },
    logout(){
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style scoped lang="scss">
.detailed-main{
  color: black;
  margin-left: 90px;
  margin-top:40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .title{
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mt21{
    margin-top: 21px;
  }
  .limit-number{
    color: #999999;
    font-size: 12px;
    display: flex;
    justify-content: flex-end;
  }
  .flex-end{
    justify-content: flex-end;
  }
  .row{
    display: flex;
    margin-top: 17px;
    .label{
      width: 130px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999999;
    }
    .content{
      font-size: 14px;
      font-family: PingFang SC-Semibold, PingFang SC;
      color: #000000;
      font-weight: 600;
    }
    .advice-txt{
      width: 560px;
      height: 93px;
    }
  }
}
</style>
