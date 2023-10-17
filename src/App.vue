<template>
    <div id="app" :class="isSwitched ? 'blacks' : 'white'">
        <canvas class="canvas"></canvas>
        <main-list @blackAndWhite="blackAndWhite" />
    </div>
</template>

<script>
import canvasMotion from './utils/canvas-motion.js'
import MainList from './components/MainList.vue'
export default {
    name: 'App',
    components: { MainList },
    data() {
        return {
            isSwitched: false
        }
    },
    methods: {
        blackAndWhite() {
            this.isSwitched = !this.isSwitched
        }
    },
    mounted() {
        canvasMotion.start()
    }
}
</script>

<style lang="scss" scoped>
.canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
.blacks {
    background-color: #161616;
}
.white {
    background-color: inherit;
}
</style>
