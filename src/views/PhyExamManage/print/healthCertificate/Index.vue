<!-- <template v-show="false">
  <div class="per_report"> 页面开发中 </div>
</template> -->
<template>
  <div class="per_report">
    <div class="report_search">
      <div class="search1" style="padding-bottom: 6px">
        <div class="div1">
          <span class="span1">体检时间区间：</span>
          <el-date-picker
            v-model="time"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="!w-240px"
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1">体检号：</span>
          <el-input
            style="width: 120px; margin-right: 12px"
            v-model="searchParams.peId"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1">次数：</span>
          <el-input
            style="width: 64px"
            v-model="searchParams.peVisitId"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>

        <div class="div1">
          <span class="span1">姓名：</span>
          <el-input
            style="width: 120px"
            v-model="searchParams.name"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1 !w-70px" style="text-align: right">身份证：</span>
          <el-input
            style="width: 180px"
            v-model="searchParams.idNo"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <el-button @click="search">查询</el-button>
        </div>
      </div>
      <!-- 打印页面选择 -->
      <div class="search1" style="padding-top: 6px">
        <div class="div1">
          <span class="span1">打印页面选择：</span>
          <el-checkbox
            v-model="printOptions.firstPage"
            label="首页"
            size="large"
            @change="handlePrintOptionChange"
          />
          <el-checkbox
            v-model="printOptions.secondPage"
            label="基本信息页"
            size="large"
            @change="handlePrintOptionChange"
          />
          <el-checkbox
            v-model="printOptions.thirdPage"
            label="年度体检结果"
            size="large"
            @change="handlePrintOptionChange"
          />
        </div>

        <div class="div1">
          <el-select
            v-model="selectedYear"
            placeholder="请选择年度"
            style="width: 120px; margin-right: 12px"
            :disabled="!printOptions.thirdPage"
          >
            <el-option
              v-for="year in [1, 2, 3, 4]"
              :key="year"
              :label="`第${year}年度`"
              :value="year"
            />
          </el-select>
          <el-button @click="handlePrintA5">打印</el-button>
        </div>
      </div>
      <div class="report_table">
        <div class="table_item">
          <div class="list_table">
            <el-table
              :data="tableData"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100vh - 236px); overflow: auto; margin: 0 !important"
              highlight-current-row
              stripe
              @row-click="handleItemClick"
            >
              <el-table-column
                align="center"
                label="体检号"
                prop="peId"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column
                align="center"
                label="体检次数"
                prop="peVisitId"
                width="90"
                show-overflow-tooltip
              />

              <el-table-column
                align="center"
                label="姓名"
                width="100"
                prop="name"
                show-overflow-tooltip
              />

              <el-table-column
                align="center"
                width="60"
                label="性别"
                prop="sex"
                show-overflow-tooltip
              />
              <el-table-column
                align="center"
                width="80"
                label="民族"
                prop="nation"
                show-overflow-tooltip
              />
              <el-table-column
                align="center"
                width="80"
                label="年度"
                prop="year"
                show-overflow-tooltip
              />
              <el-table-column align="center" label="身份证号" prop="idNo" show-overflow-tooltip />
              <el-table-column
                align="center"
                label="出生日期"
                prop="dateOfBirth"
                width="120px"
                show-overflow-tooltip
              />
              <el-table-column
                align="center"
                label="体检时间"
                prop="pePreDate"
                width="120px"
                show-overflow-tooltip
              />
              <el-table-column
                align="center"
                label="单位（职业）"
                prop="unitInContract"
                width=""
                show-overflow-tooltip
              />
              <!-- 可以删除的操作列 -->
              <!-- 固定右侧 -->
              <!-- <el-table-column label="操作" width="100" fixed="right">
              <template #default="scope">
                <el-button
                  style="color: red"
                  type="text"
                  size="small"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column> -->
            </el-table>
            <!-- 分页 -->
            <!-- <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
            style="margin-top: 15px; text-align: center"
          /> -->
            <!-- <el-checkbox-group v-model="multipleSelectionArr" @change="handleSelectionChange">
            <el-checkbox
              v-for="(item, index) in tableData"
              :key="index"
              :label="item.uniqueId || `${item.peId}_${item.peVisitId}`"
            >
              <span style="padding-right: 12px">{{ item.peId }}-{{ item.peVisitId }}</span>
              <span>{{ item.name }}</span>
            </el-checkbox>
          </el-checkbox-group> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 托幼机构工作人员健康证明书打印内容 -->
    <div class="print-section">
      <div id="a5-print-content" ref="a5PrintContent" class="a5-print-content">
        <!-- 首页 -->
        <div
          v-if="printOptions.firstPage"
          class="a5-page first-page"
          style="display: flex; flex-direction: row"
        >
          <div style="flex: 1"> </div>

          <div
            class="content"
            style="flex: 1; display: flex; flex-direction: column; padding-left: 12mm"
          >
            <div
              class="certificate-info"
              style="flex: 1; display: flex; flex-direction: column; justify-content: center"
            >
              <div class="info-row" style="flex: 1; display: flex; align-items: last baseline">
                <div class="info-item">
                  <label style="width: 20mm">
                    <!-- 发证日期： -->
                  </label>
                  <span style="width: 20mm; text-align: center; margin-right: 8mm">{{
                    healthTabelData.chiefAuditDate.split('-')[0] || ''
                  }}</span>
                  <span style="width: 20mm; text-align: center; margin-right: 8mm">{{
                    healthTabelData.chiefAuditDate.split('-')[1] || ''
                  }}</span>
                </div>
              </div>

              <div class="info-row" style="flex: 1; display: flex; align-items: center">
                <div class="info-item" style="transform: translateY(2mm)">
                  <label>
                    <!-- 发证机关： -->
                  </label>
                  <span>{{ healthTabelData.issuingAuthority || '北京市延庆区妇幼保健院' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 基本信息页 -->
        <div
          v-if="printOptions.secondPage"
          class="a5-page second-page"
          style="display: flex; flex-direction: row; box-sizing: border-box; text-align: center"
        >
          <div style="flex: 1"> </div>

          <div class="content" style="flex: 1; padding-left: 13mm">
            <table
              class="custom-table"
              style="width: 100%; border-collapse: collapse; font-size: 16px"
            >
              <colgroup>
                <col style="width: 12mm" />
                <col style="width: 12mm" />
                <col style="width: 12mm" />
                <col style="width: 12mm" />
                <col style="width: 36mm" />
              </colgroup>
              <tbody>
                <!-- 第1行 -->
                <tr style="height: 16mm">
                  <td class="border-cell" style="text-align: center">
                    <!-- 姓名 -->
                  </td>
                  <td colspan="3" class="border-cell">{{ healthTabelData.name || '' }}</td>
                  <td
                    rowspan="3"
                    class="border-cell"
                    style="width: 36mm; height: 48mm; text-align: center; vertical-align: middle"
                    >照片</td
                  >
                </tr>

                <!-- 第2行 -->
                <tr style="height: 16mm">
                  <td class="border-cell" style="text-align: center">
                    <!-- 性别 -->
                  </td>
                  <td class="border-cell">{{ healthTabelData.sex || '' }}</td>
                  <td class="border-cell" style="text-align: center">
                    <!-- 年龄 -->
                  </td>
                  <td class="border-cell">{{ healthTabelData.age || '' }}</td>
                </tr>

                <!-- 第3行 -->
                <tr style="height: 16mm">
                  <td class="border-cell" style="text-align: center">
                    <!-- 婚否 -->
                  </td>
                  <td class="border-cell">{{ healthTabelData.maritalStatus || '' }}</td>
                  <td class="border-cell" style="text-align: center">
                    <!-- 民族 -->
                  </td>
                  <td class="border-cell">{{ healthTabelData.nation || '' }}</td>
                </tr>

                <!-- 第4行 -->
                <tr style="height: 16mm">
                  <td colspan="2" class="border-cell" style="text-align: center">
                    <!-- 岗位 -->
                  </td>
                  <td colspan="3" class="border-cell">{{ healthTabelData.occupation || '' }}</td>
                </tr>

                <!-- 第5行 -->
                <tr style="height: 35mm">
                  <td colspan="2" class="border-cell" style="text-align: center">
                    <!-- 工作单位 -->
                  </td>
                  <td colspan="3" class="border-cell">{{ healthTabelData.department || '' }}</td>
                </tr>

                <!-- 第6行 -->
                <tr style="height: 16mm">
                  <td colspan="2" class="border-cell" style="text-align: center">
                    <!-- 身份证号 -->
                  </td>
                  <td colspan="3" class="border-cell">{{ healthTabelData.idNo || '' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 年度体检结果页 -->
        <div
          v-if="printOptions.thirdPage"
          class="a5-page third-page"
          style="
            display: flex;
            padding-left: 1mm 1mm 23mm 8mm;
            flex-direction: row;
            box-sizing: border-box;
          "
        >
          <div class="border-cell" style="flex: 1; padding-right: 8mm">
            <!-- 第一年度 -->
            <div
              v-show="selectedYear === 1 || selectedYear === null"
              class="border-cell"
              style="padding-bottom: 8mm; height: 56mm"
            >
              <div
                class="border-cell"
                style="
                  height: 8mm;
                  width: 79mm;
                  text-align: left;
                  line-height: 8mm;
                  padding-left: 14mm;
                "
              >
                {{ healthTabelData.chiefAuditDate.split('-')[0] || '' }}
              </div>
              <div
                class="border-cell"
                style="
                  height: 32mm;
                  width: 79mm;
                  text-align: center;
                  line-height: 32mm;
                  font-size: 18px;
                "
              >
                合格
              </div>
              <div class="border-cell" style="height: 8mm; width: 79mm; display: flex">
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                ></div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[0] || '' }}
                </div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[1] || '' }}
                </div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: left; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[2] || '' }}
                </div>
              </div>
            </div>
            <div
              v-show="selectedYear !== 1 && selectedYear !== null"
              class="border-cell"
              style="padding-bottom: 8mm; height: 56mm"
            >
            </div>

            <!-- 第二年度 -->
            <div
              v-show="selectedYear === 2 || selectedYear === null"
              class="border-cell"
              style="height: 58mm"
            >
              <div
                class="border-cell"
                style="
                  height: 8mm;
                  width: 79mm;
                  text-align: left;
                  line-height: 8mm;
                  padding-left: 14mm;
                "
              >
                {{ healthTabelData.chiefAuditDate.split('-')[0] || '' }}
              </div>
              <div
                class="border-cell"
                style="
                  height: 34mm;
                  width: 79mm;
                  text-align: center;
                  line-height: 34mm;
                  font-size: 18px;
                "
              >
                合格
              </div>
              <div class="border-cell" style="height: 8mm; width: 79mm; display: flex">
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                ></div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[0] || '' }}
                </div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[1] || '' }}
                </div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: left; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[2] || '' }}
                </div>
              </div>
            </div>
          </div>

          <div class="border-cell" style="flex: 1; padding-left: 8mm">
            <!-- 第三年度 -->
            <div
              v-show="selectedYear === 3 || selectedYear === null"
              class="border-cell"
              style="padding-bottom: 8mm; height: 56mm"
            >
              <div
                class="border-cell"
                style="
                  height: 8mm;
                  width: 79mm;
                  text-align: left;
                  line-height: 8mm;
                  padding-left: 14mm;
                "
              >
                {{ healthTabelData.chiefAuditDate.split('-')[0] || '' }}
              </div>
              <div
                class="border-cell"
                style="
                  height: 32mm;
                  width: 79mm;
                  text-align: center;
                  line-height: 32mm;
                  font-size: 18px;
                "
              >
                合格
              </div>
              <div class="border-cell" style="height: 8mm; width: 79mm; display: flex">
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                ></div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[0] || '' }}
                </div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[1] || '' }}
                </div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: left; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[2] || '' }}
                </div>
              </div>
            </div>
            <div
              v-show="selectedYear !== 3 && selectedYear !== null"
              class="border-cell"
              style="padding-bottom: 8mm; height: 56mm"
            >
            </div>

            <!-- 第四年度 -->
            <div
              v-show="selectedYear === 4 || selectedYear === null"
              class="border-cell"
              style="height: 58mm"
            >
              <div
                class="border-cell"
                style="
                  height: 8mm;
                  width: 79mm;
                  text-align: left;
                  line-height: 8mm;
                  padding-left: 14mm;
                "
              >
                {{ healthTabelData.chiefAuditDate.split('-')[0] || '' }}
              </div>
              <div
                class="border-cell"
                style="
                  height: 34mm;
                  width: 79mm;
                  text-align: center;
                  line-height: 34mm;
                  font-size: 18px;
                "
              >
                合格
              </div>
              <div class="border-cell" style="height: 8mm; width: 79mm; display: flex">
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                ></div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[0] || '' }}
                </div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: center; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[1] || '' }}
                </div>
                <div
                  class="border-cell"
                  style="flex: 1; height: 8mm; text-align: left; line-height: 8mm"
                >
                  {{ healthTabelData.chiefAuditDate.split('-')[2] || '' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VuePrintNext } from 'vue-print-next'
import { selectPremaritalList, updatePatVisitYear } from '@/api/systemSetting/Premarital/index'
import { formatDate } from '@/utils/formatTime'
import { useUserStore } from '@/store/modules/user'
import { onMounted, ref, nextTick } from 'vue'
const showBorder = ref(false) // 控制是否显示边框 关
// const showBorder = ref(true) // 控制是否显示边框 开
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUser)

