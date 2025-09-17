<template>
  <div class="main">
    <div class="base-setting" style="width: 100%">
      <el-row style="width: 100%">
        <el-col :span="12" style="width: 50%; padding-right: 8px">
          <!-- 授权信息 -->
          <div class="base-box" style="height: 140px">
            <div class="base-title">授权信息</div>
            <div class="base-cont">
              <span class="cont-span">体检机构名称：</span>
              <el-input
                v-model="centerConfig.name"
                placeholder="请输入机构名称"
                class="select-item"
              />
              <span class="cont-span">英文名称：</span>
              <el-input
                v-model="centerConfig.englishName"
                placeholder="请输入英文名称"
                class="select-item"
              />
            </div>
            <div class="base-cont">
              <span class="cont-span">系统授权码：</span>
              <el-input
                v-model="centerConfig.authorizedKey"
                placeholder="请输入系统授权码"
                class="select-item"
              />
              <span class="cont-span">系统校验码：</span>
              <el-input
                v-model="centerConfig.verifyKey"
                placeholder="请输入系统校验码"
                class="select-item"
              />
            </div>
          </div>

          <!-- 系统设置 -->
          <div class="base-box" style="height: calc(100% - 160px); margin-bottom: 8px">
            <div class="base-title">系统设置</div>
            <div class="base-cont">
              <span class="cont-span">检索主索引系统：</span>
              <el-select
                v-model="centerConfig.patIndexSys"
                placeholder="请选择"
                style="width: 12vw"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>

              <span class="cont-span">当前主索引(使用数字)：</span>
              <el-input
                v-model.number="centerConfig.patIndexNo"
                placeholder="请输入当前主索引"
                class="select-item"
              />
            </div>
            <div class="base-cont">
              <span class="cont-span">发送结算信息到：</span>
              <el-select
                v-model="centerConfig.chargeSysCode"
                placeholder="请选择"
                style="width: 12vw"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span class="cont-span">由如下系统计算价格和产生费用：</span>
              <el-select
                v-model="centerConfig.priceSysCode"
                placeholder="请选择"
                style="width: 12vw"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="base-cont">
              <span class="cont-span">指引单样式：</span>
              <el-select v-model="centerConfig.directChart" class="select-item">
                <el-option label="显示选择框" value="显示选择框" />
                <el-option label="不显示" value="不显示" />
              </el-select>
            </div>
          </div>
        </el-col>

        <!-- 机构信息 -->
        <el-col :span="12" style="width: 50%">
          <div class="base-box" style="width: 100%">
            <div class="base-title">机构信息</div>
            <div class="base-cont auto">
              <div class="base-div spec">
                <span class="cont-span">通讯地址：</span>
                <el-input
                  type="textarea"
                  v-model="centerConfig.address"
                  placeholder="请输入通讯地址"
                  style="width: 90%"
                  class="select-area"
                />
              </div>
              <div class="base-div">
                <div class="div-child">
                  <span class="cont-span">通讯编码：</span>
                  <el-input
                    v-model="centerConfig.postCode"
                    placeholder="请输入通讯编码"
                    class="select-item"
                  />
                </div>
                <div class="div-child">
                  <span class="cont-span">联系人：</span>
                  <el-input
                    v-model="centerConfig.linkman"
                    placeholder="请输入联系人"
                    class="select-item"
                  />
                </div>
              </div>
              <div class="base-div">
                <div class="div-child">
                  <span class="cont-span">联系人电话：</span>
                  <el-input
                    v-model="centerConfig.tel"
                    placeholder="请输入联系人电话"
                    class="select-item"
                  />
                </div>
                <div class="div-child">
                  <span class="cont-span">邮箱：</span>
                  <el-input
                    v-model="centerConfig.email"
                    placeholder="请输入邮箱"
                    class="select-item"
                  />
                </div>
              </div>
              <div class="base-div">
                <div class="div-child">
                  <span class="cont-span">固话：</span>
                  <el-input
                    v-model="centerConfig.healthTel"
                    placeholder="请输入固话"
                    class="select-item"
                  />
                </div>
                <div class="div-child">
                  <span class="cont-span">系统支持导检否：</span>
                  <el-input
                    v-model="centerConfig.computerGuide"
                    placeholder="请输入系统支持导检否"
                    class="select-item"
                  />
                </div>
              </div>
              <div class="base-div">
                <div class="div-child">
                  <span class="cont-span">超级用户名：</span>
                  <el-input
                    v-model="centerConfig.superUser"
                    placeholder="请输入超级用户名"
                    class="select-item"
                  />
                </div>
                <div class="div-child">
                  <span class="cont-span">pacs版本：</span>
                  <el-input
                    v-model="centerConfig.pacsVersion"
                    placeholder="请输入pacs版本"
                    class="select-item"
                  />
                </div>
              </div>
              <div class="base-div">
                <div class="div-child">
                  <span class="cont-span">pacs的IIS：</span>
                  <el-input
                    v-model="centerConfig.pacsIp"
                    placeholder="请输入PACS IIS地址"
                    class="select-item"
                  />
                </div>
              </div>
              <div class="base-div spec">
                <span class="cont-span" style="padding-right: 10px"
                  >报告补充说明(出现在主检报告的补充说明):</span
                >
                <el-input
                  type="textarea"
                  v-model="centerConfig.greeting"
                  placeholder="请输入补充说明"
                  style="width: 90%"
                  class="select-area"
                />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 外部协作系统信息表格 -->
      <div class="base-box" style="height: calc(100% - 457px)">
        <div class="base-title dif">外部协作系统信息</div>
        <div class="base-cont">
          <el-table :data="tableData" class="table-box" border>
            <el-table-column prop="sysCode" label="系统代码" width="100" />
            <el-table-column prop="sysClass" label="系统分类" width="100" />
            <el-table-column prop="sysName" label="系统名称" />
            <el-table-column prop="userPw" label="用户口令" />
            <el-table-column prop="dbSource" label="数据源" />
            <el-table-column prop="relateCode" label="中心代码" />
            <el-table-column prop="dbConnMode" label="连接参数" />
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="dbName" label="数据库名" />
            <el-table-column prop="dbSpecial" label="链接方式" />
          </el-table>
        </div>
      </div>

      <!-- 保存按钮 -->
      <div class="base-btn">
        <div class="btn-box" @click="onsave">保存</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as systemSetting from '@/api/systemSetting/center/index'

