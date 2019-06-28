<template>
<div>
  <div>
  当前余额：<label>{{accountBalance}}</label>
  </div>
  <div>
    可用余额：<label>{{availableBalance}}</label>
  </div>
  <button>返回主页面</button>
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
  }
}
</script>

<style scoped>

</style>
