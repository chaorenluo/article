<template>
  <div class="pay-main">
    <div class="title"><a-icon type="left" @click="$router.go(-1)"  class="cursor icon-20" /><div>付费会员</div></div>
    <div class="mt40">
      <div class="conversion-code">
        <div class="mr10">
          <a-input class="wd230" placeholder="输入兑换码，兑换无限卡" />
        </div>
        <div>
          <a-button type="primary">
            兑换
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payUser",
  middleware: 'authenticated',
}
</script>

<style scoped lang="scss">
.pay-main{
  color: black;
  margin-left: 90px;
  margin-top:40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.title{
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mr10{
  margin-right: 10px;
}
.mt40{
  margin-top: 40px;
}
.conversion-code{
  display: flex;
}
.wd230{
  width: 230px;
}
</style>
