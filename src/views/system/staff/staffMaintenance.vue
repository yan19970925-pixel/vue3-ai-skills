<template>
  <div class="staffMaintenance">
    <div class="left">
      <div class="left_search">
        <span>姓名：</span>
        <el-input
          v-model="searchName"
          placeholder="请输入姓名"
          clearable
          @keyup.enter="getTableList()"
          class="!w-120px"
        />
        <span style="margin-left: 10px">工号：</span>
        <el-input
          v-model="searchEmpNo"
          placeholder="请输入工号"
          clearable
          @keyup.enter="getTableList()"
          class="!w-120px"
        />
        <span class="ml-12px">所属部门：</span>
        <el-select
          v-model="departmentId"
          class="!w-130px"
          clearable
          filterable
          @change="getTableList()"
        >
          <el-option
            v-for="item in departmentList"
            :key="item.deptCode"
            :label="item.deptName"
            :value="item.deptCode"
          />
        </el-select>
        <!-- <el-button type="primary" style="margin-left: 10px; width: 70px" @click="getTableList()">
          查询
        </el-button> -->
      </div>
      <!-- <span style="margin-left: 10px">应用程序：</span>
        <el-select
          v-model="application"
          class="!w-160px"
          filterable
          @change="getTableList()"
          clearable
        >
          <el-option
            v-for="item in applicationList"
            :key="item.application"
            :label="item.description"
            :value="item.application"
          />
        </el-select> -->
      <div class="table_div">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
          "
        >
          <div style="font-size: 16px; font-weight: bold">人员列表</div>
        </div>
        <el-table
          :data="personalList"
          border
          highlight-current-row
          @row-click="personalClick"
          style="width: 100%; height: calc(100vh - 200px); font-size: 14px"
          :header-cell-style="{
            background: '#f7f8fcff',
            color: '#000',
            fontWeight: 'normal',
            fontSize: '14px'
          }"
          :cell-style="{ height: '25px' }"
        >
          <el-table-column
            v-for="item in personalByColumnList"
            :key="item.prop"
            v-bind="item"
            :show-overflow-tooltip="true"
          >
            <template #default="scope">
              <span>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="140" align="center">
            <template #default="scope">
              <el-button
                type="primary"
                style="height: 25px"
                link
                @click="restorePassword(scope.row)"
                >恢复口令</el-button
              >
              <el-button type="danger" style="height: 25px" link @click="delect(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="right">
      <div class="right_div1">
        <div style="width: 100%; background: #fff; border-radius: 4px; padding: 6px 8px">
          <el-button
            style="width: 80px; color: #3473d1; border-color: #3473d1"
            @click="newAddPerson"
          >
            新建
          </el-button>
          <el-button type="primary" @click="save" style="margin-right: 10px; width: 80px"
            >保存
          </el-button>
        </div>
        <div
          style="width: 100%; background: #fff; border-radius: 4px; padding: 8px; margin-top: 6px"
        >
          <div style="margin-bottom: 4px">
            <div
              ><span style="font-size: 16px; font-weight: bold">基本信息</span>
              <span style="margin-left: 30px; color: #f56c6c; font-size: 14px">
                提示：用户缺省密码与用户名称相同
              </span>
            </div>
          </div>
          <div class="con">
            <span><a style="color: #f56c6c">*</a>员工编号：</span>
            <el-input
              v-model="saveParams.empNo"
              placeholder="请输入编号"
              clearable
              :disabled="!isNewAdd"
              class="!w-200px"
              maxlength="10"
              @blur="empNoBlur()"
            />
            <span style="margin-left: 10px">工作：</span>
            <el-select v-model="saveParams.job" class="!w-200px" clearable filterable>
              <el-option
                v-for="item in jobList"
                :key="item.jobClassName"
                :label="item.jobClassName"
                :value="item.jobClassName"
              />
            </el-select>
            <span style="margin-left: 10px">职称：</span>
            <el-select v-model="saveParams.title" class="!w-200px" clearable filterable>
              <el-option
                v-for="item in postList"
                :key="item.titleName"
                :label="item.titleName"
                :value="item.titleName"
              />
            </el-select>
            <!-- <el-select v-model="professional" class="!w-140px" clearable filterable>
            <el-option
              v-for="item in professionalList"
              :key="item.titleCode"
              :label="item.titleName"
              :value="item.titleCode"
            />
          </el-select> -->
            <span style="margin-left: 10px">所属科室：</span>
            <el-select v-model="saveParams.deptCode" clearable filterable class="!w-200px">
              <el-option
                v-for="item in departmentList"
                :key="item.deptCode"
                :label="item.deptName"
                :value="item.deptCode"
              />
            </el-select>
          </div>
          <div class="con">
            <span><a style="color: #f56c6c">*</a>姓名：</span>
            <el-input
              v-model="saveParams.name"
              maxlength="20"
              placeholder="请输入姓名"
              clearable
              class="!w-200px"
            />
            <span style="margin-left: 10px">输入码：</span>
            <el-input
              v-model="saveParams.inputCode"
              placeholder="无需填写自动生成"
              clearable
              maxlength="8"
              disabled
              class="!w-200px"
            />
            <span style="margin-left: 10px"><a style="color: #f56c6c">*</a>性别：</span>
            <el-select v-model="saveParams.sex" class="!w-200px">
              <el-option key="男" label="男" value="男" />
              <el-option key="女" label="女" value="女" />
              <el-option key="未知" label="未知" value="未知" />
            </el-select>
            <span style="margin-left: 10px"><a style="color: #f56c6c">*</a>出生日期：</span>
            <el-date-picker
              type="date"
              class="!w-200px"
              v-model="saveParams.dateOfBirth"
              clearable
              value-format="YYYY-MM-DD"
            />
            <!-- <span style="margin-left: 10px">职务：</span>
          <el-select v-model="post" class="!w-140px">
            <el-option
              v-for="item in postList"
              :key="item.titleCode"
              :label="item.titleName"
              :value="item.titleCode"
            />
          </el-select> -->
          </div>
          <div class="con">
            <span><a style="color: #f56c6c">*</a>身份证：</span>
            <el-input
              v-model="saveParams.idNo"
              placeholder="请输入身份证"
              clearable
              maxlength="18"
              class="!w-200px"
            />
            <span style="margin-left: 10px"><a style="color: #f56c6c">*</a>联系方式：</span>
            <el-input
              v-model="saveParams.mobilePhone"
              placeholder="请输入联系方式"
              clearable
              maxlength="30"
              class="!w-200px"
            />

            <span style="margin-left: 10px">医保医师代码：</span>
            <el-input
              v-model="saveParams.insurDoctorNo"
              placeholder="请输入医师代码"
              clearable
              maxlength="30"
              class="!w-200px"
            />
            <span style="margin-left: 10px">职业证号：</span>
            <el-input
              v-model="saveParams.doctorCertificateNo"
              placeholder="请输入证号"
              clearable
              maxlength="30"
              class="!w-200px"
            />
          </div>
          <div class="con">
            <span>职业证书期限：</span>
            <el-date-picker
              type="date"
              class="!w-200px"
              v-model="saveParams.doctorCertificateValidDate"
              clearable
              value-format="YYYY-MM-DD"
            />
            <span style="margin-left: 10px">抗菌药物权限：</span>
            <el-radio-group v-model="saveParams.limitDrug" class="ml-4">
              <el-radio label="3" size="small">是</el-radio>
              <el-radio label="0" size="small">否</el-radio>
            </el-radio-group>
            <span style="margin-left: 98px">是否启用：</span>
            <el-radio-group v-model="saveParams.status" class="ml-4">
              <el-radio :label="0" size="small">是</el-radio>
              <el-radio :label="1" size="small">否</el-radio>
            </el-radio-group>
          </div>
          <div class="con">
            <span>简介：</span>
            <el-input
              v-model="saveParams.doctorDesc"
              class="!w-200px"
              :autosize="{ minRows: 3, maxRows: 3 }"
              type="textarea"
              style="resize: none"
              maxlength="200"
              placeholder="请输入简介"
            />
            <span style="margin-left: 10px">擅长：</span>
            <el-input
              v-model="saveParams.beGoodAt"
              class="!w-200px"
              :autosize="{ minRows: 3, maxRows: 3 }"
              type="textarea"
              maxlength="200"
              style="resize: none"
              placeholder="请输入擅长领域"
            />
            <span style="margin-left: 10px">CA签名：</span>
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :http-request="httpRequest"
              :before-upload="beforeAvatarUploadUK"
            >
              <img
                v-if="saveParams.ukeySignValue"
                :src="saveParams.ukeySignValue"
                class="avatar"
                style="width: 60px; height: 60px"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
            <span style="margin-left: 136px">头像：</span>
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :http-request="httpRequest"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="saveParams.avatarFilePath"
                :src="saveParams.avatarFilePath"
                class="avatar"
                style="width: 72px; height: 72px"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload> </div
        ></div>
        <div>
          <div
            style="width: 100%; margin-top: 6px; background: #fff; border-radius: 4px; padding: 8px"
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0px;
              "
            >
              <span style="font-size: 16px; font-weight: bold; width: 80px; letter-spacing: 8px"
                >组分配</span
              >
              <div style="width: calc(100% - 80px)">
                <div style="font-size: 14px; margin-bottom: 6px; width: 50%; display: inline-block">
                  <span>备选组</span>
                  <el-select
                    v-model="alternativeGroup"
                    class="!w-140px ml-24px"
                    @change="getAccountingTeamList"
                    filterable
                  >
                    <el-option
                      v-for="item in alternativeGroupList"
                      :key="item.groupClass"
                      :label="item.groupClass"
                      :value="item.groupClass"
                    />
                  </el-select>
                </div>
                <div style="font-size: 14px; margin-left: 80px; display: inline-block"
                  >用户所属组</div
                >
                <div class="con" style="margin-top: 0">
                  <el-table
                    ref="zufenpeiL"
                    :data="accountingTeamList"
                    style="width: 100%"
                    height="200px"
                    border
                    @selection-change="handleSelectionChangeL"
                  >
                    <el-table-column type="selection" width="35" />
                    <el-table-column label="组名" width="250" show-overflow-tooltip>
                      <template #default="scope">{{ scope.row.groupName }}</template>
                    </el-table-column>
                    <el-table-column prop="groupCode" label="组代码" show-overflow-tooltip />
                  </el-table>
                  <div>
                    <el-button
                      type="primary"
                      :icon="ArrowLeft"
                      @click="toLeft"
                      style="margin: 8px 50px; display: block"
                      :disabled="zufenpeiRight.length == 0"
                    ></el-button>
                    <el-button
                      type="primary"
                      :icon="ArrowRight"
                      @click="toRight"
                      style="margin: 8px 50px; display: block"
                      :disabled="zufenpeiLeft.length == 0"
                    ></el-button>
                  </div>
                  <el-table
                    ref="zufenpeiR"
                    :data="saveParams.staffVsGroupDOList"
                    style="width: 100%"
                    height="200px"
                    border
                    @selection-change="handleSelectionChangeR"
                  >
                    <el-table-column type="selection" width="35" />
                    <el-table-column label="组类名" show-overflow-tooltip>
                      <template #default="scope">{{ scope.row.groupClass }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="groupName"
                      label="组名"
                      width="200"
                      show-overflow-tooltip
                    />
                  </el-table> </div></div
            ></div>
          </div>
          <div
            style="width: 100%; margin-top: 6px; background: #fff; border-radius: 4px; padding: 8px"
          >
            <div style="display: flex; justify-content: space-between; align-items: center">
              <span style="font-size: 16px; font-weight: bold; width: 80px">权限设置</span>

              <!-- <div
              style="
                font-size: 14px;
                margin-top: 8px;
                width: 55%;
                display: inline-flex;
                align-items: center;
              "
            > -->
              <!-- <el-checkbox v-model="checked1" size="large"> 创建系统用户 </el-checkbox> -->
              <!-- <span style="margin-left: 10px">用户名称：</span>
              <el-input
                v-model="name"
                placeholder="请输入名称"
                clearable
                @keyup.enter="handleQuery"
                class="!w-100px"
              /> -->
              <!-- </div> -->
              <!-- <div style="font-size: 14px; margin-top: 8px; display: inline-block">
              <span>查找程序</span>
              <el-select v-model="deptCode" class="!w-140px" style="margin-left: 50px">
                <el-option
                  v-for="item in deptList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div> -->
              <div class="con" style="width: calc(100% - 80px)">
                <el-table
                  ref="quanxianL"
                  :data="applicationDictionaryList"
                  style="width: 100%"
                  height="155px"
                  border
                  @selection-change="handleSelectionChangeL2"
                >
                  <el-table-column type="selection" width="35" />
                  <el-table-column label="程序名称" width="150" show-overflow-tooltip>
                    <template #default="scope">{{ scope.row.application }}</template>
                  </el-table-column>
                  <el-table-column prop="description" label="描述" show-overflow-tooltip />
                </el-table>
                <div>
                  <el-button
                    type="primary"
                    :icon="ArrowLeft"
                    @click="toLeft2"
                    style="margin: 8px 50px; display: block"
                    :disabled="quanxianRight.length == 0"
                  ></el-button>
                  <el-button
                    type="primary"
                    :icon="ArrowRight"
                    @click="toRight2"
                    style="margin: 8px 50px; display: block"
                    :disabled="quanxianLeft.length == 0"
                  ></el-button>
                </div>
                <el-table
                  ref="quanxianR"
                  :data="saveParams.appGrantsDOList"
                  style="width: 100%"
                  height="155px"
                  border
                  @selection-change="handleSelectionChangeR2"
                >
                  <el-table-column type="selection" width="35" />
                  <el-table-column label="程序名" show-overflow-tooltip>
                    <template #default="scope">{{ scope.row.application }}</template>
                  </el-table-column>
                  <el-table-column label="权限" width="150">
                    <template #default="scope">
                      <el-input
                        v-model="scope.row.capability"
                        size="small"
                        placeholder=" "
                        class="!w-120px"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    property="name"
                    label="菜单授权组"
                    width="120"
                    show-overflow-tooltip
                  />
                </el-table> </div
            ></div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 12px;
                padding-bottom: 6px;
              "
            >
              <!-- <div style="font-size: 16px; font-weight: bold">分配角色</div> -->

              <span style="font-size: 16px; font-weight: bold; width: 80px">分配角色</span>
              <el-select multiple v-model="saveParams.roleIds" style="width: calc(100% - 80px)">
                <el-option
                  v-for="item in allSimpleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                /> </el-select></div
          ></div>
        </div>
        <!-- <div class="con">
          <span>权限设置说明：</span>
          <el-input
            v-model="textarea1"
            :autosize="{ minRows: 3, maxRows: 3 }"
            style="width: 92%"
            type="textarea"
            placeholder="请输入擅长领域"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import * as DeptApi from '@/api/system/dept'
