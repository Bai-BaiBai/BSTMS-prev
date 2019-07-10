<template>
  <div>
    <div>
      对方账号：<input type="text" v-model="cardIdTo" @blur="verifyAccount()"> <label>{{cardErrorMsg}}</label>
    </div>
    <div>
      转账金额：<input type="text" v-model="money"><label>{{msg}}</label>
    </div>
<!--    提交后弹框确认-->
    <button @click="execute()">提交</button>
  </div>
</template>

<script>
export default {
  name: 'Transfer',
  data () {
    return {
      tradeLocation: this.$CONST.TRADE_LOCATION,
      cardIdTo: '',
      money: '',
      cardErrorMsg: this.$CONST.TIP_PLEASE_INPUT_CARD_ID,
      msg: ''
    }
  },
  watch: {
    /**
     * 监听对方银行卡号的输入，判断合法性
     */
    cardIdTo: function () {
      if (this.cardIdTo.length !== 18 || !/^[0-9]+$/.test(this.cardIdTo)) {
        this.cardErrorMsg = this.$CONST.TIP_ILLEGAL_CARD_ID
      } else {
        this.cardErrorMsg = ''
      }
    },
    /**
     * 监听金额输入的合法性，最大转账金额为 50000
     */
    money: function () {
      // eslint-disable-next-line eqeqeq
      if (!/^[0-9]+$/.test(this.money) || this.money % 1 !== 0 || this.money == 0 || parseInt(this.money) > 50000) {
        this.msg = this.$CONST.TIP_TRANSFER_MONEY_LIMIT
      } else {
        this.msg = ''
      }
    }
  },
  methods: {
    /**
     * 焦点离开对方银行卡号输入框时，进行账号认证
     */
    verifyAccount () {
      // 非法的输入不进行账号认证
      if (this.cardErrorMsg !== '') {
        return
      }
      // 向服务器发送请求，认证账号是否存在
      this.$api.post('/verifyAccount', {
        cardId: this.cardIdTo
      }, response => {
        if (response.data.code === 1) {
          this.cardErrorMsg = this.$CONST.TIP_OPPOSITE_NOT_EXIST
        }
      })
    },
    /**
     *  执行转账
     */
    execute () {
      // 如果有错误信息给出弹框提示
      if (this.cardErrorMsg !== '' || this.msg !== '') {
        this.$message.error(this.$CONST.TIP_ILLEGAL_INPUT + this.cardErrorMsg + '; ' + this.msg)
        return
      }
      // 确认转账金额和账号
      if (!confirm('对方账号为：' + this.cardIdTo + '\r\n' + '转账金额为：' + this.money)) {
        return
      }
      // 发送转账请求
      this.$api.post('/transfer', {
        cardIdTo: this.cardIdTo,
        money: this.money,
        tradeLocation: this.tradeLocation
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data
          // 失败给出错误信息
          if (data.code === 1) {
            this.$message.error(response.data.error)
          } else {
            // 成功后，弹框提示
            this.$message.success(this.$CONST.TRANSFER_SUCCESS)
            this.cardIdTo = ''
            this.money = ''
          }
        } else {
          // 请求失败提示(网络或后台故障)
          this.$message.warning(this.$CONST.REQUEST_FAILURE)
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
