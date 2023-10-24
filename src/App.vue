<template>
    <div id="app">
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
            <router-link to="/ToolList" :class="{ active: $route.path === '/ToolList' }">
                <a href="javascript:;">Tool</a>
            </router-link>
        </nav>
        <div class="main">
            <router-view></router-view>
        </div>
        <svg
            v-show="backToTop"
            @click="scrollToTop"
            class="backToTop"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
        </svg>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data() {
        return {
            backToTop: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.backToTop = scrollTop > 100
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
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
.backToTop {
    width: 30px;
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 99999;
    cursor: pointer;
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
