<template>
  <div class="base-setting">
    <el-row style="height: 100%">
      <el-col :span="12" class="pr-4px" style="height: calc(100% - 54px)">
        <div class="base-box">
          <!-- <div class="base-title">医生列表</div> -->
          <div class="base-cont">
            <span class="cont-span">数据库用户：</span>
            <el-select
              v-model="formInfo.dbUser"
              placeholder="请选择用户"
              style="width: 20%"
              class="select-item"
              clearable
              filterable
              @change="dbUserChange"
            >
              <el-option
                v-for="item in dbDoctorList"
                :key="item.dbUser"
                :label="item.userName + '--' + item.dbUser"
                :value="item.dbUser"
              />
            </el-select>
            <!-- <el-input
              style="width: 18%"
              v-model="formInfo.dbUser"
              placeholder="请输入"
              class="select-item"
            /> -->
            <span class="cont-span">姓名：</span>
            <el-input
              style="width: 18%"
              v-model="formInfo.userName"
              placeholder="请输入"
              class="select-item"
            />
            <span class="cont-span">性别：</span>
            <el-select
              v-model="formInfo.sex"
              placeholder="请选择性别"
              style="width: 18%"
              class="select-item"
              clearable
            >
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
              <el-option label="未知" value="未知" />
              <el-option label="未定" value="未定" />
            </el-select>
          </div>
          <div class="base-cont">
            <span class="cont-span">体检科室：</span>
            <el-select
              v-model="formInfo.peDeptCode"
              placeholder="请选择"
              style="width: 18%"
              class="select-item"
              filterable
              clearable
              default-first-option
              @change="peDeptChange"
            >
              <el-option
                v-for="item in peDeptList"
                :label="item.peDeptName"
                :value="item.peDeptCode"
                :key="item.peDeptCode"
              />
            </el-select>
            <span class="cont-span">体检权限：</span>
            <el-select
              v-model="formInfo.peRole"
              placeholder="请选择"
              style="width: 18%"
              class="select-item"
              filterable
              clearable
              default-first-option
            >
              <el-option label="分科医生" value="1" />
              <el-option label="全科结果录入" value="2" />
              <el-option label="分科结果审核" value="5" />
              <el-option label="主检初步审核" value="7" />
              <el-option label="主检最终审核" value="9" />
            </el-select>
            <span class="cont-span" style="width: 5%"></span>
            <el-button type="primary" @click="addPeDoctor">新增</el-button>
            <el-button type="primary" @click="savePeUserMenu">保存</el-button>
            <!-- <el-button class="resetBtn" @click="handleSaveDocument">新增用户</el-button> -->
            <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button> -->
            <!-- <el-button type="primary" @click="handleSaveDocument">保存</el-button> -->
          </div>
        </div>

        <!-- 表格 -->
        <div class="mt-4px table-container" style="padding: 10px; background-color: #fff">
          <!-- 对表格添加 redio-button 查询条件 -->

          <div style="margin-top: 0px; margin-bottom: 8px; height: 32px; line-height: 32px">
            <el-radio-group v-model="userFlag" @change="handleRadioChange">
              <el-radio :label="0">可用用户</el-radio>
              <el-radio :label="1">删除用户</el-radio>
            </el-radio-group>
            <el-button class="ml-15px" v-if="userFlag == 1" type="primary" @click="restorePeDoctor">
              恢复
            </el-button>
          </div>
          <el-table
            ref="adviceTableRef"
            :data="doctorList"
            border
            :row-class-name="setAdviceRowClass"
            style="width: 100%; height: calc(100vh - 268px)"
            highlight-current-row
            stripe
            size="small"
            @row-click="handleDeptItem"
          >
            <el-table-column
              v-for="item in addColumns"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
            >
              <template #default="{ row }" v-if="item.prop !== 'peRole'">
                {{ row[item.prop] }}
              </template>

              <template #default="{ row }" v-else>
                <span>{{
                  row.peRole == 1
                    ? '分科医生'
                    : row.peRole == 2
                    ? '全科结果录入'
                    : row.peRole == '5'
                    ? '分科结果审核'
                    : row.peRole == 7
                    ? '主检初步审核'
                    : row.peRole == 9
                    ? '主检最终审核'
                    : ''
                }}</span>
                <!-- {{ peDocPermList.find((perm) => perm.value === row.peRole)?.label || '未知' }} -->
              </template>
            </el-table-column>
            <!-- peRole 列 ，1、2、4、7、9分别对应 peDocPermList中的数据-->

            <!-- 添加一个操作列 功能：删除 -->
            <el-table-column label="操作" width="100" align="center">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  style="color: red"
                  @click="delPeDoctor(scope.row)"
                >
                  删除
                </el-button>
                <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="base-box" style="height: 100%">
          <!-- <div class="base-title">科室选择</div> -->

          <div class="con">
            <div style="width: 48%; height: 100%; margin-right: 8px">
              <div class="base-title1"
                >可选

                <el-input style="width: 88%" v-model="leftFilter" placeholder="输入科室" />
              </div>
              <div
                style="
                  width: 100%;
                  height: calc(100vh - 154px);
                  overflow: auto;
                  box-sizing: border-box;
                  border: 1px #cccccc solid;
                  border-radius: 4px;
                  display: flex;
                  flex-direction: column;
                  flex-wrap: wrap;
                  gap: 5px;
                  padding: 5px;
                "
                class="mt-4px"
              >
                <!-- 每个 item 高度为 30px -->
                <div
                  style="
                    display: grid;
                    grid-template-columns: repeat(2, 40%);
                    gap: 5px;
                    padding: 5px;
                    overflow-y: auto;
                    width: 100%;
                  "
                >
                  <div
                    v-for="item in filteredLeftData"
                    :key="item.peDeptCode"
                    style="height: 30px; display: flex; align-items: center; overflow: hidden"
                  >
                    <el-checkbox v-model="unSelect" :label="item.peDeptCode">
                      {{ item.peDeptName }}
                    </el-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 50%; height: 100%">
              <div class="base-title1"
                >已选

                <el-input style="width: 88%" v-model="rightFilter" placeholder="输入科室" />
              </div>
              <div
                style="
                  width: 100%;
                  height: calc(100vh - 154px);
                  overflow: auto;
                  box-sizing: border-box;
                  border: 1px #cccccc solid;
                  border-radius: 4px;
                  display: flex;
                  flex-direction: column;
                  flex-wrap: wrap;
                  gap: 5px;
                  padding: 5px;
                "
                class="mt-4px"
              >
                <!-- 每个 item 高度为 30px -->
                <div
                  style="
                    display: grid;
                    grid-template-columns: repeat(2, 40%);
                    gap: 5px;
                    padding: 5px;
                    overflow-y: auto;
                  "
                >
                  <div
                    v-for="item in filteredRightData"
                    :key="item.peDeptCode"
                    style="height: 30px; display: flex; align-items: center; overflow: hidden"
                  >
                    <el-checkbox v-model="selected" :label="item.peDeptCode">
                      {{ item.peDeptName }}
                    </el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as Api from '@/api/systemSetting/staffSettings/index'
