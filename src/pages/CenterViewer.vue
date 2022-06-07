<template>
  <div  ref="v_top" class="top-layout bg-slate-800">
    <div ref="v_leftPannel" class="left-side  " :style="leftStyle">
      <span v-cloak>center width {{ config.elementWidth }}</span> 
      <div class="drag-handle h-full bg-slate-600 inline-flex hover:cursor-ew-resize" v-on:mousedown="initResize"></div>
    </div>
    <div ref="v_centerRoot" class="center inline-flex flex-wrap" id="v_centerRoot" v-show="!open" :style="centerStyle">
      <div class="justified-item " v-for="(box, index) in layout" :key="index" :style="box.style" v-on:dblclick="selectItem(index)">
        <img class="w-full border-2 border-transparent box-content rounded-lg hover:border-blue-500" :src="box.item.url" :style="box.imgStyle">
        <div class="flex justify-center">
          <span class="text-white text-sm text-center text-ellipsis w-16 truncate  overflow-hidden">{{ box.item.url }}</span>
        </div>
        <div class="flex justify-center">
          <span class="text-xxs text-center  truncate  overflow-hidden text-slate-400">{{ box.item.width }} x {{ box.item.height }}</span>
        </div>
      </div>
      
      
    </div>
    <div ref="v_imageViewer" class="center-viewer" v-show="open">
        <p>Hello from the modal!</p>
        <button @click="open = false">Close</button>
    </div>
    <div ref="v_rightPannel" class="right-side" :style="rightStyle">

    </div>

    

  </div>




</template>

<script setup>
import { reactive, onMounted, onUnmounted ,computed,watch,ref} from 'vue'
import justify_config from '@/src/composables/getConfig.js'
import getItems from '@/src/composables/items.js'
let {config,geometry,layout} = justify_config()



/* ----- vue template ------*/
const v_centerRoot = ref(null)
const v_imageViewer = ref(null)
const v_leftPannel = ref(null)
const v_rightPannel = ref(null)
const v_top = ref(null)




const style = computed(() => {
  if (!geometry) return {}
  return {
    position: 'relative',
    height: `${geometry.value.containerHeight}px`
  }
})
const centerStyle = computed(()=>{
  let style = {
    width:`${config.totalWidth - config.leftWidth  - config.rightWidth}px`
  }
  return style
})
const leftStyle = computed(()=>{
  let style = {
    width:`${config.leftWidth}px`
  }
  return style
})
const rightStyle = computed(()=>{
  let style = {
    width:`${config.rightWidth}px`
  }
  return style
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
  console.log(v_top.value.clientWidth)
  console.log(v_rightPannel.value.clientWidth)
  console.log(v_leftPannel.value.clientWidth)
  console.log("Center width",config.elementWidth)
  config.leftWidth = v_leftPannel.value.clientWidth
  config.rightWidth = v_rightPannel.value.clientWidth
  config.totalWidth = v_top.value.clientWidth
  config.elementWidth = config.totalWidth - config.leftWidth - config.rightWidth
  
}

const open = ref(false)
const selectItem = (key)=>{
  open.value =true
  v_imageViewer.value.style.width = config.elementWidth + 'px'

}

onMounted(() => {
  
  config.totalWidth = v_top.value.clientWidth
  config.leftWidth = v_leftPannel.value.clientWidth
  config.rightWidth = v_rightPannel.value.clientWidth
  config.elementWidth = config.totalWidth - config.leftWidth - config.rightWidth
  console.log("Total width",config.totalWidth)
  console.log("Center width",config.elementWidth)
  console.log("Left width",config.leftWidth)
  console.log("Right width",config.rightWidth)
  
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove',mousePosition,false);
  onResize()

})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
let mouseX = ref(null)
let mouseY = ref(null)

let mousePosition = (e)=>{
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}
let ResizeLeftPannel = (e)=>{
  if(e.stopPropagation) e.stopPropagation();
  if(e.preventDefault) e.preventDefault();
  config.leftWidth = mouseX.value - v_leftPannel.value.offsetLeft
  config.elementWidth = v_top.value.clientWidth - config.leftWidth - config.rightWidth
  document.body.style.cursor = 'ew-resize'
}

let initResize = ()=>{
  window.addEventListener('mousemove',ResizeLeftPannel,false);
  window.addEventListener('mouseup',stopResize,false);
}

let stopResize = ()=>{
  window.removeEventListener('mousemove', ResizeLeftPannel, false);
  window.removeEventListener('mouseup', stopResize, false);
  document.body.style.cursor = 'default'
}
</script>


<style scoped >
.top-layout {
  background-color: rgb(55, 56, 60);
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  /* max-width: 80vw; */
}
.left-side{
  width: 600px;
  min-height: 100vh;
  height: 100%;
  display: inline-flex;
  position: relative;
}
.center{
  /* width: 60vw; */
  /* margin-left: 10px; */
  /* margin-right: 10px; */
}

.center-viewer{
  /* z-index: 1; */
  position: fixed;
  min-height: 100vh;
  /* width: 100%; */
  background-color: rgb(55, 56, 60);

}
.right-side{
  width: 300px;
  min-height: 100vh;
  height: 100%;
  display: inline-flex;
  /* position: absolute; */

}
.justified-item {
  
  padding-left: 5px;
  padding-right: 5px;

}
.drag-handle{
  width: 15px;
  height: 100%;
  min-height: 100vh;
  right: 0;
  position: absolute
  /* float: right; */
}
img {
    /* border-width: 2px; */
    cursor: pointer;
    box-sizing:content-box;
}

</style>


