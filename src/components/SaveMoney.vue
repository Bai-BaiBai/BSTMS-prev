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
      msg: '必须为100的整数倍',
      state: 1,
      tradeLocation: '营业厅',
      money: ''
    }
  },
  watch: {
    // 监听money值，给出提示信息
    money: function () {
      // eslint-disable-next-line eqeqeq
      if (this.money && this.money != 0 && this.money % 100 == 0) {
        this.msg = ''
      } else {
        this.msg = '必须为100的整数倍'
      }
    }
  },
  methods: {
    execute () {
      if (this.msg !== '') {
        alert('非法的输入：' + this.msg)
        return
      }
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
            alert('存款成功')
            this.$router.push('/main/balance')
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
