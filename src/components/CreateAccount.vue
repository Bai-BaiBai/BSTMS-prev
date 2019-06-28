<template>
  <div>
    <div>用户名</div>
    <input type="text">
    <div>身份证号</div>
    <input type="text">
    <div>手机号</div>
    <input type="text">
    <div>开户类型</div>
    <input type="text">
    <div>输入密码</div>
    <input type="password">
    <div>再次输入密码</div>
    <input type="password">
    <button>注册</button>
    <button>退出</button>
    <div>获得的卡号：{{newCardId}}</div>
  </div>
</template>

<script>
export default {
  name: 'CreateAccount',
  data () {
    return {
      newCardId: ''
    }
  }
}
</script>

<style scoped>

</style>
