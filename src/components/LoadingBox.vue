<template>
    <div id="container">
        <div class="divider"></div>
        <div class="loading-text">
            <span class="letter">L</span>
            <span class="letter">o</span>
            <span class="letter">a</span>
            <span class="letter">d</span>
            <span class="letter">i</span>
            <span class="letter">n</span>
            <span class="letter">g</span>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$black: #000;
$white: #fff;
@mixin pseudo($content: '') {
    position: absolute;
    content: $content;
}
#container {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -138.5px;
}
.divider {
    position: absolute;
    z-index: 2;
    top: 65px;
    left: 200px;
    width: 50px;
    height: 15px;
    background: $white;
}
.loading-text {
    position: relative;
    font-size: 3.75rem;
    font-weight: 300;
    white-space: nowrap;
    &::before {
        @include pseudo;
        z-index: 1;
        top: 40px;
        left: 115px;
        width: 6px;
        height: 6px;
        background: $black;
        border-radius: 50%;
        animation: dotMove 1800ms cubic-bezier(0.25, 0.25, 0.75, 0.75) infinite;
    }
    .letter {
        display: inline-block;
        position: relative;
        color: $black;
        letter-spacing: 8px;
        &:nth-child(1) {
            transform-origin: 100% 70%;
            transform: scale(1, 1.275);
            &::before {
                @include pseudo;
                top: 22px;
                left: 0;
                width: 14px;
                height: 36px;
                background: $white;
                transform-origin: 100% 0;
                animation: lineStretch 1800ms cubic-bezier(0.25, 0.25, 0.75, 0.75) infinite;
            }
        }
        &:nth-child(5) {
            transform-origin: 100% 70%;
            animation: letterStretch 1800ms cubic-bezier(0.25, 0.23, 0.73, 0.75) infinite;
            &::before {
                @include pseudo;
                top: 15px;
                left: 2px;
                width: 9px;
                height: 15px;
                background: $white;
            }
        }
    }
}
@keyframes dotMove {
    0%,
    100% {
        transform: rotate(180deg) translate(-110px, -10px) rotate(-180deg);
    }
    50% {
        transform: rotate(0deg) translate(-111px, 10px) rotate(0deg);
    }
}
@keyframes letterStretch {
    0%,
    100% {
        transform: scale(1, 0.35);
        transform-origin: 100% 75%;
    }
    8%,
    28% {
        transform: scale(1, 2.125);
        transform-origin: 100% 67%;
    }
    37% {
        transform: scale(1, 0.875);
        transform-origin: 100% 75%;
    }
    46% {
        transform: scale(1, 1.03);
        transform-origin: 100% 75%;
    }
    50%,
    97% {
        transform: scale(1);
        transform-origin: 100% 75%;
    }
}
@keyframes lineStretch {
    0%,
    45%,
    70%,
    100% {
        transform: scaleY(0.125);
    }
    49% {
        transform: scaleY(0.75);
    }
    50% {
        transform: scaleY(0.875);
    }
    53% {
        transform: scaleY(0.5);
    }
    60% {
        transform: scaleY(0);
    }
    68% {
        transform: scaleY(0.18);
    }
}
</style>