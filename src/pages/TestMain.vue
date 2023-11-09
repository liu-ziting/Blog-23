<template>
    <div class="wrap">
        <label class="container">
            <textarea v-model="content" @input="handleInput" @keydown.tab.prevent="handleTabKeydown"></textarea>
            <div class="tips" v-if="showTips" @click="applytips">{{ tips }}</div>
        </label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            tipArr: [
                '这是一个提示词，按tab填入',
                '一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本这是一个巨长的文本'
            ],
            showTips: false,
            tips: ''
        }
    },
    methods: {
        handleInput() {
            if (this.content === '') {
                this.hidetips()
                return
            }
            const tips = this.tipArr.find(item => item.startsWith(this.content))
            if (tips) {
                this.showTips = true
                this.tips = tips
            } else {
                this.hidetips()
            }
        },
        handleTabKeydown() {
            if (this.showTips) {
                this.content = this.tips
                this.hidetips()
            }
        },
        applytips() {
            this.content = this.tips
            this.hidetips()
        },
        hidetips() {
            this.showTips = false
            this.tips = ''
        }
    }
}
</script>

<style lang="scss">
.container {
    position: relative;
    display: block;
    width: 100%;
    height: 300px;
    font-family: '微软雅黑';
    font-size: 16px;
    textarea {
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        font: inherit;
        color: #212121;
        outline: none;
        background-color: #f1f1f1;
        padding: 20px;
        line-height: 22px;
    }
    .tips {
        position: absolute;
        left: 20px;
        right: 0;
        top: 20px;
        bottom: 0;
        color: #212121;
        opacity: 0.3;
        line-height: 22px;
    }
}
</style>
