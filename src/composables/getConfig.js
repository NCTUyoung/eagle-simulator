import { reactive,computed } from "vue";
import justifiedLayout from 'justified-layout'
import getItem from "./items";
let {items} = getItem()
export default function () {
    let config = reactive({
        elementWidth: null,
        leftWidth: 300,
        rightWidth: 300,
        totalWidth: 1200,
        options: {
            containerPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            boxSpacing: {
                horizontal: 0,
                vertical: 0
            },
            targetRowHeight: 250,
            targetRowHeightTolerance: 0.5,
            // forceAspectRatio: 1,
            showWidows: true,
            // fullWidthBreakoutRowCadence: 1
        },
    });
    const geometry = computed(() => {
        if (!items) return {}
        const opts = {
            containerWidth: config.elementWidth - 1,
            ...config.options
        }
        return justifiedLayout(items, opts)
    })
    const layout = computed(() => {
        if (!geometry.value.hasOwnProperty("boxes")) return []
        return geometry.value.boxes.map((b, i) => ({
            item: isNaN(items[i]) ? items[i] : {},
            style: {
                height: `${b.height + 50}px`,
                width: `${b.width}px`,
                margin: `0px ${config.options.boxSpacing.horizontal / 2}px 0px ${config.options.boxSpacing.horizontal / 2}px `
                // top: `${b.top}px`,
                // left: `${b.left}px`,
                // position: 'absolute'
            },
            imgStyle: {
                height: `${b.height}px`,
                // width: `${b.width}px`,
                // margin: `0px ${config.options.boxSpacing.horizontal / 2}px 0px ${config.options.boxSpacing.horizontal / 2}px `

            },

        }))
    })
    return {
        config,
        geometry,
        layout
    }
}