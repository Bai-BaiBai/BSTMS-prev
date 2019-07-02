<template>
  <div>
    <div>
      存款金额：<input type="text" v-model="money"><label>{{msg}}</label>
    </div>
    <button @click="execute()">提交</button>
  </div>
</template>

<script>
export default {
  name: 'SaveMoney',
  data () {
    return {
      msg: this.$CONST.TIP_100_MULTIPLE,
      state: this.$CONST.SAVE_MONEY_STATE,
      tradeLocation: this.$CONST.TRADE_LOCATION,
      money: ''
    }
  },
  watch: {
    /**
     * 监听money值的合法性，给出提示信息
     */
    money: function () {
      // eslint-disable-next-line eqeqeq
      if (this.money && this.money != 0 && this.money % 100 == 0) {
        this.msg = ''
      } else {
        this.msg = this.$CONST.TIP_100_MULTIPLE
      }
    }
  },
  methods: {
    /**
     * 执行存款
     */
    execute () {
      // 验证页面输入的合法性
      if (this.msg !== '') {
        alert(this.$CONST.TIP_ILLEGAL_INPUT + this.msg)
        return
      }
      // 发送存款请求
      this.$api.put('/money', {
        state: this.state,
        money: this.money,
        tradeLocation: this.tradeLocation
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data
          if (data.code === 1) {
            alert(response.data.error)
          } else {
            // 成功后跳到查询余额界面
            alert(this.$CONST.SAVE_MONEY_SUCCESS)
            this.$router.push('/main/balance')
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
label{
  color: red;
}
</style>
