<template>
    <div class="wrap">
        <span class="topBorder">Tool</span>
        <div class="box">
            <h2>CDN,blog,qiniuyun</h2>
            <p>
                <span class="underlined underlined--thin" @click="$refs.uploadPic.initData()"> 1.在线图传工具 </span>
            </p>
        </div>
        <div class="box">
            <h2>Excel</h2>
            <p>
                <span class="underlined underlined--thin" @click="$refs.excelBox.initData()"> 2.在线Excel </span>
            </p>
        </div>
        <div class="box">
            <h2>Code</h2>
            <p>
                <span class="underlined underlined--thin" @click="openLink('https://codepen.io/denic/pen/GRoOxbM')">
                    3.在线代码编辑预览
                </span>
            </p>
        </div>
        <div class="box">
            <h2>ing</h2>
            <p>
                <span class="underlined underlined--thin"> 4.其他... </span>
            </p>
        </div>
        <upload-pic ref="uploadPic" />
        <excel-box ref="excelBox" />
    </div>
</template>

<script>
import UploadPic from '@/components/modal/UploadPic.vue'
import ExcelBox from '@/components/modal/ExcelBox.vue'
export default {
    components: { UploadPic, ExcelBox },
    data() {
        return {}
    },
    methods: {
        openLink(link) {
            window.open(link)
        }
    }
}
</script>

<style lang="scss" scoped>
span {
    cursor: pointer;
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
@media only screen and (max-width: 767px) {
    .wrap {
        padding: 10%;
        .underlined {
            font-size: 1.5rem;
        }
    }
}
</style>