const searchParams = ref({
  peId: '',
  name: '',
  sex: '',
  peVisitId: '',
  pePreDateStart: '',
  pePreDateEnd: '',
  screeningCode: '',
  age: '',
  phoneNumber: '',
  peTypeName: '托幼体检',
  idNo: ''
})

const time = ref([formatDate(new Date(), 'YYYY-MM-DD'), formatDate(new Date(), 'YYYY-MM-DD')])

const tableData = ref([])
const search = () => {
  selectPremaritalList(searchParams.value).then((res) => {
    if (res && res.length > 0) {
      tableData.value = res.map((item) => {
        return {
          ...item,
          uniqueId: `${item.peId}-${item.peVisitId}`
        }
      })
    } else {
      tableData.value = []
    }
  })
}

// 打印选项
const printOptions = ref({
  firstPage: false,
  secondPage: false,
  thirdPage: false
})

const selectedYear = ref<number>(1) // 默认选中第一个年度

// 处理打印选项互斥逻辑
const handlePrintOptionChange = () => {
  const { firstPage, secondPage, thirdPage } = printOptions.value

  // 如果选中了“年度体检结果”之外的选项，自动取消年度选择
  if (!thirdPage) {
    selectedYear.value = 1
  }

  // 只允许选中一个打印页面
  if (firstPage) {
    printOptions.value = { firstPage: true, secondPage: false, thirdPage: false }
  } else if (secondPage) {
    printOptions.value = { firstPage: false, secondPage: true, thirdPage: false }
  } else if (thirdPage) {
    printOptions.value = { firstPage: false, secondPage: false, thirdPage: true }
  }
}

