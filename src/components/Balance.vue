<template>
<div>
  <div>
  当前余额：<label>{{accountBalance}}</label>
  </div>
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
  mounted () {
    this.$api.get('/money', {}, response => {
      if (response.status >= 200 && response.status < 300) {
        const data = response.data.data
        this.accountBalance = data.AccountBalance
        this.availableBalance = data.AvailableBalance
      } else {
        alert('请求失败')
      }
    })
  }
}
</script>

<style scoped>

</style>
