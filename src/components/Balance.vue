<template>
<div>
  <div>
  当前余额：<label>{{accountBalance}}</label>
  </div>
  <br>
  <div>
    可用余额：<label>{{availableBalance}}</label>
  </div>
</div>
</template>

<script>
export default {
  name: 'Balance',
  data () {
    return {
      accountBalance: '',
      availableBalance: ''
    }
  },
  /**
   * 页面加载时发生查询余额请求
   */
  mounted () {
    this.$api.get('/money', {}, response => {
      if (response.status >= 200 && response.status < 300) {
        const data = response.data.data
        // 将余额和可用金额与组件data绑定
        this.accountBalance = data.AccountBalance
        this.availableBalance = data.AvailableBalance
      } else {
        // 请求失败提示(网络或后台故障)
        alert(this.$CONST.REQUEST_FAILURE)
      }
    })
  }
}
</script>

<style scoped>

</style>
