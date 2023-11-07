<template>
    <div v-if="show" id="uploadArea" class="upload-area" :class="{ 'upload-area--open': uploadAreaOpen }">
        <span @click="close" class="close">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </span>
        <div class="upload-area__header">
            <h1 class="upload-area__title">图传工具</h1>
            <p class="upload-area__paragraph">
                文件类型应该是
                <strong class="upload-area__tooltip">
                    这些
                    <span class="upload-area__tooltip-data" ref="toolTipData"></span>
                </strong>
            </p>
        </div>
        <div
            id="dropZoon"
            class="upload-area__drop-zoon drop-zoon"
            @dragover.prevent="dragOver"
            @dragleave="dragLeave"
            @drop.prevent="dropFile"
            @click="fileInputClick"
            ref="dropZoon"
        >
            <span class="drop-zoon__icon">
                <i class="bx bxs-file-image"></i>
            </span>
            <p class="drop-zoon__paragraph">将您的文件拖放到此处或单击选择</p>
            <span id="loadingText" class="drop-zoon__loading-text" ref="loadingText">Please Wait</span>
            <img
                src=""
                alt="Preview Image"
                id="previewImage"
                class="drop-zoon__preview-image"
                draggable="false"
                ref="previewImage"
            />
            <input
                type="file"
                id="fileInput"
                class="drop-zoon__file-input"
                accept="image/*"
                ref="fileInput"
                @change="changeFile"
            />
        </div>
        <div id="fileDetails" class="upload-area__file-details file-details" ref="fileDetails">
            <h3 class="file-details__title">Uploaded File</h3>
            <div id="uploadedFile" class="uploaded-file" ref="uploadedFile">
                <div class="uploaded-file__icon-container">
                    <i class="bx bxs-file-blank uploaded-file__icon"></i>
                    <span class="uploaded-file__icon-text" ref="uploadedFileIconText"></span>
                </div>
                <div id="uploadedFileInfo" class="uploaded-file__info" ref="uploadedFileInfo">
                    <span class="uploaded-file__name" ref="uploadedFileName">Proejct 1</span>
                    <span class="uploaded-file__counter" ref="uploadedFileCounter">0%</span>
                </div>
            </div>
            <a :href="link" class="tip" target="_blank">{{ link }}</a>
            <div class="centralize">
                <div>
                    <button class="copy-btn" :data-clipboard-text="link">
                        <span
                            ><svg
                                viewBox="0 0 467 512.22"
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                image-rendering="optimizeQuality"
                                text-rendering="geometricPrecision"
                                shape-rendering="geometricPrecision"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#0E418F"
                                height="12"
                                width="12"
                            >
                                <path
                                    d="M131.07 372.11c.37 1 .57 2.08.57 3.2 0 1.13-.2 2.21-.57 3.21v75.91c0 10.74 4.41 20.53 11.5 27.62s16.87 11.49 27.62 11.49h239.02c10.75 0 20.53-4.4 27.62-11.49s11.49-16.88 11.49-27.62V152.42c0-10.55-4.21-20.15-11.02-27.18l-.47-.43c-7.09-7.09-16.87-11.5-27.62-11.5H170.19c-10.75 0-20.53 4.41-27.62 11.5s-11.5 16.87-11.5 27.61v219.69zm-18.67 12.54H57.23c-15.82 0-30.1-6.58-40.45-17.11C6.41 356.97 0 342.4 0 326.52V57.79c0-15.86 6.5-30.3 16.97-40.78l.04-.04C27.51 6.49 41.94 0 57.79 0h243.63c15.87 0 30.3 6.51 40.77 16.98l.03.03c10.48 10.48 16.99 24.93 16.99 40.78v36.85h50c15.9 0 30.36 6.5 40.82 16.96l.54.58c10.15 10.44 16.43 24.66 16.43 40.24v302.01c0 15.9-6.5 30.36-16.96 40.82-10.47 10.47-24.93 16.97-40.83 16.97H170.19c-15.9 0-30.35-6.5-40.82-16.97-10.47-10.46-16.97-24.92-16.97-40.82v-69.78zM340.54 94.64V57.79c0-10.74-4.41-20.53-11.5-27.63-7.09-7.08-16.86-11.48-27.62-11.48H57.79c-10.78 0-20.56 4.38-27.62 11.45l-.04.04c-7.06 7.06-11.45 16.84-11.45 27.62v268.73c0 10.86 4.34 20.79 11.38 27.97 6.95 7.07 16.54 11.49 27.17 11.49h55.17V152.42c0-15.9 6.5-30.35 16.97-40.82 10.47-10.47 24.92-16.96 40.82-16.96h170.35z"
                                    fill-rule="nonzero"
                                ></path>
                            </svg>
                            Copy link</span
                        >
                        <span>Copied</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import Clipboard from 'clipboard'
