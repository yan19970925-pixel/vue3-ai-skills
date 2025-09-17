<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <div class="base-cont" style="background-color: #fff">
        <span class="cont-span">对照情况：</span>
        <el-select
          v-model="option"
          placeholder="请选择机构名称"
          style="width: 14%"
          class="select-item"
          filterable
          clearable
          default-first-option
        >
          <el-option
            v-for="(item, index) in filteredOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-button type="primary" @click="getPeItemLab(1)">查询</el-button>
        <el-button type="success" @click="peItemListRelateAuto">自动对照</el-button>
        <el-button class="resetBtn" @click="peItemListRelate(peItem, LISItem, '1')">对照</el-button>
        <el-button class="resetBtn" @click="peItemListRelate(peItem, LISItem)">取消对照</el-button>
        <el-button class="resetBtn" @click="getPeLisItem(1)">LIS项目更新</el-button>
      </div>
      <el-row style="height: calc(100% - 56px)" class="mt-4px">
        <el-col :span="16" class="pr-4px" style="height: 100%">
          <div class="content">
            <div class="base-title">体检项目</div>
            <el-table
              :data="peList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 72px); min-height: 300px; overflow: auto"
              highlight-current-row
              stripe
              @row-click="handlePeItem"
            >
              <el-table-column
                label="项目编码"
                prop="peItemCode"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column label="项目名称" prop="peItemName" show-overflow-tooltip />
              <el-table-column label="LIS编码" prop="relateCode" show-overflow-tooltip />
              <el-table-column label="LIS名称" prop="relateName" show-overflow-tooltip />
              <el-table-column label="输入码" prop="inputCode" show-overflow-tooltip />
            </el-table>

            <!-- 分页组件 -->
            <el-pagination
              background
              layout="prev, pager, next"
              :total="peTotal"
              :page-size="pageSize"
              :current-page="peCurrentPage"
              @current-change="PeItemChange"
            />
          </div>
        </el-col>
        <el-col :span="8" style="height: 100%">
          <div class="content">
            <div class="base-box" style="height: 100%">
              <div class="base-title">LIS项目</div>
              <el-table
                :data="LISList"
                border
                class="mt-6px"
                style="width: 100%; height: calc(100% - 72px); min-height: 300px; overflow: auto"
                highlight-current-row
                stripe
                @row-click="handleLISItem"
              >
                <el-table-column label="LIS编码" prop="itemCode" show-overflow-tooltip />
                <el-table-column label="LIS名称" prop="itemName" show-overflow-tooltip />
                <el-table-column label="输入码" prop="inputCode" show-overflow-tooltip />
              </el-table>

              <!-- 分页组件 -->
              <el-pagination
                background
                layout="prev, pager, next"
                :total="lisTotal"
                :page-size="pageSize"
                :current-page="lisCurrentPage"
                @current-change="LISChange"
              />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as Api from '@/api/systemSetting/subItemControls/index'
import { ElMessage } from 'element-plus'

// ===================== 响应式数据 =====================
const option = ref('0')
watch(
  () => option.value,
  (newValue) => {
    if (newValue === '1') {
      getPeItemLab(1, '1')
    } else {
      getPeItemLab()
    }
  }
)
const filteredOptions = ref([
  { label: '未对照', value: '0' },
  { label: '已对照', value: '1' }
])
const peList = ref([])
const LISList = ref([])

// 分页参数
const pageSize = ref(23)
const peCurrentPage = ref(1)
const lisCurrentPage = ref(1)
const peTotal = ref(0)
const lisTotal = ref(0)

// 获取体检项目数据
const getPeItemLab = async (pageNo = 1, isRela = '0') => {
  const res = await Api.getPeItemLab({
    pageNo: pageNo,
    pageSize: pageSize.value,
    inputCode: '',
    isRelated: isRela
  })
  if (res.records && res.records.length > 0) {
    peList.value = res.records
    peTotal.value = res.total || res.records.length
    peCurrentPage.value = pageNo
  }
}

// 获取 LIS 项目数据
const getPeLisItem = async (pageNo = 1) => {
  const res = await Api.getPeLisItem({
    pageNo: pageNo,
    pageSize: pageSize.value,
    inputCode: ''
  })
  if (res.records && res.records.length > 0) {
    LISList.value = res.records
    lisTotal.value = res.total || res.records.length
    lisCurrentPage.value = pageNo
  }
}

// 切换体检项目分页
const PeItemChange = (val: number) => {
  getPeItemLab(val)
}

