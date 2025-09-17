<template>
  <div class="content-container" style="padding-top: 36px">
    <div class="topBtn p-8px">
      <span class="ml-16px mr-8px">查询时间：</span>
      <el-date-picker
        v-model="startDate"
        type="date"
        @change="getList()"
        class="!w-180px"
        value-format="YYYY-MM-DD"
      />
      <span class="ml-8px mr-8px">至</span>
      <el-date-picker
        v-model="endDate"
        type="date"
        @change="getList()"
        class="!w-180px"
        value-format="YYYY-MM-DD"
      />
      <span class="ml-16px mr-8px">产品名称：</span>
      <el-input
        v-model="searchExpName"
        type="text"
        @input="getList()"
        clearable
        placeholder="请输入"
        class="!w-180px"
      />
      <span class="ml-16px mr-8px">发放库房：</span>
      <el-select
        placeholder="请选择库房"
        v-model="currentDeptCode"
        @change="getList()"
        style="width: 240px"
        clearable
      >
        <el-option
          v-for="(item, index) in deptList"
          :label="item.storageName"
          :value="item.storageCode"
          :key="index"
        />
      </el-select>
      <el-button type="primary" class="ml-24px" @click="getList()">查询</el-button>
      <el-button type="primary" class="ml-24px" @click="addItem()">材料申请</el-button>
    </div>
    <div class="p-10px">
      <div class="tabList">
        <el-table
          :data="patientLists"
          border
          class="advice-list-table"
          style="height: calc(100vh - 200px)"
          ><el-table-column
            :resizable="false"
            prop="provideStorage"
            align="center"
            label="发放库房"
            width="130"
            show-overflow-tooltip
          >
            <template #default="scope">
              <span>{{
                scope.row.provideStorage
                  ? deptList.find((user) => user.storageCode == scope.row.provideStorage)
                      ?.storageName
                  : ''
              }}</span>
            </template></el-table-column
          ><el-table-column
            :resizable="false"
            prop="applicantNo"
            align="center"
            label="申请单号"
            width="160"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="appDateTime"
            align="center"
            label="申请时间"
            width="160"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="expCode"
            align="center"
            width="120"
            label="代码"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="expName"
            align="left"
            width="280"
            label="名称"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="quantity"
            align="center"
            width="90"
            label="数量"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="noProvideQuantity"
            align="center"
            width="96"
            label="未发放数量"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="units"
            align="center"
            width="60"
            label="单位"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="expSpec"
            align="center"
            width="130"
            label="规格"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="firmId"
            align="center"
            label="生产厂商"
            width="120"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="retailPrice"
            align="center"
            width="92"
            label="零售价"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="stockQuantity"
            align="center"
            width="100"
            label="对方库存量"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="appPersonName"
            align="center"
            label="申请人"
            width="90"
            show-overflow-tooltip
          /><el-table-column
            :resizable="false"
            prop="providePersonName"
            align="center"
            width="90"
            label="发放人"
            show-overflow-tooltip
          />
          <el-table-column
            :resizable="false"
            prop="status"
            align="center"
            label="状态"
            width="84"
            show-overflow-tooltip
          >
            <template #default="scope">
              <section class="needCenter">
                {{
                  scope.row.status == 0
                    ? '未发放'
                    : scope.row.status == '1'
                    ? '部分发放'
                    : scope.row.status == '2'
                    ? '全部发放'
                    : ''
                }}
              </section>
            </template>
          </el-table-column>
          <el-table-column
            :resizable="false"
            prop="remark"
            align="center"
            label="备注"
            width="120"
            show-overflow-tooltip
          />
          <el-table-column label="操作" align="center" fixed="right" width="120px">
            <template #default="scope">
              <el-button
                link
                v-if="scope.row.status == 0 || !scope.row.status"
                type="text"
                @click="editItem(scope.row)"
                class="delbutton"
                style="color: #3473d1"
              >
                修改
              </el-button>
              <el-button
                link
                v-if="scope.row.status == 0 || !scope.row.status"
                type="danger"
                @click="delItem(scope.row)"
                class="delbutton"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container mt-12px mb-12px">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[20, 40, 100, 200]"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <div ref="editEditItem" v-if="showEditItem" id="editItem">
      <div class="editItem-close" @click="hideMaskPre()">
        <el-icon><Close /></el-icon
      ></div>
      <div class="editItemQuery">
        <span class="queryDes">输入码</span
        ><el-input
          ref="queryInput"
          class="queryInput"
          v-model="keyWord"
          @input="handleQueryItem"
          autofocus="true"
          placeholder="请输入拼音码"
          :maxlength="20"
        />
        <span class="queryDes1">01-拼音码</span>
        <span class="queryDes">消耗品申请</span>
      </div>
      <el-table
        id="itemTable"
        :data="itemList"
        ref="itemTableRef"
        v-show="itemList.length > 0"
        @row-dblclick="cellclickItem"
        highlight-current-row
        scrollbar-always-on
        border
        style="width: auto; height: 470px; font-size: 15px"
      >
        <el-table-column
          v-for="(col, idx) in itemColumnList"
          :key="col.prop"
          :index="idx"
          :show-overflow-tooltip="true"
          v-bind="col"
        /> </el-table
    ></div>
    <div class="mask" v-if="showMask"></div>
    <Dialog
      :model-value="applyVisiable"
      width="1300px"
      :fullscreen="false"
      :close-on-click-modal="false"
      class="nurse-dialog"
      @close="applyVisiable = false"
      ><template #title>
        <div class="dialog-title">{{
          operatorType == 'add' ? '消耗品申请' : '消耗品申请修改'
        }}</div>
      </template>
      <div>
        <div class="flex">
          <span class="ml-16px mr-8px" style="position: relative; top: 5px">发放库房：</span>
          <el-select
            placeholder="请选择库房"
            :disabled="operatorType == 'edit' && addTableList.length > 0"
            v-model="applyDeptCode"
            @change="changeApplyDeptCode()"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in deptList"
              :label="item.storageName"
              :value="item.storageCode"
              :key="index"
            /> </el-select
          ><el-button type="primary" class="ml-24px" @click="addNewList()">新增</el-button>
          <el-button type="primary" class="ml-24px" @click="saveNewList()">保存</el-button></div
        >
        <el-table
          :data="addTableList"
          border
          class="advice-list-table"
          highlight-current-row
          style="width: 100%; height: 500px; margin-top: 10px"
          ><el-table-column
            :resizable="false"
            v-for="(col, idx) in columnList"
            :key="col.prop"
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :index="idx"
            :show-overflow-tooltip="true"
            align="center"
            ><template #default="scope"
              ><section v-if="col.prop === 'expName'">
                <span
                  v-if="scope.row.operatorType == 'saveAdd'"
                  style="display: block; text-align: left !important"
                  >{{ scope.row.expName }}</span
                >
                <el-input
                  v-else
                  v-model="scope.row.expName"
                  name="choseItemName"
                  ref="itemNameRef"
                  placeholder="请选择项目"
                  type="text"
                  size="small"
                  @focus="newItemNameChange(scope.$index)"
                />
              </section>
              <section v-else-if="col.prop == 'quantity'" class="needCenter">
                <el-input-number
                  :min="1"
                  :max="scope.row.stockQuantity"
                  v-model="scope.row.quantity"
                  input-style="text-align: left;"
                  controls-position="right"
                  :controls="false"
                  size="small"
                  :disabled="scope.row.expName == ''"
                  @focus="QueryFocus($event)"
                  @change="changeQuantityRow(scope.row)"
                  style="width: 100% !important"
                /> </section
              ><section v-else-if="col.prop == 'remark'" class="needCenter">
                <el-input
                  v-model="scope.row.remark"
                  placeholder="备注"
                  type="text"
                  size="small"
                  style="width: 100%"
                  :disabled="scope.row.expName == ''"
                  @change="changeRow(scope.row)"
                /> </section
              ><section v-else-if="col.prop == 'status'" class="needCenter">
                {{
                  scope.row.status == 0
                    ? '未发放'
                    : scope.row.status == '1'
                    ? '部分发放'
                    : scope.row.status == '2'
                    ? '全部发放'
                    : ''
                }}
              </section></template
            > </el-table-column
          ><el-table-column label="操作" align="center" fixed="right" width="60px">
            <template #default="scope">
              <el-button
                link
                type="danger"
                @click="delAddItem(scope.row, scope.$index)"
                class="delbutton"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div></Dialog
    >
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  queryExpProvideApplication,
  queryExpCurrdept,
  saveExpProvideApplication,
  getSystemDateTime
} from '@/api/login/index'
import { formatDate } from '@/utils/formatTime'
import { useUserStore } from '@/store/modules/user'
import { getDictByConfig } from '@/api/outpatient/unitDict/index'
import { accAdd, accMul } from '@/utils/index'
import { ElTable, ElMessageBox, ElMessage } from 'element-plus'
const message = useMessage() // 消息弹窗
const editList = ref<any>([])
const itemTableRef = ref<InstanceType<typeof ElTable>>()
const curItemIndex = ref<number>(0)
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUser)
const router = useRouter()
const patientLists = ref<any>([])
const currentDeptCode = ref('')
const itemList = ref<any>([])
const deptList = ref<any>([])
const showMask = ref(false)
const showEditItem = ref(false)
const keyWord = ref('')
const startDate = ref('')
const endDate = ref('')
const searchExpName = ref('')
const itemColumnList = reactive([
  { prop: 'expName', label: '名称', width: '260px', align: 'left' },
  { prop: 'expSpec', label: '规格', width: '140px', align: 'left' },
  { prop: 'units', label: '单位', width: '70px', align: 'center' },
  { prop: 'purchasePrice', label: '价格', width: '90px', align: 'center' },
  { prop: 'quantity', label: '数量', width: '90px', align: 'center' },
  { prop: 'packageSpec', label: '包装规格', width: '100px', align: 'left' },
  { prop: 'packageUnits', label: '包装单位', width: '90px', align: 'left' },
  { prop: 'firmId', label: '厂家', width: '120px', align: 'left' },
  { prop: 'expireDate', label: '有效期', width: '120px', align: 'left' },
  { prop: 'batchNo', label: '批号', width: '100px', align: 'left' },
  { prop: 'producedate', label: '生产日期', width: '120px', align: 'left' },
  { prop: 'storage', label: '库房', width: '90px', align: 'left' },
  { prop: 'inputCode', label: '输入码', width: '120px', align: 'left' }
])
const pagination = ref({
  currentPage: 1,
  pageSize: 100,
  total: 0
})
onMounted(async () => {
  let res = await getSystemDateTime()
  endDate.value = formatDate(res, 'YYYY-MM-DD')
  startDate.value = formatDate(
    new Date(new Date(endDate.value).getTime() - 24 * 60 * 60 * 1000 * 7),
    'YYYY-MM-DD'
  )
  await searchExpcurrpept()
  await getList()
})
const getList = async () => {
  let res = await queryExpProvideApplication({
    pageNo: pagination.value.currentPage,
    pageSize: pagination.value.pageSize,
    applicantNo: '',
    provideStorage: currentDeptCode.value,
    applicantDept: userInfo.value.hisDeptCode,
    expName: searchExpName.value,
    startDate: startDate.value,
    endDate: endDate.value
  })
  patientLists.value = res.records
  pagination.value.total = res.total
}
const searchExpcurrpept = async () => {
  deptList.value = await getDictByConfig({ dictType: '消耗品库房科室' })
}
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val
  getList()
}

