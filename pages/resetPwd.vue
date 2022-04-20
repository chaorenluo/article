<template>
  <div class="reset-main">
    <div class="title"><a-icon type="left" @click="$router.go(-1)"  class="cursor icon-20" /><div>重设密码</div></div>
    <a-form class="mt20" :form="resetForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item >
        <a-input

          class="input-wd"
          placeholder="请填入手机号"
          v-decorator="['contact', { rules: [{ required: true, message: '请输入手机号' }] }]"
        />
      </a-form-item>
      <a-form-item >
        <a-input-password   class="input-wd" placeholder="请设置密码" v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]" />
      </a-form-item>
      <a-form-item >
        <a-input-password  class="input-wd" placeholder="再次输入密码确认设置" v-decorator="['password_confirmation', { rules: [{ required: true, message: '再次输入密码' }] }]" />
      </a-form-item>
      <a-form-item >
        <div class="input-wd space-between">
          <div>
            <a-input
              class="code-input"
              placeholder="输入验证码"
              v-decorator="[
              'code',
              { rules: [{ required: true, message: '请输入验证码' }] },
            ]"
            />
          </div>
          <div>
            <countdown :form="resetForm" type="find_pwd"/>
          </div>
        </div>
      </a-form-item>
      <a-form-item class="form-submit">
        <a-button type="primary" @click="handleSubmit">
          确认更改
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import countdown from '../components/countdown'
export default {
  name: "resetPwd",
  middleware: 'anonymous',
  components:{countdown},
  data(){
    return{
      mode:'login',
      resetForm: this.$form.createForm(this, { name: 'coordinated' }),
      contact:''
    }
  },
  methods:{
    handleSubmit(){
        this.$nextTick(()=>{
          this.resetForm.validateFields(['contact','password','password_confirmation','code'], { force: true }).then(res=>{

              this.$api.resetPassword(res).then(res=>{
                if(res.status_code === 200){
                  this.$message.success("修改成功")
                  this.$router.replace("/login")
                }else{
                  this.$message.error(res.message)
                }
              })
          })
        })
    }
  }
}
</script>

<style  lang="scss">
.reset-main{
  color: black;
  margin-left: 90px;
  margin-top:40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .form-submit{
    .ant-col-12{
      width: 0%;
    }
  }
  .cursor{
    cursor:pointer;
  }
  .icon-20{
    font-size: 20px;
  }
  .space-between{
    display: flex;
    justify-content: space-between;
  }
  .ant-input{
    height: 37px;
    text-align: initial;
  }
  .title{
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-wd{
    width: 230px;
    height: 37px;
  }
  .mt20{
    margin-top: 20px;
  }
  .code-input{
    width: 120px;
    height: 37px;
  }
  .code-btn{
    width: 100px;
    height: 37px;
  }
}
</style>