import {
  queryStaffDict,
  saveStaffDict,
  queryDictByConfig,
  getAllSimple,
  deleteStaffDict,
  queryStaffDetail,
  restorePasswordSave
} from '@/api/system/staff/index'
import { uploadFileApi } from '@/api/system/publicDictionary/index'
const queryParams = reactive({
  title: '',
  name: undefined,
  status: undefined,
  pageNo: 1,
  pageSize: 100
})
const departmentList = ref<any>([]) //所属部门
const departmentId = ref('')
const applicationList = ref<any>([]) //应用程序
const application = ref('')
const jobList = ref<any>([]) //工作
const job = ref('')
const professionalList = ref<any>([]) //职称
const professional = ref('')
const postList = ref<any>([]) //职务
const post = ref('')
const alternativeGroupList = ref<any>([]) //工作组类字典
const alternativeGroup = ref('')
const allSimpleList = ref<any>([]) //所有权限
const roleIds = ref<any>([])
const accountingTeamList = ref<any>([]) //核算组
const applicationDictionaryList = ref<any>([]) //应用程序
const deptCode = ref('') //科室
const searchName = ref('')
const searchEmpNo = ref('')
const deptList = ref<any>([])
const name = ref('')
const isNewAdd = ref(true)
const personalList = ref<any>([])
const personalByColumnList = reactive([
  { prop: 'empNo', label: '人员编码', width: '100px', align: 'center' },
  { prop: 'deptName', label: '所属科室', width: '100px', align: 'center' },
  { prop: 'name', label: '姓名', width: '100px', align: 'center' },
  { prop: 'job', label: '工作', width: '100px', align: 'center' },
  { prop: 'title', label: '职称', width: '140px', align: 'center' },
  { prop: 'userName', label: '账号', width: '100px', align: 'center' },
  { prop: 'createDate', label: '创建日期', width: '180px', align: 'center' }
  // { prop: 'application', label: '应用程序', width: '140px', align: 'center' }
])
const birthDate = ref('')
const textarea1 = ref('')
const radio3 = ref('2')
const staffVsGroupDOList = ref<any>([]) //工作人员分组情况
const appGrantsDOList = ref<any>([]) //应用程序权限记录
const zufenpeiL = ref()
const zufenpeiR = ref()
const zufenpeiLeft = ref<any>([])
const zufenpeiRight = ref<any>([])
const quanxianL = ref()
const quanxianR = ref()
const quanxianLeft = ref<any>([])
const quanxianRight = ref<any>([])
//点击人员查询
const personalClick = (row) => {
  queryStaffDetail({ empNo: row.empNo }).then((res) => {
    isNewAdd.value = false
    saveParams.value = res
    saveParams.value.avatarFilePath = res.avatar
    saveParams.value.staffVsGroupDOList = res.staffVsGroupQueryRespVOList
    staffVsGroupDOList.value = saveParams.value.staffVsGroupDOList
  })
}
const empNoBlur = () => {
  if (saveParams.value.empNo) {
    queryStaffDetail({ empNo: saveParams.value.empNo }).then((res) => {
      isNewAdd.value = true
      if (res.empNo) {
        ElMessageBox.confirm(
          '系统检测到该人员编号已经被占用，是否提取该编号' + res.empNo + '人员信息吗？',
          '提示',
          {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'info'
          }
        ).then(() => {
          zufenpeiL.value!.clearSelection()
          quanxianL.value!.clearSelection()
          saveParams.value = res
          saveParams.value.avatarFilePath = res.avatar
          saveParams.value.staffVsGroupDOList = res.staffVsGroupQueryRespVOList
          staffVsGroupDOList.value = saveParams.value.staffVsGroupDOList
        })
      }
    })
  }
}
const handleSelectionChangeL = (val) => {
  zufenpeiLeft.value = val
}
const handleSelectionChangeR = (val) => {
  zufenpeiRight.value = val
}
const toRight = () => {
  if (zufenpeiLeft.value.length > 0) {
    if (alternativeGroup.value) {
      zufenpeiLeft.value.forEach((item) => {
        item.empNo = alternativeGroup.value
        item.groupClass = alternativeGroup.value
      })
    } else {
      zufenpeiLeft.value.forEach((item) => {
        item.empNo = ''
        item.groupClass = ''
      })
    }
    const map = new Map()
    staffVsGroupDOList.value = [...zufenpeiLeft.value, ...staffVsGroupDOList.value]
    staffVsGroupDOList.value = staffVsGroupDOList.value.filter(
      (v) => !map.has(v.groupCode) && map.set(v.groupCode, v)
    )
    console.log(staffVsGroupDOList.value)
    saveParams.value.staffVsGroupDOList = []
    staffVsGroupDOList.value.forEach((item) => {
      saveParams.value.staffVsGroupDOList.push({
        groupClass: item.groupClass,
        groupCode: item.groupCode,
        groupName: item.groupName,
        inputCode: item.inputCode
      })
    })
    console.log(saveParams.value.staffVsGroupDOList)
    // saveParams.value.staffVsGroupDOList = saveParams.value.staffVsGroupDOList.filter(
    //   (v) => !map.has(v.groupCode) && map.set(v.groupCode, v)
    // )
    // accountingTeamList.value = accountingTeamList.value.filter(
    //   (itemA) => !zufenpeiLeft.value.some((itemB) => itemB.groupCode === itemA.groupCode)
    // )
  }
}
const toLeft = () => {
  if (zufenpeiRight.value.length > 0) {
    staffVsGroupDOList.value = staffVsGroupDOList.value.filter(
      (itemA) => !zufenpeiRight.value.some((itemB) => itemB.groupCode === itemA.groupCode)
    )
    saveParams.value.staffVsGroupDOList = saveParams.value.staffVsGroupDOList.filter(
      (itemA) => !zufenpeiRight.value.some((itemB) => itemB.groupCode === itemA.groupCode)
    )
  }
}
const handleSelectionChangeL2 = (val) => {
  quanxianLeft.value = val
}
const handleSelectionChangeR2 = (val) => {
  quanxianRight.value = val
}
const toRight2 = () => {
  if (quanxianLeft.value.length > 0) {
    const map = new Map()
    saveParams.value.appGrantsDOList = [...quanxianLeft.value, ...saveParams.value.appGrantsDOList]
    saveParams.value.appGrantsDOList.forEach((item) => {
      item.capability = 1
    })
    saveParams.value.appGrantsDOList = saveParams.value.appGrantsDOList.filter(
      (v) => !map.has(v.application) && map.set(v.application, v)
    )
  }
}
const toLeft2 = () => {
  if (quanxianRight.value.length > 0) {
    saveParams.value.appGrantsDOList = saveParams.value.appGrantsDOList.filter(
      (itemA) => !quanxianRight.value.some((itemB) => itemB.application === itemA.application)
    )
  }
}
const beforeAvatarUploadUK: UploadProps['beforeUpload'] = (file) => {
  if (
    !file.type.includes('jpeg') &&
    !file.type.includes('jpg') &&
    !file.type.includes('png') &&
    !file.type.includes('gif')
  ) {
    ElMessage.error('图片格式不对')
    return false
  } else if (file.size / 1024 / 1024 > 10) {
    ElMessage.error('图片大小不能超过10M')
    return false
  }
  const reader = new FileReader()
  reader.readAsDataURL(file) // 转换为Base64
  reader.onload = (e) => {
    saveParams.value.ukeySignValue = e.target.result
    // 在这里处理Base64字符串，例如可以将其赋值给一个响应式数据进行后续处理
  }
  reader.onerror = (error) => {
    console.error('File could not be converted to Base64:', error)
  }
  // 通常需要返回 false 以阻止默认的上传行为
  return false
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    !rawFile.type.includes('jpeg') &&
    !rawFile.type.includes('jpg') &&
    !rawFile.type.includes('png') &&
    !rawFile.type.includes('gif')
  ) {
    ElMessage.error('图片格式不对')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('图片大小不能超过10M')
    return false
  }
  return true
}
const httpRequest = async (file) => {
  await uploadFileApi({ file: file.file }).then((res) => {
    if (res.code == 0) {
      saveParams.value.avatarFilePath = res.data
    }
  })
}
const getTableList = () => {
  let params = {
    deptCode: departmentId.value,
    application: application.value,
    name: searchName.value,
    empNo: searchEmpNo.value
  }
  queryStaffDict(params).then((res) => {
    if (res) {
      personalList.value = res
    }
  })
}
const getAccountingTeamList = async () => {
  let params = {
    keyWord: '',
    dictType: '核算组',
    cons: ''
  }
  if (alternativeGroup.value) {
    params.cons = `group_class:${alternativeGroup.value}`
  } else {
    params.cons = ''
  }
  accountingTeamList.value = await queryDictByConfig(params)
}
const saveParams = ref({
  empNo: '', //员工编号
  deptCode: '', //科室编码
  name: '', //姓名
  job: '', //工作类别
  title: '', //职称
  sex: '', //性别
  roleid: '', //职务
  dateOfBirth: '', //出生日期
  idNo: '', //身份证号
  mobilePhone: '', //联系方式
  insurDoctorNo: '', //医保医师代码
  doctorCompetenceNo: '', //医保资格正式编码
  doctorCertificateNo: '', //医保执业证书编码
  ukeySignValue: '', //UKey签名值
  status: 0, //状态(0-正常 1-停用)
  limitDrug: '0', //用药限制
  doctorDesc: '', //个人简介
  doctorCertificateValidDate: '', //医保执业证书期限
  beGoodAt: '', //擅长
  avatarFilePath: '', //头像
  staffVsGroupDOList: [], //工作人员分组情况
  appGrantsDOList: [], //应用程序权限记录
  roleIds: []
})
const save = async () => {
  // console.log(saveParams.value)
  var idNoTest = /^[1-9]\d{5}(19|20)\d{2}(0\d|1[012])([012]\d|3[01])\d{3}[\dX]$/
  var alphanumericTest = /^[A-Za-z0-9]+$/
  if (!saveParams.value.empNo) {
    ElMessage.warning('员工编号不能为空')
    return
  } else if (!saveParams.value.name) {
    ElMessage.warning('姓名不能为空 ')
    return
  } else if (!saveParams.value.sex) {
    ElMessage.warning('性别不能为空 ')
    return
  } else if (!saveParams.value.dateOfBirth) {
    ElMessage.warning('出生日期不能为空 ')
    return
  } else if (!saveParams.value.idNo) {
    ElMessage.warning('身份证号不能为空 ')
    return
  } else if (saveParams.value.idNo && !idNoTest.test(saveParams.value.idNo)) {
    ElMessage.warning('身份证号格式错误 ')
    return
  } else if (!saveParams.value.mobilePhone) {
    ElMessage.warning('联系方式不能为空 ')
    return
  } else if (
    saveParams.value.insurDoctorNo &&
    !alphanumericTest.test(saveParams.value.insurDoctorNo)
  ) {
    ElMessage.warning('医师代码格式错误，由数字和字母组合')
    return
  } else if (
    saveParams.value.doctorCertificateNo &&
    !alphanumericTest.test(saveParams.value.doctorCertificateNo)
  ) {
    ElMessage.warning('职业证号格式错误，由数字和字母组合')
    return
  } else if (saveParams.value.staffVsGroupDOList.length == 0) {
    ElMessage.warning('分组情况不能为空 ')
    return
  }
  if (staffVsGroupDOList.value.length > 0) {
    let arr = []
    staffVsGroupDOList.value.forEach((item) => {
      arr.push({
        groupClass: item.groupClass,
        groupCode: item.groupCode,
        groupName: item.groupName
      })
    })
    saveParams.value.staffVsGroupDOList = JSON.parse(JSON.stringify(arr))
  }
  await saveStaffDict(saveParams.value).then(async (res) => {
    ElMessage.success('保存成功')
    await getTableList()
    queryStaffDetail({ empNo: saveParams.value.empNo }).then((res) => {
      saveParams.value = res
      saveParams.value.avatarFilePath = res.avatar
      saveParams.value.staffVsGroupDOList = res.staffVsGroupQueryRespVOList
      staffVsGroupDOList.value = saveParams.value.staffVsGroupDOList
    })
  })
}
const restorePassword = (row) => {
  restorePasswordSave(row).then((res) => {
    if (res) {
      ElMessage.success('恢复成功')
    }
  })
}
const delect = (row) => {
  deleteStaffDict({ empNo: row.empNo }).then((res) => {
    if (res) {
      ElMessage.success('删除成功')
      getTableList()
    }
  })
}
const newAddPerson = () => {
  isNewAdd.value = true
  staffVsGroupDOList.value = []
  zufenpeiL.value!.clearSelection()
  quanxianL.value!.clearSelection()
  saveParams.value = {
    empNo: '', //员工编号
    deptCode: '', //科室编码
    name: '', //姓名
    job: '', //工作类别
    title: '', //职称
    sex: '', //性别
    roleid: '', //职务
    dateOfBirth: '', //出生日期
    idNo: '', //身份证号
    mobilePhone: '', //联系方式
    insurDoctorNo: '', //医保医师代码
    doctorCompetenceNo: '', //医保资格正式编码
    doctorCertificateNo: '', //医保执业证书编码
    ukeySignValue: '', //UKey签名值
    status: 0, //状态(0-正常 1-停用)
    limitDrug: '0', //用药限制
    doctorDesc: '', //个人简介
    doctorCertificateValidDate: '', //医保执业证书期限
    beGoodAt: '', //擅长
    avatarFilePath: '', //头像
    staffVsGroupDOList: [], //工作人员分组情况
    appGrantsDOList: [], //应用程序权限记录
    roleIds: []
  }
}
/** 初始化 **/
onMounted(async () => {
  getTableList()
  departmentList.value = await queryDictByConfig({
    keyWord: '',
    dictType: '科室',
    cons: ''
  })
  applicationList.value = await queryDictByConfig({
    keyWord: '',
    dictType: '应用程序字典',
    cons: ''
  })
  jobList.value = await queryDictByConfig({
    keyWord: '',
    dictType: '工作类别字典',
    cons: ''
  })
  postList.value = await queryDictByConfig({
    keyWord: '',
    dictType: '技术职务字典',
    cons: ''
  })
  alternativeGroupList.value = await queryDictByConfig({
    keyWord: '',
    dictType: '工作组类字典',
    cons: ''
  })
  if (alternativeGroupList.value.length > 0) {
    alternativeGroup.value = alternativeGroupList.value[0].groupClass
  }
  getAccountingTeamList()

  applicationDictionaryList.value = await queryDictByConfig({
    keyWord: '',
    dictType: '应用程序字典',
    cons: ''
  })
  allSimpleList.value = await getAllSimple()
})
</script>
<style scoped>
.staffMaintenance {
  height: calc(100vh - 54px);
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  background: #eee;
  .left {
    width: 582px;
    height: calc(100% - 6px);
    margin-left: 6px;
    border-radius: 4px;
    background-color: #fff;
    /* padding: 8px; */
    .left_search {
      display: flex;
      align-items: center;
      padding: 8px;
      span {
        font-size: 14px;
        font-family: '思源黑体 CN', 微软雅黑, Arial;
      }
    }
    .table_div {
      /* margin-top: 4px; */
      background: #fff;
      padding: 8px;
    }
  }
  .right {
    width: calc(100% - 600px);
    margin-right: 6px;
    height: calc(100% - 6px);
    /* padding: 8px; */
    /* border-radius: 4px; */
    /* background: #fff; */
    .right_div1 {
      .title {
        width: 106px;
        text-align: center;
        background-color: #234fd8;
        color: #fff;
        padding: 0 20px;
        margin-left: 10px;
      }
      .con {
        margin-top: 7px;
        display: flex;
        align-items: center;
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
    }
  }
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #fff;
  transition: var(--el-transition-duration-fast);
}
:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}
:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  text-align: center;
}
</style>
