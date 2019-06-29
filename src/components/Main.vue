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
    logout () {
      this.$api.get('/logout', {}, response => {
        if (response.status >= 200 && response.status < 300) {
          this.$router.push('/')
          alert('退出成功')
        } else {
          alert('退卡失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
