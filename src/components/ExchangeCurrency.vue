<template>
  <div>
    <div>
      选择兑换货币类型：
      <ul>
        <li></li>
      </ul>
    </div>
    <div>
      兑换金额：<input type="text">
      <label>必须为100的整数倍</label>
    </div>
<!--    弹框确认后，弹框成功-->
    <button>提交</button>
  </div>
</template>

<script>
export default {
  name: 'ExchangeCurrency'
}
</script>

<style scoped>
label{
  color: red;
}
</style>
