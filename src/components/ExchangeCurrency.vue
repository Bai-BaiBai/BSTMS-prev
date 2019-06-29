<template>
  <div>
    <div>
      选择兑换货币类型：
      <select v-model="selected">
        <option v-for="(item, index) of currencyList" :key="index" v-bind:value="item.exchangeRateId">
          {{item.currencyType}}
        </option>
      </select>
    </div>
    <div>
      兑换金额：<input type="text" v-model="money">
      <label>{{msg}}</label>
    </div>
<!--    弹框确认后，弹框成功-->
    <button @click="execute()">提交</button>
  </div>
</template>

<script>
export default {
  name: 'ExchangeCurrency',
  data () {
    return {
      msg: '必须为100的整数倍',
      currencyList: [],
      selected: '1001',
      money: '',
      tradeLocation: '营业厅'
    }
  },
  mounted () {
    this.$api.get('/exchangeRate', {}, response => {
      const data = response.data.data
      for (var i = 0; i < data.length; i++) {
        this.currencyList.push(data[i])
      }
    })
  },
  methods: {
    execute () {
      if (this.msg !== '') {
        alert('非法的输入：' + this.msg)
        return
      }
      if (!confirm('兑换的金额为：' + this.money)) {
        return
      }
      this.$api.post('/forignCurrency', {
        exchangeRateId: this.selected,
        money: this.money,
        tradeLocation: this.tradeLocation
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data
          if (data.code === 1) {
            alert(response.data.error)
          } else {
            // 成功后跳到查询余额界面
            alert('兑换成功')
            this.$router.push('/main/balance')
          }
        } else {
          alert('请求失败')
        }
      })
    }
  },
  watch: {
    money: function () {
      if (this.money === '0' || !/^[0-9]+$/.test(this.money) || parseInt(this.money) % 100 !== 0) {
        this.msg = '必须为100的整数倍'
      } else {
        this.msg = ''
      }
    }
  }
}
</script>

<style scoped>
label{
  color: red;
}
</style>