const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val
  getList()
}

const handleQueryItem = async () => {
  const list =
    (await getDictByConfig({
      keyWord: keyWord.value.replaceAll(' ', ''),
      dictType: '消耗品申请',
      cons: `STORAGE:${applyDeptCode.value};`,
      counts: 50
    })) || []
  itemList.value = list
}

const QueryFocus = (event) => {
  event.currentTarget.select()
}
const changeRow = async (row) => {
  if (row && !editList.value.find((item) => item.tmpId === row.tmpId)) {
    editList.value.push(row)
  }
}
const itemNameRef = ref()
const queryInput = ref()
let curTarget = reactive({
  // 当前目标信息
  rowIdx: '', // 行下标
  colIdx: '', // 列下标
  val: null, // 单元格内容/列名
  isHead: false, // 当前目标是表头？
  itemNo: '' //当前一行的序号
})
const newItemNameChange = (index: number) => {
  curTarget.rowIdx = String(index)
  showEditItem.value = true
  showMask.value = true
  handleQueryItem()
  nextTick(() => {
    queryInput.value.focus()
  })
}
const cellclickItem = async (row: any) => {
  let isSame = false
  addTableList.value.forEach((item: any) => {
    if (
      item.expCode == row.expCode &&
      item.packageSpec == row.packageSpec &&
      item.packageUnits == row.packageUnits &&
      item.firmId == row.firmId
    ) {
      isSame = true
    }
  })
  if (isSame) {
    message.notifyError(row.expName + '已经添加，如需继续添加请修改数量')
    return false
  }
  addTableList.value[Number(curTarget.rowIdx)]['expCode'] = row.expCode
  addTableList.value[Number(curTarget.rowIdx)]['expName'] = row.expName
  addTableList.value[Number(curTarget.rowIdx)]['units'] = row.units
  addTableList.value[Number(curTarget.rowIdx)]['expSpec'] = row.expSpec
  addTableList.value[Number(curTarget.rowIdx)]['packageSpec'] = row.packageSpec
  addTableList.value[Number(curTarget.rowIdx)]['batchNo'] = row.batchNo
  addTableList.value[Number(curTarget.rowIdx)]['packageUnits'] = row.packageUnits
  addTableList.value[Number(curTarget.rowIdx)]['firmId'] = row.firmId
  addTableList.value[Number(curTarget.rowIdx)]['quantity'] = 1
  addTableList.value[Number(curTarget.rowIdx)]['stockQuantity'] = row.quantity
  addTableList.value[Number(curTarget.rowIdx)]['retailPrice'] = row.purchasePrice
  addTableList.value[Number(curTarget.rowIdx)]['purchasePrice'] = row.purchasePrice
  addTableList.value[Number(curTarget.rowIdx)]['provideStorage'] = applyDeptCode.value
  addTableList.value[Number(curTarget.rowIdx)].costs = row.purchasePrice
    ? accMul(addTableList.value[Number(curTarget.rowIdx)]['quantity'], row.purchasePrice)
    : 0
  addTableList.value[Number(curTarget.rowIdx)].charges = row.purchasePrice
    ? accMul(addTableList.value[Number(curTarget.rowIdx)]['quantity'], row.purchasePrice)
    : 0
  changeRow(addTableList.value[Number(curTarget.rowIdx)])
  hideMaskPre()
  addNewList()
  onScrollBottom()
}
const onScrollBottom = () => {
  nextTick(() => {
    addTableList.value?.setScrollTop(
      (addTableList.value?.$refs.tableBody as HTMLTableElement).scrollHeight
    )
  })
}
const delItem = async (row) => {
  ElMessageBox.confirm(`确认删除该申请记录？`, '操作', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await saveExpProvideApplication([
        {
          ...row,
          operFlag: '3'
        }
      ])
      ElMessage.success('删除成功')
      getList()
    })
    .catch((error) => {})
}
const editItem = async (row) => {
  operatorType.value = 'edit'
  addTableList.value = []
  editList.value = []
  let res = await queryExpProvideApplication({
    pageNo: 1,
    pageSize: 200,
    applicantNo: row.applicantNo,
    applicantDept: userInfo.value.hisDeptCode
  })
  if (res.records && res.records.length > 0) {
    res.records.forEach((item, index) => {
      item.operFlag = '2'
      item.tmpId = item.applicantNo + (index + 1)
      addTableList.value.push(item)
    })
    applyDeptCode.value = addTableList.value[0].provideStorage
    applyVisiable.value = true
  }
}
const setCurrent = (row) => {
  itemTableRef.value?.setCurrentRow(row)
}
// 监听键盘上下事件
document.addEventListener('keyup', function (e) {
  //项目上下键回车
  if (showEditItem.value) {
    // 下箭头事件项目
    if (e.key === 'ArrowDown') {
      if (itemList.value.length === 0) return
      // 如果是最后一条数据不让往下走
      if (curItemIndex.value === itemList.value.length - 1) return
      // 如果当前选中的是0就选中第一条
      curItemIndex.value++
      setCurrent(itemList.value[curItemIndex.value])
      // 10个一组 超过10个位置变化
      if (curItemIndex.value % 10 == 0) {
        itemTableRef.value?.scrollTo({ top: 28 * curItemIndex.value }, 300)
      }
    }
    // 上箭头事件
    if (e.key === 'ArrowUp') {
      // 第一条不让按上箭头
      if (itemList.value.length === 0 || curItemIndex.value === 0) return
      curItemIndex.value--
      setCurrent(itemList.value[curItemIndex.value])
      // 10个一组 超过10个位置变化
      if (curItemIndex.value == 9) {
        itemTableRef.value?.scrollTo({ top: 0 }, 300)
        return
      }
      // 逢9需要改一下位置
      if (curItemIndex.value % 10 == 9) {
        itemTableRef.value?.scrollTo({ top: 28 * curItemIndex.value - 252 }, 300)
      }
    }
    // 回车跟空格事件确认
    if (e.key === 'Enter') {
      if (itemList.value.length === 0) return
      // 确认
      cellclickItem(itemList.value[curItemIndex.value])
      // 确认过清空
      keyWord.value = ''
      itemList.value = []
      curItemIndex.value = 0
      itemTableRef.value?.scrollTo({ top: 0 }, 300)
    }
  }
})