import { genUpToken } from '@/utils/qiniuToken'
export default {
    components: {},
    data() {
        return {
            show: false,
            link: '',
            imagesTypes: ['jpeg', 'png', 'svg', 'gif'],
            uploadAreaOpen: false,
            file: null,
            fileReader: new FileReader(),
            uploadToken: '',
            uploadConfig: {
                useCdnDomain: true,
                region: qiniu.region.z2
            },
            accessKey: '7oJHSC11-ZTQ8Vx8nZYC6gASfvHxhZwkJLfbPQmI',
            secretKey: '22atloGIfChSTyTrONAnoliMLONg-ZdOeod5SKju',
            bucket: 'liuziting',
            clipboard: null
        }
    },
    mounted() {},
    methods: {
        initData() {
            this.show = true
            this.$nextTick(() => {
                this.clipboard = new Clipboard('.copy-btn')
                this.clipboard.on('success', e => {
                    console.log('Link copied!')
                    e.clearSelection()
                })
                this.clipboard.on('error', e => {
                    console.error('Copy failed:', e.action)
                })

                this.uploadToken = genUpToken(this.accessKey, this.secretKey, this.bucket)
                this.$refs.toolTipData.innerHTML = this.imagesTypes.join(', .')
            })
        },
        close() {
            this.show = false
        },
        dragOver(event) {
            event.preventDefault()
            this.$refs.dropZoon.classList.add('drop-zoon--over')
        },
        dragLeave() {
            this.$refs.dropZoon.classList.remove('drop-zoon--over')
        },
        dropFile(event) {
            this.file = event.dataTransfer.files[0]
            this.uploadFile()
        },
        fileInputClick() {
            this.$refs.fileInput.click()
        },
        changeFile(event) {
            this.file = event.target.files[0]
            this.uploadFile()
        },
        uploadFile() {
            if (this.fileValidate()) {
                this.$refs.dropZoon.classList.add('drop-zoon--Uploaded')
                this.$refs.loadingText.style.display = 'block'
                this.$refs.previewImage.style.display = 'none'
                this.$refs.uploadedFile.classList.remove('uploaded-file--open')
                this.$refs.uploadedFileInfo.classList.remove('uploaded-file__info--active')
                this.fileReader.addEventListener('load', () => {
                    this.upload()
                })
                this.fileReader.readAsDataURL(this.file)
            }
        },
        upload() {
            var self = this
            const observable = qiniu.upload(this.file, null, this.uploadToken)
            const observer = {
                next(res) {
                    console.log('上传进度：', res.total.percent)
                    self.$refs.uploadedFileCounter.innerHTML = `${res.total.percent}%`
                },
                error() {
                    alert('上传失败!')
                },
                complete(res) {
                    console.log('上传完成：', res.key)
                    setTimeout(() => {
                        self.uploadAreaOpen = true
                        self.$refs.loadingText.style.display = 'none'
                        self.$refs.previewImage.style.display = 'block'
                        self.$refs.fileDetails.classList.add('file-details--open')
                        self.$refs.uploadedFile.classList.add('uploaded-file--open')
                        self.$refs.uploadedFileInfo.classList.add('uploaded-file__info--active')
                    }, 500)
                    self.$refs.previewImage.setAttribute('src', self.fileReader.result)
                    self.$refs.uploadedFileName.innerHTML = self.file.name
                    self.link = 'http://tc.lihail.cn/' + res.key
                }
            }

            const subscription = observable.subscribe(observer)
            console.log(subscription)
            console.log(observable)
        },
        fileValidate() {
            let isImage = this.imagesTypes.filter(type => this.file.type.indexOf(`image/${type}`) !== -1)
            if (isImage[0] === 'jpeg') {
                this.$refs.uploadedFileIconText.innerHTML = 'jpg'
            } else {
                this.$refs.uploadedFileIconText.innerHTML = isImage[0]
            }
            if (isImage.length !== 0) {
                if (this.file.size <= 100000000) {
                    return true
                } else {
                    alert('图片大小不能超过100MB')
                    return false
                }
            } else {
                alert('你选择的文件类型暂不支持上传')
                return false
            }
        }
    },
    beforeDestroy() {
        // this.clipboard.destroy()
    }
}
</script>

