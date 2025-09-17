<template>
  <div class="public-visits">
    <div class="public-visits-left">
      <div class="flex mb-10px">
        <p style="position: relative; top: 3px">选择“门诊医生”组</p>
      </div>
      <el-table
        class="itemTable"
        :header-cell-style="{
          background: '#f7f8fcff',
          color: '#000',
          fontWeight: 'normal'
        }"
        :data="deptDatas"
        @row-click="deptSearchDoctor"
        :row-class-name="setRowClassName1"
        highlight-current-row
        border
        style="width: 100%; height: 350px"
        ><el-table-column :resizable="false" label="组名" prop="groupName" show-overflow-tooltip />
        <el-table-column :resizable="false" label="组代码" prop="groupCode" width="180"
      /></el-table>
      <div class="flex mt-10px mb-10px">
        <p style="position: relative; top: 3px">选择医生</p>
      </div>
      <el-table
        class="itemTable"
        :header-cell-style="{
          background: '#f7f8fcff',
          color: '#000',
          fontWeight: 'normal'
        }"
        :data="doctorDatas"
        @row-click="doctorSearchWork"
        :row-class-name="setRowClassName2"
        highlight-current-row
        border
        style="width: 100%; height: calc(100vh - 554px)"
        ><el-table-column
          :resizable="false"
          label="姓名"
          prop="name"
          width="120"
          show-overflow-tooltip />
        <el-table-column :resizable="false" label="编号" prop="empNo" width="120" /><el-table-column
          :resizable="false"
          label="科室"
          prop="deptName"
          show-overflow-tooltip
      /></el-table>
    </div>
    <div class="public-visits-right">
      <p style="position: relative; top: 3px; margin-bottom: 12px">出诊安排：</p>
      <el-table
        class="itemTable"
        :header-cell-style="{
          background: '#f7f8fcff',
          color: '#000',
          fontWeight: 'normal'
        }"
        :data="selectDoctorDatas"
        border
        style="width: 1300px; height: calc(100% - 100px)"
      >
        <el-table-column
          :resizable="false"
          label="就诊科室"
          prop="clinicDept"
          show-overflow-tooltip
          width="120"
          align="center"
        />
        <el-table-column
          :resizable="false"
          label="医生编号"
          prop="doctorNo"
          show-overflow-tooltip
          width="110"
          align="center"
        />
        <el-table-column
          :resizable="false"
          label="医生姓名"
          prop="doctor"
          show-overflow-tooltip
          width="120"
          align="center"
        />
        <el-table-column
          :resizable="false"
          label="出诊时间"
          prop="dayOfWeek"
          show-overflow-tooltip
          width="120"
          ><template #default="scope">
            <el-select
              v-model="scope.row.dayOfWeek"
              placeholder="请选择"
              clearable
              class="!w-94px"
              size="small"
            >
              <el-option label="星期一" value="1" />
              <el-option label="星期二" value="2" />
              <el-option label="星期三" value="3" />
              <el-option label="星期四" value="4" />
              <el-option label="星期五" value="5" />
              <el-option label="星期六" value="6" />
              <el-option label="星期日" value="7" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="出诊时段"
          prop="clinicDuration"
          show-overflow-tooltip
          width="120"
          ><template #default="scope">
            <el-select
              v-model="scope.row.clinicDuration"
              placeholder="请选择应用程序"
              clearable
              size="small"
              @change="changeVistitId(scope.row)"
              class="!w-94px"
            >
              <el-option
                v-for="item in workDateTIme"
                :key="item.serialNo"
                :label="item.timeIntervalName"
                :value="item.timeIntervalName"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="出诊队列"
          prop="queueName"
          show-overflow-tooltip
          width="200"
          ><template #default="scope">
            <el-select
              v-model="scope.row.queueName"
              placeholder="请选择号别"
              clearable
              size="small"
              class="!w-174px"
              filterable
              @change="changeQueueName(scope.row)"
            >
              <el-option
                v-for="(item, index) in categoryDate"
                :key="index"
                :label="item.clinicLabel"
                :value="item.clinicLabel"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="号别"
          prop="clinicLabel"
          show-overflow-tooltip
          width="200"
          ><template #default="scope">
            <el-select
              v-model="scope.row.clinicLabel"
              placeholder="请选择号别"
              clearable
              size="small"
              class="!w-174px"
            >
              <el-option
                v-for="(item, index) in categoryDate"
                :key="index"
                :label="item.clinicLabel"
                :value="item.clinicLabel"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          label="分诊台号"
          prop="counselNo"
          show-overflow-tooltip
          width="120"
        />
        <!-- <template #default="scope">
            <el-input
              v-model="scope.row.counselNo"
              placeholder="请输入"
              style="width: 94px"
              maxlength="20"
              size="small"
              @focus="QueryFocus($event)"
              type="text"
              clearable
            />
          </template>
        </el-table-column> -->
        <el-table-column
          :resizable="false"
          label="是否自动分诊"
          prop="autoAssignPatient"
          show-overflow-tooltip
          width="120"
        />
        <!-- <template #default="scope">
            <el-input
              v-model="scope.row.autoAssignPatient"
              placeholder="请输入"
              style="width: 94px"
              maxlength="20"
              size="small"
              @focus="QueryFocus($event)"
              type="text"
              clearable
            />
          </template>
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="70">
          <template #default="scope">
            <el-button
              type="text"
              style="color: rgb(243, 61, 33)"
              @click="deleteRow(scope.row, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="footer flexBox mt-15px">
        <el-button type="primary" class="createTreat" @click.stop="addRow()">新增</el-button>
        <!-- <el-button type="primary" class="createTreat" @click.stop="">修改</el-button> -->
        <!-- <el-button type="primary" class="createTreat" @click.stop="">删除</el-button> -->
        <el-button type="primary" class="createTreat" @click.stop="saveData">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="dictService">
