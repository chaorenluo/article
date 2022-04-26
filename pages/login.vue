<template>
<div class="login-main">
  <div class="title"><a-icon type="left" @click="$router.go(-1)"  class="cursor icon-20" /><div>我的账号</div></div>
  <a-radio-group  v-model="mode" button-style="solid" :style="{ marginBottom: '8px' }" class="mt20">
    <a-radio-button value="login">
      登入
    </a-radio-button>
    <a-radio-button value="registered">
      注册
    </a-radio-button>
  </a-radio-group>
  <div v-if="mode ===  'registered'" class="mt30">
    <a-form :form="registeredForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item >
        <a-input
          class="input-wd"
          placeholder="设置您的昵称"
          v-decorator="['nickname', { rules: [{ required: true, message: '请输入您的昵称' }] }]"
        />
      </a-form-item>
        <a-form-item >
          <a-input
            class="input-wd"
            placeholder="请填入手机号"
            v-decorator="['contact', { rules: [{ required: true, message: '请输入您手机号' }] }]"
          />
        </a-form-item>
      <a-form-item >
        <a-input-password    class="input-wd" placeholder="请设置密码" v-decorator="['password', { rules: [{ required: true, message: '请输入您的密码' }] }]" />
      </a-form-item>
      <a-form-item >
        <a-input-password   class="input-wd" placeholder="再次输入密码确认设置" v-decorator="['password_confirmation', { rules: [{ required: true, message: '请再次输入密码' }] }]" />
      </a-form-item>
      <a-form-item >
        <a-input
          class="input-wd"
          placeholder="输入邀请人的邀请码（选填）"
        />
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
           <countdown :form="registeredForm" type="register"/>
         </div>
        </div>
      </a-form-item>
      <a-form-item class="form-submit">
        <a-button type="primary" @click="handleSubmit">
          确认注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
  <div v-else class="mt30">
    <a-form :form="loginForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item >
        <a-input
          class="input-wd"
          placeholder="请填入手机号"
          v-decorator="['contact', { rules: [{ required: true, message: '请输入手机号' }] }]"
        />
      </a-form-item>
      <a-form-item >

        <a-input-password
          class="input-wd"
          placeholder="请输入密码"
          v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
        />
      </a-form-item>
      <div class="forget-pwd">
        <nuxt-link to="/resetPwd">忘记密码</nuxt-link>
      </div>
      <a-form-item class="form-submit">
        <a-button type="primary" @click="handleSubmit">
          确认登入
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script>
import countdown from '../components/countdown'
const defaultRegisterData =() =>{
  return{
    nickname:'',
    contact:'',
    password:'',
    password_confirmation:'',
    code:'',
    share_code:''
  }
}

const defaultLoginData = () =>{
  return{
    contact:'',
    password:''
  }
}

export default {
  name: "login",
  components:{countdown},
  middleware: 'anonymous',
  data(){
    return{
      mode:'login',
      registeredForm: this.$form.createForm(this, { name: 'coordinated' }),
      loginForm: this.$form.createForm(this, { name: 'login' }),
    }
  },
  methods:{
    handleSubmit(){
        if(this.mode == "registered" ){
          this.register()
        }else{
          this.login()
        }
    },
    register(){
      this.$nextTick(() => {
        this.registeredForm.validateFields([...Object.keys(defaultRegisterData())], { force: true }).then(res=>{
          this.$api.register(res).then(res=>{
            if(res.status_code === 200){
              this.$message.success("注册成功")
            }else{
              this.$message.error(res.message)
            }
          })
        })
      });
    },
    login(){
      this.$nextTick(() => {
        this.loginForm.validateFields([...Object.keys(defaultLoginData())], { force: true }).then(res=>{
          this.$api.login(res).then(res=>{
            if(res.status_code===200){
              const access_token=res.data.access_token
              this.$message.success("登录成功")
              this.$cookies.set('access_token',access_token)
              this.$store.dispatch('user/getUserDetails',access_token).then(res=>{
                this.$router.replace('/')
              })
            }else{
              this.$message.error(res.message)
            }

          })
        })
      });
    }
  }
}
</script>

<style  lang="scss">
.login-main{
  color: black;
  margin-left: 90px;
  margin-top:40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .cursor{
    cursor:pointer;
  }
  .icon-20{
    font-size: 20px;
  }
  .forget-pwd{
    position: relative;
    top: -20px;
    left: 180px;
    a{
      position: absolute;
      display: block;
      font-size: 12px;
      color: #ccc;
    }
  }
  .title{
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .space-between{
    display: flex;
    justify-content: space-between;
  }
  .mt20{
    margin-top: 20px;
  }
  .mt30{
    margin-top: 30px;
  }
  .ant-input{
    height: 37px;
    text-align: initial;
  }
  .form-submit{
    .ant-col-12{
      width: 0%;
    }
  }
  .code-input{
    width: 120px;
    height: 37px;
  }
  .code-btn{
    width: 100px;
    height: 37px;
  }
  .input-wd{
    width: 230px;
    height: 37px;
  }
}
</style>
