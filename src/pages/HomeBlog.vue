<template>
    <div>
        <main id="app" class="content">
            <nav class="nav">
                <menu class="nav__controls">
                    <li
                        v-for="(active, menu) in menus"
                        :key="menu"
                        class="nav__label"
                        :class="{
                            'nav__label--active': active,
                            'nav__label--filter': activeFilters[menu].length
                        }"
                        @click="setMenu(menu, active)"
                    >
                        <svg
                            v-if="menu === 'categories'"
                            class="iconSvg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="m6 20l1-4H3l.5-2h4l1-4h-4L5 8h4l1-4h2l-1 4h4l1-4h2l-1 4h4l-.5 2h-4l-1 4h4l-.5 2h-4l-1 4h-2l1-4H9l-1 4H6Zm3.5-6h4l1-4h-4l-1 4Z"
                            />
                        </svg>
                        <svg
                            v-if="menu === 'countries'"
                            class="iconSvg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="M8.75 11.5h11.5a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1 0-1.5Zm0 6h11.5a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1 0-1.5Zm-5-12h10a.75.75 0 0 1 0 1.5h-10a.75.75 0 0 1 0-1.5ZM5 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-1 7a1 1 0 1 1 0-2a1 1 0 0 1 0 2ZM19.309 7.918l-2.245-2.501A.25.25 0 0 1 17.25 5h4.49a.25.25 0 0 1 .185.417l-2.244 2.5a.25.25 0 0 1-.372 0Z"
                            />
                        </svg>
                        <svg
                            v-if="menu === 'rating'"
                            class="iconSvg"
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="currentColor"
                                d="M21.803 6.085c.899-1.82 3.495-1.82 4.394 0l4.852 9.832l10.85 1.577c2.01.292 2.813 2.762 1.358 4.179l-7.85 7.653l1.853 10.806c.343 2.002-1.758 3.528-3.555 2.583L24 37.613l-9.705 5.102c-1.797.945-3.898-.581-3.555-2.583l1.854-10.806l-7.851-7.653c-1.455-1.417-.652-3.887 1.357-4.179l10.85-1.577l4.853-9.832ZM24 7.283l-4.82 9.764a2.45 2.45 0 0 1-1.844 1.34L6.56 19.954l7.798 7.601a2.45 2.45 0 0 1 .704 2.169l-1.84 10.732l9.638-5.067a2.45 2.45 0 0 1 2.28 0l9.638 5.067l-1.84-10.732a2.45 2.45 0 0 1 .704-2.169l7.798-7.6l-10.776-1.566a2.45 2.45 0 0 1-1.845-1.34L24 7.282Z"
                            />
                        </svg>

                        {{ menusNames[menu] }}
                    </li>
                    <li class="nav__label nav__label--clear" @click="clearAllFilters">Clear all</li>
                </menu>
            </nav>

            <transition-group name="dropdown" tag="section" class="dropdown" :style="dropdown">
                <menu
                    v-for="(options, filter) in filters"
                    class="filters"
                    v-show="menus[filter]"
                    ref="menu"
                    :key="filter"
                >
                    <li v-if="filter === 'rating'" class="filters__rating">
                        <output>
                            <label>Minimum rating:&nbsp;</label>
                            {{ parseFloat(filters.rating).toFixed(1) }}
                        </output>

                        <input
                            v-model="filters.rating"
                            class="filters__range"
                            type="range"
                            :min="rating.min"
                            :max="rating.max"
                            step="0.1"
                        />
                    </li>

                    <template v-else>
                        <li
                            v-for="(active, option) in options"
                            :key="option"
                            class="filters__item"
                            :class="{ 'filters__item--active': active }"
                            @click="setFilter(filter, option)"
                        >
                            {{ option }}
                        </li>
                    </template>
                </menu>
            </transition-group>

            <transition-group name="company" tag="ul" class="content__list">
                <li class="company" v-for="company in list" :key="company.id">
                    <div class="company__info">
                        <h2 class="company__name">
                            <a :href="company.link" target="_blank">
                                {{ company.name }}
                            </a>
                        </h2>
                        <blockquote class="company__slogan">{{ company.slogan }}</blockquote>
                    </div>

                    <ul class="company__details">
                        <li class="company__data">
                            <label class="company__label">类型</label>
                            <p class="company__country" @click="clearFilter('countries', company.country)">
                                {{ company.country }}
                            </p>
                        </li>

                        <li class="company__data">
                            <label class="company__label">推荐度</label>
                            <p class="company__rating">{{ company.rating.toFixed(1) }}</p>
                        </li>
                    </ul>
                </li>
            </transition-group>
        </main>
    </div>
