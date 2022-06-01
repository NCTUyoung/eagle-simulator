<template>
  <div  class="top-layout bg-slate-800">
    <div ref="v_leftPannel" class="left-side  ">
      <span v-cloak>center width {{ config.elementWidth }}</span> 
      <div class="drag-handle h-full bg-slate-600 inline-flex hover:cursor-ew-resize" v-on:mousedown="initResize"></div>
    </div>
    <div ref="centerRoot" class="center inline-flex justified-container  flex-wrap">
      <div class="justified-item " v-for="(box, index) in layout" :key="index" :style="box.style">
        <img class="h-full " :src="box.item.url">
      </div>
    </div>
    <div class="right-side">

    </div>
  </div>




</template>

<script setup>
import justifiedLayout from 'justified-layout'
import { reactive, onMounted, onUnmounted ,computed,watch,ref} from 'vue'
import justify_config from '@/src/composables/getConfig.js'
import getItems from '@/src/composables/items.js'
let {config} = justify_config()
let {items} = getItems()


const centerRoot = ref(null)
const v_leftPannel = ref(null)
const geometry = computed(() => {
  if (!items) return {}
  const opts = {
    containerWidth: config.elementWidth-1,
    ...config.options
  }
  return justifiedLayout(items, opts)
})
const layout = computed(() => {
  if (!geometry.value.hasOwnProperty("boxes")) return []
  return geometry.value.boxes.map((b, i) => ({
    item: isNaN(items[i]) ? items[i] : {},
    style: {
      height: `${b.height}px`+20,
      width: `${b.width}px`,
      margin: `0px ${config.options.boxSpacing.horizontal / 2}px 0px ${config.options.boxSpacing.horizontal / 2}px `
      // top: `${b.top}px`,
      // left: `${b.left}px`,
      // position: 'absolute'
    }
  }))
})
const style = computed(() => {
  if (!geometry) return {}
  return {
    position: 'relative',
    height: `${geometry.value.containerHeight}px`
  }
})
const row = computed(() => {
  let num_items = []
  let tmp_top = -1
  let tmp_count = 0
  geometry.value.boxes.forEach((box) => {
    if (box.top != tmp_top) { // new row
      num_items.push(1)
      tmp_top = box.top
    } else { // new element count
      num_items[num_items.length - 1] += 1
    }
  })
  return num_items
})
const onResize = () => {
  console.log(centerRoot.value.clientWidth)
  config.elementWidth = centerRoot.value.clientWidth
}
onMounted(() => {
  console.log(centerRoot.value.clientWidth)

  config.elementWidth =  centerRoot.value.clientWidth
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})


let Resize = (e)=>{
  console.log("resize")
  onResize()
  v_leftPannel.value.style.width = (e.clientX - v_leftPannel.value.offsetLeft) + 'px';
  document.body.style.cursor = 'ew-resize'
}

let initResize = ()=>{
  console.log("initResize")
  window.addEventListener('mousemove',Resize,false);
  window.addEventListener('mouseup',stopResize,false);
}

let stopResize = ()=>{
  window.removeEventListener('mousemove', Resize, false);
  window.removeEventListener('mouseup', stopResize, false);
  document.body.style.cursor = 'default'
}
</script>


<style scoped >
.top-layout {
  background-color: rgb(55, 56, 60);
  min-height: 100vh;
  display: flex;
  /* max-width: 80vw; */
}
.left-side{
  width: 20%;
  min-height: 100vh;
  height: 100%;
  display: inline-flex;
  position: relative;
}
.center{
  width: 50vw;
  margin-left: 5px;
  margin-right: 5%;
}
.right-side{
  width: 20%;
  min-height: 100vh;
  height: 100%;
  display: inline-flex;
}
.justified-item {
  cursor: pointer;
}
.drag-handle{
  width: 10px;
  height: 100%;
  min-height: 100vh;
  right: 0;
  position: absolute
  /* float: right; */
}
/* img {
    max-width: 100%;
} */
</style>