import { ElMessage } from 'element-plus'
import { queryDictByConfig } from '@/api/system/deptManage'
import { add } from 'lodash-es'
import { el } from 'element-plus/es/locale'

// ===================== 响应式数据 =====================
const userFlag = ref(0)
const dbDoctorList = ref([])
const doctorList = ref([])
const addColumns = [
  { prop: 'dbUser', label: '数据用户名', align: 'center' },
  { prop: 'userName', label: '姓名', align: 'center', width: '180px' },
  { prop: 'sex', label: '性别', align: 'center' },
  { prop: 'peDeptName', label: '科室名称', align: 'center', width: '130px' },
  { prop: 'peRole', label: '权限', align: 'center' }
]
const formInfo = ref({
  dbUser: '',
  userName: '',
  sex: '',
  peDeptCode: '',
  peDeptName: '',
  peRole: 0,
  billDis: 0,
  delFlag: 0
})
const dbUser = ref('')
const peDocPermList = ref([])
const dbUserChange = (val) => {
  let userNameList = dbDoctorList.value.filter((item) => item.dbUser == val)
  if (userNameList && userNameList.length > 0) {
    formInfo.value.userName = userNameList[0].userName
  } else {
    formInfo.value.userName = ''
  }
}
// ===================== 方法 =========================
// 获取医生列表
const getPeDoctorList = async (delFlag = 0) => {
  await Api.getPeDoctorList({
    delFlag: delFlag
  }).then((res) => {
    if (res.length > 0) {
      // 遍历res把peRole字段转化为string
      res.forEach((item) => {
        item.peRole = item.peRole.toString()
      })
      res.sort((a, b) => {
        return a.dbUser.localeCompare(b.dbUser)
      })
      dbUser.value = String(Number(res[res.length - 1].dbUser) + 1)
      dbUser.value = dbUser.value.padStart(4, '0')
      doctorList.value = res
      handleDeptItem(res[0])
    }
  })
}