<style lang="scss" scoped>
$clr-white: rgb(255, 255, 255);
$clr-black: rgb(0, 0, 0);
$clr-light: rgb(245, 248, 255);
$clr-light-gray: rgb(196, 195, 196);
$clr-blue: rgb(63, 134, 255);
$clr-light-blue: rgb(171, 202, 255);

/* Upload Area */
.upload-area {
    width: 24rem;
    background-color: $clr-white;
    // box-shadow: 0 10px 60px rgb(218,229, 255);
    // border: 2px solid $clr-light-blue;
    border-radius: 24px;
    padding: 2rem 1.875rem 3rem 1.875rem;
    margin: 0.625rem;
    text-align: center;
    margin: 0 auto;
    position: fixed;
    left: 50%;
    top: 15%;
    margin-left: -12rem;
    box-sizing: border-box;
    box-shadow: 0.8rem 0.8rem 1.4rem #c8d0e7, -0.2rem -0.2rem 1.8rem #ffffff;
    transition: all 0.2s;
}
.upload-area:hover {
    box-shadow: 0rem 0rem 1.8rem #e0e5f4;
    transition: all 0.2s;
}
.upload-area--open {
    animation: slidDown 500ms ease-in-out;
}

@keyframes slidDown {
    from {
        height: 28.125rem;
    }

    to {
        height: 35rem;
    }
}

.upload-area__title {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 0.5125rem;
}

.upload-area__paragraph {
    font-size: 0.9375rem;
    color: $clr-light-gray;
    margin-top: 0;
    font-family: 'ALIBABA';
}

.upload-area__tooltip {
    position: relative;
    color: $clr-light-blue;
    cursor: pointer;
    transition: color 300ms ease-in-out;
}

.upload-area__tooltip:hover {
    color: $clr-blue;
}

.upload-area__tooltip-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -125%);
    min-width: max-content;
    background-color: $clr-white;
    color: $clr-blue;
    border: 1px solid $clr-light-blue;
    padding: 0.625rem 1.25rem;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: none 300ms ease-in-out;
    transition-property: opacity, visibility;
}

.upload-area__tooltip:hover .upload-area__tooltip-data {
    opacity: 1;
    visibility: visible;
}

/* Drop Zoon */
.upload-area__drop-zoon {
    position: relative;
    height: 11.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px dashed #ebf2ff;
    border-radius: 15px;
    margin-top: 2.1875rem;
    cursor: pointer;
    transition: border-color 300ms ease-in-out;
    margin-bottom: 20px;
    overflow: hidden;
}

.upload-area__drop-zoon:hover {
    border-color: $clr-blue;
}

.drop-zoon__icon {
    display: flex;
    font-size: 3.75rem;
    color: $clr-blue;
    transition: opacity 300ms ease-in-out;
}

.drop-zoon__paragraph {
    font-size: 0.9375rem;
    color: $clr-light-gray;
    margin: 0;
    margin-top: 0.625rem;
    transition: opacity 300ms ease-in-out;
    font-family: 'ALIBABA';
}

.drop-zoon:hover .drop-zoon__icon,
.drop-zoon:hover .drop-zoon__paragraph {
    opacity: 0.7;
}

.drop-zoon__loading-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    color: $clr-light-blue;
    z-index: 10;
}

