<template>
  <div>
    <div>
      取款金额：<input type="text">  <label>必须为50的倍数</label>
    </div>
    <div>
      <button>取款：100</button>
      <button>取款：500</button>
      <button>取款：1000</button>
    </div>
<!--    提交后弹框确认-->
    <button>提交</button>
  </div>
</template>

<script>
export default {
  name: 'GetMoney'
}
</script>

<style scoped>
  label{
    color: red;
  }
</style>
