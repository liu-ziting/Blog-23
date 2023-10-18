<template>
    <div id="app">
        <canvas class="canvas"></canvas>
        <router-view></router-view>
    </div>
</template>

<script>
import canvasMotion from './utils/canvas-motion.js'
export default {
    name: 'App',
    components: {},
    data() {
        return {}
    },
    methods: {},
    mounted() {
        canvasMotion.start()
    },
    created() {}
}
</script>

<style lang="scss" scoped>
.canvas {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
}
</style>
