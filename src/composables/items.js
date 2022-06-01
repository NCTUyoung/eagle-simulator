import { reactive } from "vue";
export default function(){
    let items = reactive([
        {
            width: 2649,
            height: 1000,
            url: 'images/3.jpg'
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
            url: 'images/3.jpg'
        },
        {
            width: 320,
            height: 400,
            url: 'https://source.unsplash.com/featured/320x400?green,blue'
        },
        {
            width: 2649,
            height: 1000,
            url: 'images/3.jpg'
        },
    ]);
    return{
        items
    }
}