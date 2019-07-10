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
      msg: this.$CONST.TIP_100_MULTIPLE,
      currencyList: [],
      selected: '1001',
      money: '',
      tradeLocation: this.$CONST.TRADE_LOCATION
    }
  },
  /**
   * 页面加载时，发送查询外汇请求，加载支持的外汇
   */
  mounted () {
    this.$api.get('/exchangeRate', {}, response => {
      const data = response.data.data
      for (var i = 0; i < data.length; i++) {
        this.currencyList.push(data[i])
      }
    })
  },
  methods: {
    /**
     * 执行交易
     */
    execute () {
      // 检查输入是否合法
      if (this.msg !== '') {
        this.$message.error(this.$CONST.TIP_ILLEGAL_INPUT + this.msg)
        return
      }
      // 取出选择的货币信息
      var selectedObj = this.currencyList[this.selected % 1001]
      // 给用户确认兑换信息
      if (!confirm('兑换货币的金额为：' + this.money + selectedObj.currencyType + '; 需要扣款：' + (this.money * selectedObj.exchangeRate).toFixed(2))) {
        return
      }
      // 发送交易请求
      this.$api.post('/forignCurrency', {
        exchangeRateId: this.selected,
        money: this.money,
        tradeLocation: this.tradeLocation
      }, response => {
        if (response.status >= 200 && response.status < 300) {
          const data = response.data
          // 如果后台返回交易失败，给出错误信息
          if (data.code === 1) {
            this.$message.error(response.data.error)
          } else {
            // 成功后跳到查询余额界面
            this.$message.success(this.$CONST.EXCHANGE_CURRENCY_SUCCESS)
            this.$router.push('/main/balance')
          }
        } else {
          // 请求失败提示(网络或后台故障)
          this.$message.warning(this.$CONST.REQUEST_FAILURE)
        }
      })
    }
  },
  watch: {
    /**
     * 监听交易金额的输入，验证输入合法性
     */
    money: function () {
      if (this.money === '0' || !/^[0-9]+$/.test(this.money) || parseInt(this.money) % 100 !== 0) {
        this.msg = this.$CONST.TIP_100_MULTIPLE
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
