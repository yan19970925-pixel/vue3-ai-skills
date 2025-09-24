<template>
  <div class="doc_triage">
    <div class="triage_search">
      <div class="search1">
        <div class="div1">
          <span class="span1 !w-70px" style="text-align: right">体检号：</span>
          <el-input
            style="width: 160px"
            v-model="searchParams.peId"
            placeholder="请输入"
            class="select-item"
            clearable
            maxlength="50"
            @change="reportChange"
          />
        </div>
        <div class="div1">
          <span class="span1" style="width: 42px">姓名：</span>
          <el-input
            style="width: 130px"
            v-model="searchParams.name"
            placeholder="请输入"
            class="select-item"
            clearable
            maxlength="50"
            @change="reportChange"
          />
        </div>
        <div class="div1">
          <span class="span1" style="width: 70px">时间区间：</span>
          <el-date-picker
            type="date"
            style="display: flex; width: 140px"
            v-model="searchParams.startDate"
            value-format="YYYY-MM-DD"
          />
          <span class="ml-6px mr-6px">至</span>
          <el-date-picker
            type="date"
            style="display: flex; width: 140px"
            v-model="searchParams.endDate"
            value-format="YYYY-MM-DD"
          />
        </div>
        <div class="div1">
          <span class="span1">体检医生：</span>
          <el-select
            v-model="doctorCode"
            placeholder="请选择医生"
            style="width: calc(100% - 70px)"
            class="select-item"
            filterable
            clearable
            default-first-option
          >
            <el-option
              v-for="item in doctorList"
              :label="item.userName"
              :value="item.dbUser"
              :key="item.dbUser"
            />
          </el-select>
        </div>
        <div class="div1">
          <el-button @click="reportChange">查询</el-button>
          <el-button
            class="delReport"
            :disabled="everySearchData.resultStatus == '9'"
            @click="refuseCheck"
            >拒检</el-button
          >
          <!-- <el-button class="clearBtn" @click="clearSearch">清屏</el-button> -->
          <!-- <el-button class="read"> <img :src="dayin" />查询外部监查</el-button> -->
        </div>
        <div class="div1">
          <span class="span1">体检科室：</span>
          <el-select
            v-model="checkCodes"
            filterable
            placeholder="请选择"
            @change="checkCodesChange"
            style="width: calc(100% - 70px)"
          >
            <el-option
              v-for="item in checkDeptList"
              :key="item.peDeptCode"
              :label="item.peDeptName"
              :value="item.peDeptCode"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="triage_con">
      <div class="left_table">
        <div class="list_table">
          <div
            style="
              height: 34px;
              line-height: 34px;
              margin-bottom: 6px;
              border-bottom: 1px solid #c5dcff;
            "
          >
            <span
              style="
                display: inline-block;
                width: auto;
                padding: 0 20px;
                height: 36px;
                text-align: center;
                color: #3473d1;
                font-weight: 700;
              "
              >人员列表</span
            >
            <!-- <el-radio-group v-model="reportType" @change="reportChange">
              <el-radio label="1" size="large">当天的报到</el-radio>
              <el-radio label="2" size="large">前后六日的报到</el-radio>
            </el-radio-group> -->
          </div>
          <el-table
            :data="personDeptList"
            style="width: 100%"
            height="calc(100vh - 222px)"
            border
            ref="leftTable"
            @row-click="personalClick"
            highlight-current-row
            :row-class-name="setRowClassName"
          >
            <el-table-column
              label="完成标志"
              prop="finishedSign"
              align="center"
              width="90px"
              show-overflow-tooltip
              fixed="left"
            >
              <template #default="scope">
                <span v-if="scope.row.finishedSign == '完成'" style="color: #3263fe">{{
                  scope.row.finishedSign
                }}</span>
                <span v-if="scope.row.finishedSign == '未完成'" style="color: #f33d21">{{
                  scope.row.finishedSign
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="体检号"
              prop="peId"
              align="center"
              width="120px"
              show-overflow-tooltip
            />
            <el-table-column
              label="姓名"
              prop="name"
              align="center"
              width="120px"
              show-overflow-tooltip
            />
            <el-table-column
              label="预约日期"
              prop="pePreDate"
              align="center"
              width="140px"
              show-overflow-tooltip
            />
            <el-table-column
              label="次数"
              prop="peVisitId"
              align="center"
              width="60px"
              show-overflow-tooltip
            />
            <el-table-column
              label="年龄"
              prop="age"
              align="center"
              width="60px"
              show-overflow-tooltip
            />
            <el-table-column
              label="性别"
              prop="sex"
              align="center"
              width="60px"
              show-overflow-tooltip
            />
            <el-table-column
              label="婚姻"
              prop="maritalStatus"
              align="center"
              width="60px"
              show-overflow-tooltip
            />

            <!-- <el-table-column label="操作" width="120">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="deleteRow(scope.$index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
      <div class="right_table">
        <div class="right_top">
          <div class="top_t">
            <span
              v-for="(item, index) in checkPerDeptList"
              :key="item.peDeptCode"
              @click="changeActive(index, item.peDeptCode)"
              :class="active == index ? 'activeSpan' : ''"
            >
              <b
                v-if="item.flag == 0"
                style="
                  display: inline-block;
                  width: 12px;
                  height: 12px;
                  border: 1px solid #ededed;
                  border-radius: 2px;
                  margin-right: 2px;
                "
              ></b>
              <b
                v-else
                style="
                  display: inline-block;
                  width: 12px;
                  height: 12px;
                  border: 1px solid #3473d1;
                  border-radius: 2px;
                  background-color: #3473d1;
                  margin-right: 2px;
                "
              ></b>
              {{ item.peDeptName }}</span
            >
          </div>
          <div
            class="top_b"
            style="
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              align-content: flex-start;
              gap: 0;
            "
          >
            <!-- <div
              v-for="(item, index) in itemResultList"
              :key="index"
              :style="item[0].resultClass == '检验' ? 'width: 49.5%' : 'width:100%'"
            >
              <div v-if="item[0].resultClass == '检验'">
                <el-table :data="item">
                  <el-table-column
                    label="项目名称"
                    prop="itemName"
                    align="center"
                    show-overflow-tooltip
                  />
                  <el-table-column label="结果" width="140" align="center" show-overflow-tooltip>
                    <template #default="scope">
                      <el-input
                        v-model="scope.row.value"
                        style="width: 100%"
                        type="text"
                        placeholder="请输入"
                        maxlength="50"
                        :disabled="isCanDisableInput"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="参考值" width="100" align="center" show-overflow-tooltip>
                    <template #default="scope">
                      <span>{{
                        scope.row.lowerLimit && scope.row.upperLimit
                          ? scope.row.lowerLimit + '-' + scope.row.upperLimit
                          : ''
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    prop="unit"
                    align="center"
                    width="90px"
                    show-overflow-tooltip
                  />
                  <el-table-column label="I" align="center" width="80px" show-overflow-tooltip>
                    <template #default="scope">
                      <span
                        v-if="scope.row.abnormalIndicator == 'H'"
                        style="
                          color: #f33d21;
                          display: flex;
                          width: 100%;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <img :src="shang" style="width: 16px; height: 16px" />{{
                          scope.row.abnormalIndicator
                        }}</span
                      >
                      <span
                        v-if="scope.row.abnormalIndicator == 'L'"
                        style="
                          color: #3263fe;
                          display: flex;
                          width: 100%;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <img :src="xia" style="width: 16px; height: 16px" />{{
                          scope.row.abnormalIndicator
                        }}</span
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-if="item[0].resultClass == '字符'">
                <el-table :data="item" style="width: 100%">
                  <el-table-column
                    label="项目名称"
                    prop="itemName"
                    align="center"
                    width="160px"
                    show-overflow-tooltip
                  />
                  <el-table-column label="结果" align="center" show-overflow-tooltip>
                    <template #default="scope">
                      <el-input
                        v-model="scope.row.value"
                        style="width: 100%"
                        :autosize="{ minRows: 3, maxRows: 3 }"
                        type="textarea"
                        placeholder="请输入"
                        maxlength="200"
                        :disabled="isCanDisableInput"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    prop="unit"
                    align="center"
                    width="80px"
                    show-overflow-tooltip
                  />
                </el-table>
              </div>
              <div v-if="item[0].resultClass == '报告'">
                <el-table :data="item" style="width: 100%">
                  <el-table-column
                    label="项目名称"
                    prop="itemName"
                    align="center"
                    width="160px"
                    show-overflow-tooltip
                  />
                  <el-table-column label="结果" align="center" show-overflow-tooltip>
                    <template #default="scope">
                      <el-input
                        v-model="scope.row.value"
                        style="width: 100%"
                        :autosize="{ minRows: 3, maxRows: 3 }"
                        type="textarea"
                        placeholder="请输入"
                        maxlength="200"
                        :disabled="isCanDisableInput"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div> -->

            <!-- 将 #selectedCode 部分替换为以下代码 -->
            <div class="item-result-container" style="width: 100%">
              <!-- 左侧组合项目列表 -->
              <div class="assem-list-container" style="width: 15%">
                <!-- <div class="assem-list-title">组合项目列表</div> -->
                <el-table
                  :data="itemAssemLists"
                  height="calc(100vh - 558px)"
                  @row-click="handleAssemRowClick"
                  :row-class-name="setAssemRowClassName"
                  highlight-current-row
                  stripe
                  border
                >
                  <el-table-column
                    label="组合项目名称"
                    prop="itemAssemName"
                    show-overflow-tooltip
                  />
                </el-table>
              </div>

              <!-- 右侧项目详情 -->
              <div class="item-detail-container" style="width: 84%">
                <div
                  v-if="itemLists && itemLists.length > 0 && itemLists[0]?.resultClass == '检验'"
                  style="width: 100%"
                >
                  <el-table
                    :data="itemLists"
                    style="width: 100%"
                    height="calc(100vh - 558px)"
                    highlight-current-row
                    stripe
                    border
                  >
                    <el-table-column
                      label="项目名称"
                      prop="itemName"
                      align="center"
                      width="200px"
                      show-overflow-tooltip
                    />
                    <el-table-column label="结果" align="center" show-overflow-tooltip>
                      <template #default="scope">
                        <el-input
                          v-if="!scope.row.haveItemDesc || scope.row.haveItemDesc.length <= 0"
                          v-model="scope.row.value"
                          style="width: 100%"
                          type="text"
                          placeholder="请输入"
                          maxlength="50"
                          :disabled="isCanDisableInput"
                        />
                        <el-select
                          v-else
                          v-model="scope.row.value"
                          style="width: 100%"
                          placeholder="请选择"
                          :disabled="isCanDisableInput"
                          filterable
                          allow-create
                          default-first-option
                          clearable
                          @change="handleItemValueChange(scope.row)"
                        >
                          <el-option
                            v-for="item in scope.row.haveItemDesc"
                            :key="item.descContent"
                            :label="item.descContent"
                            :value="item.descContent"
                          >
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="参考值"
                      width="160px"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template #default="scope">
                        <span>{{
                          scope.row.lowerLimi !== null && scope.row.upperLimit !== null
                            ? scope.row.lowerLimit + '-' + scope.row.upperLimit
                            : ''
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="单位"
                      prop="unit"
                      align="center"
                      width="140px"
                      show-overflow-tooltip
                    />
                    <el-table-column label="I" align="center" width="80px" show-overflow-tooltip>
                      <template #default="scope">
                        <span
                          v-if="scope.row.abnormalIndicator == 'H'"
                          style="
                            color: #f33d21;
                            display: flex;
                            width: 100%;
                            align-items: center;
                            justify-content: center;
                          "
                        >
                          <img :src="shang" style="width: 16px; height: 16px" />{{
                            scope.row.abnormalIndicator
                          }}</span
                        >
                        <span
                          v-if="scope.row.abnormalIndicator == 'L'"
                          style="
                            color: #3263fe;
                            display: flex;
                            width: 100%;
                            align-items: center;
                            justify-content: center;
                          "
                        >
                          <img :src="xia" style="width: 16px; height: 16px" />{{
                            scope.row.abnormalIndicator
                          }}</span
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div
                  v-if="itemLists && itemLists.length > 0 && itemLists[0]?.resultClass == '字符'"
                  style="width: 100%"
                >
                  <el-table
                    :data="itemLists"
                    style="width: 100%"
                    height="calc(100vh - 558px)"
                    highlight-current-row
                    stripe
                    border
                  >
                    <el-table-column
                      label="项目名称"
                      prop="itemName"
                      align="center"
                      width="160px"
                      show-overflow-tooltip
                    />
                    <el-table-column label="结果" align="center" show-overflow-tooltip>
                      <template #default="scope">
                        <el-input
                          v-model="scope.row.value"
                          style="width: 100%"
                          :autosize="{ minRows: 3, maxRows: 3 }"
                          type="textarea"
                          placeholder="请输入"
                          maxlength="200"
                          :disabled="isCanDisableInput"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="单位"
                      prop="unit"
                      align="center"
                      width="80px"
                      show-overflow-tooltip
                    />
                  </el-table>
                </div>
                <div
                  v-if="itemLists && itemLists.length > 0 && itemLists[0]?.resultClass == '报告'"
                  style="width: 100%"
                >
                  <el-table
                    :data="itemLists"
                    style="width: 100%"
                    height="calc(100vh - 558px)"
                    highlight-current-row
                    stripe
                    border
                  >
                    <el-table-column
                      label="项目名称"
                      prop="itemName"
                      align="center"
                      width="160px"
                      show-overflow-tooltip
                    />
                    <el-table-column label="结果" align="center" show-overflow-tooltip>
                      <template #default="scope">
                        <el-input
                          v-model="scope.row.value"
                          style="width: 100%"
                          :autosize="{ minRows: 3, maxRows: 3 }"
                          type="textarea"
                          placeholder="请输入"
                          maxlength="200"
                          :disabled="isCanDisableInput"
                        />
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_bottom">
          <el-row>
            <el-col :span="12">
              <div class="div1">
                <span class="span" @click="openQuote('1', '常见病史', 'peDeptDisease')">引用</span>
                <span class="span1 !w-80px" style="text-align: right">病史：</span>
                <el-input
                  v-model="perItemData.mleHistory"
                  style="width: 90%"
                  :autosize="{ minRows: 3, maxRows: 3 }"
                  type="textarea"
                  placeholder="请输入"
                  maxlength="200"
                />
              </div>
              <div class="div1">
                <span class="span1 !w-80px" style="text-align: right">阳性体征：</span>
                <el-input
                  v-model="perItemData.mlePositive"
                  style="width: 90%"
                  :autosize="{ minRows: 3, maxRows: 3 }"
                  type="textarea"
                  placeholder="请输入"
                  maxlength="200"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="div1">
                <span class="span" @click="openQuoteDiag">引用</span>
                <span class="span1 !w-80px" style="text-align: right">初步诊断：</span>
                <el-input
                  v-model="perItemData.mleAbnormal"
                  style="width: 90%"
                  :autosize="{ minRows: 3, maxRows: 3 }"
                  type="textarea"
                  placeholder="请输入"
                  maxlength="200"
                />
              </div>
              <div class="div1">
                <span class="span" @click="openQuote('2', '科室建议', 'peDeptSuggest')">引用</span>
                <span class="span1 !w-80px" style="text-align: right">体检建议：</span>
                <el-input
                  v-model="perItemData.mleSuggest"
                  style="width: 90%"
                  :autosize="{ minRows: 3, maxRows: 3 }"
                  type="textarea"
                  placeholder="请输入"
                  maxlength="200"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="div1">
                <span class="span" @click="openQuote('3', '科室小结', 'peDeptConclusion')"
                  >引用</span
                >
                <span class="span1 !w-80px" style="text-align: right">科室小结：</span>
                <el-input
                  v-model="perItemData.mleConclusion"
                  style="width: 90%"
                  :autosize="{ minRows: 3, maxRows: 3 }"
                  type="textarea"
                  placeholder="请输入"
                  maxlength="200"
                />
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="right_btn">
          <el-button
            type="primary"
            :disabled="everySearchData.resultStatus == '9'"
            class="btn1"
            @click="save"
            >保存</el-button
          >
        </div>
      </div>
    </div>
    <Dialog
      v-model="quoteVisible"
      :title="quoteTitle"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      top="25vh"
      width="450px"
    >
      <div class="quoteCon">
        <el-table
          :data="quoteTableData"
          style="width: 100%"
          height="400px"
          border
          @selection-change="quoteSelectionChange"
        >
          <el-table-column :resizable="false" type="selection" width="55" align="center" />
          <el-table-column
            label="内容"
            :prop="quoteItemName"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <div class="quoteBtn">
          <el-button type="primary" @click="quoteConfirm(quoteTitle)">确定</el-button>
          <el-button @click="quoteCancel">取消</el-button>
        </div>
      </div>
    </Dialog>
    <Dialog
      v-model="quoteDiagVisible"
      title="引用初步诊断"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      top="25vh"
      width="800px"
    >
      <div class="quoteDiag_con">
        <div class="con_input">
          <el-input v-model="diagMsg" placeholder="请输入内容"></el-input>
          <el-button type="primary" @click="comfierDiag">确定</el-button>
          <el-button type="primary" @click="cancleDiag">取消</el-button>
        </div>
        <div class="con_nr">
          <div class="nr_left">
            <el-table
              :data="diagTableData"
              style="width: 100%"
              height="400px"
              border
              highlight-current-row
              @row-click="diagTableClick"
              :row-class-name="setDiagTableRowClassName"
            >
              <el-table-column
                label="诊断分组名"
                prop="peDeptName"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </div>
          <div class="nr_cen">
            <div class="cen_1">
              <div class="js_t">方位</div>
              <el-input
                type="textarea"
                :rows="4"
                v-model="direction"
                placeholder=""
                readonly
                @click="addMsgClick(direction)"
              ></el-input>
            </div>
            <div class="cen_1">
              <div class="js_t">程度</div>
              <el-input
                type="textarea"
                :rows="4"
                v-model="degree"
                placeholder=""
                readonly
                @click="addMsgClick(degree)"
              ></el-input>
            </div>
            <div class="cen_1">
              <div class="js_t">类别</div>
              <el-input
                type="textarea"
                :rows="4"
                v-model="category"
                placeholder=""
                readonly
                @click="addMsgClick(category)"
              ></el-input>
            </div>
          </div>
          <div class="nr_right">
            <el-table
              :data="diagDiseaseData"
              style="width: 100%"
              height="400px"
              border
              @row-click="diagDiseaseClick"
              :row-class-name="diagDiseaseRowClassName"
              highlight-current-row
            >
              <el-table-column label="名称" prop="diagName" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </Dialog>
    <el-dialog
      v-model="deptVisible"
      title="选择科室"
      :show-close="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      top="25vh"
      width="300px"
    >
      <div class="dept_con">
        <span class="span1">体检科室：</span>
        <el-select v-model="checkCodes" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in checkDeptList"
            :key="item.peDeptCode"
            :label="item.peDeptName"
            :value="item.peDeptCode"
          ></el-option>
        </el-select>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="comfier()">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="finalConfirmVisible"
      title="保存校验"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      top="15vh"
      width="600px"
    >
      <div class="final_con">
        <div class="con_top">
          <div class="div_l">
            <div class="l_title">
              <span class="span1">诊断及阳性：</span>
              <el-button type="primary" @click="delDiags">删除</el-button>
            </div>
            <div class="l_cont">
              <div
                v-for="(item, index) in diaOrPosArr"
                :class="activeIndex == index + 1 ? 'activeClass' : ''"
                :key="index"
                class="l_cont_div"
                @click="delDataClick(item, index)"
              >
                <span class="span1" :style="item.checked ? 'color:#3263FE;' : 'color:#F33D21;'">{{
                  item.checked ? '阳性' : '诊断'
                }}</span>
                <el-checkbox
                  v-model="item.checked"
                  label=""
                  size="large"
                  @change="diagnosisChange()"
                ></el-checkbox>
                <span class="span2" :style="item.checked ? 'color:#3263FE;' : 'color:#F33D21;'">{{
                  item.value
                }}</span>
              </div>
            </div>
          </div>
          <div class="div_r">
            <div class="r_div1">{{ checkCodesName }}</div>
            <div class="r_div2">体检号：{{ searchParams.peId }}</div>
            <div class="r_div3">医生：{{ doctorName }}</div>
            <div class="r_div4">
              <el-button type="primary" @click="comfierSave()">确定</el-button>
              <el-button @click="finalConfirmVisible = false">取消</el-button>
            </div>
          </div>
        </div>
        <div class="con_bot">
          <div class="div_l">
            <span class="span1">科室小结</span>
            <div>
              <el-input
                v-model="perItemData.mleConclusion"
                style="width: 90%"
                :autosize="{ minRows: 8, maxRows: 8 }"
                type="textarea"
                placeholder="请输入"
                maxlength="200"
              />
            </div>
          </div>
          <div class="div_r">
            <span class="span1">体检建议</span>
            <div>
              <el-input
                v-model="perItemData.mleSuggest"
                style="width: 90%"
                :autosize="{ minRows: 8, maxRows: 8 }"
                type="textarea"
                placeholder="请输入"
                maxlength="200"
              />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { VuePrintNext } from 'vue-print-next'
import readCard from '@/assets/images/readCard.svg'
import report from '@/assets/images/report.svg'
import dayin from '@/assets/images/dayin.svg'
import noReport from '@/assets/images/noReport.svg'
import {
  getSelectedDept,
  getPePersonalDept,
  getPePersonalList,
  getPeDoctorByPeDeptCode,
  getPePersonalItem,
  getPePersonalInfo,
  toDayCheckIn,
  savePatientExam,
  refusePatientExam,
  getPeDeptDiseaseList,
  getPeDeptVSDiagGroupList,
  getPeDeptNormalDiagList,
  getPeDiagList,
  getPeDeptSuggestList,
  getPeDeptConclusion
} from '@/api/PerPhyExamination/DoctorTriageDesk/index'
import { useUserStore } from '@/store/modules/user'
import { formatDate } from '@/utils/formatTime'
import shang from '@/assets/imgs/shang.png'
import xia from '@/assets/imgs/xia.png'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const dbUser = userStore.getUser.username
const checkDeptList = ref([])
const deptVisible = ref(true)
const checkCodes = ref('')

const searchParams = reactive({
  peId: '',
  name: '',
  startDate: formatDate(new Date(), 'YYYY-MM-DD'),
  endDate: formatDate(new Date(), 'YYYY-MM-DD')
})
const leftTable = ref(null)
const active = ref(0)
const perItemData = ref({})
const itemResultList = ref([])
const splitItemList = ref([])
//是否禁用用户输入该科室下的体检项目
const isCanDisableInput = ref<Boolean>(false)
//受否含有据检项目
const isHaveRefusal = ref<Boolean>(false)
// 当前患者所有体检项目的分科结果查询点击
const changeActive = (index, peDeptCode) => {
  active.value = index
  let params = {
    peId: everySearchData.value.peId,
    peVisitId: everySearchData.value.peVisitId,
    dbUser: doctorCode.value,
    peDeptCode: peDeptCode,
    sex: ''
  }
  getPePersonalItem(params).then((res) => {
    // console.log(res, '项目和分科结果')
    perItemData.value = res
    if (perItemData.value.doctor) {
      ElMessageBox.alert(`已经存在由“${perItemData.value.doctor}“签名的体检结果!`, '提示', {
        confirmButtonText: '确定'
      })
    }
    if (
      perItemData.value.itemResultList &&
      perItemData.value.itemResultList.length > 0 &&
      perItemData.value.itemResultList[0].finishedSign == '拒检'
    ) {
      isHaveRefusal.value = true
      ElMessageBox.confirm(
        `体检号${everySearchData.value.peId} 已经拒绝过${
          checkPerDeptList.value[active.value].peDeptName
        }的体检项目，是否重新录入新的结果?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          isCanDisableInput.value = false
        })
        .catch(() => {
          isCanDisableInput.value = true
        })
    }
    isHaveRefusal.value = false
    // 使用 reduce 方法根据 resultClass 字段分组
    const groupedByResultClass = res.itemResultList.reduce((acc, item) => {
      const key = item.resultClass
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(item)
      return acc
    }, {})
    // 将分组后的对象转换为二维数组
    itemResultList.value = Object.values(groupedByResultClass)
    itemResultList.value = splitLargeGroups(itemResultList.value)
    // console.log(itemResultList.value, '分组后的数据')

    if (!itemResultList.value || itemResultList.value.length === 0) {
      itemAssemLists.value = []
    } else {
      const uniqueAssemMap = new Map()

      // 遍历所有项目，提取唯一的 assemCode 和 itemAssemName
      itemResultList.value.flat().forEach((item) => {
        if (item.assemCode && !uniqueAssemMap.has(item.assemCode)) {
          uniqueAssemMap.set(item.assemCode, {
            assemCode: item.assemCode,
            itemAssemName: item.itemAssemName
          })
        }
      })

      itemAssemLists.value = Array.from(uniqueAssemMap.values())
      if (itemAssemLists.value.length > 0) {
        handleAssemRowClick(itemAssemLists.value[0])
      }
    }
  })
}

// 在 script setup 中添加以下代码
const itemAssemLists = ref()

// 当前选中的组合项目
const selectedAssemCode = ref('')

// 根据选中的组合项目过滤出对应的项目列表
const filteredItemResultList = computed(() => {
  if (!selectedAssemCode.value) {
    // 如果没有选中组合项目，显示所有项目
    return itemResultList.value
  }

  // 过滤出选中组合项目的所有项目
  return itemResultList.value
    .map((group) => {
      return group.filter((item) => item.assemCode === selectedAssemCode.value)
    })
    .filter((group) => group.length > 0)
})

// 设置默认选中的组合项目
watch(itemAssemLists, (newVal) => {
  if (newVal.length > 0 && !selectedAssemCode.value) {
    selectedAssemCode.value = newVal[0].assemCode
  }
})
const itemLists = ref()

// 在 script setup 中添加以下函数
const handleAssemRowClick = (row) => {
  selectedAssemCode.value = row.assemCode
  itemLists.value = itemResultList.value.flat().filter((item) => item.assemCode === row.assemCode)
}

const setAssemRowClassName = ({ row }) => {
  if (row.assemCode === selectedAssemCode.value) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}

function splitLargeGroups(itemResultList) {
  const result = []

  itemResultList.forEach((group) => {
    if (group[0].resultClass === '检验') {
      // 如果 `resultClass` 是 '检验'，则拆分 data 数组
      const chunkSize = 12
      // 拆分成多个子数组，每个最多 12 条数据
      for (let i = 0; i < group.length; i += chunkSize) {
        const chunk = group.slice(i, i + chunkSize)
        result.push(chunk)
      }
    } else {
      result.push(group)
    }
  })

  return result
}
const getDept = () => {
  getSelectedDept().then((res) => {
    checkDeptList.value = res
    if (checkCodes.value == '') {
      checkCodes.value = checkDeptList.value[0].peDeptCode
    }
  })
}
const comfier = async (row) => {
  if (checkCodes.value) {
    deptVisible.value = false
    await getDoctorList()
    await reportChange()
    reportType.value = '1'
  } else {
    ElMessage.error('请选择科室')
    return
  }
}
const checkCodesChange = async (val) => {
  await reportChange()
  reportType.value = '1'
  searchParams.peId = ''
  personCode.value = ''
  itemLists.value = []
  itemResultList.value = []
}
const personCode = ref('')
const doctorList = ref([])
const doctorCode = ref('')
const getDoctorList = () => {
  let params = {
    peDeptCode: checkCodes.value
  }
  getPeDoctorByPeDeptCode(params).then((res) => {
    // console.log(res, '医生列表')
    doctorList.value = res
  })
}
const everySearchData = ref({})
const personDeptList = ref([])
const checkPerDeptList = ref([])
const getPerInfoMsg = () => {
  itemLists.value = []
  itemAssemLists.value = []
  // if (searchParams.peId || personCode.value) {
  //   searchParams.peId = personCode.value ? personCode.value : searchParams.peId
  // let params = {
  //   peId: searchParams.peId ? searchParams.peId : personCode.value,
  //   name: '',
  //   peDeptCode: checkCodes.value,
  //   peVisitId: everySearchData.value.peVisitId || ''
  // }
  // getPePersonalInfo(params).then((res) => {
  //   // console.log(res, '当前人的信息')
  //   if (res && res.length > 0) {
  //     everySearchData.value = res[0]
  //     if (personDeptList.value && personDeptList.value.length > 0) {
  //       // 检查 res 中的 peid 是否与 personDeptList.value 中的任何一项重复
  //       const isUnique = personDeptList.value.every((item) => item.peId != res[0].peId)

  //       // 如果唯一，则添加到 personDeptList.value 中
  //       if (isUnique) {
  //         personDeptList.value.push(res[0])
  //       }
  //       // console.log(personDeptList.value, 'personDeptList')
  //     } else {
  //       personDeptList.value = res
  //     }
  if (everySearchData.value && everySearchData.value.peId) {
    let params2 = {
      peId: everySearchData.value.peId,
      peVisitId: everySearchData.value.peVisitId,
      dbUser: doctorCode.value,
      peDeptCode: checkCodes.value,
      sex: ''
    }
    getPePersonalDept(params2).then((res) => {
      // console.log(res, '当前人的科室信息')
      checkPerDeptList.value = res
      if (res && res.length > 0) {
        let checkCodesIndex = checkPerDeptList.value.findIndex(
          (item) => item.peDeptCode == checkCodes.value
        )
        if (checkCodesIndex != -1) {
          changeActive(checkCodesIndex, checkPerDeptList.value[checkCodesIndex].peDeptCode)
        } else {
          changeActive(0, checkPerDeptList.value[0].peDeptCode)
        }
      }
    })
  }
  // }
  // })
  // }
}
const reportType = ref('')
const reportChange = () => {
  let params = {
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
    peDeptCode: checkCodes.value,
    name: searchParams.name,
    peId: searchParams.peId
  }
  // if (val == '1') {
  //   params.startDate = formatDate(new Date(), 'YYYY-MM-DD')
  //   params.endDate = formatDate(new Date(), 'YYYY-MM-DD')
  // } else if (val == '2') {
  //   // 获取当前日期
  //   const currentDate = new Date()
  //   // 计算开始日期（当前日期减去6天）
  //   const startDate = new Date(currentDate)
  //   startDate.setDate(startDate.getDate() - 6)

  //   // 计算结束日期（当前日期加上6天）
  //   const endDate = new Date(currentDate)
  //   endDate.setDate(endDate.getDate() + 6)
  //   params.startDate = formatDate(startDate, 'YYYY-MM-DD')
  //   params.endDate = formatDate(endDate, 'YYYY-MM-DD')
  // }
  toDayCheckIn(params).then((res) => {
    // console.log(res, '当天挂号信息')
    personDeptList.value = res
    if (res && res.length > 0) {
      personCode.value = res[0].peId
      everySearchData.value = res[0]
      personalClick(res[0])
    } else {
      perItemData.value = []
      checkPerDeptList.value = []
      itemResultList.value = []
    }
  })
}
const personalClick = (row) => {
  everySearchData.value = row
  personCode.value = row.peId
  getPerInfoMsg()
}
const setRowClassName = ({ row }) => {
  if (
    row.peId == everySearchData.value.peId &&
    row.peVisitId == everySearchData.value.peVisitId &&
    row.finishedSign == everySearchData.value.finishedSign
  ) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
const finalConfirmVisible = ref(false)
const diaOrPosArr = ref([])
const doctorName = ref('')
const checkCodesName = ref('')
// const mleSuggestArr = ref([])
const save = () => {
  if (
    everySearchData.value.resultStatus == '9' &&
    !isCanDisableInput.value &&
    !isHaveRefusal.value &&
    !route.query &&
    !route.query.peId
  ) {
    ElMessageBox.alert(
      `体检结果已由主检医生最终审核。您已不能修改分科结果，请通知主检医生需要修改的内容!`,
      '提示',
      {
        confirmButtonText: '确定'
      }
    )
  } else {
    let mlePositive = perItemData.value.mlePositive?.replace(/\r?\n/g, '\r\n'),
      mleAbnormal = perItemData.value.mleAbnormal?.replace(/\r?\n/g, '\r\n'),
      mlePositiveArr = mlePositive ? mlePositive.split('\r\n') : [],
      mleAbnormalArr = mleAbnormal ? mleAbnormal.split('\r\n') : []
    diaOrPosArr.value = []
    mlePositiveArr.forEach((item, index) => {
      diaOrPosArr.value.push({ value: item, checked: true })
    })
    mleAbnormalArr.forEach((item, index) => {
      diaOrPosArr.value.push({ value: item, checked: false })
    })
    if (!doctorCode.value) {
      ElMessage.info('请先选择体检医生')
      return
    }
    doctorName.value = doctorList.value.find((item) => item.dbUser == doctorCode.value).userName
    checkCodesName.value = checkDeptList.value.find(
      (item) => item.peDeptCode == checkCodes.value
    ).peDeptName
    finalConfirmVisible.value = true
  }
}
const diagnosisChange = () => {
  let mlePositiveArr = [],
    mleAbnormalArr = []
  diaOrPosArr.value.forEach((item) => {
    if (item.checked) {
      mlePositiveArr.push(item.value)
    } else {
      mleAbnormalArr.push(item.value)
    }
  })
  perItemData.value.mlePositive = mlePositiveArr.join('\r\n')
  perItemData.value.mleAbnormal = mleAbnormalArr.join('\r\n')
  // console.log(perItemData.value.mlePositive, 'mlePositive')
  // console.log(perItemData.value.mleAbnormal, 'mleAbnormal')
}
const activeRow = ref({})
const activeIndex = ref(0)
const delDataClick = (item, index) => {
  activeIndex.value = index + 1
  activeRow.value = item
}
const delDiags = () => {
  if (activeRow.value && activeRow.value.value) {
    diaOrPosArr.value.splice(activeIndex.value - 1, 1)
    diagnosisChange()
    activeRow.value = {}
    activeIndex.value = 0
  } else {
    ElMessage.warning('请选择要删除的项')
  }
}
const comfierSave = () => {
  if (
    everySearchData.value &&
    everySearchData.value.peId &&
    everySearchData.value.peVisitId &&
    checkPerDeptList.value &&
    checkPerDeptList.value[active.value].peDeptCode
  ) {
    let params = {
      peId: everySearchData.value.peId,
      peVisitId: everySearchData.value.peVisitId,
      peDeptCode: checkPerDeptList.value[active.value].peDeptCode,
      doctorId: doctorCode.value,
      doctorName: doctorList.value.find((item) => item.dbUser == doctorCode.value).userName,
      deptResult: {
        mleHistory: perItemData.value.mleHistory,
        mlePositive: perItemData.value.mlePositive?.replace(/\r?\n/g, '\r\n') || '',
        mleAbnormal: perItemData.value.mleAbnormal?.replace(/\r?\n/g, '\r\n') || '',
        mleSuggest: perItemData.value.mleSuggest?.replace(/\r?\n/g, '\r\n') || '',
        mleConclusion: perItemData.value.mleConclusion,
        doctor: ''
      },
      itemResultList: [].concat(...itemResultList.value),
      ibChiefDoctor: '',
      unitCode: everySearchData.value.unitCode,
      unitVisitId: everySearchData.value.unitVisitId
    }
    if (perItemData.value.doctor && perItemData.value.doctor != params.doctorName) {
      ElMessageBox.confirm(
        `您将要修改由“${perItemData.value.doctor}”签名的体检结果并用“${params.doctorName}”签名新的结果，确认吗?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        savePatientExam(params).then((res) => {
          ElMessage.success('保存成功')
          finalConfirmVisible.value = false
          personalClick(everySearchData.value)
        })
      })
    } else {
      savePatientExam(params).then((res) => {
        ElMessage.success('保存成功')
        finalConfirmVisible.value = false
        personalClick(everySearchData.value)
      })
    }
  }
}
const refuseCheck = () => {
  if (
    everySearchData.value.peId &&
    everySearchData.value.peVisitId &&
    checkPerDeptList.value &&
    checkPerDeptList.value[active.value] &&
    checkPerDeptList.value[active.value].peDeptCode
  ) {
    let parmas = {
      peId: everySearchData.value.peId,
      peVisitId: everySearchData.value.peVisitId,
      deptCode: checkPerDeptList.value[active.value].peDeptCode
    }
    ElMessageBox.confirm(
      `确认拒绝${checkPerDeptList.value[active.value].peDeptName}的检查吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      refusePatientExam(parmas).then((res) => {
        ElMessage({
          type: 'success',
          message: '拒绝成功'
        })
        personalClick(everySearchData.value)
      })
    })
  }
}
//清屏
const clearSearch = async () => {
  await reportChange()
  reportType.value = '1'
  searchParams.peId = ''
  personCode.value = ''
}
// 引用弹框
const quoteVisible = ref(false)
const quoteTitle = ref('')
//引用弹框选中数据
const quoteSelectionData = ref([])
const quoteSelectionChange = (val) => {
  quoteSelectionData.value = val
}
//引用弹框表格数据
const quoteTableData = ref([])
//引用表格动态表头
const quoteItemName = ref('')
//点击引用打开弹框
const openQuote = (index, title, itemName) => {
  quoteTitle.value = title
  quoteItemName.value = itemName
  let peDeptName = checkDeptList.value.find(
    (item) => item.peDeptCode == checkCodes.value
  ).peDeptName
  if (index == '1') {
    getPeDeptDiseaseList({ peDeptName: peDeptName }).then((res) => {
      quoteTableData.value = res
    })
  } else if (index == '2') {
    getPeDeptSuggestList({ peDeptName: peDeptName }).then((res) => {
      quoteTableData.value = res
    })
  } else if (index == '3') {
    getPeDeptConclusion({ peDeptName: peDeptName }).then((res) => {
      quoteTableData.value = res
    })
  }
  quoteVisible.value = true
}
//确认引用按钮
const quoteConfirm = (title) => {
  if (title == '常见病史') {
    let checkedList = []
    quoteSelectionData.value.forEach((item) => {
      checkedList.push(item.peDeptDisease)
    })
    if (checkedList.length > 1) {
      if (perItemData.value.mleHistory) {
        perItemData.value.mleHistory =
          perItemData.value.mleHistory + '\r\n' + checkedList.join('，')
      } else {
        perItemData.value.mleHistory = checkedList.join('，')
      }
    } else if (checkedList.length == 1) {
      if (perItemData.value.mleHistory) {
        perItemData.value.mleHistory =
          perItemData.value.mleHistory + '\r\n' + checkedList.join('，')
      } else {
        perItemData.value.mleHistory = checkedList[0]
      }
    }
    quoteSelectionData.value = []
    quoteVisible.value = false
  } else if (title == '科室建议') {
    let checkedList = []
    quoteSelectionData.value.forEach((item) => {
      checkedList.push(item.peDeptSuggest)
    })
    if (checkedList.length > 1) {
      if (perItemData.value.mleSuggest) {
        perItemData.value.mleSuggest =
          perItemData.value.mleSuggest + '\r\n' + checkedList.join('，')
      } else {
        perItemData.value.mleSuggest = checkedList.join('，')
      }
    } else if (checkedList.length == 1) {
      if (perItemData.value.mleSuggest) {
        perItemData.value.mleSuggest =
          perItemData.value.mleSuggest + '\r\n' + checkedList.join('，')
      } else {
        perItemData.value.mleSuggest = checkedList[0]
      }
    }
    quoteSelectionData.value = []
    quoteVisible.value = false
  } else if (title == '科室小结') {
    let checkedList = []
    quoteSelectionData.value.forEach((item) => {
      checkedList.push(item.peDeptConclusion)
    })
    if (checkedList.length > 1) {
      if (perItemData.value.mleConclusion) {
        perItemData.value.mleConclusion =
          perItemData.value.mleConclusion + '\r\n' + checkedList.join('，')
      } else {
        perItemData.value.mleConclusion = checkedList.join('，')
      }
    } else if (checkedList.length == 1) {
      if (perItemData.value.mleConclusion) {
        perItemData.value.mleConclusion =
          perItemData.value.mleConclusion + '\r\n' + checkedList.join('，')
      } else {
        perItemData.value.mleConclusion = checkedList[0]
      }
    }
    quoteSelectionData.value = []
    quoteVisible.value = false
  }
}
//取消引用按钮
const quoteCancel = () => {
  quoteSelectionData.value = []
  quoteVisible.value = false
}

//初步诊断弹框
const quoteDiagVisible = ref(false)
//打开初步诊断弹框
const openQuoteDiag = () => {
  diagTableData.value = []
  let peDeptName = checkDeptList.value.find(
    (item) => item.peDeptCode == checkCodes.value
  ).peDeptName
  getPeDeptVSDiagGroupList({ peDeptName: peDeptName }).then((res) => {
    diagTableData.value.push({ id: 1, peDeptName: '常见疾病' })
    if (res.length > 0) {
      res.forEach((item) => {
        diagTableData.value.push({ peDeptName: item })
      })
    }
    diagTableClick(diagTableData.value[0])
    quoteDiagVisible.value = true
  })
}
//最终引用诊断数据
const diagMsg = ref('')
//引用诊断确认按钮
const comfierDiag = () => {
  if (diagMsg.value) {
    if (perItemData.value.mleAbnormal) {
      perItemData.value.mleAbnormal = perItemData.value.mleAbnormal + '\r\n' + diagMsg.value
    } else {
      perItemData.value.mleAbnormal = diagMsg.value
    }
  }
  quoteDiagVisible.value = false
}
//取消引用诊断按钮
const cancleDiag = () => {
  diagMsg.value = ''
  quoteDiagVisible.value = false
}
//分组诊断列表
const diagTableData = ref([])
//点击分组诊断数据
const diagTableRowData = ref({})
//分组诊断列表点击事件
const diagTableClick = (row) => {
  diagTableRowData.value = row
  if (row.id && row.id == 1) {
    let peDeptName = checkDeptList.value.find(
      (item) => item.peDeptCode == checkCodes.value
    ).peDeptName
    getPeDeptNormalDiagList({ peDeptName: peDeptName }).then((res) => {
      diagDiseaseData.value = res
    })
  } else {
    getPeDiagList({ diagCode: '', diagGroup: row.peDeptName }).then((res) => {
      diagDiseaseData.value = res
    })
  }
  diagDiseaseRowData.value = {}
  diagMsg.value = ''
}
//
const setDiagTableRowClassName = ({ row }) => {
  if (row.peDeptName == diagTableRowData.value.peDeptName) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
//方位
const direction = ref('')
//程度
const degree = ref('')
//类别
const category = ref('')
//分组疾病列表
const diagDiseaseData = ref([])
//疾病选中数据
const diagDiseaseRowData = ref({})
//疾病列表点击
const diagDiseaseClick = (row) => {
  diagDiseaseRowData.value = row
  direction.value = row.diagWhere
  degree.value = row.diagDegree
  category.value = row.diagClass
  diagMsg.value = row.diagName
}
//添加方位，程度，类别到最终引用数据
const addMsgClick = (val) => {
  let newDiagMsg = diagMsg.value
  let newVal = val ? val : ''
  diagMsg.value = newVal + newDiagMsg
}
//选中疾病列表高亮
const diagDiseaseRowClassName = ({ row }) => {
  if (row.diagCode && row.diagCode == diagDiseaseRowData.value.diagCode) {
    return 'table-checked-row-style'
  } else if (row.diageCode && row.diageCode == diagDiseaseRowData.value.diageCode) {
    return 'table-checked-row-style'
  }
  return 'text-black'
}
// 处理项目值变化
const handleItemValueChange = (row) => {
  // 确保值正确赋值到数据源
  const rowIndex = itemLists.value.findIndex((item) => item.itemCode === row.itemCode)
  if (rowIndex !== -1) {
    itemLists.value[rowIndex].value = row.value
  }

  // 同时更新 itemResultList 中的数据
  for (let i = 0; i < itemResultList.value.length; i++) {
    const groupIndex = itemResultList.value[i].findIndex((item) => item.itemCode === row.itemCode)
    if (groupIndex !== -1) {
      itemResultList.value[i][groupIndex].value = row.value
      break
    }
  }
}
const queryInfo = reactive({ peId: '', peVisitId: '', deptCode: '' })
onMounted(async () => {
  // getDept()
  await getSelectedDept({ dbUser: dbUser })
    .then((res) => {
      // console.log(res, 'res')
      checkDeptList.value = res
    })
    .catch((err) => {})
  doctorCode.value = dbUser
  // 优先从 sessionStorage 获取
  const storedQueryInfo = sessionStorage.getItem('doctorTriageQueryInfo')

  if (storedQueryInfo) {
    // 使用存储的参数
    const parsedQueryInfo = JSON.parse(storedQueryInfo)
    queryInfo.peId = parsedQueryInfo.peId || ''
    queryInfo.peVisitId = parsedQueryInfo.peVisitId || ''
    queryInfo.deptCode = parsedQueryInfo.deptCode || ''

    // 清除存储的数据
    sessionStorage.removeItem('doctorTriageQueryInfo')
  } else {
    // 从路由获取参数
    queryInfo.peId = route.query.peId || ''
    queryInfo.peVisitId = route.query.peVisitId || ''
    queryInfo.deptCode = route.query.deptCode || ''
    // queryInfo.deptName = route.query.deptName || ''

    // 如果有参数，存储到 sessionStorage
    if (queryInfo.peId || queryInfo.peVisitId || queryInfo.deptCode) {
      sessionStorage.setItem('doctorTriageQueryInfo', JSON.stringify(queryInfo))
    }
    clearQueryParams()
  }
  if (queryInfo.deptCode) {
    // 如果有传入科室代码，则设置 checkCodes
    checkCodes.value = queryInfo.deptCode
    // 确保科室列表已加载
    // await getDept()
  } else {
    doctorCode.value = dbUser
  }
  // 如果有传入体检号和次数，则自动查询
  if (queryInfo.peId && queryInfo.peVisitId) {
    searchParams.peId = queryInfo.peId
    personCode.value = queryInfo.peId
    everySearchData.value.peVisitId = queryInfo.peVisitId
    comfier()
  }
})
// 在获取完初始数据后调用
const clearQueryParams = () => {
  // 只保留非查询参数的路由信息
  const newQuery = { ...route.query }
  delete newQuery.peId
  delete newQuery.peVisitId
  delete newQuery.deptCode

  router
    .replace({
      path: route.path,
      query: newQuery
    })
    .catch((err) => {
      if (err.name !== 'NavigationDuplicated') {
        console.error('路由跳转错误:', err)
      }
    })
}
</script>
<style lang="scss" scoped>
.doc_triage {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 0;
  box-sizing: border-box;
  .triage_search {
    .search1 {
      padding: 16px 24px;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #fff;
      .div1 {
        margin-right: 12px;
        display: flex;
        align-items: center;
        .span1 {
          color: #333333;
          font-size: 14px;
          display: inline-block;
        }
        .el-button {
          background-color: #3473d1;
          color: #fff;
          padding: 0% 24px;
          border-color: #3473d1;
        }
        .read {
          color: #3473d1;
          border-color: #3473d1;
          background-color: #fff;
          img {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
        }
        .delReport {
          color: #ed2226;
          border-color: #ed2226;
          background-color: #fff;
        }
        .clearBtn {
          color: #3473d1;
          border-color: #3473d1;
          background-color: #fff;
        }
      }
    }
  }
  .triage_con {
    margin-top: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .left_table {
      background-color: #fff;
      width: 39.8%;
      padding: 8px;
      .list_table {
        height: calc(100vh - 182px);
      }
    }
    .right_table {
      width: 59.8%;
      height: calc(100vh - 167px);
      .right_top {
        /* height: 420px; */
        .top_t {
          width: 100%;
          height: auto;
          background-color: #f5f7fa;
          white-space: nowrap;
          overflow-x: auto;
          span {
            display: inline-block;
            font-size: 14px;
            color: #333;
            height: 40px;
            line-height: 40px;
            padding: 0% 24px;
            cursor: pointer;
          }
          .activeSpan {
            background-color: #fff;
            color: #3473d1;
            border-bottom: none;
          }
        }
        .top_t::-webkit-scrollbar {
          height: 8px;
        }
        .top_b {
          background-color: #fff;
          padding: 8px;
          /* height: 380px; */
          overflow-y: auto;
          .div1 {
            padding: 8px 0px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            .span1 {
              color: #333333;
              font-size: 14px;
              display: inline-block;
            }
          }
        }
      }
      .right_bottom {
        margin-top: 8px;
        height: 270px;
        background-color: #fff;
        .div1 {
          padding: 8px 0px;
          margin-right: 12px;
          display: flex;
          align-items: center;
          position: relative;
          .span {
            font-size: 12px;
            color: #3473d1;
            display: inline-block;
            position: absolute;
            top: 10px;
            left: 40px;
            cursor: pointer;
          }
          .span1 {
            color: #333333;
            font-size: 14px;
            display: inline-block;
          }
        }
      }
      .right_btn {
        height: 40px;
        margin-top: 8px;
        background-color: #fff;
        text-align: center;
        line-height: 40px;
      }
    }
  }
  .dept_con {
    .span1 {
      color: #333333;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
    }
  }
  :deep(.el-dialog__header) {
    margin-right: 0;
    .el-dialog__title {
      color: #fff;
    }
  }
  :deep(.el-dialog__body) {
    padding: 12px 12px 0 12px;
  }
  :deep(.el-dialog__footer) {
    padding: 12px;
    text-align: center;
    border-top: none;
  }
  .table-checked-row-style {
    .el-table__cell {
      background-color: #ecf5ff !important;
    }
  }
  :deep(.final_con) {
    height: 500px;
    .con_top {
      display: flex;
      justify-content: space-between;
      .div_l {
        width: 70%;
        height: 240px;
        .l_title {
          display: flex;
          justify-content: space-between;
          height: 36px;
          align-items: center;
          span {
            display: inline-block;
          }
          .el-button {
            color: #f33d21;
            border-color: #f33d21;
            background-color: #fff;
          }
        }
        .l_cont {
          height: 200px;
          overflow-y: auto;
          border: 1px solid #ebeef5;
          padding: 6px 6px;
          .l_cont_div {
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items: center;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
            padding-left: 8px;
            .span1 {
              /* color: #333333; */
              font-size: 14px;
              display: inline-block;
              margin-right: 8px;
            }
            .span2 {
              /* color: #333333; */
              font-size: 14px;
              display: inline-block;
              margin-left: 8px;
            }
          }
          .activeClass {
            background-color: rgb(50, 99, 254, 0.2);
            color: #fff;
          }
        }
      }
      .div_r {
        width: 29%;
        height: 240px;
        div {
          width: 100%;
          height: 30px;
          line-height: 30px;
          text-align: center;
        }
        .r_div1 {
          color: #333333;
          font-size: 16px;
          font-weight: bold;
        }
        .r_div2 {
          color: #333333;
          font-size: 14px;
        }
        .r_div3 {
          color: #3263fe;
          font-size: 14px;
        }
        .r_div4 {
          text-align: center;
          .el-button {
            display: block;
            margin: 16px auto;
          }
        }
      }
    }
    .con_bot {
      display: flex;
      justify-content: space-between;
      height: 240px;
      width: 100%;
      .div_l {
        width: 49.5%;
        height: 240px;
      }
      .div_r {
        width: 49.5%;
        height: 240px;
      }
    }
  }
  :deep(.quoteCon) {
    /* padding-bottom: 12px; */
    .quoteBtn {
      padding: 12px 0;
      width: 100%;
      text-align: center;
    }
  }
  :deep(.quoteDiag_con) {
    padding-bottom: 10px;
    .con_input {
      display: flex;
      align-items: center;
      height: 40px;
      .el-button {
        margin-left: 10px;
      }
    }
    .con_nr {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .nr_left {
        width: 20%;
      }
      .nr_cen {
        width: 20%;
        .cen_1 {
          .js_t {
            color: #3473d1;
            font-size: 14px;
          }
        }
      }
      .nr_right {
        width: 58%;
      }
    }
  }
}

/* 在 style 标签中添加以下样式 */
.item-result-container {
  display: flex;
  gap: 12px;
}

.assem-list-container {
  width: 25%;
  .assem-list-title {
    font-weight: bold;
    margin-bottom: 8px;
    padding-left: 8px;
  }
}

.item-detail-container {
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  gap: 0;
}
</style>
