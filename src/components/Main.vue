<template>
  <div>
    <div>
<!--      退卡直接返回login-->
      <router-link :to="{name: 'Balance'}">查询余额</router-link>
      <router-link :to="{name: 'UpdatePassword'}">修改密码</router-link>
      <router-link :to="{name: 'SaveMoney'}">存款</router-link>
      <router-link :to="{name: 'GetMoney'}">取款</router-link>
      <router-link :to="{name: 'Transfer'}">转账</router-link>
      <router-link :to="{name: 'ExchangeCurrency'}">货币交易</router-link>
      <router-link :to="{name: 'Main'}">返回主页面</router-link>
      <button @click="logout()">退卡</button>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    /**
     * 执行退卡
     */
    logout () {
      // 发送退卡请求，成功给出提示，并返回到登录页面
      this.$api.get('/logout', {}, response => {
        if (response.status >= 200 && response.status < 300) {
          this.$router.push('/')
          alert(this.$CONST.LOGOUT_SUCCESS)
        } else {
          // 请求失败提示(网络或后台故障)
          alert(this.$CONST.REQUEST_FAILURE)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
