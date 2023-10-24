<template>
    <div class="wrap">
        <label class="imgLabel">
            <p>{{ tip }}</p>
            <input v-show="false" type="file" @change="handleFileChange" />
        </label>
        <button class="uploadBtn" @click="upload">
            <span class="text-container">
                <span class="text">Upload</span>
            </span>
        </button>
    </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import { genUpToken } from '@/utils/qiniuToken'
export default {
    data() {
        return {
            tip: 'Click here to upload your pictures, files, materials, etc.',
            selectedFile: null,
            uploadToken: '',
            uploadConfig: {
                useCdnDomain: true,
                region: qiniu.region.z2
            },
            accessKey: '7oJHSC11-ZTQ8Vx8nZYC6gASfvHxhZwkJLfbPQmI',
            secretKey: '22atloGIfChSTyTrONAnoliMLONg-ZdOeod5SKju',
            bucket: 'liuziting'
        }
    },
    methods: {
        handleFileChange(event) {
            this.selectedFile = event.target.files[0]
            this.tip = this.selectedFile.name
        },
        upload() {
            if (!this.selectedFile) {
                alert('请选择文件')
                return
            }
            var self = this
            const observable = qiniu.upload(this.selectedFile, null, this.uploadToken)
            const observer = {
                next(res) {
                    console.log('上传进度：', res.total.percent)
                },
                error(err) {
                    console.error('上传失败：', err)
                },
                complete(res) {
                    console.log('上传完成：', res.key)
                    self.tip = 'http://tc.lihail.cn/' + res.key
                }
            }

            const subscription = observable.subscribe(observer)
            console.log(subscription)
            console.log(observable)
        }
    },
    mounted() {
        this.uploadToken = genUpToken(this.accessKey, this.secretKey, this.bucket)
    }
}
</script>


<style lang="scss" scoped>
.imgLabel {
    width: 100%;
    display: block;
    padding: 10px 5px;
    margin-top: 10rem;
    p {
        text-align: center;
        font-size: 1.25rem;
    }
}
.uploadBtn,
.uploadBtn *,
.uploadBtn :after,
.uploadBtn :before,
.uploadBtn:after,
.uploadBtn:before {
    border: 0 solid;
    box-sizing: border-box;
}

.uploadBtn {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: #000;
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
        Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 100%;
    font-weight: 900;
    line-height: 1.5;
    -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
    padding: 0;
    text-transform: uppercase;
    margin: 50px auto;
    display: block;
}

.uploadBtn:disabled {
    cursor: default;
}

.uploadBtn:-moz-focusring {
    outline: auto;
}

.uploadBtn svg {
    display: block;
    vertical-align: middle;
}

.uploadBtn [hidden] {
    display: none;
}

.uploadBtn {
    border-radius: 99rem;
    border-width: 2px;
    padding: 0.8rem 3rem;
    z-index: 0;
}

.uploadBtn,
.uploadBtn .text-container {
    overflow: hidden;
    position: relative;
}

.uploadBtn .text-container {
    display: block;
    mix-blend-mode: difference;
}

.uploadBtn .text {
    display: block;
    position: relative;
}

.uploadBtn:hover .text {
    -webkit-animation: move-up-alternate 0.3s forwards;
    animation: move-up-alternate 0.3s forwards;
}

@-webkit-keyframes move-up-alternate {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(80%);
    }

    51% {
        transform: translateY(-80%);
    }

    to {
        transform: translateY(0);
    }
}

@keyframes move-up-alternate {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(80%);
    }

    51% {
        transform: translateY(-80%);
    }

    to {
        transform: translateY(0);
    }
}

.uploadBtn:after,
.uploadBtn:before {
    --skew: 0.2;
    background: #fff;
    content: '';
    display: block;
    height: 102%;
    left: calc(-50% - 50% * var(--skew));
    pointer-events: none;
    position: absolute;
    top: -104%;
    transform: skew(calc(150deg * var(--skew))) translateY(var(--progress, 0));
    transition: transform 0.2s ease;
    width: 100%;
}

.uploadBtn:after {
    --progress: 0%;
    left: calc(50% + 50% * var(--skew));
    top: 102%;
    z-index: -1;
}

.uploadBtn:hover:before {
    --progress: 100%;
}

.uploadBtn:hover:after {
    --progress: -102%;
}
</style>