// 鼠标f9事件 必须要选择药品框
document.onkeydown = function (e) {
  // 判断有没有药品框被选中
  let isChose: any = document.activeElement
  if (isChose && isChose.name == 'choseItemName') {
    if (
      isChose &&
      isChose.name == 'choseItemName' &&
      isChose.tagName === 'INPUT' &&
      e.key === 'F9'
    ) {
      showEditItem.value = true
      showMask.value = true
      queryInput.value.focus()
      handleQueryItem() // 项目名称
      keyWord.value = ''
      itemTableRef.value?.scrollTo({ top: 0 }, 300)
    }
  }
  // esc事件
  if (showEditItem.value && e.key === 'Escape') {
    // 清空当前选中的输入框
    addTableList.value[Number(curTarget.rowIdx)].itemName = ''
    hideMaskPre()
    keyWord.value = ''
    itemList.value = []
    itemTableRef.value?.scrollTo({ top: 0 }, 300)
  }
}
const hideMaskPre = () => {
  showEditItem.value = false
  showMask.value = false
}
const columnList = reactive([
  { prop: 'expCode', label: '代码', width: '120px' },
  { prop: 'expName', label: '名称', width: '240px' },
  { prop: 'quantity', label: '数量', width: '100px' },
  { prop: 'expSpec', label: '规格', width: '120px' },
  { prop: 'units', label: '单位', width: '54px' },
  { prop: 'retailPrice', label: '零售价', width: '84px' },
  { prop: 'firmId', label: '生产厂商', width: '' },
  { prop: 'stockQuantity', label: '库存量', width: '90px' },
  // { prop: 'status', label: '单据状态', width: '84px' },
  { prop: 'remark', label: '备注', width: '150px' }
])
const applyVisiable = ref(false)
const operatorType = ref('')
const addTableList = ref<any>([])
const applyDeptCode = ref('')
const outpApplyDeptCode = ref('')
const addItem = async () => {
  operatorType.value = 'add'
  addTableList.value = []
  editList.value = []
  if (currentDeptCode.value) {
    applyDeptCode.value = currentDeptCode.value
    addNewList()
  } else {
    applyDeptCode.value = ''
  }
  applyVisiable.value = true
}
const addNewList = async () => {
  if (!applyDeptCode.value) {
    ElMessage.warning('请先选择发放库房')
    return false
  }
  addTableList.value.push({
    operFlag: '1',
    applicantNo:
      addTableList.value.length == 0
        ? ''
        : addTableList.value[addTableList.value.length - 1].applicantNo,
    itemNo:
      addTableList.value.length == 0
        ? 1
        : addTableList.value[addTableList.value.length - 1].itemNo + 1,
    tmpId: Date.now().toString(),
    applicantDept: userInfo.value.hisDeptCode,
    provideStorage: '',
    expCode: '',
    expSpec: '',
    units: '',
    batchNo: '',
    firmId: '',
    packageSpec: '',
    packageUnits: '',
    stockQuantity: 1,
    retailPrice: 0,
    quantity: 1,
    remark: ''
  })
}
const delAddItem = async (row, index) => {
  if (row.operFlag == '1') {
    const vIndex = editList.value.findIndex((v) => v.tmpId === row.tmpId)
    editList.value.splice(vIndex, 1)
  } else {
    row.operFlag = '3'
    const vIndex = editList.value.findIndex((v) => v.tmpId === row.tmpId)
    if (vIndex < 0) {
      changeRow(row)
    } else {
      editList.value[vIndex].operFlag = '3'
    }
  }
  addTableList.value.splice(index, 1)
}
const saveNewList = async () => {
  if (editList.value && editList.value.length > 0) {
    await saveExpProvideApplication(editList.value)
    ElMessage.success('保存成功')
    editList.value = []
    applyVisiable.value = false
    getList()
  } else {
    ElMessage.warning('没有可保存的数据')
    return
  }
}
const changeQuantityRow = async (row) => {
  if (Number(row.quantity) > 0 && Number(row.retailPrice) > 0) {
    let val = Number(row.quantity) * Number(row.retailPrice)
    row.costs = val.toFixed(2)
    row.charges = val.toFixed(2)
  }
  changeRow(row)
}
const spanMethod = ({ row, column, rowIndex }) => {
  const fields = ['applicantNo']
  // 当前行的数据
  const cellValue = row[column.property]
  // 判断只合并定义字段的列数据
  if (cellValue && fields.includes(column.property)) {
    const prevRow = patientLists.value[rowIndex - 1] //上一行数据
    let nextRow = patientLists.value[rowIndex + 1] //下一行数据
    // 当上一行的数据等于当前行数据时，当前行单元格隐藏
    if (prevRow && prevRow[column.property] === cellValue) {
      return { rowspan: 0, colspan: 0 }
    } else {
      // 反之，则循环判断若下一行数据等于当前行数据，则当前行开始进行合并单元格
      let countRowspan = 1 //用于合并计数多少单元格
      while (nextRow && nextRow[column.property] === cellValue) {
        nextRow = patientLists.value[++countRowspan + rowIndex]
      }
      if (countRowspan > 1) {
        return { rowspan: countRowspan, colspan: 1 }
      }
    }
  }
}
const changeApplyDeptCode = async () => {
  if (applyDeptCode.value) {
    handleQueryItem()
    if (editList.value && editList.value.length > 0) {
      ElMessageBox.confirm(`存在未保存的数据，切换库房数据将会被清空，是否确认切换？`, '操作', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(async () => {
          addTableList.value = []
          editList.value = []
        })
        .catch((error) => {})
    }
  }
}
</script>
<style scoped lang="scss">
.content-container {
  font-size: 14px;
  background-color: #fff;
  height: calc(100vh - 54px);
  overflow: hidden;
}
.tab > p {
  font-size: 16px;
  height: 22px;
  color: #000;
  position: relative;
  width: 70px;
  text-align: center;
  margin-bottom: 12px;
  cursor: pointer;
}
.examTitle::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 70px;
  height: 2px;
  background-color: #3473d1;
}
.examTitle2 {
  width: 146px;
}
.examTitle2::after {
  width: 146px;
}
.examTitle-header {
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  span {
    color: #3473d1;
    position: relative;
    top: 6px;
  }
}
.back-left {
  width: 460px;
  height: calc(100vh - 124px) !important;
  position: relative;
  padding-right: 24px;
  &::after {
    content: '';
    position: absolute;
    right: 12px;
    top: 0;
    width: 2px;
    height: 100%;
    background: #f8f8f8;
  }
}
.back-right {
  width: 980px;
  height: 580px !important;
  position: relative;
}
.table-checked-row-style {
  background: #eaeffc;
  color: #3473d1 !important;
}
.info-name {
  font-size: 16px;
  color: #000;
}
.title {
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 6px;
}
:deep(.back-right .el-checkbox__label) {
  font-size: 16px;
  color: #3473d1 !important;
}
#editItem {
  position: fixed;
  top: 50%;
  left: 66%;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 515px;
  z-index: 10000;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  .editItem-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    background: #fff;
    z-index: 2000001;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    cursor: pointer;
    color: #909399;
  }
}
.mask1 {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10001;
  background-color: transparent;
}
.editItemQuery {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 45px;
  line-height: 45px;
  border-radius: 3px 3px 0 0;
  font-size: 14px;
  .queryDes {
    color: #f33d21;
    margin-left: 10px;
  }

  .queryDes1 {
    margin-right: 8px;
  }

  .queryInput {
    width: 200px;
    margin: 0px 8px;
  }
}
// 取消input的上下箭头
:deep(input[type='number']) {
  appearance: textfield;
  -moz-appearance: textfield;
}
:deep(input[type='number']::-webkit-inner-spin-button),
:deep(input[type='number']::-webkit-outer-spin-button) {
  -webkit-appearance: none;
}
/* 去掉input尾部上下小箭头 end */
:deep(.el-table) .hideRow {
  display: none !important;
}
:deep(.el-input-number--small) {
  width: 64px !important;
}
</style>
