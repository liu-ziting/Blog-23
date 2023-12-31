<template>
    <div>
        <loading-box v-if="loading" />
        <main v-else id="app" class="content">
            <div class="nav noneScroll">
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
            </div>
            <transition-group name="dropdown" tag="section" class="dropdown noneScroll" :style="dropdown">
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
                <li class="company" v-for="(company, index) in list" :key="index">
                    <div class="company__info" @click="openLink(company.link)">
                        <h2 class="company__name">
                            <a class="underlined underlined--offset" :href="company.link" target="_blank">
                                {{ company.name }}
                            </a>
                        </h2>
                        <blockquote class="company__slogan">{{ company.slogan }}</blockquote>
                    </div>

                    <ul class="company__details">
                        <li class="company__data">
                            <label class="company__label">类型</label>
                            <p class="company__type" @click="clearFilter('countries', company.type)">
                                {{ company.type }}
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
import dataList from '@static/data.json'
import LoadingBox from '@/components/LoadingBox.vue'
export default {
    components: { LoadingBox },
    data() {
        return {
            loading: true,
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
            dataList
        }
    },
    computed: {
        activeMenu() {
            return Object.keys(this.menus).reduce(($$, set, i) => (this.menus[set] ? i : $$), -1)
        },

        list() {
            let { countries, categories } = this.activeFilters

            return this.companies.filter(({ type, keywords, rating }) => {
                if (rating < this.filters.rating) return false
                if (countries.length && !~countries.indexOf(type)) return false
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
            console.log(option)
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
        },
        openLink(link) {
            window.open(link)
        }
    },

    beforeMount() {
        // var currentPage = 1
        // var pageSize = 10
        // var start = (currentPage - 1) * pageSize
        // var end = start + pageSize
        this.companies = this.dataList
        this.companies.forEach(({ type, keywords, rating }) => {
            this.$set(this.filters.countries, type, false)
            if (this.rating.max < rating) this.rating.max = rating
            if (this.rating.min > rating) {
                this.rating.min = rating
                this.filters.rating = rating
            }
            keywords.forEach(category => {
                this.$set(this.filters.categories, category, false)
            })
        })
        setTimeout(() => {
            this.loading = false
        }, 900)
    }
}
</script>

<style lang="scss" scoped>
$grey: #e7e7e7;
.content {
    position: relative;
    font-family: 'Nunito', sans-serif;
    font-weight: 300;
    color: #3d5358;
    padding: 0 20% 6% 20%;
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
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 0 0 1px $grey;
    backface-visibility: hidden;
    transform-origin: 10% 50%;
    z-index: 1;
    box-sizing: border-box;
    a {
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
        cursor: pointer;
        padding: 0 1.2rem;
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
        text-align: left;
        a {
            color: rgba(0, 0, 0, 0.8);
            letter-spacing: 0px;
            margin: 0;
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
        font-size: 0.9rem;
        line-height: 20px;
        opacity: 0.6;
    }

    &__details {
        display: flex;
        justify-content: space-between;
        margin-top: 1.5rem;
        padding: 0.5rem 1.2rem;
        background-color: rgba($grey, 0.1);
        border-top: 1px solid $grey;
    }
    &__type {
        font-size: 0.8rem;
    }
    &__type:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}
.company:hover {
    .underlined--offset {
        background-size: 100% 100%;
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
    border-bottom: 1px solid $grey;
    overflow: hidden;
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
    overflow: scroll;
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
    max-height: 270px;
    &__item {
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        padding: 0.25rem 0.5rem;
        border: 1px solid $grey;
        border-radius: 6px;
        font-size: 0.8rem;
        line-height: 1.35;
        cursor: pointer;
        transition: all 275ms;

        &:hover {
            background-color: #161616;
            color: #ffffff;
        }

        &--active {
            color: #ffffff;
            background-color: #161616;
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
            background-image: linear-gradient(to right, white, #161616);
        }
    }
}
</style>
