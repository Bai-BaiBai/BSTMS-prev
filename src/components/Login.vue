<template>
  <div>
    <form action="">
      <div>银行卡号：</div>
      <input type="text" v-model="cardId">
      <div>密码：</div>
      <input type="password" v-model="password">
      <div>
        <button @click="login()">登录</button>
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
      cardId: '123456789012345678',
      password: '12345678'
    }
  },
  methods: {
    login () {
      if (this.cardId.length !== 18 || !/^[0-9]+$/.test(this.cardId)) {
        alert('非法的银行卡号')
        return false
      }
      if (this.password.length !== 6 || !/^[0-9]+$/.test(this.password)) {
        alert('非法的密码')
        return false
      }
      this.$api.post('/login', {
        cardId: this.cardId,
        password: this.password
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data
          // 如果后台返回的code为1说明验证失败
          if (data.code === 1) {
            alert('用户名或密码错误')
          } else {
            // 否则跳转到主页面
            this.$router.push('/main')
          }
        } else {
          alert('请求失败')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
