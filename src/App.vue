<template>
    <div id="app">
        <div class="wrapper">
            <div class="typing-demo">这是我的个人博客，正在构建中.</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {}
}
</script>

<style>
.wrapper {
    height: 100vh;
    /*This part is important for centering*/
    display: grid;
    place-items: center;
}

.typing-demo {
    width: 30ch;
    animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid;
    font-family: monospace;
    font-size: 2em;
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
</style>