// 切换用户类型
const handleRadioChange = (val) => {
  userFlag.value = val
  getPeDoctorList(val)
}

// 获取权限
const handleDeptItem = (row) => {
  formInfo.value = row
  addFlag.value = false
  getToSelectDept(row)
  getSelectedDept(row)
}
// 体检医生待选科室
const getToSelectDept = async (val) => {
  await Api.getToSelectDept({
    dbUser: val.dbUser
  }).then((res) => {
    allDataUnselect.value = res || []
  })
}

// 体检医生已选科室
const getSelectedDept = async (val) => {
  await Api.getSelectedDept({
    dbUser: val.dbUser
  }).then((res) => {
    allDataSelected.value = res || []
  })
}

const allDataUnselect = ref([]) // 可选项目列表
const allDataSelected = ref([]) // 已选项目列表

const leftFilter = ref('') // 可选搜索框输入内容
const rightFilter = ref('') // 已选搜索框输入内容

const itemAssemCode = ref('')
const peDeptCode = ref('')

const unSelItem = ref()
const seledItem = ref()
// 过滤后的可选数据
const filteredLeftData = computed(() => {
  const filterValue = leftFilter.value.toLowerCase()
  return allDataUnselect.value.filter((item) =>
    item.peDeptName?.toLowerCase().includes(filterValue)
  )
})

// 过滤后的已选数据
const filteredRightData = computed(() => {
  const filterValue = rightFilter.value.toLowerCase()
  return allDataSelected.value.filter((item) =>
    item.peDeptName?.toLowerCase().includes(filterValue)
  )
})
const unSelect = ref<number[]>([]) // 未选中项的 key 列表
const selected = ref<number[]>([]) // 已选中项的 key 列表

watch(
  () => unSelect.value,
  (newValue) => {
    if (newValue.length > 0) {
      unSelItem.value = allDataUnselect.value.filter((item) => item.peDeptCode === newValue[0])
      handleUnSelectClick(unSelItem.value, 'unSelect')
    }
  }
)

watch(
  () => selected.value,
  (newValue) => {
    if (newValue.length > 0) {
      seledItem.value = allDataSelected.value.filter((item) => item.peDeptCode === newValue[0])
      handleUnSelectClick(seledItem.value, 'selected')
    }
  }
)

// 处理添加/移除项目
const handleUnSelectClick = async (val, type) => {
  if (type === 'unSelect') {
    await Api.addPeDoctorDept({
      dbUser: formInfo.value.dbUser,
      userName: formInfo.value.userName,
      peDeptCode: val[0].peDeptCode,
      peDeptName: val[0].peDeptName
    }).then((res) => {
      if (res) {
        unSelect.value = []
      }
    })
  } else if (type === 'selected') {
    await Api.removePeDoctorDept({
      dbUser: formInfo.value.dbUser,
      userName: formInfo.value.userName,
      peDeptCode: val[0].peDeptCode,
      peDeptName: val[0].peDeptName
    }).then((res) => {
      if (res) {
        selected.value = []
      }
    })
  }
  addFlag.value = false
  handleDeptItem(formInfo.value)
}

