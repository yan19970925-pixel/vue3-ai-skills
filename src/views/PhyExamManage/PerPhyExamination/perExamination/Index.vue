<template>
  <div class="per_exma">
    <div class="exma_search">
      <div class="search_div">
        <el-checkbox
          v-model="formInfo.joinUnit"
          label="属于单位体检"
          size="large"
          :true-value="1"
          :false-value="0"
          @change="joinUnitChange"
          :disabled="allDisabled"
        />
      </div>
      <div class="search_div">
        <span> <b style="color: #ed2226" v-show="formInfo.joinUnit == 1">*</b>单位代码：</span>
        <!-- <el-input
          style="width: 160px"
          v-model="formInfo.unitCode"
          placeholder="请输入"
          class="select-item"
          clearable
        /> -->
        <el-input
          v-model="formInfo.unitCode"
          @keyup.enter="searchByUnitCode"
          placeholder="请输入"
          class="cunitInput !w-80px ml-6px"
          :readonly="formInfo.joinUnit == '0'"
          :disabled="allDisabled"
        />
        <span class="selectBtn">
          <el-button
            :disabled="formInfo.joinUnit == '0'"
            :icon="Search"
            @click="onFocusUnitCode()"
          />
        </span>
      </div>
      <div class="search_div">
        <span> <b style="color: #ed2226" v-show="formInfo.joinUnit == 1">*</b>单位名称：</span>
        <el-input
          style="width: 160px"
          v-model="formInfo.unitName"
          placeholder="请输入"
          class="select-item"
          clearable
          :readonly="formInfo.joinUnit == '0'"
          :disabled="allDisabled"
          @blur="getUintCode()"
        />
      </div>
      <div class="search_div">
        <span>单位税号：</span>
        <el-input
          style="width: 160px"
          v-model="formInfo.taxId"
          placeholder="请输入"
          class="select-item"
          clearable
          :disabled="allDisabled"
        />
      </div>
      <!-- <div class="search_div">
        <span>单位编制数：</span>
        <el-input
          style="width: 100px"
          v-model="formInfo.unitNumber"
          placeholder="请输入"
          class="select-item"
          clearable
        />
      </div> -->
      <div class="search_div">
        <!-- <el-button class="save" @click="searchByPeId">查询</el-button> -->
        <el-button class="clear" @click="clearMsg">清屏</el-button>
      </div>
      <div class="search_div">
        <el-checkbox
          :disabled="allDisabled"
          v-model="formInfo.appointPeExam"
          @change="appointChange"
          size="large"
        >
          <b style="color: #ed2226">*</b>预约体检
        </el-checkbox>
      </div>
      <div class="search_div">
        <span><b style="color: #ed2226">*</b>预约时间：</span>
        <el-date-picker
          :disabled="!formInfo.appointPeExam"
          v-model="formInfo.pePreDate"
          type="date"
          placeholder="选择日期"
          style="width: 160px"
          value-format="YYYY-MM-DD"
          class="select-item"
          @change="handleTimeChange"
          :disabled-date="disabledDate || allDisabled"
        />
      </div>
      <div class="search_div">
        <el-button class="save" :disabled="allDisabled" @click="saveDengJi">保存</el-button>
        <!-- <el-button class="save" @click="readIdCard">身份证读卡</el-button> -->
        <el-button class="save" :disabled="allDisabled" @click="OcrRecognition(false)"
          >身份证读卡</el-button
        >
        <el-button
          v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
          class="save"
          :disabled="allDisabled"
          @click="OcrRecognition(true)"
          >对象身份证读卡</el-button
        >
        <!-- <el-button @click="handlePrint({ peId: 'TJ10000015' })">调用打印</el-button> -->
        <!-- <el-button class="read" @click="readIdCard"> <img :src="readCard" />读卡 </el-button> -->
        <!-- <el-button class="read" @click="personReport"> <img :src="report" />报到 </el-button> -->
      </div>
    </div>
    <div class="exma_con">
      <div class="con_left">
        <div class="left_heard">
          <span>人员基本信息</span>
          <el-checkbox
            style="margin-left: 30px; height: 40px; line-height: 40px"
            v-model="isVerifyID"
            >是否校验身份证</el-checkbox
          >
        </div>
        <div class="left_con">
          <el-row>
            <el-col :span="8">
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>体检号：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.peId"
                  placeholder="请输入"
                  class="select-item"
                  readonly
                  :disabled="allDisabled"
                />
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>姓名：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.name"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>出生日期：</span>
                <el-date-picker
                  v-model="formInfo.dateOfBirth"
                  type="date"
                  placeholder="选择日期"
                  style="width: calc(100% - 100px)"
                  value-format="YYYY-MM-DD"
                  :disabled="allDisabled"
                />
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>性别：</span>
                <el-select
                  v-model="formInfo.sex"
                  placeholder="请选择性别"
                  style="width: calc(100% - 100px)"
                  class="select-item"
                  filterable
                  clearable
                  default-first-option
                  :disabled="allDisabled"
                >
                  <el-option label="女" value="0" />
                  <el-option label="男" value="1" />
                </el-select>
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>费别：</span>
                <el-select
                  v-model="formInfo.chargeType"
                  placeholder="请选择费别"
                  style="width: calc(100% - 100px)"
                  class="select-item"
                  filterable
                  clearable
                  default-first-option
                  :disabled="formInfo.joinUnit == 1 || allDisabled"
                >
                  <el-option label="团检" value="团检" />
                  <el-option label="个检" value="个检" />
                </el-select>
              </div>
              <!-- <div class="left_form">
                <span>工号：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.workNumber"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                />
              </div> -->
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>联系电话：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.phoneNumberHome"
                  placeholder="请输入电话"
                  class="select-item"
                  clearable
                  @blur="checkPhone(formInfo.phoneNumberHome)"
                  :disabled="allDisabled"
                />
              </div>
              <div class="left_form">
                <span>国籍：</span>
                <el-select
                  v-model="formInfo.country"
                  placeholder="请选择国籍"
                  style="width: calc(100% - 100px)"
                  class="select-item"
                  filterable
                  clearable
                  default-first-option
                  :disabled="allDisabled"
                >
                  <el-option
                    v-for="item in CitizenShipListDates"
                    :key="item.countryCode"
                    :label="item.countryName"
                    :value="item.countryCode"
                  />
                </el-select>
              </div>
              <div class="left_form">
                <span>民族：</span>
                <el-select
                  v-model="formInfo.nation"
                  placeholder="请选择民族"
                  style="width: calc(100% - 100px)"
                  class="select-item"
                  filterable
                  clearable
                  default-first-option
                  :disabled="allDisabled"
                >
                  <el-option
                    v-for="item in NationListDates"
                    :key="item.nationCode"
                    :label="item.nationName"
                    :value="item.nationName"
                  />
                </el-select>
              </div>
              <div class="left_form">
                <span>
                  <!-- <b style="color: #ed2226">*</b> -->
                  出生地：</span
                >
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="birthPlaceName"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :loading="areaLoading"
                  @click="onShowDiagDialog"
                  :remote-method="remoteAreaMethod"
                  :disabled="allDisabled"
                >
                  <!-- 显示 areaName -->
                  <template #default>
                    {{
                      birthPlaceOptions.find((item) => item.areaCode === formInfo.birthPlace)
                        ?.areaName || ''
                    }}
                  </template>
                </el-input>
              </div>

              <div class="left_form" v-show="formInfo.peTypeName == '婚检'">
                <span
                  ><b style="color: #ed2226" v-show="formInfo.peTypeName == '婚检'">*</b
                  >婚检编号：</span
                >
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.premaritalCode"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </div>
              <div
                class="left_form"
                v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
              >
                <span
                  ><b
                    style="color: #ed2226"
                    v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
                    >*</b
                  >对象姓名：</span
                >
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.objectName"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </div>
              <div
                class="left_form"
                v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
              >
                <span
                  ><b
                    style="color: #ed2226"
                    v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
                    >*</b
                  >对象年龄：</span
                >
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.objectAge"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="left_form">
                <span>主索引：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.setCode"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  readonly
                />
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>体检类型：</span>
                <el-select
                  v-model="formInfo.peTypeName"
                  placeholder="体检类型"
                  style="width: calc(100% - 100px)"
                  class="select-item"
                  filterable
                  default-first-option
                  @change="changePeType(formInfo.peTypeName)"
                  :disabled="allDisabled"
                >
                  <el-option
                    v-for="item in petypeNameList"
                    :key="item.keyCode"
                    :label="item.keyValue"
                    :value="item.keyValue"
                  />
                </el-select>
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>证件类型：</span>
                <el-select
                  v-model="formInfo.idType"
                  placeholder="证件类型"
                  style="width: calc(100% - 100px)"
                  class="select-item"
                  filterable
                  default-first-option
                  :disabled="allDisabled"
                >
                  <el-option
                    v-for="item in IDtypeList"
                    :key="item.typeCode"
                    :label="item.typeName"
                    :value="item.typeCode"
                  />
                </el-select>
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>身份证号：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.idNo"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  @change="countbrith(formInfo.idNo)"
                  :disabled="allDisabled"
                />
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>年龄：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.age"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>婚姻状况：</span>
                <el-select
                  v-model="formInfo.maritalStatus"
                  placeholder="请选择婚姻状况"
                  style="width: calc(100% - 100px)"
                  class="select-item"
                  filterable
                  clearable
                  default-first-option
                  :disabled="allDisabled"
                >
                  <el-option label="未婚" value="未婚" />
                  <el-option label="已婚" value="已婚" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </div>
              <div class="left_form">
                <span>单位部门：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.department"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                />
              </div>
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>优先级：</span>
                <el-select
                  v-model="formInfo.peLevel"
                  placeholder="请选择优先级"
                  style="width: calc(100% - 100px)"
                  class="select-item"
                  filterable
                  clearable
                  default-first-option
                  :disabled="allDisabled"
                >
                  <el-option label="普通" value="普通" />
                  <el-option label="VIP" value="VIP" />
                  <el-option label="特别" value="特别" />
                </el-select>
              </div>
              <div class="left_form">
                <span>职业：</span>
                <el-select
                  v-model="formInfo.occupation"
                  placeholder="职业类型"
                  style="width: calc(100% - 100px)"
                  class="select-item"
                  filterable
                  default-first-option
                  :disabled="allDisabled"
                >
                  <el-option
                    v-for="item in occupationList"
                    :key="item.occupationCode"
                    :label="item.occupationName"
                    :value="item.occupationCode"
                  />
                </el-select>
              </div>
              <div
                class="left_form"
                v-show="
                  formInfo.peTypeName == '两癌筛查' ||
                  formInfo.peTypeName == '生育后关爱行动' ||
                  formInfo.peTypeName == '农村两癌筛查'
                "
              >
                <span
                  ><b style="color: #ed2226" v-show="formInfo.peTypeName == '两癌筛查'">*</b
                  >两癌编号：</span
                >
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.screeningCode"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </div>
              <div
                class="left_form"
                v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
              >
                <span style="width: 110px"
                  ><b
                    style="color: #ed2226"
                    v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
                    >*</b
                  >对象证件类型：</span
                >
                <el-select
                  v-model="formInfo.objectIdType"
                  placeholder="证件类型"
                  style="width: calc(100% - 110px)"
                  class="select-item"
                  filterable
                  default-first-option
                  :disabled="allDisabled"
                >
                  <el-option
                    v-for="item in IDtypeList"
                    :key="item.typeCode"
                    :label="item.typeName"
                    :value="item.typeCode"
                  />
                </el-select>
              </div>
              <div
                class="left_form"
                v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
              >
                <span style="width: 110px"
                  ><b
                    style="color: #ed2226"
                    v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
                    >*</b
                  >对象证件号码：</span
                >
                <el-input
                  style="width: calc(100% - 110px)"
                  v-model="formInfo.objectIdNo"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </div>
            </el-col>

            <el-col :span="8">
              <div class="right_touxiang" :class="allDisabled ? 'is-disabled' : ''">
                <div class="touxiang">
                  <el-upload
                    ref="uploadRef"
                    :limit="1"
                    accept=".jpg, .png, .gif"
                    drag
                    :headers="headers"
                    :action="url"
                    :on-success="handleFileSuccess"
                    class="avatar-uploader"
                    :show-file-list="false"
                  >
                    <!-- <i class="el-icon-upload"></i>
                    <div class="el-upload__text"> 将文件拖到此处，或 <em>点击上传</em> </div> -->

                    <img v-if="!formInfo.photo" class="per" :src="person" />
                    <img v-else class="per" :src="formInfo.photo" />
                    <template #tip>
                      <div class="el-upload__tip" style="color: red">
                        仅允许导入 jpg、png、gif 格式文件！
                      </div>
                    </template>
                    <!-- <template #file="{ file }">
                      <div class="upload-handle" @click.stop>
                        <div class="handle-icon" @click="handlePictureCardPreview(file)">
                          <Icon icon="ep:zoom-in" />
                          <span>查看</span>
                        </div>
                        <div class="handle-icon" @click="handleRemove(file)">
                          <Icon icon="ep:delete" />
                          <span>删除</span>
                        </div>
                      </div>
                    </template> -->
                  </el-upload>
                </div>

                <div
                  class="left_form"
                  v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
                >
                  <span
                    ><b
                      style="color: #ed2226"
                      v-show="
                        formInfo.peTypeName == '婚检' ||
                        formInfo.peTypeName == '孕前优生检查' ||
                        formInfo.peTypeName == '托幼体检'
                      "
                      >*</b
                    >工作单位：</span
                  >
                  <el-input
                    style="width: calc(100% - 100px)"
                    v-model="formInfo.unitInContract"
                    placeholder="请输入"
                    class="select-item"
                    clearable
                    :disabled="allDisabled"
                  />
                </div>
                <div
                  class="left_form"
                  v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
                >
                  <span>现住址 省：</span>
                  <el-input
                    style="width: calc(100% - 100px)"
                    v-model="formInfo.addressProvince"
                    placeholder="请输入"
                    class="select-item"
                    clearable
                    :disabled="allDisabled"
                  />
                </div>
                <div
                  class="left_form"
                  v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
                >
                  <span
                    ><b
                      style="color: #ed2226"
                      v-show="
                        formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'
                      "
                      >*</b
                    >市：</span
                  >
                  <el-input
                    style="width: calc(100% - 100px)"
                    v-model="formInfo.addressCity"
                    placeholder="请输入"
                    class="select-item"
                    clearable
                    :disabled="allDisabled"
                  />
                </div>
                <div
                  class="left_form"
                  v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
                >
                  <span
                    ><b
                      style="color: #ed2226"
                      v-show="
                        formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'
                      "
                      >*</b
                    >区/县：</span
                  >
                  <el-input
                    style="width: calc(100% - 100px)"
                    v-model="formInfo.addressDistrict"
                    placeholder="请输入"
                    class="select-item"
                    clearable
                    :disabled="allDisabled"
                  />
                </div>
                <div
                  class="left_form"
                  v-show="formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'"
                >
                  <span
                    ><b
                      style="color: #ed2226"
                      v-show="
                        formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查'
                      "
                      >*</b
                    >街道/乡：</span
                  >
                  <el-input
                    style="width: calc(100% - 100px)"
                    v-model="formInfo.addressStreet"
                    placeholder="请输入"
                    class="select-item"
                    clearable
                    :disabled="allDisabled"
                  />
                </div>
                <!-- <div>
                  <el-button
                    class="save"
                    @click="submitFileForm"
                    type="primary"
                    :disabled="formLoading"
                    >保存</el-button
                  >
                </div>
                <div>
                  <el-button class="shezhi" @click="readIdCard">
                    <img :src="shezhi" />设置
                  </el-button>
                </div> -->
              </div>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="9">
              
            </el-col>
          </el-row> -->
          <el-row>
            <!-- <el-col :span="18">
              <div class="left_form">
                <span><b style="color: #ed2226">*</b>出生地：</span>
                <el-input
                  v-model="birthPlaceName"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :loading="areaLoading"
                  @click="onShowDiagDialog"
                  :remote-method="remoteAreaMethod"
                  :disabled="allDisabled"
                >
                  <template #default>
                    {{
                      birthPlaceOptions.find((item) => item.areaCode === formInfo.birthPlace)
                        ?.areaName || ''
                    }}
                  </template>
                </el-input>
              </div>
            </el-col> -->
          </el-row>
          <!-- <el-row>
            <el-col :span="9">
              <div class="left_form">
                <span>自定编号：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.workno"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                />
              </div>
            </el-col>
            
          </el-row> -->
          <el-row>
            <el-col :span="16">
              <div class="left_form">
                <span>通讯地址：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.mailingAddress"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </div>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="9">
              <div class="left_form">
                <span>邮政编码：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.postcode"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                />
              </div>
            </el-col>
            <el-col :span="9">
              <div class="left_form">
                <span>邮箱：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.email"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                />
              </div>
              <div class="left_form">
                <span>网络密码：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.setCode"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                />
              </div>
            </el-col>
          </el-row> -->
          <!-- <el-row>
            <el-col :span="9">
              <div class="left_form">
                <span>体检类别：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.setCode"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                />
              </div>
            </el-col>
          </el-row> -->
          <!-- <el-row>
            <el-col :span="9">
              <div class="left_form">
                <span>卡号：</span>
                <el-input
                  style="width: calc(100% - 100px)"
                  v-model="formInfo.setCode"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                />
              </div>
            </el-col>
            <el-col :span="9">
              <div class="left_form">
                <el-checkbox v-model="checked1" label="是否使用卡支付" size="large" />
              </div>
            </el-col>
          </el-row> -->
          <div class="per_list" @click="showPersonList">患<br />者<br />列<br />表</div>
        </div>
      </div>
      <div class="con_right">
        <div>
          <div class="right_heard">
            <span>套餐选择</span>
          </div>
          <div class="taocan_search">
            <el-row>
              <el-col :span="12">
                <span class="span1">未选</span>
                <el-input
                  style="width: calc(100% - 38px)"
                  v-model="taocanSearch"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  @input="taocanFiter"
                  :disabled="allDisabled"
                />
              </el-col>
              <el-col :span="1"></el-col>
              <el-col :span="11">
                <!-- <span class="span1">已选</span>
                <el-input
                  style="width: calc(100% - 38px)"
                  v-model="formInfo.setCode"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                /> -->
              </el-col>
            </el-row>
          </div>
          <div
            class="checked_div"
            style="padding-bottom: 5px"
            :class="allDisabled ? 'is-disabled' : ''"
          >
            <el-row>
              <el-col :span="12" class="col">
                <div class="unChecked">
                  <div
                    class="div"
                    v-show="formInfo.appointPeExam"
                    v-for="item in shaixuanpeSetList"
                    :key="item.setCode"
                  >
                    <el-radio-group
                      v-model="checkedPeSetListData"
                      @change="handleItemsClick(item, checkedPeSetListData)"
                    >
                      <el-radio :label="item.setCode" size="large">{{ item.setName }}</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="1"> </el-col>
              <el-col
                :span="11"
                class="col"
                style="background-color: #eaf4fe; border-color: #85aef5"
              >
                <div class="isChecked">
                  <div
                    class="div"
                    style="width: 100%"
                    v-show="xuanzhongData && xuanzhongData.setCode"
                  >
                    <el-radio
                      :label="xuanzhongData.setCode"
                      @click="quxiaoItemsClick"
                      size="large"
                      >{{ xuanzhongData.setName }}</el-radio
                    >
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="width: 100%; height: 5px; background-color: #edf1fc"></div>
          <div class="right_heard">
            <span>项目组合选择</span>
          </div>
          <div class="tag-container" style="border-bottom: #cccccc 1px solid">
            <el-radio-group v-model="selectedCategory" :disabled="allDisabled">
              <el-radio-button
                v-for="item in categories"
                :key="item.className"
                :label="item.className"
                class="category-tag"
              >
                {{ item.className }}
              </el-radio-button>
            </el-radio-group>
          </div>
          <div class="taocan_search">
            <el-row>
              <el-col :span="12">
                <span class="span1">未选</span>
                <el-input
                  style="width: calc(100% - 38px)"
                  v-model="zuheSearch"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  @input="zuheFiter"
                  :disabled="allDisabled"
                />
              </el-col>
              <el-col :span="1"></el-col>
              <el-col :span="11">
                <span class="span1">已选</span>
                <el-input
                  style="width: calc(100% - 38px)"
                  v-model="yixuanzuhe"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  @input="yixuanzuheFiter"
                  :disabled="allDisabled"
                />
              </el-col>
            </el-row>
          </div>
          <div class="checked_div">
            <el-row>
              <el-col :span="12" class="col">
                <div
                  class="unChecked"
                  style="height: calc(100vh - 630px)"
                  :class="allDisabled ? 'is-disabled' : ''"
                >
                  <div
                    class="div"
                    v-show="formInfo.appointPeExam"
                    v-for="item in shaixuanAllDataList"
                    :key="item.itemAssemCode"
                  >
                    <el-checkbox-group
                      v-model="shaixuanChecked"
                      @change="shaixuanHandleItem(item, shaixuanChecked)"
                    >
                      <el-checkbox :label="item.itemAssemCode" size="large">
                        {{ item.itemAssemName }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="1"> </el-col>
              <el-col
                :span="11"
                class="col"
                style="background-color: #eaf4fe; border-color: #85aef5"
              >
                <div
                  class="isChecked"
                  style="height: calc(100vh - 630px)"
                  :class="allDisabled ? 'is-disabled' : ''"
                >
                  <div class="div" v-for="item in allDataSelected" :key="item.itemAssemCode">
                    <el-tooltip
                      effect="dark"
                      :content="`${item.itemAssemName}(${item.discountPrice}元)`"
                      placement="right"
                    >
                      <el-checkbox-group
                        v-model="xuanzhongChecked"
                        @change="xuanzhongHandleItem(item, xuanzhongChecked)"
                      >
                        <el-checkbox :label="item.itemAssemCode">
                          <span :style="item.setCode ? 'color:#3263fe' : ''">{{
                            item.itemAssemName
                          }}</span>
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="price">
            <el-row>
              <!-- <el-col :span="6">
                <span class="span1">单价：</span>
                <el-input
                  style="width: calc(100% - 72px)"
                  v-model="price"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                />
              </el-col> -->
              <el-col :span="8">
                <span class="span1">总金额：</span>
                <el-input
                  style="width: calc(100% - 72px)"
                  v-model="formInfo.totalCharges"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  disabled
                />
              </el-col>
              <!-- <el-col :span="8">
                <span class="span1">个检金额：</span>
                <el-input
                  style="width: calc(100% - 72px)"
                  v-model="formInfo.totalCharges"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </el-col> -->
              <!-- <el-col :span="8">
                <span class="span1">团检金额：</span>
                <el-input
                  style="width: calc(100% - 72px)"
                  v-model="formInfo.totalCharges"
                  placeholder="请输入"
                  class="select-item"
                  clearable
                  :disabled="allDisabled"
                />
              </el-col> -->
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <el-drawer
      class="per_drawer"
      v-model="personListdrawer"
      title="今日已登记患者列表"
      size="20%"
      direction="ltr"
    >
      <div>
        <el-table
          :data="personList"
          style="width: 100%"
          border
          highlight-current-row
          @row-dblclick="perListRowClick"
          height="calc(100vh - 120px)"
        >
          <el-table-column prop="peId" label="体检号" width="120px"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
        </el-table>
      </div>
    </el-drawer>
    <Dialog
      v-model="diagDialogVisible"
      width="600px"
      max-height="600px"
      :fullscreen="false"
      :close-on-click-modal="false"
      @close="closeVisble()"
    >
      <template #title>
        <div class="dialog-title">籍贯列表</div>
      </template>
      <div>
        <section class="flex mb-16px">
          <span class="!text-red-500">关键字：</span>
          <el-input
            placeholder="请输入关键字"
            size="small"
            class="!w-180px"
            :model-value="CityDictKey"
            @input="onChangeDiagList"
          />
        </section>
        <section class="max-h-400px overflow-scroll">
          <el-table
            ref="diagDialogTableRef"
            :data="CityXList"
            border
            style="width: 100%"
            row-class-name="cursor-pointer"
            @row-dblclick="dblclickDict"
            max-height="380"
          >
            <el-table-column
              align="center"
              :resizable="false"
              type="index"
              width="60"
              label="序号"
            />
            <el-table-column align="center" prop="areaCode" label="地区编码" width="90" />
            <el-table-column align="center" prop="areaName" label="地区名称" width="270" />
            <el-table-column align="center" prop="inputCode" label="拼音码" width="135" />
          </el-table>
        </section>
      </div>
    </Dialog>
    <Dialog
      append-to-body
      v-model="selectUnitCodeVisiable"
      title="单位选择"
      width="800"
      @close="selectUnitCodeVisiable = false"
      class="package-advice-container"
    >
      <div
        ><el-input
          ref="queryInput"
          class="queryInput !w-300px"
          v-model="keyWord"
          @input="handleQueryItem"
          autofocus="true"
          placeholder="请输入拼音码"
      /></div>
      <el-table
        :data="unitCodeList"
        border
        style="width: 100%; margin-top: 10px; height: 500px"
        highlight-current-row
        @row-dblclick="selectUnitCodeClick"
        ><el-table-column
          :resizable="false"
          align="center"
          label="单位代码"
          show-overflow-tooltip
          prop="unitCode"
          width="100" /><el-table-column
          :resizable="false"
          align="left"
          label="单位名称"
          show-overflow-tooltip
          prop="unitName" /><el-table-column
          :resizable="false"
          align="center"
          label="联系人"
          width="100"
          show-overflow-tooltip
          prop="connecter" /><el-table-column
          :resizable="false"
          align="center"
          label="联系电话"
          width="120"
          show-overflow-tooltip
          prop="phone" /><el-table-column
          :resizable="false"
          align="left"
          label="地址"
          width="140"
          show-overflow-tooltip
          prop="address" /><el-table-column
          :resizable="false"
          align="center"
          label="拼音码"
          width="100"
          show-overflow-tooltip
          prop="inputCode"
      /></el-table>
    </Dialog>
    <PrintZhiYinDan ref="printZhiYinDanRef" v-show="false" />
  </div>
</template>
<script setup lang="ts" name="perExamination">
import readCard from '@/assets/images/readCard.svg'
import report from '@/assets/images/report.svg'
import person from '@/assets/images/person.svg'
import shezhi from '@/assets/images/shezhi.svg'
import paizhao from '@/assets/images/paizhao.svg'
import * as Api from '@/api/systemSetting/PEPackage/index'
import { getAccessToken } from '@/utils/auth'
import {
  getPeUnitList,
  getPeUnitDict,
  getMaxPeId,
  selectPeVisitList,
  getPeRcptFeeDictList,
  queryDictByConfig,
  getPeSetList,
  // getPeSetItemUnselectList,
  getPeSetItemSelectedList,
  getPeItemAssembledList,
  createPePatInfo,
  updatePeAvatar,
  getUnitInfo,
  getPePatInfo
} from '@/api/PerPhyExamination/perExamination/index'
import dayjs from 'dayjs'
import { formatDate } from '@/utils/formatTime'
import { Search } from '@element-plus/icons-vue'
import PrintZhiYinDan from '@/views/PhyExamManage/PerPhyExamination/printGuidanceSheet/Index.vue'
import { ref } from 'vue'
import axios from 'axios'

const printZhiYinDanRef = ref()
const handlePrint = async (params) => {
  if (printZhiYinDanRef.value?.PrintZhiYinDan) {
    await printZhiYinDanRef.value.PrintZhiYinDan(params)
  } else {
    console.error('print 方法未定义或组件未加载')
  }
}
const url = import.meta.env.VITE_UPLOAD_URL
const headers = { Authorization: 'Bearer ' + getAccessToken() }
const CitizenShipListDates = ref<any>([]) //国籍
const NationListDates = ref<any>([]) //民族
const IDtypeList = ref<any>([]) //证件类型
const peSetList = ref<any>([]) //套餐列表
const shaixuanpeSetList = ref<any>([]) //筛选套餐列表

const checkedPeSetListData = ref<any>('') // 已选套餐列表
const data = ref({ path: '' })
const uploadRef = ref()
const formInfo = reactive({
  joinUnit: 0,
  unitCode: '',
  unitName: '',
  taxId: '',
  unitNumber: '',
  pePreDate: '',
  peId: '',
  name: '',
  dateOfBirth: '',
  photo: '',
  sex: '',
  peTypeName: '',
  chargeType: '',
  idType: '',
  idNo: '',
  age: '',
  maritalStatus: '',
  department: '',
  peLevel: '',
  country: '',
  nation: '',
  birthPlace: '',
  // workno: '',
  address: '',
  // email: '',
  // postcode: '',
  phoneNumberHome: '',
  appointPeExam: '',
  visitDate: '',
  setCode: '',
  totalCharges: 0,
  mailingAddress: '',
  unitVisitId: '',
  screeningCode: '',
  peVisitId: 1,
  objectName: '',
  premaritalCode: '',
  objectAge: '',
  objectIdNo: '',
  objectIdType: '',
  occupation: '',
  unitInContract: '',
  addressProvince: '',
  addressCity: '',
  addressDistrict: '',
  addressStreet: ''
  // freeFlag: ''
})
const price = ref(0) // 单价
const selectedCategory = ref('全部') // 当前选中分类
const categories = ref<any>([]) // 分类列表
const allDataUnselect = ref([]) // 可选项目列表
watch(selectedCategory, (newValue) => {
  console.log(newValue)
  if (formInfo.appointPeExam) {
    if (newValue === '全部') {
      getItemUnselectList(setCode.value)
    } else {
      getItemUnselectList(setCode.value, newValue)
    }
  }
  zuheSearch.value = ''
})
const unitInfo = ref<any>({})
// 根据单位编码查询报道人信息
const searchByUnitCode = async () => {
  if (formInfo.unitCode) {
    // let res = await getPeUnitDict({
    let res = await getUnitInfo({
      unitCode: formInfo.unitCode
    })
    if (res && res.unitName) {
      formInfo.unitName = res.unitName
      formInfo.unitCode = res.unitCode
      formInfo.unitVisitId = res.unitVisitId
      unitInfo.value = res
    } else {
      formInfo.unitName = ''
      formInfo.unitCode = ''
      formInfo.unitVisitId = ''
      unitInfo.value = {}
      ElMessage.warning('未查询到预约信息')
    }
    // await getList()
  }
}
const selectUnitCodeVisiable = ref(false)
// 点击单位row数据进行赋值操作
const selectUnitCodeClick = async (row) => {
  formInfo.unitCode = row.unitCode
  formInfo.unitName = row.unitName
  formInfo.unitVisitId = row.unitVisitId
  unitInfo.value = row
  selectUnitCodeVisiable.value = false
  // await getList()
}
const unitCodeList = ref<any>([])
const keyWord = ref('')
// 点击按钮查询单位代码和名称并打开弹框
const onFocusUnitCode = async () => {
  keyWord.value = ''
  handleQueryItem()
  selectUnitCodeVisiable.value = true
  nextTick(() => {
    queryInput.value.focus()
  })
}
//根据单位代码过滤单位列表
const handleQueryItem = async () => {
  unitCodeList.value = await getPeUnitList({
    // unitCodeList.value = await getUnitInfo({
    input: keyWord.value
    // unitCode: keyWord.value
  })
}
//查询的体检号
const searchPeId = ref<String>('')
// 根据体检号查询人员登记信息并赋值
const searchByPeId = () => {}
const joinUnitChange = () => {
  if (formInfo.joinUnit == 1) {
    formInfo.chargeType = '团检'
  } else {
    formInfo.chargeType = ''
    formInfo.unitCode = ''
    formInfo.unitName = ''
  }
}
const disabledDate = (time) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 设置为当天 00:00:00
  return time.getTime() < today.getTime() // 禁用今天之前的日期
}
const appointChange = (val) => {
  if (val) {
    formInfo.pePreDate = formatDate(new Date(), 'YYYY-MM-DD')
    formInfo.visitDate = formatDate(new Date(), 'YYYY-MM-DD')
  } else {
    formInfo.pePreDate = ''
    formInfo.visitDate = ''
    allDataSelected.value = []
    xuanzhongData.value = {}
  }
}
//根据体检类型筛选套餐分类
const changePeType = (val) => {
  if (val) {
    shaixuanpeSetList.value = peSetList.value.filter((item) => item.peTypeName == val)
  } else {
    shaixuanpeSetList.value = peSetList.value
  }
  console.log(val, 'ssssssss')
  if (val != '两癌筛查' || val == '生育后关爱行动' || val == '农村两癌筛查') {
    formInfo.screeningCode = ''
  }
  if (val != '婚检') {
    formInfo.premaritalCode = ''
    formInfo.objectName = ''
    formInfo.objectIdNo = ''
    formInfo.objectIdType = ''
    formInfo.objectAge = ''
    formInfo.occupation = ''
    formInfo.unitInContract = ''
    formInfo.addressProvince = ''
    formInfo.addressCity = ''
    formInfo.addressDistrict = ''
    formInfo.addressStreet = ''
  }
  if (val == '婚检' || val == '孕前优生检查') {
    formInfo.addressCity = '秦皇岛市'
    formInfo.addressDistrict = '北戴河区'
  }
}
//套餐编码
const setCode = ref({})
const xuanzhongData = ref({})

