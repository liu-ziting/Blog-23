<template>
    <div class="wrap">
        <!-- <canvas class="canvas"></canvas> -->
        <span class="topBorder">Acticle</span>
        <!-- <h1 class="typing">Liu Ziting</h1> -->
        <div class="box" v-for="(item, index) in list" :key="index">
            <h2>{{ item.tag }}</h2>
            <p>
                <a :href="item.src" target="_blank" :class="item.class">
                    {{ index + 1 }}.
                    {{ item.title }}
                </a>
            </p>
        </div>
    </div>
</template>

<script>
// import canvasMotion from '../utils/canvas-motion.js'
export default {
    name: 'MainList',
    data() {
        return {
            list: [
                {
                    title: 'Chatgpt3.5+Vercel，零代码在线部署到云端.',
                    tag: 'GPT.Vercel',
                    src: 'https://paragraph.xyz/@lzt/preview/9RCkzzDpDakfx6Qof3Qd',
                    class: 'underlined underlined--thin'
                },
                {
                    title: 'Vercel+Railway部署Typecho动态博客.',
                    tag: 'Vercel.Railway.Typecho',
                    src: 'https://paragraph.xyz/@lzt/preview/z2wfOEx5417LB22TOxy4',
                    class: 'underlined underlined--thick'
                },
                {
                    title: 'Cursor一个集成了GPT-4的编辑器.',
                    tag: 'Cursor.GPT',
                    src: 'https://paragraph.xyz/@lzt/preview/1LlkQGo7MJ8nOyUx9JVV',
                    class: 'underlined underlined--reverse'
                },
                {
                    title: 'Js中?.、??、??=的用法及使用场景.',
                    tag: 'Js',
                    src: 'https://paragraph.xyz/@lzt/preview/QBemWyLa2SewXYa3PNQ4',
                    class: 'underlined underlined--thin'
                },
                {
                    title: '前端工具类网站.',
                    tag: 'Website',
                    src: 'https://gamma.app/public/-8sse4vampaeyogm',
                    class: 'underlined underlined--offset'
                },
                {
                    title: '优秀网站案例.',
                    tag: 'Case',
                    src: 'https://gamma.app/public/-u01r2v0m32l9t21',
                    class: 'underlined underlined--gradient'
                }
            ]
        }
    },
    mounted() {
        // canvasMotion.start()
    }
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
.wrap {
    overflow: hidden;
    padding: 2% 20% 6% 20%;
    box-sizing: border-box;
    .box {
        margin-top: 3rem;
    }
    .box:first-child {
        margin: 0;
    }

    h1 {
        font-size: 3.3rem;
        font-weight: 200;
        letter-spacing: -0.1rem;
        text-indent: -2px;
    }
    h2 {
        color: grey;
        font-family: 'Source Code Pro', sans-serif;
    }
    .typing {
        width: 14ch;
        animation: typing 2s steps(11), blink 0.5s step-end infinite alternate;
        white-space: nowrap;
        overflow: hidden;
        height: 60px;
        font-family: 'Source Code Pro', sans-serif;
    }
}

@keyframes typing {
    from {
        width: 0;
    }
}

@keyframes blink {
    50% {
        border-color: transparent;
    }
}
@media only screen and (max-width: 767px) {
    .wrap {
        padding: 10%;
        .underlined {
            font-size: 1.5rem;
        }
    }
}
</style>