const centerConfig = ref({
  name: '',
  address: '',
  postCode: '',
  linkman: '',
  tel: '',
  greeting: '',
  relateCode: '',
  chargeSysCode: '',
  priceSysCode: '',
  patIndexSys: '',
  patIndexNo: 0,
  authorizedKey: '',
  verifyKey: '',
  computerGuide: '',
  superUser: '',
  pacsIp: '',
  pacsPost: '',
  pacsVersion: '',
  englishName: '',
  healthTel: '',
  directChart: '',
  email: ''
})

const tableData = ref([])

const options = ref([
  { value: 'HIS0101', label: 'HIS同一数据库' },
  { value: 'HIS0102', label: 'HIS不同数据库' },
  { value: '0000', label: '本体检系统' }
])
// 保存配置
const onsave = async () => {
  const formData = {
    name: centerConfig.value.name || '',
    peCenterConfigDO: {
      name: centerConfig.value.name || '',
      address: centerConfig.value.address || '',
      postCode: centerConfig.value.postCode || '',
      linkman: centerConfig.value.linkman || '',
      tel: centerConfig.value.tel || '',
      greeting: centerConfig.value.greeting || '',
      relateCode: centerConfig.value.relateCode || '',
      chargeSysCode: centerConfig.value.chargeSysCode || '',
      priceSysCode: centerConfig.value.priceSysCode || '',
      patIndexSys: centerConfig.value.patIndexSys || '',
      patIndexNo: Number(centerConfig.value.patIndexNo) || 0,
      authorizedKey: centerConfig.value.authorizedKey || '',
      verifyKey: centerConfig.value.verifyKey || '',
      computerGuide: centerConfig.value.computerGuide || '',
      superUser: centerConfig.value.superUser || '',
      pacsIp: centerConfig.value.pacsIp || '',
      pacsPost: centerConfig.value.pacsPost || '',
      pacsVersion: centerConfig.value.pacsVersion || '',
      englishName: centerConfig.value.englishName || '',
      healthTel: centerConfig.value.healthTel || '',
      directChart: centerConfig.value.directChart || '',
      email: centerConfig.value.email || ''
    }
  }

  await systemSetting.saveCenterConfig(formData).then((res) => {
    if (res == true) getConfig()
  })
}

// 获取外部系统列表
const getSystemList = async () => {
  await systemSetting
    .getPeCooperationSystemList({
      sysClass: 'HIS,PEIS',
      sysClassGroup: []
    })
    .then((res) => {
      tableData.value = res || []
    })
}

// 获取中心配置
const getConfig = async () => {
  await systemSetting.getCenterConfig('application/x-www-form-urlencoded').then((res) => {
    centerConfig.value = {
      ...res
    }
  })
}

onMounted(() => {
  getSystemList()
  getConfig()
})
</script>

<style lang="scss" scoped>
/* 样式保持不变 */
.main {
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
.base-setting {
  width: 100%;
  height: calc(100% - 54px);
  box-sizing: border-box;
  overflow-y: auto;

  .base-box {
    background-color: #fff;
    margin-bottom: 10px;
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
        height: 2px;
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
      padding: 12px 20px;

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

  .base-btn {
    display: flex;
    width: calc(100% - 20px);
    justify-content: center;
    align-items: center;
    height: 65px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 10px;
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
}
:deep(.el-table) {
  font-size: 14px;

  th {
    height: 40px;
    text-align: left;
    background-color: #f9f9f9 !important;
  }

  td {
    height: 40px;
  }
}
</style>