// 点击套餐行时触发
const handleItemsClick = async (row, val) => {
  console.log(row, val)
  xuanzhongData.value = row
  setCode.value = row.setCode
  if (xuanzhongData.value && xuanzhongData.value.setCode) {
    if (taocanSearch.value) {
      shaixuanpeSetList.value = shaixuanpeSetList.value.filter(
        (item) => item.setCode != row.setCode && item.peTypeName == formInfo.peTypeName
      )
    } else {
      shaixuanpeSetList.value = peSetList.value.filter(
        (item) => item.setCode != row.setCode && item.peTypeName == formInfo.peTypeName
      )
    }
  }
  await getItemUnselectList(
    row.setCode,
    selectedCategory.value == '全部' ? '' : selectedCategory.value
  )
  await getTaoCanList(row.setCode)
  shaixuanChecked.value = []
  xuanzhongChecked.value = []
}
const allDataSelected = ref([]) // 套餐已选项目列表
const getTaoCanList = async (setCode) => {
  const res = await getPeSetItemSelectedList({
    form: '',
    pageNo: 1,
    pageSize: 10000000,
    setCode: setCode
  })

  allDataSelected.value = res || []
  //此处增加setcode是为了区分是否是套餐内的项目
  if (allDataSelected.value.length > 0) {
    allDataSelected.value.forEach((item) => {
      item.setCode = setCode
    })
  }
  fuzhiAllDataSelected.value = res || []
  let num = 0
  allDataSelected.value.forEach((item) => {
    // num += item.personPrice * 100
    num += item.discountPrice * 100
  })
  formInfo.totalCharges = (num / 100).toFixed(2)
}
// 取消套餐行时触发
const quxiaoItemsClick = () => {
  xuanzhongData.value = {}
  checkedPeSetListData.value = ''
  allDataSelected.value = []
  shaixuanAllDataList.value = allDataUnselect.value
  shaixuanpeSetList.value = peSetList.value.filter((item) => item.peTypeName == formInfo.peTypeName)
}
// 获取分类
const getClass = async () => {
  await Api.getPeItemAssemClass().then((res) => {
    categories.value = res.filter((item) => item && item.className)
    categories.value = [{ className: '全部', value: 'all' }, ...categories.value]
  })
}
const shaixuanAllDataList = ref<any>([])
const shaixuanChecked = ref([])

