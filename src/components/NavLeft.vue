<template>
    <div>
        <nav class="navbar">
            <ul class="navbar__menu">
                <li v-for="(item, index) in navItems" :key="index" :class="['navbar__item']">
                    <router-link :to="item.url" :class="['navbar__link', { navbar__active: $route.path === item.url }]">
                        <i :data-feather="item.icon"></i><span>{{ item.text }}</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
const feather = require('feather-icons')
export default {
    data() {
        return {
            navItems: [
                { url: '/', icon: 'home', text: 'Home' },
                { url: '/Movie', icon: 'message-square', text: 'Movie' },
                { url: '/Article', icon: 'users', text: 'Article' },
                { url: '/ToolList', icon: 'folder', text: 'Tool' },
                { url: '/About', icon: 'archive', text: 'About' }
            ]
        }
    },
    mounted() {
        feather.replace()
    }
}
</script>

<style lang="scss" scoped>
$borderRadius: 10px;
$spacer: 1rem;
$primary: #406ff3;
$text: #6a778e;
$linkHeight: $spacer * 3.5;
$timing: 250ms;
$transition: $timing ease all;

@mixin gooeyEffect($i) {
    @keyframes gooeyEffect-#{$i} {
        0% {
            transform: scale(1, 1);
        }
        50% {
            transform: scale(0.5, 1.5);
        }
        100% {
            transform: scale(1, 1);
        }
    }
}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');

.navbar {
    $ref: &;
    position: fixed;
    top: $spacer;
    left: $spacer;
    background: #fff;
    border-radius: $borderRadius;
    padding: $spacer 0;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.03);
    height: calc(100vh - #{$spacer * 4});
    z-index: 999999999;
    &__link {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: $linkHeight;
        width: $spacer * 5.5;
        color: $text;
        transition: $transition;
        span {
            position: absolute;
            left: 100%;
            transform: translate(-($spacer * 3));
            margin-left: 1rem;
            opacity: 0;
            pointer-events: none;
            color: $primary;
            background: #fff;
            padding: $spacer * 0.75;
            transition: $transition;
            border-radius: $borderRadius * 1.75;
        }
        &:hover {
            color: #fff;
        }
        .navbar:not(:hover) &:focus,
        &:hover {
            span {
                opacity: 1;
                transform: translate(0);
            }
        }
    }

    &__active {
        color: #fff !important;
        &:before {
            content: '';
            position: absolute;
            opacity: 1;
            z-index: -1;
            top: 0;
            left: $spacer;
            width: $linkHeight;
            height: $linkHeight;
            background: $primary;
            border-radius: $borderRadius * 1.75;
            transition: $timing cubic-bezier(1, 0.2, 0.1, 1.2) all;
        }
    }
    &__menu {
        position: relative;
    }
    &__item {
        &:last-child {
            &:before {
                content: '';
                position: absolute;
                opacity: 0;
                z-index: -1;
                top: 0;
                left: $spacer;
                width: $linkHeight;
                height: $linkHeight;
                background: $primary;
                border-radius: $borderRadius * 1.75;
                transition: $timing cubic-bezier(1, 0.2, 0.1, 1.2) all;
            }
        }

        @for $i from 1 to 12 {
            &:first-child:nth-last-child(#{$i}),
            &:first-child:nth-last-child(#{$i}) ~ li {
                &:hover {
                    ~ li:last-child:before {
                        opacity: 1;
                    }
                }
                &:last-child:hover:before {
                    opacity: 1;
                }
                @for $j from 1 to $i {
                    &:nth-child(#{$j}):hover {
                        ~ li:last-child:before {
                            @include gooeyEffect($j);
                            top: (100% / $i) * ($j - 1);
                            animation: gooeyEffect-#{$j} $timing 1;
                        }
                    }
                }
                &:last-child:hover:before {
                    @include gooeyEffect($i);
                    top: (100% / $i) * ($i - 1);
                    animation: gooeyEffect-#{$i} $timing 1;
                }
            }
        }
    }
}
</style>
