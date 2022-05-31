<template>
  <div ref="centerRoot" class="top-layout">
    <div class="justified-container flex flex-wrap">
      <div class="justified-item " v-for="(box, index) in layout" :key="index" :style="box.style">
        <img class="h-full " :src="box.item.url">
      </div>
    </div>
  </div>




</template>

<script setup>
import justifiedLayout from 'justified-layout'
import { reactive, onMounted, onUnmounted ,computed,watch,ref} from 'vue'
import justify_config from '@/composables/getConfig.js'
let {config} = justify_config()

let items = reactive([
  {
    width: 2649,
    height: 1000,
    url: 'images/3.png'
  },
  {
    width: 1000,
    height: 1254,
    url: 'images/0.jpg'
  }, {
    width: 300,
    height: 400,
    url: 'https://source.unsplash.com/featured/300x400?green,blue'
  }, {
    width: 270,
    height: 400,
    url: 'https://source.unsplash.com/featured/270x400?green,blue'
  }, {
    width: 320,
    height: 400,
    url: 'https://source.unsplash.com/featured/320x400?green,blue'
  },
  {
    width: 320,
    height: 400,
    url: 'https://source.unsplash.com/featured/320x400?green,blue'
  },
  {
    width: 250,
    height: 400,
    url: 'https://source.unsplash.com/featured/250x400?green,blue'
  },
  {
    width: 250,
    height: 400,
    url: 'https://source.unsplash.com/featured/250x400?green,blue'
  },
  {
    width: 2649,
    height: 1000,
    url: 'images/3.png'
  },
  {
    width: 320,
    height: 400,
    url: 'https://source.unsplash.com/featured/320x400?green,blue'
  },
  {
    width: 2649,
    height: 1000,
    url: 'images/3.png'
  },
])

const centerRoot = ref(null)
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
      height: `${b.height}px`,
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
  config.elementWidth = config.options.containerWidth || centerRoot.value.clientWidth
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>


<style scoped >
.top-layout {
  background-color: rgb(55, 56, 60);
  min-height: 100vh;
  max-width: 80vw;
}

ul::after {
  flex: 10000000;
}

.justified.container {
  width: 100%;
  height: 100%;

}

.justified-item {
  cursor: pointer;
}

/* img {
    max-width: 100%;
} */
</style>