// 健康证明数据
const healthTabelData = ref({
  // 首页数据
  certificateDate: new Date(),
  chiefAuditDate: '',
  issuingAuthority: '北京市延庆区妇幼保健院',
  // 基本信息页数据
  name: '',
  sex: '',
  age: 0,
  maritalStatus: '',
  nation: '',
  occupation: '',
  department: '',
  idNo: ''
})
// 清理数据
const clearData = () => {
  healthTabelData.value.name = ''
  healthTabelData.value.chiefAuditDate = ''
  healthTabelData.value.sex = ''
  healthTabelData.value.nation = ''
  healthTabelData.value.occupation = ''
  healthTabelData.value.department = ''
  healthTabelData.value.idNo = ''
  healthTabelData.value.age = 0
}

// 添加选中行数据的响应式变量
const selectedRow = ref<any>(null)

// 处理表格行点击事件
const handleItemClick = (row: any) => {
  selectedRow.value = row
  healthTabelData.value = JSON.parse(JSON.stringify(row))
  healthTabelData.value.chiefAuditDate = formatDate(
    healthTabelData.value.chiefAuditDate,
    'YYYY-MM-DD'
  )
}

const a5PrintContent = ref<HTMLElement | null>(null)
const handlePrintCommon = async (preview: boolean) => {
  if (!healthTabelData.value.name) {
    ElMessage.warning('请选择要打印的行')
    return
  }
  if (
    !printOptions.value.firstPage &&
    !printOptions.value.secondPage &&
    !printOptions.value.thirdPage
  ) {
    ElMessage.warning('请选择打印选项')
    return
  }
  if (printOptions.value.thirdPage && selectedYear) {
    await updatePatVisitYear({
      peId: selectedRow.value.peId || '',
      pevisitId: selectedRow.value.peVisitId || 1,
      year: `第${selectedYear.value}年度`
    }).then((res) => {
      if (res) {
        search()
      }
    })
  }
  nextTick(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @page {
        size: 193mm 139mm;
        margin: 0mm;
      }
      body {
        margin: 0;
        padding: 0;
      }
    `
    document.head.appendChild(style)

    new VuePrintNext({
      el: '#a5-print-content',
      preview,
      paperSize: 'A4',
      orientation: 'portrait',
      previewOpenCallback: () => {
        document.head.removeChild(style)
      }
    })
  })
  clearData()
}

const handlePreview = () => handlePrintCommon(true)
const handlePrintA5 = () => handlePrintCommon(false)

onMounted(() => {
  search()
})
</script>

<style scoped>
.per_report {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  padding: 40px 8px 0;
  box-sizing: border-box;
  overflow: hidden;
}

.report_search {
  margin-bottom: 20px;
}

.report_search .search1 {
  padding: 16px 24px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  flex-wrap: wrap;
}

.report_search .search1 .div1 {
  margin-right: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.report_search .search1 .div1 .span1 {
  color: #333333;
  font-size: 14px;
  display: inline-block;
  white-space: nowrap;
}

.report_search .search1 .div1 .el-button {
  background-color: #3473d1;
  color: #fff;
  padding: 0 24px;
  border-color: #3473d1;
}

.a5-page {
  width: 193mm;
  height: 139mm;
  padding: 10mm; /* 1cm边距 */
  box-sizing: border-box;
  page-break-after: always;
  font-family: 'SimSun', 'STSong', serif;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  background: white;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.sub-header {
  font-size: 16px;
  margin-top: 5px;
}

.content {
  flex: 1;
}

.certificate-info .info-row {
  /* margin-bottom: 15px; */
}

.certificate-info .info-item {
  display: flex;
  /* margin-bottom: 10px; */
}

.certificate-info .info-item label {
  font-weight: bold;
  width: 100px;
}

.certificate-info .info-item span {
  flex: 1;
}

.seal-section {
  margin-top: 30px;
  text-align: right;
}

.seal-placeholder {
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 1px solid #999;
  line-height: 120px;
  text-align: center;
  color: #999;
}

/* 年度体检结果页样式 */
.year-section {
  margin-bottom: 20px;
}

.year-header h3 {
  text-align: center;
  margin: 0 0 15px 0;
  font-size: 18px;
}

.examination-details .detail-row {
  display: flex;
  margin-bottom: 10px;
  gap: 20px;
}

.examination-details .detail-item {
  display: flex;
  flex: 1;
}

.examination-details .detail-item.full-width {
  flex: 0 0 100%;
}

.examination-details .detail-item label {
  font-weight: bold;
  width: 80px;
  white-space: nowrap;
}

.examination-details .detail-item span {
  flex: 1;
}

.exam-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.exam-item {
  min-width: 120px;
}

.border-cell {
  /* border: 1px solid #000; */
  border: none;
}
.no-border {
  border: none;
}
</style>
