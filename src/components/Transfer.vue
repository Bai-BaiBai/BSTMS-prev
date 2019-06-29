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
      tradeLocation: '营业厅',
      cardIdTo: '',
      money: '',
      cardErrorMsg: '请输入对方的18位银行卡号',
      msg: ''
    }
  },
  watch: {
    cardIdTo: function () {
      if (this.cardIdTo.length !== 18 || !/^[0-9]+$/.test(this.cardIdTo)) {
        this.cardErrorMsg = '非法的账号'
      } else {
        this.cardErrorMsg = ''
      }
    },
    money: function () {
      // eslint-disable-next-line eqeqeq
      if (!/^[0-9]+$/.test(this.money) || this.money % 1 !== 0 || this.money == 0 || parseInt(this.money) > 50000) {
        this.msg = '请输入大于0的整数且不大于50000的整数'
      } else {
        this.msg = ''
      }
    }
  },
  methods: {
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
          this.cardErrorMsg = '不存在的账号'
        }
      })
    },
    execute () {
      // 如果有错误信息给出弹框提示
      if (this.cardErrorMsg !== '' || this.msg !== '') {
        alert('非法的输入：' + this.cardErrorMsg + '; ' + this.msg)
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
          if (data.code === 1) {
            alert('转账失败,余额不足')
          } else {
            alert('转账成功')
            this.cardIdTo = ''
            this.money = ''
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
  label{
    color: red;
  }
</style>
