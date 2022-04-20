<template>
  <a-button :loading="codeLoading" class="code-btn" @click="getCodes">{{sendText()}}</a-button>
</template>

<script>
export default {
  name: "countdown",
  props: {
    type: {
      type: String,
      default: ''
    },
    form:{
      type: Object,
      default: {}
    }
  },
  data(){
    return{
      countdown_timer:0,
      is_send: 0,
      countdown: 60,
      codeLoading:false
    }
  },
  methods:{
    getCodes(){
      const contact = this.form.getFieldsValue().contact
      if(!contact){
        this.$message.error("手机号码不能为空")
        return
      }
      if(!this.codeLoading && !this.is_send){
        this.codeLoading=true
        this.$api.getCodes({type:this.type,contact:this.contact}).then(res=>{
          this.codeLoading=false;
          if(res.status_code === 200){
            this.$message.success("验证码发送成功")
            this.initiateTimer()
          }else{
            this.$message.error(res.message)
            this.initiateTimer()
          }
        }).catch(err=>{
          this.$message.error("验证码发送失败")
          this.codeLoading=false;
        })
      }
    },
    sendText() {
      return  this.codeLoading ? "" : this.is_send ? `已發送${this.countdown}s` : '获取验证码';
    },
    initiateTimer() {
      this.is_send = 1;
      this.countdown_timer = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown--;
        } else {
          clearInterval(this.countdown_timer);
          this.countdown = 60;
          this.is_send = 0;
        }
      }, 1000);
    },
  }
}
</script>

<style scoped>

</style>
