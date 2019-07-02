<template>
  <div>
    <div>
      取款金额：<input type="text" v-model="money">  <label>{{msg}}</label>
    </div>
    <div>
      <button @click="get100()">取款：100</button>
      <button @click="get500()">取款：500</button>
      <button @click="get1000()">取款：1000</button>
    </div>
    <br>
<!--    提交后弹框确认-->
    <button @click="execute()">提交</button>
  </div>
</template>

<script>
export default {
  name: 'GetMoney',
  data () {
    return {
      msg: this.$CONST.TIP_50_MULTIPLE,
      state: this.$CONST.GET_MONEY_SATE,
      tradeLocation: this.$CONST.TRADE_LOCATION,
      money: ''
    }
  },
  watch: {
    /**
     * 监听用户输入的金额合法性
     */
    money: function () {
      // eslint-disable-next-line eqeqeq
      if (this.money && this.money != 0 && this.money % 50 == 0) {
        this.msg = ''
      } else {
        this.msg = this.$CONST.TIP_50_MULTIPLE
      }
    }
  },
  methods: {
    // 取100快捷按钮
    get100 () {
      this.money = 100
    },
    // 取500快捷按钮
    get500 () {
      this.money = 500
    },
    // 取1000快捷按钮
    get1000 () {
      this.money = 1000
    },
    // 执行取钱请求
    execute () {
      // 验证页面上的输入合法性
      if (this.msg !== '') {
        alert(this.$CONST.TIP_ILLEGAL_INPUT + this.msg)
        return
      }
      // 给出取款确认提示
      if (!confirm(this.$CONST.TIP_CURRENT_INPUT_MONEY + this.money + '  请确定')) {
        return
      }
      // 发送取款请求
      this.$api.put('/money', {
        state: this.state,
        money: this.money,
        tradeLocation: this.tradeLocation
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data
          // 取款失败则给出错误提示
          if (data.code === 1) {
            alert(response.data.error)
          } else {
            // 成功后跳到查询余额界面
            alert(this.$CONST.GET_MONEY_SUCCESS)
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
