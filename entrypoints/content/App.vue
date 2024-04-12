<script setup>
import ToolsContent from './components/ToolsContent.vue';
import { ref, computed } from 'vue'
import { startTask, start, end } from './utils.ts';
import { typeMap } from './constants.ts';
import { useDraggable } from '@vueuse/core'

const moveDomRef = ref(null);
const toolsContentRef = ref(null);
const pressedDelta = ref(null);
const position = ref({x: 0,y:0});
const __typeMap = ref(typeMap);


const { x, y, style } = useDraggable(moveDomRef, {
  initialValue: { x: 0, y: 0 },
})


const handleStart = (e) => {
  e.stopPropagation();
  // console.log(__typeMap.value)
  start(__typeMap.value);
}

const handleStop = (e) => {
  console.log('handleStop');
  e.stopPropagation();
  end();
}

</script>

<template>
  <div class="dy-tool__content">
    <div ref="moveDomRef" class="tools-content" style="position: fixed" :style="style">
      <ToolsContent ref="toolsContentRef" v-model="__typeMap" />
      <el-button @click="handleStart">开始</el-button>
      <el-button @click="handleStop">停止</el-button>
    </div>
  </div>
</template>

<style scoped>
.dy-tool__content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 99vh;
  z-index: 999;
}
.tools-content{
  width: 400px;
  height: 100%;
  background-color: gray;
  position: fixed;
  padding: 10px;
}
</style>
