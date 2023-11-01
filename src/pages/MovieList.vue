<template>
    <div class="wrap">
        <span class="topBorder">Movie</span>
        <div>
            <section class="playlists">
                <article class="card" v-for="(item, index) in data" :key="index" @click="openLink(item.link)">
                    <div class="card-inner">
                        <span class="card-pin"></span>
                        <div class="card-image">
                            <div class="card-image-inner"></div>
                            <img :src="require(`@/assets/pian/${item.img}`)" alt="" />
                        </div>
                        <div class="card-content">
                            <div class="card-meta">
                                <span class="card-meta-number">{{ item.tag }}</span>
                            </div>
                            <h2 class="card-title">{{ item.title }}</h2>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    title: '好戏网',
                    tag: 'haoxi.vip',
                    link: 'https://haoxi.vip/vodtype/1/',
                    img: '1.png'
                },
                {
                    title: '搜片网',
                    tag: 'soupian.pro',
                    link: 'https://soupian.pro/',
                    img: '2.png'
                },
                {
                    title: 'hwj影视',
                    tag: 'hwjyingshi.xyz',
                    link: 'https://hwjyingshi.xyz/',
                    img: '3.png'
                },
                {
                    title: '豌豆Pro',
                    tag: 'wandou.la',
                    link: 'https://wandou.la/',
                    img: '4.png'
                },
                {
                    title: '低端影视',
                    tag: 'ddys.pro',
                    link: 'https://ddys.pro/',
                    img: '5.png'
                },
                {
                    title: '厂长资源',
                    tag: 'czzy88',
                    link: 'https://www.czzy88.com/',
                    img: '6.png'
                },
                {
                    title: 'JOJO电影',
                    tag: 'jiohub.top',
                    link: 'https://jiohub.top',
                    img: '7.png'
                },
                {
                    title: '可可影视',
                    tag: 'keke1.top',
                    link: 'https://www.keke1.app/',
                    img: '8.png'
                },
                {
                    title: '奈飞中文影视',
                    tag: 'netfly.fun',
                    link: 'https://www.netfly.fun/',
                    img: '9.png'
                },
                {
                    title: '影书',
                    tag: 'insbook.xyz',
                    link: 'https://www.insbook.xyz/',
                    img: '10.png'
                },
                {
                    title: 'NO视频',
                    tag: 'novipnoad.net',
                    link: 'https://www.novipnoad.net',
                    img: '11.png'
                },
                {
                    title: 'FreeOk',
                    tag: 'freeok.vip',
                    link: 'https://www.freeok.vip/',
                    img: '12.png'
                },
                {
                    title: '喵物次元',
                    tag: 'catw.moe',
                    link: 'https://catw.moe/',
                    img: '13.png'
                },
                {
                    title: '咕咕番',
                    tag: 'gugufan',
                    link: 'https://www.gugufan.com/',
                    img: '14.png'
                },
                // {
                //     title: '腐剧TV',
                //     tag: 'fuju1.tv',
                //     link: 'https://www.fuju1.tv/',
                //     img: '16.png'
                // },
                {
                    title: '追影喵',
                    tag: 'zhuiyingmao2',
                    link: 'https://zhuiyingmao2.com/',
                    img: '15.png'
                },
                {
                    title: '注视影视',
                    tag: 'gaze.run',
                    link: 'https://gaze.run/',
                    img: '17.png'
                }
            ]
        }
    },
    methods: {
        openLink(link) {
            window.open(link)
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.wrap {
    overflow: hidden;
    padding: 2% 20% 6% 20%;
    box-sizing: border-box;
    .typing {
        width: 14ch;
        animation: typing 2s steps(11), blink 0.5s step-end infinite alternate;
        white-space: nowrap;
        overflow: hidden;
        height: 60px;
        font-family: 'Source Code Pro', sans-serif;
    }
}
@media only screen and (max-width: 767px) {
    .wrap {
        padding: 10%;
        .underlined {
            font-size: 1.5rem;
        }
    }
    .playlists {
        width: 120%;
        margin-left: -10%;
    }
}

.playlists {
    margin-top: 1.5rem;
}

.currently-playing {
    padding: 1rem 0.5rem;
}

.card {
    cursor: pointer;
    width: calc(25% - 2rem);
    transform: rotate(0deg);
    transition: 0.15s ease-out;
    float: left;
    margin: 1rem 1rem 3rem 1rem;
    &:hover,
    &:focus-within {
        transform: translateY(4px) rotate(1deg);
        .card-inner {
            background-color: #fbf8f2;
        }
        .card-pin:after {
            height: 54px;
        }

        .card-pin:before {
            transform: translatey(-4px);
        }
        .card-image-inner {
            display: none;
        }
    }
}
@media only screen and (max-width: 767px) {
    .wrap {
        padding: 10%;
    }
    .card {
        width: calc(50% - 1rem);
        margin: 2rem 0.5rem;
    }
}
.card-inner {
    display: flex;
    flex-direction: column;
    border: 2px solid #1d1d1d;
    border-radius: 20px;
    padding: 0.5rem;
    background-color: #fff;
    position: relative;
    &:after {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        width: 95%;
        height: 100%;
        bottom: -9px;
        left: calc(50% - 47.5%);
        border-radius: 20px;
        border: 2px solid #1d1d1d;
        background-color: #f8e0b1;
    }
}

.card-pin {
    width: 12px;
    height: 12px;
    background-color: #1d1d1d;
    position: absolute;
    top: 20px;
    left: calc(50% - 6px);
    border-radius: 50%;
    box-shadow: 0 0 0 2px #fff, 0 0 0 3px #1d1d1d;
    transform: rotate(3deg);
    z-index: 1;
    &:before,
    &:after {
        content: '';
        display: block;
        border-radius: 50%;
        position: absolute;
        transition: 0.15s ease-out;
    }

    &:before {
        width: 12px;
        height: 12px;
        background-color: #1d1d1d;
        border-radius: 50%;
        left: calc(50% - 6px);
        top: -44px;
    }

    &:after {
        width: 6px;
        background-color: #fff;
        border: 1px solid;
        border-radius: 99em;
        height: 50px;
        left: calc(50% - 3px);
        bottom: 3px;
    }

    &.simple {
        box-shadow: none;
        &:nth-of-type(odd) {
            left: 10px;
            top: 10px;
            transform: rotate(-45deg);
        }

        &:nth-of-type(even) {
            left: calc(100% - 20px);
            top: calc(100% - 20px);
            transform: rotate(120deg);
        }
    }
}

.card-image {
    border-radius: 10px;
    overflow: hidden;
    aspect-ratio: 5 / 3;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: cover;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .card-image-inner {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: cover;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
        z-index: 999;
    }
}

.card-meta,
.card-title {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 0.25rem;
    font-size: 1.2rem;
    font-weight: 600;
    padding-bottom: 0.5rem;
}

.card-meta {
    padding-top: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card-meta-number {
    color: #5f5f5f;
    font-size: 0.875rem;
    font-weight: 500;
}
</style>