const savePeUserMenu = async () => {
  if (addFlag.value) {
    await Api.addPeDoctor(formInfo.value).then((res) => {
      if (res) {
        addFlag.value = false
        ElMessage.success('新增成功')
        getPeDoctorList()
      }
    })
  } else {
    await Api.savePeUserMenu(formInfo.value).then((res) => {
      if (res) {
        ElMessage.success('保存成功')
        getPeDoctorList()
      }
    })
  }
  // getPeDoctorList()
}

const restorePeDoctor = async () => {
  await Api.restorePeDoctor(formInfo.value).then((res) => {
    if (res) {
      ElMessage.success('恢复成功')
      getPeDoctorList()
    }
  })
}

const delPeDoctor = async (row) => {
  await Api.delPeDoctor({
    dbUser: formInfo.value.dbUser
  }).then((res) => {
    if (res) ElMessage.success('删除成功')
    getPeDoctorList()
  })
}
const addFlag = ref(false)
const addPeDoctor = async () => {
  formInfo.value = {
    // dbUser: dbUser.value,
    dbUser: '',
    userName: '',
    sex: '',
    peDeptCode: '',
    peDeptName: '',
    peRole: 0,
    billDis: 0,
    delFlag: 0
  }
  addFlag.value = true
}
const peDeptList = ref([])
const peDeptChange = (val) => {
  if (val) {
    formInfo.value.peDeptName = peDeptList.value.find((item) => item.peDeptCode === val).peDeptName
  } else {
    formInfo.value.peDeptName = ''
  }
}
// 监听页面加载
onMounted(async () => {
  peDocPermList.value = await queryDictByConfig({
    dictType: '系统字典',
    cons: 'dict_type:pe_doctor_permissions;sort:asc;'
  })
  await getPeDoctorList()
  dbDoctorList.value = await Api.getDbUserList()
  await Api.getToSelectDept({
    dbUser: ''
  }).then((res) => {
    peDeptList.value = res || []
  })
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
  overflow: auto;
  padding: 40px 8px 0;
  box-sizing: border-box;
}

// 强制作用于 el-table 内部滚动区域
:deep(.el-table__body-wrapper .el-scrollbar__wrap .el-scrollbar__view) {
  overflow: auto !important;
}

:deep(.el-table) {
  font-size: 14px;
}

.base-box {
  background-color: #fff;
  margin-bottom: 10px;
  .base-title {
    padding: 0 20px;
    color: #3473d1;
    font-size: 16px;
    height: 46px;
    line-height: 46px;
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
      height: 2px;
      background-color: #3473d1;
    }

    &.dif {
      &::before {
        width: 170px;
      }
    }
  }
  .base-title1 {
    padding: 0 0px;
    color: #3473d1;
    font-size: 16px;
    height: 46px;
    line-height: 46px;
    position: relative;
    font-weight: 700;
    // border-bottom: 1px solid #c5dcff;
    box-sizing: border-box;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100px;
      height: 2px;
      // background-color: #3473d1;
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

.con {
  // margin-top: 7px;
  padding: 0 8px;
  display: flex;
  // 一样宽
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: calc(100% - 54px);
  background-color: #fff;
  span {
    width: 100px;
    text-align: right;
    font-size: 14px;
    display: inline-block;
  }
  .el-input {
    width: 120px;
  }
}
:deep(.el-transfer .el-transfer-panel) {
  // height: 100%;
}

:deep(.el-transfer .el-transfer-panel__body) {
  height: calc(100vh - 250px);
}

:deep(.el-transfer .el-transfer-panel__list.is-filterable) {
  // height: 100%;
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
</style>
