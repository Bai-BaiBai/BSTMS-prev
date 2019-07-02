<template>
  <div>
    <form action="">
      <div>银行卡号：</div>
      <input placeholder="请输入18位银行卡号" type="text" v-model="cardId">
      <div>密码：</div>
      <input placeholder="请输入6位密码" type="password" v-model="password">
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
      cardId: '',
      password: ''
    }
  },
  methods: {
    /**
     * 执行登录
     * @returns {boolean}
     */
    login () {
      // 判断银行卡号合法性，并给出提示
      if (this.cardId.length !== 18 || !/^[0-9]+$/.test(this.cardId)) {
        alert(this.$CONST.TIP_ILLEGAL_CARD_ID)
        return false
      }
      // 判断密码合法性，并给出提示
      if (this.password.length !== 6 || !/^[0-9]+$/.test(this.password)) {
        alert(this.$CONST.TIP_PASSWOR_NUMBERS)
        return false
      }
      // 发送登录请求
      this.$api.post('/login', {
        cardId: this.cardId,
        password: this.password
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data
          // 如果后台返回的code为1说明验证失败
          if (data.code === 1) {
            alert(response.data.error)
          } else {
            // 否则跳转到主页面
            this.$router.push('/main')
          }
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
