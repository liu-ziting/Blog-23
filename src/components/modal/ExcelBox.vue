<template>
    <div v-if="show" class="modal">
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
        <div class="container">
            <!--web spreadsheet组件-->
            <div ref="sheetContainer" class="spreadsheet" id="x-spreadsheet-demo"></div>
        </div>
        <div class="toolbar">
            <button @click="exportExcel">导出xlsx</button>
        </div>
    </div>
</template>

<script>
import Spreadsheet from 'x-data-spreadsheet'
import zhCN from 'x-data-spreadsheet/src/locale/zh-cn'
import * as XLSX from 'xlsx'
export default {
    data() {
        return {
            show: false,
            xs: null,
            jsondata: {
                type: '',
                label: ''
            },
            options: {
                mode: 'edit',
                showToolbar: true,
                showGrid: true,
                showContextmenu: true,
                showBottomBar: true,
                formats: [],
                fonts: [],
                formula: [],
                row: {
                    len: 100,
                    height: 25
                },
                col: {
                    len: 26,
                    width: 100,
                    indexWidth: 60,
                    minWidth: 60
                },
                style: {
                    bgcolor: '#ffffff',
                    align: 'left',
                    valign: 'middle',
                    textwrap: false,
                    textDecoration: 'normal',
                    strikethrough: false,
                    color: '#0a0a0a',
                    font: {
                        name: 'Helvetica',
                        size: 10,
                        bold: false,
                        italic: false
                    }
                }
            }
        }
    },
    methods: {
        init() {
            Spreadsheet.locale('zh-cn', zhCN)
            this.xs = new Spreadsheet('#x-spreadsheet-demo', this.options).loadData({}).change(data => {
                console.log(data)
            })
            this.xs.validate()
        },
        initData() {
            this.show = true
            this.$nextTick(() => {
                this.init()
            })
        },
        close() {
            this.show = false
        },
        // 导出excel
        exportExcel() {
            let new_wb = XLSX.utils.book_new()
            this.xs.getData().forEach(function (xws) {
                let aoa = [[]]
                let rowobj = xws.rows
                for (let ri = 0; ri < rowobj.len; ++ri) {
                    let row = rowobj[ri]
                    if (!row) continue
                    aoa[ri] = []
                    Object.keys(row.cells).forEach(function (k) {
                        let idx = +k
                        if (isNaN(idx)) return
                        aoa[ri][idx] = row.cells[k].text
                    })
                }
                let ws = XLSX.utils.aoa_to_sheet(aoa)
                XLSX.utils.book_append_sheet(new_wb, ws, xws.name)
            })
            XLSX.writeFile(new_wb, 'demo.xlsx')
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
.modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: #fff;
    top: 0;
    left: 0;
    z-index: 9999999999;
    .spreadsheet {
        width: 100vw;
        height: 100vh;
    }
    .close {
        top: 3px;
    }
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .grid {
        width: 100%;
        height: calc(100% - 80px);
    }
}
.toolbar {
    height: 50px;
    position: fixed;
    right: 20px;
    bottom: -15px;
    z-index: 999;
    button {
        border: none;
        background-color: #cccccc;
        line-height: 30px;
        padding: 0 10px;
        cursor: pointer;
    }
}
</style>
