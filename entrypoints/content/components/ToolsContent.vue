<template>
  <div class="tools-content-wrap">
    <div v-for="(item, key) in model" :key="key">
      <label>{{ key }} : </label>
      <el-input
        :model-value="item"
        @input="(value) => handleInput(key, value)"
        class="textarea"
        style="width: 340px;height:100px"
        input-style="width: 340px;height:100px"
        :rows="2"
        type="textarea"
        placeholder="Please input"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose, defineModel } from 'vue';
const textarea = ref('根据退款规则，若您符合退款条件，可在相关订单详情页申请退款。其他的问题，您可通过老师的抖音主页咨询老师相关课程问题.感谢.');

defineExpose({
  textarea
})

const model = defineModel()
console.log(model, 'model')

const handleInput = (key, value) => {
  model.value[key] = value;
}

</script>

<style scoped>
.tools-content-wrap{
  height: 90vh;
  overflow: auto;
  color: #000;
  border-radius: 4px;
  background-color: #eee;
}
</style>