// 获取可选项目
const getItemUnselectList = async (setCode, form = '') => {
  const res = await getPeItemAssembledList({
    pageNo: 1,
    pageSize: 10000000,
    // setCode: setCode || '',
    form: form || '',
    clinicFlag: 1
  })
  allDataUnselect.value = res.records || []
  shaixuanAllDataList.value = res.records || []
  if (allDataSelected.value.length > 0) {
    const allDataSelectedItemCodes = new Set(
      allDataSelected.value.map((item) => item.itemAssemCode)
    )
    shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  }
}
const shaixuanHandleItem = (item, checked) => {
  console.log(item, checked)
  allDataSelected.value.unshift(item)
  const allDataSelectedItemCodes = new Set(allDataSelected.value.map((item) => item.itemAssemCode))
  if (zuheSearch.value) {
    shaixuanAllDataList.value = shaixuanAllDataList.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  } else {
    shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  }
  let num = 0
  allDataSelected.value.forEach((item) => {
    // num += item.personPrice * 100
    num += item.discountPrice * 100
  })
  formInfo.totalCharges = (num / 100).toFixed(2)
  // xuanzhongData.value = {}
  shaixuanpeSetList.value = peSetList.value.filter((item) => item.peTypeName == formInfo.peTypeName)
  checkedPeSetListData.value = ''
  fuzhiAllDataSelected.value = allDataSelected.value
}
const xuanzhongChecked = ref([])
const xuanzhongHandleItem = (item, checked) => {
  console.log(item, checked)
  allDataSelected.value = allDataSelected.value.filter((item1) => {
    return item1.itemAssemCode !== item.itemAssemCode
  })
  if (item.setCode) {
    allDataSelected.value.forEach((item) => {
      item.setCode = null
    })
    xuanzhongData.value = {}
  }
  const allDataSelectedItemCodes = new Set(allDataSelected.value.map((item) => item.itemAssemCode))
  shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
    return !allDataSelectedItemCodes.has(item.itemAssemCode)
  })
  shaixuanChecked.value = []
  xuanzhongChecked.value = []
  // xuanzhongData.value = {}
  shaixuanpeSetList.value = peSetList.value.filter((item) => item.peTypeName == formInfo.peTypeName)
  checkedPeSetListData.value = ''
  let num = 0
  allDataSelected.value.forEach((item) => {
    // num += item.personPrice * 100
    num += item.discountPrice * 100
  })
  formInfo.totalCharges = (num / 100).toFixed(2)
}
// 筛选套餐列表
const taocanSearch = ref('')
const taocanFiter = () => {
  // if (xuanzhongData.value && xuanzhongData.value.setCode) {
  if (taocanSearch.value) {
    shaixuanpeSetList.value = shaixuanpeSetList.value.filter(
      (item) =>
        item.setCode != xuanzhongData.value.setCode && item.peTypeName == formInfo.peTypeName
    )
    shaixuanpeSetList.value = shaixuanpeSetList.value.filter((item) =>
      item.setName.includes(taocanSearch.value)
    )
  } else {
    shaixuanpeSetList.value = peSetList.value.filter(
      (item) =>
        item.setCode != xuanzhongData.value.setCode && item.peTypeName == formInfo.peTypeName
    )
    // shaixuanpeSetList.value = peSetList.value.filter((item) =>
    //   item.setName.includes(taocanSearch.value)
    // )
  }
  // }
}
//组合未选筛选
const zuheSearch = ref('')
const zuheFiter = () => {
  const allDataSelectedItemCodes = new Set(allDataSelected.value.map((item) => item.itemAssemCode))
  if (zuheSearch.value) {
    shaixuanAllDataList.value = allDataUnselect.value.filter((item) =>
      item.itemAssemName.includes(zuheSearch.value)
    )
    shaixuanAllDataList.value = shaixuanAllDataList.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  } else {
    shaixuanAllDataList.value = allDataUnselect.value.filter((item) => {
      return !allDataSelectedItemCodes.has(item.itemAssemCode)
    })
  }
}
//已选组合筛选
const yixuanzuhe = ref('')
const fuzhiAllDataSelected = ref([])
const yixuanzuheFiter = () => {
  if (yixuanzuhe.value) {
    allDataSelected.value = allDataSelected.value.filter((item) =>
      item.itemAssemName.includes(yixuanzuhe.value)
    )
  } else {
    allDataSelected.value = fuzhiAllDataSelected.value
  }
}
const checkPhone = (val) => {
  if (!(val && 11 <= val.length <= 12)) {
    ElMessage.error('请输入正确的手机号')
    return false
  }
  // let isTruePhone = validatePhoneNumber(val)
  // if (!isTruePhone) {
  // }
}
const validatePhoneNumber = (phoneNumberHome) => {
  // 正则表达式：以1开头，第二位是3-9的数字，后面跟9位数字
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phoneNumberHome)
}
// 保存信息
const saveDengJi = async () => {
  if (formInfo.joinUnit == 1) {
    if (!formInfo.unitCode) {
      ElMessage.error('单位代码不能为空')
      return
    } else if (!formInfo.unitName) {
      ElMessage.error('单位名称不能为空')
      return
    }
  }
  if (!formInfo.peId) {
    ElMessage.error('体检号不能为空')
    return
  } else if (!formInfo.name) {
    ElMessage.error('姓名不能为空')
    return
  } /*  else if (!formInfo.peTypeName) {
    ElMessage.error('体检类型不能为空')
    return
  } */ else if (!formInfo.idNo) {
    ElMessage.error('身份证号不能为空')
    return
  } else if (!formInfo.dateOfBirth) {
    ElMessage.error('出生日期不能为空')
    return
  } else if (!formInfo.age) {
    ElMessage.error('年龄不能为空')
    return
  } else if (!formInfo.sex) {
    ElMessage.error('性别不能为空')
    return
  }
  //  else if (!formInfo.maritalStatus) {
  //   ElMessage.error('婚姻状况不能为空')
  //   return
  // }
  else if (!formInfo.chargeType) {
    ElMessage.error('费别不能为空')
    return
  } else if (!formInfo.peLevel) {
    ElMessage.error('优先级不能为空')
    return
    // } else if (!formInfo.birthPlace) {
    //   ElMessage.error('出生地不能为空')
    //   return
  } else if (!formInfo.phoneNumberHome) {
    ElMessage.error('联系电话不能为空')
    return
  } else if (!formInfo.appointPeExam) {
    ElMessage.error('预约体检不能为空')
    return
  } else if (!formInfo.pePreDate) {
    ElMessage.error('预约日期不能为空')
    return
  } else if (!allDataSelected.value.length) {
    ElMessage.error('请选择体检项目')
    return
  } else if (
    (formInfo.peTypeName == '两癌筛查' ||
      formInfo.peTypeName == '生育后关爱行动' ||
      formInfo.peTypeName == '农村两癌筛查') &&
    !formInfo.screeningCode
  ) {
    ElMessage.error('两癌编码不能为空')
    return
  } else if (
    (formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查') &&
    !formInfo.objectName
  ) {
    ElMessage.error('对象名称不能为空')
    return
  } else if (formInfo.peTypeName == '婚检' && !formInfo.premaritalCode) {
    ElMessage.error('婚检编码不能为空')
    return
  } else if (
    (formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查') &&
    !formInfo.objectIdType
  ) {
    ElMessage.error('对象证件类型不能为空')
    return
  } else if (
    (formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查') &&
    !formInfo.objectIdNo
  ) {
    ElMessage.error('对象证件编码不能为空')
    return
  } else if (
    (formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查') &&
    !formInfo.objectAge
  ) {
    ElMessage.error('对象年龄不能为空')
    return
  } else if (
    (formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查') &&
    !formInfo.unitInContract
  ) {
    ElMessage.error('工作单位不能为空')
    return
  } else if (
    (formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查') &&
    !formInfo.addressCity
  ) {
    ElMessage.error('现住址市不能为空')
    return
  } else if (
    (formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查') &&
    !formInfo.addressDistrict
  ) {
    ElMessage.error('现住址区/县不能为空')
    return
  } else if (
    (formInfo.peTypeName == '婚检' || formInfo.peTypeName == '孕前优生检查') &&
    !formInfo.addressStreet
  ) {
    ElMessage.error('现住址街道/乡不能为空')
    return
  }

  let itemList = []
  let num = 0
  allDataSelected.value.forEach((item) => {
    itemList.push({
      itemCode: item.itemAssemCode,
      deptCode: item.peDeptCode,
      chartCode: item.chartCode,
      setCode: item.setCode || null
    })
    // num += item.personPrice * 100
    num += item.discountPrice * 100
  })
  formInfo.totalCharges = (num / 100).toFixed(2)
  formInfo.itemList = itemList
  console.log(allDataSelected.value, itemList, num)
  if (formInfo.joinUnit != 1) {
    formInfo.unitCode = '****'
  }
  formInfo.setCode = xuanzhongData.value.setCode || null
  if (formInfo.sex == '1') {
    formInfo.sex = '男'
  } else if (formInfo.sex == '0') {
    formInfo.sex = '女'
  }
  console.log('%c Line:1505 🍡 formInfo', 'color:#465975', formInfo)
  createPePatInfo(formInfo).then(async (res) => {
    ElMessage.success('保存成功')
    formInfo.peId = res.peId
    formInfo.peVisitId = res.peVisitId
    // // 获取 formInfo 的所有属性名
    // const keys = Object.keys(formInfo)

    // // 遍历属性名，重置属性值
    // keys.forEach((key) => {
    //   // 根据属性名重置属性值
    //   formInfo[key] = '' // 默认重置为空字符串，对于数字类型的属性需要特殊处理

    //   // 对于数字类型的属性，我们需要检查其初始值是否为 0，如果是，则保持为 0
    //   if (['joinUnit', 'totalCharges'].includes(key)) {
    //     // 假设 joinUnit 和 totalCharges 是数字类型
    //     formInfo[key] = 0
    //   }
    // })
    // // }
    // formInfo.peId = await getMaxPeId()
    // allDataSelected.value = []
    // shaixuanAllDataList.value = []
    await handlePrint(formInfo)
    clearMsg()
  })
}
const clearMsg = async () => {
  allDisabled.value = false
  // 获取 formInfo 的所有属性名
  const keys = Object.keys(formInfo)

  // 遍历属性名，重置属性值
  keys.forEach((key) => {
    // 根据属性名重置属性值
    formInfo[key] = '' // 默认重置为空字符串，对于数字类型的属性需要特殊处理

    // 对于数字类型的属性，我们需要检查其初始值是否为 0，如果是，则保持为 0
    if (['joinUnit', 'totalCharges'].includes(key)) {
      // 假设 joinUnit 和 totalCharges 是数字类型
      formInfo[key] = 0
    }
  })
  // }
  formInfo.peId = await getMaxPeId()
  allDataSelected.value = []
  shaixuanAllDataList.value = []
  xuanzhongData.value = {}
  formInfo.idType = IDtypeList.value[0].typeCode
  formInfo.peTypeName = petypeNameList.value[0].keyValue
  checkedPeSetListData.value = ''
  formInfo.unitCode = ''
  formInfo.photo = ''
  photoUrl.value = ''
  selectedCategory.value = '全部'
  await getItemUnselectList()
  await changePeType(formInfo.peTypeName)
}
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
/** 处理文件上传中 */
const handleFileUploadProgress = () => {
  formLoading.value = true // 禁止修改
}

/** 发起文件上传 */
const submitFileForm = () => {
  unref(uploadRef)?.submit()
}

/** 文件上传成功处理 */
const handleFileSuccess = (response, uploadFile) => {
  console.log('上传成功', response, uploadFile)
  // 清理
  formLoading.value = false
  unref(uploadRef)?.submit()
  // unref(uploadRef)?.submit()
  formInfo.photo = response.data
  // unref(uploadRef)?.clearFiles()
  // 提示成功，并刷新
  ElMessage.success('上传成功')
}
// 删除图片
const handleRemove = (file) => {
  console.log(file)
  formInfo.photo.value = ''
}

// 在 script setup 部分添加以下函数

// 解码 Base64 编码的 URL
const decodeBase64Url = (base64String: string): string => {
  try {
    return atob(base64String)
  } catch (error) {
    console.error('解码失败:', error)
    return ''
  }
}

// 获取图片 URL
const getImageUrl = (photoData: string) => {
  if (!photoData) return person.value

  // 检查是否是 Base64 编码的 URL (以 aHR0cD 开头是 http 的 Base64 编码)
  if (photoData.startsWith('aHR0cD')) {
    try {
      return decodeBase64Url(photoData)
    } catch (error) {
      console.error('解码图片 URL 失败:', error)
      return person.value
    }
  }

  // 如果已经是完整 URL
  if (photoData.startsWith('http')) {
    return photoData
  }

  // 如果是 base64 数据
  if (photoData.startsWith('data:image')) {
    return photoData
  }

  return person.value
}
const isVerifyID = ref(true)
//根据身份证号计算
const countbrith = async (value) => {
  if (isVerifyID.value) {
    let isTrueId = isValidIDCard(value)
    if (isTrueId) {
      if (formInfo.idNo && formInfo.idNo.length >= 6) {
        const year = formInfo.idNo.substring(6, 10)
        const month = formInfo.idNo.substring(10, 12)
        const day = formInfo.idNo.substring(12, 14)
        formInfo.dateOfBirth = `${year}-${month}-${day}`
        countCompute(formInfo.idNo)
        formInfo.peLevel = '普通'
        formInfo.nation = '汉族'
        formInfo.country = 'CN'
        formInfo.appointPeExam = true
        formInfo.pePreDate = formatDate(new Date(), 'YYYY-MM-DD')
        formInfo.visitDate = formatDate(new Date(), 'YYYY-MM-DD')
        if (formInfo.joinUnit != 1) {
          formInfo.chargeType = '个检'
        } else {
          formInfo.chargeType = '团检'
        }
      } else {
        // Object.assign(PatienInfo.value, {
        //   age: '',
        //   datebrith: '',
        //   sex: '',
        //   birthPlace: ''
        // })
      }
    } else {
      ElMessage.error('身份证号不正确!')
      return
    }
    try {
      const patInfo = await Api.getPatInfo({ idNo: value })
      if (patInfo.peVisitId !== '0') {
        formInfo.peVisitId = patInfo.peVisitId + 1
      }
      if (patInfo && patInfo.idNo) {
        // 使用接口返回值赋值
        formInfo.peId = patInfo.insuranceNoTj || (await getMaxPeId())
        formInfo.name = patInfo.name || ''
        formInfo.sex = patInfo.sex === '男' ? '1' : '0'
        formInfo.dateOfBirth = patInfo.dateOfBirth || ''
        // formInfo.birthPlace = patInfo.birthPlace || ''
        formInfo.mailingAddress = patInfo.mailingAddress || ''
        formInfo.phoneNumberHome = patInfo.phoneNumberHome || ''
        formInfo.photo = getImageUrl(patInfo.photo) || photoUrl.value || ''
        formInfo.department = patInfo.department || ''
        formInfo.screeningCode = patInfo.screeningCode || ''
        // formInfo.idType = IDtypeList.value[1]?.typeCode || '' // 默认证件类型
        const foundItem = IDtypeList.value.find((item) => item.typeCode === '01')
        formInfo.idType = foundItem ? foundItem.typeName : IDtypeList.value[1]?.typeName || ''
        formInfo.nation = patInfo.nation || '汉族'
        formInfo.country = patInfo.country || 'CN'
        // formInfo.pePreDate = patInfo.pePreDate || ''
        // formInfo.visitDate = patInfo.visitDate || ''
        formInfo.maritalStatus = patInfo.maritalStatus || ''
      }
    } catch (error) {
      console.log('%c error', 'color:#7f2b82', error)
    }
  } else if (formInfo.idNo && formInfo.idNo.length != 18) {
    ElMessage.error('身份证号不正确!')
  }
}
// 身份证校验码验证函数
const isValidIDCard = (id) => {
  // 1. 检查长度
  if (id.length !== 18) {
    return false
  }

  // 2. 检查出生日期码
  const birthDate = id.slice(6, 14)
  const date = new Date(birthDate.slice(0, 4), birthDate.slice(4, 6) - 1, birthDate.slice(6, 8))
  if (
    isNaN(date.getTime()) ||
    date.getFullYear() !== parseInt(birthDate.slice(0, 4), 10) ||
    date.getMonth() + 1 !== parseInt(birthDate.slice(4, 6), 10) ||
    date.getDate() !== parseInt(birthDate.slice(6, 8), 10)
  ) {
    return false
  }

  // 3. 计算校验码
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += parseInt(id[i], 10) * weights[i]
  }
  const mod = sum % 11
  const expectedCheckCode = checkCodes[mod]
  if (id[17].toUpperCase() !== expectedCheckCode) {
    return false
  }

  return true
}

// 示例测试
console.log(isValidIDCard('11010519491231002X')) // true
console.log(isValidIDCard('123456789012345678')) // false
const countCompute = (identityNo: string) => {
  const Place = parseInt(identityNo.substring(0, 6))
  if (identityNo.length >= 14) {
    const { dateOfBirth, age, sex } = calcAgeByID(identityNo)
    if ((identityNo = '')) {
      formInfo.dateOfBirth = ''
      formInfo.age = ''
      formInfo.sex = ''
    }
    formInfo.dateOfBirth = String(dateOfBirth)
    formInfo.age = String(age)
    formInfo.sex = String(sex)
  }

  remoteAreaMethod(Place.toString())
}
// 根据身份证号计算年龄
const ageLabel1 = ref('岁')
const ageLabel2 = ref('月')
const calcAgeByID = (identityNo: string) => {
  let birthYear = parseInt(identityNo.substring(6, 10))
  let birthMonth = identityNo.substring(10, 12)
  let birthDay = identityNo.substring(12, 14)
  // 处理15位身份证
  if (identityNo.length === 15) {
    birthYear = parseInt('19' + identityNo.substring(6, 8))
    birthMonth = identityNo.substring(8, 10)
    birthDay = identityNo.substring(10, 12)
  }
  let sex = ''
  // let dateOfBirth = birthYear + '-' + birthMonth + '-' + birthDay
  let dateOfBirth = dayjs(`${birthYear}-${birthMonth}-${birthDay}`).format('YYYY-MM-DD')
  const nowDate = new Date()
  const nowYear = nowDate.getFullYear()
  const nowMonth = nowDate.getMonth() + 1
  const nowDay = nowDate.getDate()
  const diffYear = nowYear - birthYear
  let diffMonth = nowMonth - birthMonth
  const diffDay = nowDay - birthDay + 1
  let age = diffYear
  let showMonth = '0'
  if (diffYear > 0) {
    ageLabel1.value = '岁'
    ageLabel2.value = '月'
    showMonth = diffMonth.toString()
    // 如果当前月份小于出生月份，则年减一
    if (diffDay < 0) {
      diffMonth -= 1
    }
    if (diffMonth < 0) {
      age -= 1
      showMonth = (12 + diffMonth).toString()
    }
    // 如果月份为0，则不显示
    if (diffMonth == 0) {
      showMonth = ''
    }
  } else {
    ageLabel1.value = '月'
    ageLabel2.value = '天'
    age = diffMonth
    showMonth = diffDay.toString()
    // 如果天数小于0
    if (diffDay < 0) {
      age -= 1
      const lastDay = getLastDayByMonth(birthYear, birthMonth)
      showMonth = (lastDay + diffDay).toString()
    }
    // 多余天数是0，则不显示
    if (diffDay == 0) {
      showMonth = ''
    }
  }
  // 计算性别
  if (+identityNo.substring(16, 17) % 2 === 1) {
    sex = '男'
  } else {
    sex = '女'
  }
  return { dateOfBirth, age, showMonth, sex }
}
//根据身份证号查询地区
const areaLoading = ref(false)
// 获取籍贯字典
interface BirthPlaceProp {
  areaName: string
  areaCode: string
}
const birthPlaceName = ref<string>('') // 用于页面展示的出生地名称
const birthPlaceOptions = ref<BirthPlaceProp[]>([])
const remoteAreaMethod = (query: string) => {
  if (query) {
    areaLoading.value = true
    queryDictByConfig({ keyWord: query, dictType: '地区字典' }).then((res) => {
      birthPlaceOptions.value = res
      areaLoading.value = false
      formInfo.birthPlace = birthPlaceOptions.value[0]?.areaCode || ''
      birthPlaceName.value = birthPlaceOptions.value[0]?.areaName || ''
    })
  } else {
    areaLoading.value = false
    birthPlaceOptions.value = []
    birthPlaceName.value = ''
  }
}

const diagDialogVisible = ref(false)
const CityDictKey = ref('')
const CityXList = ref<BirthPlaceProp[]>([])
const onShowDiagDialog = () => {
  diagDialogVisible.value = true
  onChangeDiagList('北京市')
}
const onChangeDiagList = (val) => {
  CityDictKey.value = val
  queryDictByConfig({ keyWord: val, dictType: '地区字典' }).then((res) => {
    CityXList.value = [...res]
  })
}
const dblclickDict = (row) => {
  formInfo.birthPlace = row.areaCode
  birthPlaceName.value = row.areaName
  // formInfo.birthPlace = row.areaName
  diagDialogVisible.value = false
  CityXList.value = []
  CityDictKey.value = ''
}
const closeVisble = () => {
  CityXList.value = []
  CityDictKey.value = ''
}
const handleTimeChange = (val) => {
  formInfo.visitDate = val
}
// 报道按钮
const personReport = () => {}
//患者列表
const personList = ref<any>([])
const personListdrawer = ref(false)
// 显示患者列表按钮
const showPersonList = async () => {
  await selectPeVisitList({
    preBeginDate: formatDate(new Date(), 'YYYY-MM-DD'),
    preEndDate: formatDate(new Date(), 'YYYY-MM-DD'),
    unitCode: '',
    unitVisitId: '',
    peId: '',
    peVisitId: '',
    idNo: '',
    number: '',
    name: ''
  }).then((res) => {
    personList.value = res || []
  })
  personListdrawer.value = true
}
//患者列表选中的患者数据
const personInfo = ref<any>({})
const setRowClassName = ({ row }) => {
  if (row.peId == personInfo.value.peId) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
//整个页面禁用
const allDisabled = ref(false)
//点击患者列表
const perListRowClick = (row) => {
  personInfo.value = row
  allDisabled.value = true
  getPePatInfo({ peId: row.peId }).then((res) => {
    // 使用Object.assign来合并对象，而不是重新创建
    Object.assign(formInfo, {
      joinUnit: row.joinUnit || 0,
      unitCode: row.unitCode || '',
      unitName: row.unitName || '',
      taxId: row.taxId || '',
      unitNumber: row.unitNumber || '',
      pePreDate: row.pePreDate || '',
      peId: row.peId || '',
      name: row.name || '',
      dateOfBirth: row.dateOfBirth || '',
      photo: row.photo || '',
      sex: row.sex || '',
      peTypeName: row.peTypeName || '',
      chargeType: row.chargeType || '',
      idType: row.idType || '',
      idNo: row.idNo || '',
      age: row.age || '',
      maritalStatus: row.maritalStatus || '',
      department: row.department || '',
      peLevel: row.peLevel || '',
      country: row.country || '',
      nation: row.nation || '',
      birthPlace: row.birthPlace || '',
      address: row.address || '',
      phoneNumberHome: row.phoneNumberHome || '',
      appointPeExam: row.appointPeExam || '',
      visitDate: row.visitDate || '',
      setCode: row.setCode || '',
      totalCharges: row.totalCharges || 0,
      mailingAddress: row.mailingAddress || 0
    })
    formInfo.peTypeName = res.selectedSets[0]?.peTypeName //体检类型
    formInfo.chargeType = res.chargeType //费别
    formInfo.country = res.country //国籍
    formInfo.nation = res.nation //民族
    formInfo.idType = res.idType //证件类型
    formInfo.birthPlace = res.birthPlace //出生地
    formInfo.totalCharges = res.totalCharges //价格
    xuanzhongData.value = res.selectedSets[0] ? res.selectedSets[0] : {} //套餐信息
    allDataSelected.value = res.selectedItems //选中项目
  })
  personListdrawer.value = false
}

//体检类型
const petypeNameList = ref<any>([])
//职业类型
const occupationList = ref<any>([])

onMounted(async () => {
  formInfo.peId = await getMaxPeId()
  await getClass()
  CitizenShipListDates.value = await queryDictByConfig({ dictType: '国家字典' })
  NationListDates.value = await queryDictByConfig({ dictType: '民族字典' })
  IDtypeList.value = await queryDictByConfig({ dictType: '医疗卡类型字典' })
  petypeNameList.value = await queryDictByConfig({
    dictType: '体检类型字典',
    cons: 'dict_name:体检类型'
  })
  occupationList.value = await queryDictByConfig({
    dictType: '职业分类字典'
  })
  // formInfo.idType = IDtypeList.value[0].typeCode
  const foundItem = IDtypeList.value.find((item) => item.typeCode === '01')
  if (foundItem) {
    formInfo.idType = foundItem.typeName
  } else {
    // 可选：处理未找到匹配项的情况
    formInfo.idType = IDtypeList.value[0].typeCode // 或者其他默认值
  }
  // 默认选中居民身份证(01)
  const defaultIdType = IDtypeList.value.find((item) => item.typeCode === '01')
  if (defaultIdType) {
    formInfo.idType = defaultIdType.typeCode
  } else {
    // 如果没有找到居民身份证，则默认选中第一项
    formInfo.idType = IDtypeList.value.length > 0 ? IDtypeList.value[0].typeCode : ''
  }

  peSetList.value = await getPeSetList({ displayFlag: '0,2', displayFlagGroup: [] })
  shaixuanpeSetList.value = peSetList.value
  formInfo.peTypeName = petypeNameList.value[0].keyValue
  changePeType(petypeNameList.value[0].keyValue)
  await getItemUnselectList('', '')
})
const photoUrl = ref()
// 上传身份证图片
const uploadIdCardImage = async () => {
  // 检查是否有读取到的身份证图片路径
  if (!base64Photo.value) {
    ElMessage.error('未读取到身份证图片')
    return
  }
  let uploadParams = {
    // file: IDCardFile
    file: base64Photo.value
  }
  try {
    photoUrl.value = ''
    await updatePeAvatar(uploadParams).then((res) => {
      if (res) {
        photoUrl.value = res
        formInfo.photo = res
        ElMessage.success('身份证图片上传成功')
        base64Photo.value = ''
      }
    })
  } catch (error) {
    console.error('上传身份证图片失败', error)
  }
}

// 存储读卡时获取的身份证图片路径
const idCardImagePath = ref('')
const base64Photo = ref() // 头像Base64数据
// 修改readIdCard方法，在读取身份证信息时保存图片路径
/* const readIdCard = async () => {
  // await axios.post('http://172.16.92.251:8187/ReadIdCard').then((res) => {
  await axios.post('/api-insurance/ReadIdCard').then((res) => {
    // 解析返回的数据
    if (res.data && typeof res.data === 'string') {
      jieQvShuJv(res)
    }
  })
} */

// 将本地图片路径转换为File对象的方法（示例实现）
const convertLocalImagePathToFile = (imagePath, fileName) => {
  return new Promise((resolve) => {
    // 注意：由于浏览器安全限制，直接访问本地文件路径通常是不允许的
    // 实际应用中可能需要通过后端API获取图片数据，或者使用其他方式

    // 这里只是一个示例，实际实现需要根据具体情况调整
    try {
      // 如果是Web环境，可能需要通过后端接口获取图片数据
      // 或者在读卡时直接获取图片的base64数据而不是文件路径

      // 模拟返回一个文件对象
      const file = new File([], fileName, { type: 'image/jpeg' })
      resolve(file)
    } catch (error) {
      console.error('转换图片文件失败', error)
      resolve(null)
    }
  })
}

// 如果读卡器能直接返回图片的base64数据，可以使用以下方法
const convertBase64ToFile = (base64Data, fileName = 'IdCardPhoto.jpeg') => {
  if (!base64Data) {
    throw new Error('无效的Base64数据')
  }
  try {
    // 1. 移除前缀
    let base64 = base64Data.replace(/^data:image\/[a-z]+;base64,/, '')

    // 2. 清理空白字符
    base64 = base64.replace(/\s/g, '')

    // 3. 补全 padding
    const padding = (4 - (base64.length % 4)) % 4
    base64 += '='.repeat(padding)

    // 4. 解码
    const byteCharacters = atob(base64)

    // 5. 转换为 Uint8Array
    const byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    // 6. 创建 Blob 和 File 对象
    const blob = new Blob(byteArrays, { type: 'image/jpeg' })
    return new File([blob], fileName, { type: 'image/jpeg' })
  } catch (error) {
    console.error('Base64转File失败', error)
    return null
  }
}
const jieQvShuJv = (res) => {
  const dataParts = res.data.split('|')

  if (dataParts.length >= 8) {
    // 提取数据
    const name = dataParts[3] // 姓名
    const sex = dataParts[4] // 性别
    const nation = dataParts[5] // 民族
    const birthDate = dataParts[6] // 出生日期
    const address = dataParts[7] // 通讯地址
    const idNo = dataParts[8] // 身份证号
    base64Photo.value = dataParts[19] // 头像Base64数据
    if (isObjectCard.value) {
      // 对象身份证读卡，填充对象信息字段
      formInfo.objectName = name
      formInfo.objectIdNo = idNo
      formInfo.objectIdType = '01' // 默认身份证类型
      // 计算对象年龄
      if (birthDate && birthDate.length === 8) {
        const year = birthDate.substring(0, 4)
        const month = birthDate.substring(4, 6)
        const day = birthDate.substring(6, 8)
        const birth = new Date(`${year}-${month}-${day}`)
        const today = new Date()
        let age = today.getFullYear() - birth.getFullYear()
        const m = today.getMonth() - birth.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          age--
        }
        formInfo.objectAge = age.toString()
      }
      // 重置标识
      isObjectCard.value = false
    } else {
      // 本人身份证读卡，填充本人信息字段
      formInfo.idNo = idNo
      countbrith(formInfo.idNo)
      formInfo.name = name
      formInfo.sex = sex === '男' ? '1' : '0'
      formInfo.nation = nation
      formInfo.mailingAddress = address
      if (birthDate && birthDate.length === 8) {
        const year = birthDate.substring(0, 4)
        const month = birthDate.substring(4, 6)
        const day = birthDate.substring(6, 8)
        formInfo.dateOfBirth = `${year}-${month}-${day}`
      }
      if (base64Photo.value) {
        uploadIdCardImage()
      }
    }
  }
}
// -------------------------------webSockets----------------------------------------
/**
 * 身份证读卡 WebSocket 连接管理
 */
class IDCardReader {
  private websocket: WebSocket | null = null
  private isConnected = false
  private serverUrl = 'ws://127.0.0.1:9001'

  // 连接状态映射
  private statusMap = {
    0: '正在连接',
    1: '已建立连接',
    2: '正在关闭连接',
    3: '已关闭连接'
  }

  /**
   * 建立 WebSocket 连接
   */
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        console.log('WebSocket 已连接')
        resolve()
        return
      }

      try {
        console.log('正在尝试连接 WebSocket:', this.serverUrl)
        this.websocket = new WebSocket(this.serverUrl)

        this.websocket.onopen = (event) => {
          console.log('WebSocket 连接已打开:', event)
          this.handleConnectionChange()
          resolve()
        }

        this.websocket.onmessage = (event) => {
          console.log('收到来自 WebSocket 的消息:', event.data)
          this.handleMessage(event)
          jieQvShuJv(event)
        }

        this.websocket.onclose = (event) => {
          console.log('WebSocket 连接已关闭:', event)
          this.handleConnectionChange()
        }

        this.websocket.onerror = (error) => {
          console.error('WebSocket 发生错误:', error)
          reject(new Error('WebSocket连接出错'))
        }
      } catch (error) {
        console.error('创建 WebSocket 连接失败:', error)
        reject(new Error('创建WebSocket连接失败'))
      }
    })
  }

  /**
   * 处理连接状态变化
   */
  private handleConnectionChange(): void {
    if (!this.websocket) return

    const state = this.websocket.readyState
    const statusText = this.statusMap[state] || '未知状态'
    console.log('WebSocket 连接状态已改变为:', statusText, '(代码:', state, ')')

    // 实际项目中应该用响应式状态管理，这里为了兼容现有代码使用DOM操作
    const partyLogElement = document.getElementById('partyLog')
    if (partyLogElement) {
      partyLogElement.value = statusText
    }

    if (state === 1) {
      this.isConnected = true
      const ocrBtnElement = document.getElementById('OcrRecognition')
      if (ocrBtnElement) {
        ocrBtnElement.innerHTML = '断开服务'
      }
    } else if (state === 3) {
      this.isConnected = false
    }
  }

  /**
   * 处理接收到的消息
   */
  private handleMessage(event: MessageEvent): void {
    if (event.data === 'failed to obtain ID card information') {
      console.warn('获取身份证信息失败')
      const messageElement = document.querySelector('#message')
      if (messageElement) {
        messageElement.innerHTML += `<p>接收数据: ${event.data}</p>`
      }
      return
    }

    const dataParts = event.data.split('|')
    console.log('解析身份证数据部分数量:', dataParts.length)

    if (dataParts.length >= 17) {
      console.log('成功解析身份证数据，正在填充表单字段')
      this.fillIDCardData(dataParts)
    } else {
      console.warn('收到意外的数据格式:', event.data)
      const partyLogElement = document.getElementById('partyLog')
      if (partyLogElement) {
        partyLogElement.value = event.data
      }
    }
  }

  /**
   * 填充身份证数据到表单
   */
  private fillIDCardData(data: string[]): void {
    console.log('正在将身份证数据填充到表单字段中')

    // 更新成功状态
    const partyLogElement = document.getElementById('partyLog')
    if (partyLogElement) {
      partyLogElement.value = '读卡成功'
    }

    // 映射数据到对应字段
    const fieldMapping = {
      IDCardType: data[2],
      partyName: data[3],
      gender: data[4],
      nation: data[5],
      bornDay: data[6],
      certAddress: data[7],
      certNumber: data[8],
      certOrg: data[9],
      effDate: data[10],
      expDate: data[11],
      IssuesNum: data[14],
      PassCheckID: data[15],
      ChineseName: data[16],
      PeopleCertVersion: data[17],
      NationCodeStr: data[18]
    }

    // 填充基本字段
    Object.entries(fieldMapping).forEach(([id, value]) => {
      const element = document.getElementById(id)
      if (element) {
        element.value = value
        console.log(`已填充字段 ${id}，值为: ${value}`)
      }
    })

    // 处理照片显示
    if (data[19]) {
      const photoElement = document.getElementById('PhotoDisplay') as HTMLImageElement
      if (photoElement) {
        photoElement.src = 'data:image/bmp;base64,' + data[19]
        window.open('photoElement.src')
        console.log('正在显示身份证照片')
      }
    }

    // 处理正反面照片（如果存在）
    if (data.length >= 21) {
      const frontPhotoElement = document.getElementById('FrontPhotoDisplay') as HTMLImageElement
      const backPhotoElement = document.getElementById('BackPhotoDisplay') as HTMLImageElement

      if (frontPhotoElement) {
        frontPhotoElement.src = 'data:image/jpeg;base64,' + data[20]
        console.log('正在显示正面照片')
      }

      if (backPhotoElement) {
        backPhotoElement.src = 'data:image/jpeg;base64,' + data[21]
        console.log('正在显示背面照片')
      }
    }
  }

  /**
   * 发送读卡指令
   */
  private sendCommand(command: string, timeout = 30): void {
    if (!this.isConnected || !this.websocket) {
      console.warn('WebSocket 未连接，无法发送命令')
      const partyLogElement = document.getElementById('partyLog')
      if (partyLogElement) {
        partyLogElement.value = '未连接服务'
      }
      return
    }

    console.log(`正在发送命令 ${command}，超时时间 ${timeout}`)
    this.clearData()
    const param = `timeout=${timeout}`
    const message = `${command}?${param}`
    this.websocket.send(message)
  }

  /**
   * 超时读卡
   */
  readWithTimeout(timeout = 30): void {
    console.log('执行超时读卡')
    this.sendCommand('02', timeout)
  }

  /**
   * 读取身份证
   */
  readIDCard(timeout = 30): void {
    console.log('执行读取身份证')
    this.sendCommand('03', timeout)
  }

  /**
   * 无判断读取身份证
   */
  readIDCardNoJudge(timeout = 30): void {
    console.log('执行无判断读取身份证')
    this.sendCommand('04', timeout)
  }

  /**
   * 读取SAM ID
   */
  readSAMID(timeout = 30): void {
    console.log('执行读取SAM ID')
    this.sendCommand('05', timeout)
  }

  /**
   * 清空数据
   */
  private clearData(): void {
    console.log('正在清空表单数据')

    const fields = [
      'partyLog',
      'partyName',
      'nation',
      'gender',
      'certAddress',
      'bornDay',
      'certNumber',
      'certOrg',
      'effDate',
      'expDate',
      'IssuesNum',
      'PassCheckID',
      'ChineseName',
      'PeopleCertVersion',
      'NationCodeStr'
    ]

    fields.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        element.value = ''
      }
    })

    // 清空照片
    const photoElements = ['PhotoDisplay', 'FrontPhotoDisplay', 'BackPhotoDisplay']
    photoElements.forEach((id) => {
      const element = document.getElementById(id) as HTMLImageElement
      if (element) {
        element.src = ''
      }
    })
  }

  /**
   * 关闭连接
   */
  disconnect(): void {
    console.log('正在断开 WebSocket 连接')

    if (this.websocket) {
      this.websocket.close()
      this.websocket = null
    }
    this.isConnected = false

    const ocrBtnElement = document.getElementById('OcrRecognition')
    if (ocrBtnElement) {
      ocrBtnElement.innerHTML = '连接服务'
    }
  }

  /**
   * 检查是否已连接
   */
  get connected(): boolean {
    return this.isConnected
  }
}

