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
            <div ref="sheetContainer" class="spreadsheet" id="xSpreadsheet"></div>
        </div>
        <div class="toolbar">
            <!-- <input
                type="file"
                @change="importExcel"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            /> -->
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
            this.xs = new Spreadsheet('#xSpreadsheet', this.options).loadData({}).change(data => {
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
        },
        importExcel(event) {
            let files = event.target.files
            if (files && files.length > 0) {
                let file = files[0]
                let reader = new FileReader()
                reader.onload = event => {
                    let data = event.target.result
                    let workbook = XLSX.read(data, { type: 'binary' })

                    workbook.SheetNames.forEach(sheetName => {
                        let worksheet = workbook.Sheets[sheetName]
                        let data = XLSX.utils.sheet_to_json(worksheet, { header: 1, cellStyles: true })
                        let json = []
                        let headers = data[0]
                        for (let i = 1; i < data.length; i++) {
                            let obj = {}
                            for (let j = 0; j < headers.length; j++) {
                                obj[headers[j]] = data[i][j]
                            }
                            json.push(obj)
                        }

                        let sheet = this.xs.sheet
                        XLSX.utils.sheet_add_json(sheet, json, { skipHeader: true, origin: 'A2' })
                    })
                }
                reader.readAsBinaryString(file)
            }
        }
    },
    mounted() {}
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
        z-index: 9999;
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