</template>

<script>
export default {
    components: {},

    data() {
        return {
            modal: false,
            companies: [],
            dropdown: { height: 0 },
            rating: { min: 10, max: 0 },
            filters: { countries: {}, categories: {}, rating: 0 },
            menus: { countries: false, categories: false, rating: false },
            menusNames: {
                countries: '网站类型',
                categories: '标签',
                rating: '推荐度'
            },
            dataList: [
                {
                    id: '0',
                    name: 'Codepen',
                    country: '代码',
                    link: 'https://codepen.io',
                    rating: 9.9,
                    slogan: '在线代码编辑器和前端开发社区，发掘特效创意',
                    keywords: ['社区', '阅读', '发现创意', '开源', '代码', '特效']
                },
                {
                    id: '1',
                    name: 'Vercel',
                    country: '部署平台',
                    link: 'https://vercel.com/',
                    rating: 9,
                    slogan: '用于托管、构建和部署静态网站和单页面应用程序',
                    keywords: ['部署平台', '代码托管', '博客']
                },
                {
                    id: '2',
                    name: 'Netlify',
                    country: '部署平台',
                    link: 'https://app.netlify.com/',
                    rating: 8,
                    slogan: '一款基于云服务的静态网站托管和自动化部署平台',
                    keywords: ['部署平台', '自动化部署', '静态网站托管', '云服务', '博客']
                },
                {
                    id: '3',
                    name: 'Render',
                    country: '部署平台',
                    link: 'https://dashboard.render.com/',
                    rating: 7,
                    slogan: '一个轻量级云服务器平台',
                    keywords: ['部署平台', '自动化部署', '静态网站托管', '云服务', '博客']
                },
                {
                    id: '4',
                    name: 'Gamma',
                    country: '演示',
                    link: 'https://gamma.app/',
                    rating: 9.5,
                    slogan: '一个能颠覆现有PPT制作的网站',
                    keywords: ['在线演示', 'PPT', 'AI文档', '分享', '多人协作']
                },
                {
                    id: '5',
                    name: 'Onemodel',
                    country: '流程图',
                    link: 'https://www.onemodel.app/',
                    rating: 7,
                    slogan: '软件架构师专用绘图工具',
                    keywords: ['流程图', '绘图']
                },
                {
                    id: '6',
                    name: 'Tldraw',
                    country: '画板',
                    link: 'https://www.tldraw.com/',
                    rating: 6,
                    slogan: '开源在线画板',
                    keywords: ['画板', '流程图', '多人协作']
                },
                {
                    id: '7',
                    name: 'Paragraph',
                    country: '写作',
                    link: 'https://paragraph.xyz/notes',
                    rating: 7.5,
                    slogan: '提供在线写作和协作功能的网站',
                    keywords: ['在线写作', '博客', '多人协作']
                },
                {
                    id: '8',
                    name: 'Iconbuddy',
                    country: '图标',
                    link: 'https://iconbuddy.app/',
                    rating: 8,
                    slogan: '免费icon素材图标库，可修改颜色',
                    keywords: ['图标', 'SVG', '免费下载', '免登录']
                },
                {
                    id: '9',
                    name: 'Heroicons',
                    country: 'SVG图标',
                    link: 'https://heroicons.com/',
                    rating: 8,
                    slogan: '一个手绘版SVG图标的网站',
                    keywords: ['图标', 'SVG', '免费下载', '免登录']
                },
                {
                    id: '10',
                    name: 'Recordscreen',
                    country: '录屏',
                    link: 'https://recordscreen.io/',
                    rating: 8.5,
                    slogan: '免登录在线录屏网站',
                    keywords: ['在线录屏', '视频', '免登录']
                },
                {
                    id: '11',
                    name: 'Loom',
                    country: '录屏',
                    link: 'https://www.loom.com/',
                    rating: 9,
                    slogan: '在线网页录屏与视频通话协作工具',
                    keywords: ['在线录屏', '视频', '视频编辑']
                },
                {
                    id: '12',
                    name: 'Logseq',
                    country: '知识库',
                    link: 'https://logseq.com/',
                    rating: 8.7,
                    slogan: '开源知识库管理系统',
                    keywords: ['开源', '知识库', '博客']
                },
                {
                    id: '13',
                    name: 'Aicolors',
                    country: '颜色',
                    link: 'https://aicolors.co/',
                    rating: 8.4,
                    slogan: '获取网站配置方案实例，一句话找到完美的网站配色方案',
                    keywords: ['颜色', 'AI', '配色']
                },
                {
                    id: '14',
                    name: 'Gradientlab',
                    country: '渐变色',
                    link: 'https://gradientlab.space/',
                    rating: 7.8,
                    slogan: '一拖即得渐变色CSS，轻松实现炫酷效果',
                    keywords: ['颜色', '配色', '渐变色']
                },
                {
                    id: '15',
                    name: 'AI工具集',
                    country: 'AI导航站',
                    link: 'https://ai-bot.cn/',
                    rating: 7,
                    slogan: '探索AI导航站发现数百个AI工具，帮助您自动化高效完成任务',
                    keywords: ['AI', '导航站']
                },
                {
                    id: '16',
                    name: 'Aihub',
                    country: 'AI导航站',
                    link: 'https://www.aihub.cn/',
                    rating: 7,
                    slogan: '发现优质AI站点、内含资源工具、资讯等集合',
                    keywords: ['AI', '导航站']
                },
                {
                    id: '17',
                    name: 'Framer',
                    country: 'AI',
                    link: 'https://framer.com/',
                    rating: 8.9,
                    slogan: '提供了一个直观的界面，使用户能够通过拖放元素、添加动画效果和手势交互来构建原型',
                    keywords: ['AI', '原型', '生成代码', '自定义页面']
                },
                {
                    id: '18',
                    name: 'Ailandingpage',
                    country: 'AI',
                    link: 'https://www.ailandingpagegenerator.com/',
                    rating: 8,
                    slogan: '一种利用人工智能（AI）技术的营销页面，旨在提高用户转化率和优化营销效果',
                    keywords: ['AI', '生成代码', '自定义页面']
                },
                {
                    id: '19',
                    name: 'Noya.io',
                    country: 'AI',
                    link: 'https://www.noya.io/app/',
                    rating: 8.4,
                    slogan: '​NoyaIo通过在线自定义拖拽生成页面，并导出代码、图片、Figma等',
                    keywords: ['AI', '生成代码', '自定义页面']
                },
                {
                    id: '20',
                    name: 'v0.dev',
                    country: 'AI',
                    link: 'https://v0.dev/',
                    rating: 9.2,
                    slogan: 'Vercel平台正在内测的AI生成页面平台，最终可达到一句话生成并部署到​Vercel平台',
                    keywords: ['AI', '生成代码']
                },
                {
                    id: '21',
                    name: 'Midjourney',
                    country: '教程',
                    link: 'https://tob-design.yuque.com/kxcufk/mj/',
                    rating: 9,
                    slogan: '探索由 AI 创造的绘画作品，带你进入无限的艺术世界',
                    keywords: ['AI绘画', '教程']
                },
                {
                    id: '22',
                    name: 'StableDiffusion',
                    country: '教程',
                    link: 'https://tob-design.yuque.com/kxcufk/sd',
                    rating: 9,
                    slogan: '发现由 AI 生成的令人惊叹的绘画作品，追寻创意的无边界',
                    keywords: ['AI绘画', '教程']
                },
                {
                    id: '23',
                    name: 'Tailwindcss',
                    country: 'CSS',
                    link: 'https://www.tailwindcss.cn/',
                    rating: 7.8,
                    slogan: '只需书写HTML代码，无需书写CSS，即可快速构建美观的网站',
                    keywords: ['CSS', '框架']
                },
                {
                    id: '24',
                    name: 'Getpapercss',
                    country: 'CSS',
                    link: 'https://www.getpapercss.com/',
                    rating: 7.2,
                    slogan: '手绘风格css框架，打造手绘风格',
                    keywords: ['CSS', '框架', '手绘风']
                },
                {
                    id: '25',
                    name: 'Chartscss',
                    country: '图表',
                    link: 'https://chartscss.org/',
                    rating: 6.5,
                    slogan: '使用 CSS 实用工具类将 HTML 设计图表',
                    keywords: ['CSS', '框架', '图表', 'Chart']
                },
                {
                    id: '26',
                    name: 'Hellogithub',
                    country: '阅读',
                    link: 'https://hellogithub.com/',
                    rating: 8.8,
                    slogan: '发现和分享有趣、入门级开源项目的平台',
                    keywords: ['Github', '阅读', '项目', '开源', '发现创意']
                },
                {
                    id: '27',
                    name: 'Producthunt',
                    country: '阅读',
                    link: 'https://www.producthunt.com/',
                    rating: 8.8,
                    slogan: '一个线上社区和平台，旨在向用户展示新兴科技产品、应用程序和创意项目',
                    keywords: ['社区', '阅读', '发现创意', '开源']
                },

                {
                    id: '28',
                    name: 'Nginx配置',
                    country: 'nginx',
                    link: 'https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN',
                    rating: 8.2,
                    slogan: 'nginx可视化配置',
                    keywords: ['nginx', '配置', '可视化']
                }
            ]
        }
    },

    computed: {
        activeMenu() {
            return Object.keys(this.menus).reduce(($$, set, i) => (this.menus[set] ? i : $$), -1)
        },

        list() {
            let { countries, categories } = this.activeFilters

            return this.companies.filter(({ country, keywords, rating }) => {
                if (rating < this.filters.rating) return false
                if (countries.length && !~countries.indexOf(country)) return false
                return !categories.length || categories.every(cat => ~keywords.indexOf(cat))
            })
        },

        activeFilters() {
            let { countries, categories } = this.filters

            return {
                countries: Object.keys(countries).filter(c => countries[c]),
                categories: Object.keys(categories).filter(c => categories[c]),
                rating: this.filters.rating > this.rating.min ? [this.filters.rating] : []
            }
        }
    },

    watch: {
        activeMenu(index, from) {
            if (index === from) return

            this.$nextTick(() => {
                if (!this.$refs.menu || !this.$refs.menu[index]) {
                    this.dropdown.height = 0
                } else {
                    this.dropdown.height = `${this.$refs.menu[index].clientHeight + 16}px`
                }
            })
        }
    },

    methods: {
        setFilter(filter, option) {
            if (filter === 'countries') {
                this.filters[filter][option] = !this.filters[filter][option]
            } else {
                setTimeout(() => {
                    this.clearFilter(filter, option, this.filters[filter][option])
                }, 100)
            }
        },

        clearFilter(filter, except, active) {
            if (filter === 'rating') {
                this.filters[filter] = this.rating.min
            } else {
                Object.keys(this.filters[filter]).forEach(option => {
                    this.filters[filter][option] = except === option && !active
                })
            }
        },

        clearAllFilters() {
            Object.keys(this.filters).forEach(this.clearFilter)
        },

        setMenu(menu, active) {
            Object.keys(this.menus).forEach(tab => {
                this.menus[tab] = !active && tab === menu
            })
        }
    },

    beforeMount() {
        this.companies = this.dataList
        this.companies.forEach(({ country, keywords, rating }) => {
            this.$set(this.filters.countries, country, false)
            if (this.rating.max < rating) this.rating.max = rating
            if (this.rating.min > rating) {
                this.rating.min = rating
                this.filters.rating = rating
            }
            keywords.forEach(category => {
                this.$set(this.filters.categories, category, false)
            })
        })

        // fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/450744/mock-data.json')
        //     .then(response => response.json())
        //     .then(companies => {
        //         this.companies = companies

        //         companies.forEach(({ country, keywords, rating }) => {
        //             this.$set(this.filters.countries, country, false)

        //             if (this.rating.max < rating) this.rating.max = rating
        //             if (this.rating.min > rating) {
        //                 this.rating.min = rating
        //                 this.filters.rating = rating
        //             }

        //             keywords.forEach(category => {
        //                 this.$set(this.filters.categories, category, false)
        //             })
        //         })
        //     })
    }
}
</script>


