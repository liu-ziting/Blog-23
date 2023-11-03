<template>
    <multipane class="custom-resizer" layout="vertical">
        <div class="pane-left pane">
            <div>
                <h6 class="title">配置项</h6>
            </div>
        </div>
        <multipane-resizer></multipane-resizer>
        <div class="pane-center pane">
            <div>
                <h6 class="title">预览</h6>
            </div>
        </div>
        <multipane-resizer></multipane-resizer>
        <div class="pane-right pane">
            <div>
                <h6 class="title">代码</h6>
                <json-viewer :value="returnValue" copyable></json-viewer>
            </div>
        </div>
    </multipane>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
import { Multipane, MultipaneResizer } from 'vue-multipane'
export default {
    components: {
        Multipane,
        MultipaneResizer,
        JsonViewer
    },
    data() {
        return {
            returnValue: {}
        }
    },
    mounted() {}
}
</script>

<style lang="scss">
.custom-resizer {
    width: 100%;
    height: calc(100vh - 90px);
}

.custom-resizer .pane {
    text-align: left;
    padding: 15px;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #ccc;
    .echart-box {
        width: 100%;
        height: 80vh;
    }
}
.pane-left {
    min-width: 200px;
    width: 350px;
    max-width: 350px;
}
.pane-center {
    width: 50%;
    min-width: 500px;
    max-width: 80%;
}
.pane-right {
    flex-grow: 1;
}
.custom-resizer > .multipane-resizer {
    margin: 0;
    left: 0;
    position: relative;

    &:before {
        display: block;
        content: '';
        width: 3px;
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        margin-left: -2px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
    }

    &:hover {
        &:before {
            border-color: #999;
        }
    }
}
</style>
