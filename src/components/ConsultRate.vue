<template>
  <div>
    货币&emsp;&emsp;汇率
    <hr>
    <ul>
      <li v-for="(item, index) of currencyInfoList" :key="index">
        {{item.currencyType}}&emsp;&emsp;{{item.exchangeRate}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ConsultRate',
  data () {
    return {
      currencyInfoList: []
    }
  },
  /**
   * 页面加载时，发生查询全部汇率信息请求
   */
  mounted () {
    this.$api.get('/exchangeRate', {}, response => {
      const data = response.data.data
      for (var i = 0; i < data.length; i++) {
        this.currencyInfoList.push(data[i])
      }
    })
  }
}
</script>

<style scoped>

</style>
