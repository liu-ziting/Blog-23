<template>
    <div id="app">
        <!-- <canvas class="canvas"></canvas> -->
        <nav>
            <router-link to="/" :class="{ active: $route.path === '/' }">
                <a href="javascript:;">Home</a>
            </router-link>
            <router-link to="/Article" :class="{ active: $route.path === '/Article' }">
                <a href="javascript:;">Article</a>
            </router-link>
            <router-link to="/About" :class="{ active: $route.path === '/About' }">
                <a href="javascript:;">About</a>
            </router-link>
        </nav>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
// import canvasMotion from './utils/canvas-motion.js'
export default {
    name: 'App',
    components: {},
    data() {
        return {}
    },
    methods: {},
    mounted() {
        // canvasMotion.start()
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
    z-index: 99999;
}
.main {
    margin-top: 5rem;
}
.thx {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 15px;
}
nav {
    width: 100%;
    position: fixed;
    text-align: center;
    height: 40px;
    padding-top: 20px;
    top: 0;
    line-height: 40px;
    background-color: #fff;
    z-index: 999;
    a {
        font-family: 'Oswald', sans-serif;
        font-weight: 500;
        text-transform: uppercase;
        text-decoration: none;
        color: #16151b;
        margin: 0 10px;
        font-size: 16px;
        letter-spacing: 1px;
        position: relative;
        display: inline-block;
    }
    a:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background: #16151b;
        top: 47%;
        animation: out 0.2s cubic-bezier(1, 0, 0.58, 0.97) 1 both;
    }
    a:hover:before {
        animation: in 0.2s cubic-bezier(1, 0, 0.58, 0.97) 1 both;
    }
    .active:before {
        animation: in 0.2s cubic-bezier(1, 0, 0.58, 0.97) 1 both;
    }
}

@keyframes in {
    0% {
        width: 0;
        left: 0;
        right: auto;
    }
    100% {
        left: 0;
        right: auto;
        width: 100%;
    }
}
@keyframes out {
    0% {
        width: 100%;
        left: auto;
        right: 0;
    }
    100% {
        width: 0;
        left: auto;
        right: 0;
    }
}
@keyframes show {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@for $i from 1 through 5 {
    nav a:nth-child(#{$i}) {
        animation: show 0.2s #{$i * 0.1+1}s ease 1 both;
    }
}
</style>
