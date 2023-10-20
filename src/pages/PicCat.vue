<template>
    <div class="wrap">
        <div class="card-container">
            <div
                class="card"
                v-for="(item, index) in data"
                :key="index"
                :style="{
                    '--image': `url(${require('@/assets/11/' + item.image + '')})`,
                    '--angle': item.angle,
                    '--x': item.x,
                    '--y': item.y,
                    '--caption': item.caption
                }"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    image: '1.jpg',
                    angle: '-5deg',
                    x: '5%',
                    y: '15%',
                    caption: ''
                },
                {
                    image: '2.jpg',
                    angle: '-1deg',
                    x: '-10%',
                    y: '-20%',
                    caption: ''
                },
                {
                    image: '3.jpg',
                    angle: '-4deg',
                    x: '-20%',
                    y: '-5%',
                    caption: ''
                },
                {
                    image: '4.jpg',
                    angle: '7deg',
                    x: '10%',
                    y: '-7%',
                    caption: ''
                },
                {
                    image: '5.jpg',
                    angle: '-13deg',
                    x: '28%',
                    y: '14%',
                    caption: ''
                },
                {
                    image: '6.jpg',
                    angle: '6deg',
                    x: '30%',
                    y: '-24%',
                    caption: ''
                }
            ]
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.typing {
    font-size: 25px;
    height: 60px;
    overflow: hidden;
    font-family: 'Source Code Pro', sans-serif;
}

.heading {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 2vmin 3vmin;
    color: #999;
}

.card-container {
    position: relative;
    width: 80vmin;
    height: 80vmin;
    margin: 0 auto;
}

.card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: darken(white, 2%);
    border-radius: 2px;
    box-shadow: 2px 2px 5px rgba(#111, 0.35);
    transition: transform 0.35s ease-out;
    transform: translate(var(--x), var(--y)) scale(0.35) rotate(var(--angle));
    will-change: transform;

    &:hover {
        transform: scale(1) rotate(0deg);
        z-index: 1;

        &:before {
            opacity: 1;
        }
    }
}

.card:before {
    content: '';
    display: block;
    width: 90%;
    height: 80%;
    margin: 5%;
    background: var(--image) center center no-repeat;
    background-size: cover;
    box-shadow: inset 0 0 5px rgba(#222, 0.35);
    border-radius: 2px;
    filter: sepia(0.2) brightness(0.9) contrast(1.2);
    transition: opacity 0.35s ease-out;
    opacity: 0.5;
    will-change: opacity;
}

.card:after {
    display: block;
    content: var(--caption);
    font-weight: 500;
    color: #555;
    font-size: 3vmin;
    opacity: 0.75;
    text-align: center;
}
</style>