<style lang="scss" scoped>
.content {
    position: relative;
    font-family: 'Nunito', sans-serif;
    font-weight: 300;
    color: #3d5358;
    padding: 2% 20% 6% 20%;
    margin: 0 auto;

    &__list {
        position: relative;
        margin-top: 1rem;
        padding-right: 1rem;
        padding-bottom: 5rem;
        backface-visibility: hidden;
    }
}
@media only screen and (max-width: 767px) {
    .content {
        width: 100%;
        padding: 0;
    }
}
.company {
    position: relative;
    width: calc(100% / 2 - 1rem);
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1rem;
    margin-top: 1rem;
    padding-top: 0.75rem;
    border-radius: 6px;
    background-color: white;
    box-shadow: 0 0 0 1px #c5d0d1;
    backface-visibility: hidden;
    transform-origin: 10% 50%;
    z-index: 1;
    a {
        font-family: 'Oswald', sans-serif;
        font-weight: bold;
        text-decoration: none;
        color: #16151b;
        margin: 0 15px;
        font-size: 20px;
        position: relative;
        display: inline-block;
    }
    @media (min-width: 800px) {
        width: calc(100% / 3 - 1rem);
    }

    &-move {
        transition: all 600ms ease-in-out 50ms;
    }
    &-enter-active {
        transition: all 300ms ease-out;
    }

    &-leave-active {
        transition: all 200ms ease-in;
        position: absolute;
        z-index: 0;
    }

    &-enter,
    &-leave-to {
        opacity: 0;
    }
    &-enter {
        transform: scale(0.9);
    }

    &__data {
        line-height: 1.3;
    }
    &__label {
        font-size: 0.6rem;
        color: rgba(22, 21, 27, 0.7);
    }
    &__rating {
        text-align: center;
    }

    &__info {
        padding: 0 0.75rem;
        text-align: center;
    }

    &__logo {
        width: 3rem;
        height: 3rem;
        margin: 0 auto;
    }

    &__name {
        height: 2.5rem;
        margin: 0.75rem 0;
        font-size: 1.3rem;
        font-weight: 200;
        text-align: center;
        a {
            color: rgba(0, 0, 0, 0.8);
        }
        a:hover {
            color: rgba(0, 0, 0, 1);
        }
    }

    &__slogan {
        height: 3rem;
        text-align: left;
        font-weight: 400;
        text-transform: capitalize;
        font-size: 0.8rem;
        line-height: 20px;
    }

    &__details {
        display: flex;
        justify-content: space-between;
        margin-top: 1.5rem;
        padding: 0.5rem 0.75rem;
        background-color: rgba(#c5d0d1, 0.1);
        border-top: 1px solid #c5d0d1;
    }
    &__country {
        font-size: 0.8rem;
    }
    &__country:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}

.iconSvg {
    float: left;
    margin-right: 3px;
    margin-top: -2px;
}
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    margin: 0 1rem;
    padding: 2rem 0.5rem 1rem;
    border-bottom: 1px solid #c5d0d1;

    &__controls {
        display: flex;
    }

    &__icon {
        width: 1rem;
        height: 1rem;
        fill: currentColor;
    }

    &__label {
        position: relative;
        margin-right: 2rem;
        text-transform: capitalize;
        z-index: 1;
        cursor: pointer;

        &::after {
            content: '\00d7';
            display: inline-block;
            color: transparent;
            width: 0.5rem;
            font-weight: 400;
            transform: scale(0);
            transition: transform 150ms ease-in-out;
        }

        &--clear {
            color: #f68185;
            opacity: 0;
            transform: translate3d(-25%, 0, 0);
            pointer-events: none;
            transition: all 275ms ease-in-out;
        }

        &--filter ~ &--clear {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            pointer-events: auto;
        }

        &--filter::after,
        &--active::after {
            transform: scale(1);
        }

        &--filter::after {
            content: '\2022';
            color: #46d2c4;
        }

        &--active::after {
            content: '\00d7';
            color: #f68185;
        }
    }
}