import {
  queryExistStaffVsGroup,
  queryDoctorSchedule,
  getDictByConfig,
  saveDoctorSchedule
} from '@/api/system/publicDictionary/index'
const message = useMessage() // 消息弹窗
const deptDatas = ref<any>([])
const doctorDatas = ref<any>([])
const checkedGroupCode = ref('')
const checkedDoctorCode = ref('')
const checkedDoctorName = ref('')
const selectDoctorDatas = ref<any>([])
const workDateTIme = ref<any>([])
const categoryDate = ref<any>([])
onMounted(async () => {
  deptDatas.value = await getDictByConfig({
    dictType: '核算组',
    cons: 'group_class:门诊医生'
  })
  if (deptDatas.value.length > 0) {
    deptSearchDoctor(deptDatas.value[0])
  } else {
    doctorDatas.value = []
    checkedGroupCode.value = ''
    selectDoctorDatas.value = []
    checkedDoctorCode.value = ''
    checkedDoctorName.value = ''
  }
  workDateTIme.value = await getDictByConfig({
    dictType: '时间段字典'
  })
  categoryDate.value = await getDictByConfig({
    dictType: '门诊号别定义'
  })
})
const deptSearchDoctor = async (row) => {
  checkedGroupCode.value = row.groupCode
  doctorDatas.value = await queryExistStaffVsGroup({
    groupCode: row.groupCode,
    groupClass: '门诊医生'
  })
  if (doctorDatas.value.length > 0) {
    doctorSearchWork(doctorDatas.value[0])
  } else {
    selectDoctorDatas.value = []
    checkedDoctorCode.value = ''
    checkedDoctorName.value = ''
  }
}
const doctorSearchWork = async (row) => {
  checkedDoctorCode.value = row.empNo
  checkedDoctorName.value = row.name
  selectDoctorDatas.value = await queryDoctorSchedule({
    deptCode: row.groupCode,
    doctorName: row.name
  })
  getItemNo(selectDoctorDatas.value)
}
const addRow = async () => {
  let obj = {
    itemNo: selectDoctorDatas.value.length + 1,
    clinicDept: checkedGroupCode.value,
    doctor: checkedDoctorName.value,
    dayOfWeek: '',
    clinicDuration: '',
    queueName: '',
    counselNo: '',
    doctorNo: checkedDoctorCode.value,
    autoAssignPatient: '',
    clinicLabel: '',
    appointmentLimits: null,
    appointmentNum: null,
    currentVistitId: ''
  }
  selectDoctorDatas.value.push(obj)
}
const changeQueueName = async (row) => {
  if (!row.clinicLabel) {
    row.clinicLabel = row.queueName
  }
}
const changeVistitId = async (row) => {
  row.currentVistitId = getCardId(row.clinicDept, row.doctorNo, row.dayOfWeek, row.clinicDuration)
}
const saveData = async () => {
  let lock = false
  //if (selectDoctorDatas.value.length > 0) {
  const paramsArr = ref<any>([])
  paramsArr.value = JSON.parse(JSON.stringify(selectDoctorDatas.value))
  if (paramsArr.value.length > 0) {
    paramsArr.value.some((item, index) => {
      if (!item.dayOfWeek) {
        ElMessage.warning('第' + (index + 1) + '行出诊时间未选择')
        lock = true
        return true
      }
      if (!item.clinicDuration) {
        ElMessage.warning('第' + (index + 1) + '行出诊时段未选择')
        lock = true
        return true
      }
      if (!item.clinicLabel) {
        ElMessage.warning('第' + (index + 1) + '行号别未选择')
        lock = true
        return true
      }
    })
    paramsArr.value.forEach((item, index) => {
      item.row_index = index
      item.dayOfWeek = Number(item.dayOfWeek)
      item.currentVistitId = getCardId(
        item.clinicDept,
        item.doctorNo,
        item.dayOfWeek,
        item.clinicDuration
      )
    })
    const duplicates = objectsWithDuplicateIds(paramsArr.value)
    console.log(duplicates)
    if (JSON.stringify(duplicates) === '{}') {
    } else {
      message.warning('出诊时间和出诊时段不能有重复')
      return false
    }
  }
  if (!lock) {
    await saveDoctorSchedule({
      clinicDept: checkedGroupCode.value,
      doctor: checkedDoctorName.value,
      reqVOList: paramsArr.value
    })
    message.notifySuccess('操作成功')
    selectDoctorDatas.value = await queryDoctorSchedule({
      deptCode: checkedGroupCode.value,
      doctorName: checkedDoctorName.value
    })
    getItemNo(selectDoctorDatas.value)
  }
  //}
}
const deleteRow = async (row, index: number) => {
  selectDoctorDatas.value.splice(index, 1)
}
const QueryFocus = (event) => {
  event.currentTarget.select()
}
const setRowClassName1 = ({ row }) => {
  if (row.groupCode === checkedGroupCode.value) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const setRowClassName2 = ({ row }) => {
  if (row.empNo === checkedDoctorCode.value) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const getItemNo = async (arr) => {
  arr.forEach((item, index) => {
    item.itemNo = index + 1
    item.row_index = index
    item.dayOfWeek = String(item.dayOfWeek)
    item.currentVistitId = getCardId(
      item.clinicDept,
      item.doctorNo,
      item.dayOfWeek,
      item.clinicDuration
    )
  })
  return arr
}
const getCardId = (clinicDept, doctorNo, dayOfWeek, clinicDuration) => {
  return `${clinicDept}${doctorNo}${dayOfWeek}${clinicDuration}`
}
const objectsWithDuplicateIds = (array) => {
  const idMap = array.reduce((map, obj) => {
    const id = obj.currentVistitId
    map[id] = map[id] || []
    map[id].push(obj)
    return map
  }, {})

  return Object.entries(idMap)
    .filter(([key, value]) => value.length > 1)
    .reduce((result, [key, value]) => {
      result[key] = value
      return result
    }, {})
}
</script>
<style scoped lang="scss">
.public-visits {
  width: 100%;
  height: calc(100vh - 54px);
  padding-top: 40px;
  overflow: hidden;
  font-size: 14px;
  display: flex;
  .public-visits-left {
    width: 400px;
    height: 100%;
    background: #fff;
    padding: 12px;
  }
  .public-visits-right {
    width: calc(100% - 414px);
    height: 100%;
    background: #fff;
    margin-left: 6px;
    padding: 12px;
  }
}
.table-checked-row-style {
  background: #eaeffc;
  color: #3473d1 !important;
}
</style>