// 切换 LIS 项目分页
const LISChange = (val: number) => {
  getPeLisItem(val)
}
// 检验项目自动对照
const peItemListRelateAuto = async () => {
  const res = await Api.peItemListRelateAuto({
    pageNo: 1,
    pageSize: pageSize.value,
    inputCode: '',
    isRelated: '1'
  })
  // if (res.records && res.records.length > 0) {
  //   peList.value = res.records
  //   peTotal.value = res.total || res.records.length
  //   peCurrentPage.value = pageNo
  // }
}

const LISItem = ref({
  itemCode: '',
  itemName: '',
  inputCode: ''
})

const handlePeItem = (row) => {
  rowDetail.value = row
  peItem.value.peItemCode = row.peItemCode
  peItem.value.peItemName = row.peItemName
  peItem.value.peDeptCode = row.peDeptCode
  peItem.value.peResultClass = row.peResultClass
  peItem.value.inputCode = row.inputCode
  peItem.value.resultCate = row.resultCate
}

const handleLISItem = (row) => {
  LISItem.value = row
}

const rowDetail = ref({})

const peItem = ref({
  peItemCode: rowDetail.value.peItemCode,
  peItemName: rowDetail.value.peItemName,
  peDeptCode: rowDetail.value.peDeptCode,
  peResultClass: rowDetail.value.peResultClass,
  normalValue: '',
  unit: '',
  upperLimit: 0,
  lowerLimit: 0,
  sex: '',
  describes: '',
  suggest: '',
  defaultValue: '',
  orderNo: 0,
  notes: '',
  inputCode: rowDetail.value.inputCode,
  relateCode: '',
  relateName: '',
  resultCate: rowDetail.value.resultCate,
  feupperLimit: 0,
  felowerLimit: 0,
  displayFlag: '',
  createDatetime: ''
})
// 对照以及取消对照
const peItemListRelate = async (
  peItemInfo = peItem.value,
  LISItemInfo = LISItem.value,
  flag = ''
) => {
  if (!flag) {
    LISItem.value = {
      itemCode: peItem.value.relateCode,
      itemName: '',
      inputCode: ''
    }
  } else {
    peItem.value.relateCode = LISItem.value.itemCode
    peItem.value.relateName = LISItem.value.itemName
  }
  await Api.peItemListRelate({
    peItemDictDO: peItemInfo,
    peLisItemRespVO: LISItemInfo
  }).then((res) => {
    if (res) {
      if (flag) {
        ElMessage.success('对照成功')
      } else {
        ElMessage.success('取消成功')
        getPeItemLab(1, '1')
      }
    }
  })
}

onMounted(() => {
  getPeItemLab()
  getPeLisItem()
})
</script>

<style lang="scss" scoped>
.base-setting {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 0;
  box-sizing: border-box;
}
:deep(.el-table) {
  font-size: 14px;
}
.base-title {
  padding: 0 20px;
  color: #3473d1;
  font-size: 16px;
  height: 29px;
  line-height: 29px;
  position: relative;
  font-weight: 700;
  border-bottom: 1px solid #c5dcff;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100px;
    // height: 2px;
    // background-color: #3473d1;;
  }

  &.dif {
    &::before {
      width: 170px;
    }
  }
}
.base-cont {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  gap: 15px;
  padding: 10px;

  &.auto {
    display: block;
  }

  .cont-span {
    display: inline-block;
    width: 100px;
    text-align: right;
    flex-shrink: 0;
  }
  .select-item {
    width: 240px;
  }

  .base-div {
    display: flex;
    gap: 10px;
    padding-bottom: 10px;

    &.spec {
      justify-content: left;
      gap: 0;

      .select-area {
        width: 1290px;
      }
    }
  }
}

.resetBtn {
  border: 1px solid #3473d1 !important;
  color: #3473d1 !important;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
}
.resetBtn:hover {
  border: 1px solid #3473d1;
  color: #3473d1;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 12px;
}
:deep(.el-transfer) {
  .el-transfer-panel {
    width: 40%;
    box-sizing: border-box;
  }

  .el-transfer__buttons {
    // display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
}
// --------------------------
.custom-transfer {
  display: flex;
  height: 400px;
  border: 1px solid #e4e7ed;
  padding: 10px;
  background-color: #f5f7fa;
}

.transfer-panel {
  flex: 1;
  background-color: white;
  margin: 0 5px;
  padding: 10px;
  border-radius: 4px;
  overflow-y: auto;
}

.transfer-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.list {
  max-height: 300px;
  overflow-y: auto;
}

.item {
  padding: 5px 10px;
}

.content {
  background-color: #fff;
  height: 100%;
  width: 100%;
  padding: 8px;
  overflow: auto;
}

.base-btn {
  display: flex;
  width: calc(100% - 20px);
  justify-content: center;
  align-items: center;
  height: 65px;
  background-color: #fff;
  .btn-box {
    width: 122px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background: #3473d1;
    color: #fff;
    cursor: pointer;
  }
}
</style>