.dropdown {
    position: relative;
    height: 0;
    overflow: hidden;
    transition: height 350ms;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        background-image: linear-gradient(to top, white, rgba(white, 0));
    }

    &-enter,
    &-leave-to {
        opacity: 0;
    }

    &-leave,
    &-enter-to {
        opacity: 1;
    }

    &-enter-active,
    &-leave-active {
        position: absolute;
        width: 100%;
        transition: opacity 200ms ease-in-out;
    }

    &-enter-active {
        transition-delay: 100ms;
    }
}

.filters {
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    &__item {
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        padding: 0.25rem 0.5rem;
        border: 1px solid #c5d0d1;
        border-radius: 6px;
        font-size: 0.8rem;
        line-height: 1.35;
        cursor: pointer;
        transition: all 275ms;

        &:hover {
            border-color: #379a93;
        }

        &--active {
            color: white;
            border-color: #379a93;
            background-color: #379a93;
        }
    }

    &__rating {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 0;
    }

    &__range {
        width: 200px;
        margin-top: 1rem;
        color: inherit;

        &::-webkit-slider-thumb {
            width: 0.8rem;
            height: 0.8rem;
            margin-top: calc(-0.4rem + 2px);
            border-radius: 100%;
            background-color: currentColor;
        }

        &::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            background-image: linear-gradient(to right, white, #46d2c4);
        }
    }
}
</style>