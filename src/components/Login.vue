<template>
  <div>
    <form action="">
      <div>银行卡号：</div>
      <input type="text" v-model="cardId">
      <div>密码：</div>
      <input type="password" v-model="password">
      <div>
        <button>登录</button>
        <router-link :to="{name: 'CreateAccount'}">开户</router-link>
      </div>
    </form>
    <div>
      <router-link :to="{name: 'Consult'}">业务咨询</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      cardId: '',
      password: ''
    }
  }
}
</script>

<style scoped>

</style>