.drop-zoon__preview-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.3125rem;
    border-radius: 10px;
    display: none;
    z-index: 1000;
    transition: opacity 300ms ease-in-out;
    box-sizing: border-box;
}

.drop-zoon:hover .drop-zoon__preview-image {
    opacity: 0.8;
}

.drop-zoon__file-input {
    display: none;
}

.drop-zoon--over {
    border-color: $clr-blue;
}

.drop-zoon--over .drop-zoon__icon,
.drop-zoon--over .drop-zoon__paragraph {
    opacity: 0.7;
}

.drop-zoon--Uploaded .drop-zoon__icon,
.drop-zoon--Uploaded .drop-zoon__paragraph {
    display: none;
}

.upload-area__file-details {
    height: 0;
    visibility: hidden;
    opacity: 0;
    text-align: left;
    transition: none 500ms ease-in-out;
    transition-property: opacity, visibility;
    transition-delay: 500ms;
}

.file-details--open {
    height: auto;
    visibility: visible;
    opacity: 1;
}

.file-details__title {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 20px;
}

.uploaded-file {
    display: flex;
    align-items: center;
    padding: 0.625rem 0;
    visibility: hidden;
    opacity: 0;
    transition: none 500ms ease-in-out;
    transition-property: visibility, opacity;
}

.uploaded-file--open {
    visibility: visible;
    opacity: 1;
}

.uploaded-file__icon-container {
    position: relative;
    margin-right: 0.3125rem;
}

.uploaded-file__icon {
    font-size: 3.4375rem;
    color: $clr-blue;
}

.uploaded-file__icon-text {
    position: absolute;
    top: 1.5625rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9375rem;
    font-weight: 500;
    color: $clr-white;
}

.uploaded-file__info {
    position: relative;
    top: -0.3125rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.uploaded-file__info::before,
.uploaded-file__info::after {
    content: '';
    position: absolute;
    bottom: -0.9375rem;
    width: 0;
    height: 0.5rem;
    background-color: #ebf2ff;
    border-radius: 0.625rem;
}

.uploaded-file__info::before {
    width: 100%;
}

.uploaded-file__info::after {
    width: 100%;
    background-color: $clr-blue;
}

.uploaded-file__info--active::after {
    animation: progressMove 800ms ease-in-out;
    animation-delay: 300ms;
}
.tip {
    width: 100%;
    display: block;
    float: left;
    cursor: pointer;
    word-wrap: break-word;
    word-break: break-all;
    color: inherit;
    text-decoration: none;
}

.tip:hover {
    color: $clr-blue;
}
@keyframes progressMove {
    from {
        width: 0%;
        background-color: transparent;
    }

    to {
        width: 100%;
        background-color: $clr-blue;
    }
}

.uploaded-file__name {
    width: 100%;
    max-width: 6.25rem;
    display: inline-block;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.uploaded-file__counter {
    font-size: 1rem;
    color: $clr-light-gray;
}

.centralize {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    float: left;
    button {
        background-color: #f2f7fa;
        width: 100px;
        height: 30px;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        overflow: hidden;
        transition-duration: 700ms;
        cursor: pointer;
    }

    button span:first-child {
        color: #0e418f;
        position: absolute;
        transform: translate(-50%, -50%);
    }

    button span:last-child {
        position: absolute;
        color: #b5ccf3;
        opacity: 0;
        transform: translateY(100%) translateX(-50%);
        height: 14px;
        line-height: 13px;
    }

    button:focus {
        background-color: #0e418f;
        width: 120px;
        height: 40px;
        transition-delay: 100ms;
        transition-duration: 500ms;
    }

    button:focus span:first-child {
        color: #b5ccf3;
        transform: translateX(-50%) translateY(-150%);
        opacity: 0;
        transition-duration: 500ms;
    }

    button:focus span:last-child {
        transform: translateX(-50%) translateY(-50%);
        opacity: 1;
        transition-delay: 300ms;
        transition-duration: 500ms;
    }

    button:focus:end {
        background-color: #ffffff;
        width: 120px;
        height: 40px;
        transition-duration: 900ms;
    }
    .description {
        margin-top: 10px;
        color: #b5ccf3;
    }
}
</style>
