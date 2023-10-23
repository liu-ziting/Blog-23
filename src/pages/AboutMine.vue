<template>
    <div class="wrap">
        <div class="faq-header">Hi there 👋</div>
        <div class="faq-content">
            <div class="faq-question" v-for="(item, index) in faqList" :key="index">
                <input :id="index" type="checkbox" class="panel" />
                <div class="plus">+</div>
                <label :for="index" class="panel-title">
                    <span class="underlined underlined--offset">{{ item.title }}</span></label
                >
                <div class="panel-content">{{ item.content }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            faqList: [
                {
                    title: '收录的网站推荐度是如何确定的？',
                    content: '网站的推荐度是根据个人的使用体验和主观评分来确定的'
                },
                {
                    title: '博客平台是用什么框架构建的？',
                    content: '博客平台使用VUE框架构建，UI效果自己手撸，网站分类纯前端查询'
                },
                {
                    title: '该项目部署在什么平台？',
                    content: '博客平台部署在Netlify上'
                },
                {
                    title: '怎样帮助我一起扩充网站的收录？',
                    content: '如果你希望一起扩充网站的收录，可以发送邮件到：liuziting2014@163.com'
                }
            ]
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.faq-header {
    font-size: 42px;
    border-bottom: 1px dotted #ccc;
    padding: 0 0 24px 0;
}

.faq-content {
    margin: 0 auto;
    .faq-question {
        padding: 20px 0;
        border-bottom: 1px dotted #ccc;
    }

    .panel-title {
        width: 100%;
        position: relative;
        margin: 0;
        padding: 10px 10px 0 48px;
        display: block;
        cursor: pointer;
    }
    .panel-content {
        font-size: 20px;
        padding: 0px 14px;
        margin: 0 40px;
        margin-top: 20px;
        height: 0;
        overflow: hidden;
        z-index: -1;
        position: relative;
        opacity: 0;
        -webkit-transition: 0.4s ease;
        -moz-transition: 0.4s ease;
        -o-transition: 0.4s ease;
        transition: 0.4s ease;
    }
    .panel:checked ~ .panel-content {
        height: auto;
        opacity: 1;
        padding: 14px;
    }
    .plus {
        position: absolute;
        margin-left: 20px;
        margin-top: 0px;
        z-index: 5;
        font-size: 42px;
        line-height: 100%;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
        -webkit-transition: 0.2s ease;
        -moz-transition: 0.2s ease;
        -o-transition: 0.2s ease;
        transition: 0.2s ease;
    }
    .panel:checked ~ .plus {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .panel {
        display: none;
    }
}
@media only screen and (max-width: 767px) {
    .wrap {
        padding: 10%;
        font-size: 14px;
    }
    .faq-content .plus {
        margin-left: 0;
    }
    .faq-content .panel-title {
        padding: 10px 10px 0 30px;
    }
    .faq-content .panel-content {
        margin: 0;
        padding: 0 !important;
        margin-left: 30px;
        margin-top: 20px;
    }
}
</style>