// 创建读卡器实例
const idCardReader = new IDCardReader()

/**
 * OCR识别功能 - 优化版本
 */
const isObjectCard = ref(false) // 是否为对象读卡
function OcrRecognition(isObject = false) {
  console.log('触发 OCR 识别，当前连接状态:', idCardReader.connected)
  // 设置读卡标识
  isObjectCard.value = isObject
  if (!idCardReader.connected) {
    console.log('正在连接身份证读卡器...')
    idCardReader
      .connect()
      .then(() => {
        console.log('成功连接身份证读卡器，开始读卡')
        // 连接成功后自动读卡
        idCardReader.readIDCard()
      })
      .catch((error) => {
        console.error('连接身份证读卡器失败:', error)
        const partyLogElement = document.getElementById('partyLog')
        if (partyLogElement) {
          partyLogElement.value = '连接读卡器失败: ' + error.message
        }
      })
  } else {
    // 如果已经连接，则直接读卡，而不是断开连接
    console.log('身份证读卡器已连接，直接开始读卡')
    idCardReader.readIDCard()
  }
}

// 获取单位Code
const UnitList = ref([])
const getUintCode = async () => {
  if (!formInfo.unitName) {
    formInfo.unitCode = ''
    return
  }
  UnitList.value = await getPeUnitList({
    input: ''
  })
  if (UnitList.value.length > 0) {
    // 精确匹配
    const exactMatch = UnitList.value.find((item) => item.unitName === formInfo.unitName)

    // 模糊匹配（如果没有精确匹配）
    // const fuzzyMatch = !exactMatch
    //   ? UnitList.value.find((item) => item.unitName.includes(formInfo.unitName))
    //   : null
    const matchedItem = exactMatch // || fuzzyMatch
    if (matchedItem) {
      formInfo.unitCode = matchedItem.unitCode
      // 可以同时设置单位名称等其他字段
      formInfo.unitName = matchedItem.unitName
    } else {
      // 没有找到匹配项时的处理
      formInfo.unitCode = ''
      ElMessage.warning('未找到匹配的单位')
    }
  } else {
    formInfo.unitCode = ''
    ElMessage.warning('未找到匹配的单位')
  }
}
</script>
<style lang="scss" scoped>
.per_exma {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 0;
  box-sizing: border-box;
  .exma_search {
    display: flex;
    align-items: center;
    height: 56px;
    background-color: #fff;
    .search_div {
      margin-left: 10px;
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
      }
      .save {
        background: #3473d1;
        color: #fff;
        border-color: #3473d1;
        padding: 0 20px;
      }
      .read {
        padding: 0 20px;
        color: #3473d1;
        border-color: #3473d1;
        display: flex;
        align-items: center;
        img {
          width: 14px;
          height: 14px;
          margin-right: 4px;
        }
      }
      .cunitInput {
        :deep(.el-input__wrapper) {
          border-radius: 4px 0px 0px 4px;
          border-right: none;
        }
      }
      .selectBtn {
        margin-left: 0;
        .el-button {
          position: relative;
          top: 0px;
          margin-left: -1px;
          background: #f5f7fa !important;
          color: #999 !important;
          border-radius: 0px 4px 4px 0px !important;
        }
      }
      .clear {
        background-color: #fff;
        border-color: #3473d1;
        color: #3473d1;
      }
    }
  }
  .exma_con {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    height: calc(100vh - 160px);
    .con_left {
      background-color: #fff;
      width: 49.8%;
      .left_heard {
        height: 40px;
        line-height: 40px;
        /* padding-left: 20px; */
        margin-bottom: 11px;
        border-bottom: 1px solid #c5dcff;
        span {
          display: inline-block;
          width: auto;
          padding: 0 20px;
          height: 40px;
          text-align: center;
          /* border-bottom: 2px solid #3473d1; */
          color: #3473d1;
          font-weight: bold;
        }
      }
      .left_con {
        position: relative;
        .left_form {
          display: flex;
          align-items: center;
          height: 50px;
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
            font-size: 14px;
            color: #333333;
          }
        }
        .per_list {
          position: absolute;
          left: 0;
          top: 35%;
          background-color: #3473d1;
          color: #fff;
          padding: 6px 4px;
          border-radius: 0 8px 8px 0;
          cursor: pointer;
          font-size: 12px;
          line-height: 16px;
        }
      }
      .right_touxiang {
        .left_form {
          display: flex;
          align-items: center;
          height: 50px;
          padding-right: 10px;
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
            font-size: 14px;
            color: #333333;
          }
        }
        :deep(.avatar-uploader .el-upload) {
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
          width: 160px;
          height: 202px;
          padding: 0;
          margin: 0 auto;
        }

        :deep(.el-upload-dragger) {
          padding: 0;
        }
        :deep(.upload-handle) {
          position: absolute;
          top: 0;
          right: 0;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
          background: rgb(0 0 0 / 60%);
          opacity: 0;
          transition: var(--el-transition-duration-fast);
          .handle-icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0 6%;
            color: aliceblue;
            .el-icon {
              margin-bottom: 15%;
              font-size: 140%;
            }
            span {
              font-size: 100%;
            }
          }
        }
        :deep(.el-upload-list__item) {
          &:hover {
            .upload-handle {
              opacity: 1;
            }
          }
        }
        .touxiang {
          width: 100%;
          text-align: center;
          margin-bottom: 22px;
          .per {
            width: 160px;
            height: 200px;
            margin: 0 auto;
          }
          .save {
            background-color: #3473d1;
            color: #fff;
            border-color: #3473d1;
          }
          .shezhi {
            color: #3473d1;
            border-color: #3473d1;
          }
          .el-button {
            width: 112px;
            img {
              width: 14px;
              height: 14px;
              margin-right: 4px;
            }
          }
        }
      }
    }
    .con_right {
      width: 49.8%;
      background-color: #fff;
      .right_heard {
        height: 40px;
        line-height: 40px;
        /* padding-left: 20px; */
        margin-bottom: 11px;
        border-bottom: 1px solid #c5dcff;
        span {
          display: inline-block;
          width: auto;
          padding: 0 20px;
          height: 38px;
          text-align: center;
          /* border-bottom: 2px solid #3473d1; */
          color: #3473d1;
          font-weight: bold;
        }
      }
      .taocan_search {
        padding: 0px 20px 6px 20px;
        span {
          color: #3473d1;
          font-size: 16px;
          font-weight: bold;
          display: inline-block;
          width: 38px;
        }
      }
      .checked_div {
        padding: 0 20px 10px 20px;
        .col {
          padding: 13px 24px;
          border: 1px solid #cccccc;
          border-radius: 4px;
        }
        .unChecked {
          height: 130px;
          width: 100%;
          overflow-y: auto;

          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: flex-start;
          gap: 0;
          /* 自定义滚动条样式（WebKit引擎浏览器） */
          &::-webkit-scrollbar {
            width: 8px; /* 滚动条的宽度 */
          }

          &::-webkit-scrollbar-thumb {
            /* background-color: #888; 滚动条滑块的颜色 */
            /* border-radius: 6px; 滑块圆角 */
          }

          &::-webkit-scrollbar-track {
            /* background-color: #f1f1f1; 滚动条轨道的颜色 */
          }
          .div {
            width: 49%;
            height: 30px;
            overflow: hidden;
            display: flex;
            align-items: center;
            word-break: break-all;
            white-space: nowrap;
          }
        }
        .isChecked {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: flex-start;
          gap: 0;

          /* 自定义滚动条样式（WebKit引擎浏览器） */
          &::-webkit-scrollbar {
            width: 8px; /* 滚动条的宽度 */
          }

          &::-webkit-scrollbar-thumb {
            /* background-color: #888; 滚动条滑块的颜色 */
            /* border-radius: 6px; 滑块圆角 */
          }

          &::-webkit-scrollbar-track {
            /* background-color: #f1f1f1; 滚动条轨道的颜色 */
          }
          .div {
            width: 49.5%;
            height: 30px;
            overflow: hidden;
            display: flex;
            align-items: center;
          }
          :deep(.el-checkbox) {
            height: 30px;
          }
        }
      }
      .tag-container {
        flex: 1;
        overflow-x: auto;
        margin: 0 20px;
        margin-bottom: 10px;
        /* 自定义滚动条样式（WebKit引擎浏览器） */
        &::-webkit-scrollbar {
          width: 8px; /* 滚动条的宽度 */
        }

        &::-webkit-scrollbar-thumb {
          /* background-color: #888; 滚动条滑块的颜色 */
          /* border-radius: 6px; 滑块圆角 */
        }

        &::-webkit-scrollbar-track {
          /* background-color: #f1f1f1; 滚动条轨道的颜色 */
        }
        .el-radio-group {
          display: flex;
          gap: 8px;
          flex-wrap: nowrap;
        }

        .category-tag {
          margin: 0 !important;

          :deep(.el-radio-button__inner) {
            padding: 8px 12px;
            border: none;
          }

          &.is-active {
            border-color: #3473d1;
            :deep(.el-radio-button__inner) {
              background: #3473d1;
              color: white;
            }
          }
        }
      }
      .price {
        padding: 0% 20px;

        .span1 {
          display: inline-block;
          width: 72px;
          text-align: right;
        }
      }
    }
  }
}
:deep(.per_drawer) {
  .el-drawer__header {
    background-color: #3473d1;
    color: #fff;
    font-size: 30px;
    margin-bottom: 0px;
    padding-bottom: 20px;
  }
}
.is-disabled {
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none;
}
</style>

<style scoped>
.id-card-upload-btn {
  margin-top: 10px;
  text-align: center;
}

.resetBtn {
  border: 1px solid #3473d1 !important;
  color: #3473d1 !important;
  background: #fff !important;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
}
</style>
