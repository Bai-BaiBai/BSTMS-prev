<template>
  <div>
    <div>
      存款金额：<input type="text"><label>必须为100的整数倍</label>
    </div>
    <button>提交</button>
    <button>返回主页面</button>
  </div>
</template>

<script>
export default {
  name: 'SaveMoney'
}
</script>

<style scoped>
label{
  color: red;
}
</style>
