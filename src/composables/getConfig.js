import { reactive } from "vue";
export default function(){
    let config = reactive({
        elementWidth: null,
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
            // targetRowHeightTolerance:0.3,
            // forceAspectRatio: 1,
            showWidows: true,
            // fullWidthBreakoutRowCadence: 1
        },
    });
    return{
        config
    }
}