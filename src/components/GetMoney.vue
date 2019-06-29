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
<!--    提交后弹框确认-->
    <button @click="execute()">提交</button>
  </div>
</template>

<script>
export default {
  name: 'GetMoney',
  data () {
    return {
      msg: '必须为50的倍数',
      state: 2,
      tradeLocation: '营业厅',
      money: ''
    }
  },
  watch: {
    money: function () {
      // eslint-disable-next-line eqeqeq
      if (this.money && this.money != 0 && this.money % 50 == 0) {
        this.msg = ''
      } else {
        this.msg = '必须为50的倍数'
      }
    }
  },
  methods: {
    get100 () {
      this.money = 100
    },
    get500 () {
      this.money = 500
    },
    get1000 () {
      this.money = 1000
    },
    execute () {
      if (this.msg !== '') {
        alert('非法的输入：' + this.msg)
        return
      }
      if (!confirm('当前取款金额：' + this.money + '  请确定')) {
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
            alert('取款失败,余额不足')
          } else {
            // 成功后跳到查询余额界面
            alert('取款成功')
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
