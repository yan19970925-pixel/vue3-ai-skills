<template>
  <div class="per_trage">
    <div class="trage_search">
      <div class="search1">
        <div class="div1">
          <el-button
            style="font-size: 18px; color: #fff; width: 26px; margin-right: 6px; padding: 0 4px"
            type="primary"
            size="small"
            :disabled="!itemDetail.peId"
            @click="showDetail(itemDetail)"
          >
            <!-- 详情 -->
            <!-- <el-icon><User /></el-icon> -->
            <el-icon><Avatar /></el-icon>
          </el-button>
          <span class="span1">体检号：</span>
          <el-input
            style="width: 120px; margin-right: 12px"
            v-model="ExaminePatListInfo.peId"
            placeholder="请输入"
            class="select-item"
            clearable
          />
          <span class="span1">姓名：</span>
          <el-input
            style="width: 120px; margin-right: 12px"
            v-model="ExaminePatListInfo.name"
            placeholder="请输入"
            class="select-item"
            clearable
          />
          <span class="span1">次数：</span>
          <el-input
            style="width: 70px"
            v-model="ExaminePatListInfo.peVisitId"
            placeholder="请输入"
            class="select-item"
            clearable
          />
        </div>
        <div class="div1">
          <span class="span1">单位编码：</span>
          <el-input
            style="width: 100px; margin-right: 12px"
            v-model="ExaminePatListInfo.unitCode"
            placeholder="请输入"
            class="select-item"
            clearable
          />
        </div>
        <!-- 优化后的互斥单选按钮和时间区间 -->
        <!-- <div class="div1">
          <el-radio-group v-model="dateType" @change="handleDateTypeChange">
            <el-radio :label="2" size="large">预约时间区间</el-radio>
          </el-radio-group>
          <el-date-picker
            type="date"
            style="display: flex; width: 160px"
            v-model="ExaminePatListInfo.startDate"
            value-format="YYYY-MM-DD"
            :disabled="dateType !== 2"
          />
          <span class="ml-6px mr-6px">至</span>
          <el-date-picker
            type="date"
            style="display: flex; width: 160px"
            v-model="ExaminePatListInfo.endDate"
            value-format="YYYY-MM-DD"
            :disabled="dateType !== 2"
          />
        </div> -->
        <div class="div1">
          <el-radio-group v-model="dateType" @change="handleDateTypeChange">
            <el-radio :label="1" size="large">预约时间区间</el-radio>
          </el-radio-group>
          <el-date-picker
            type="date"
            style="display: flex; width: 160px"
            v-model="ExaminePatListInfo.queueStartDate"
            value-format="YYYY-MM-DD"
            :disabled="dateType !== 1"
          />
          <span class="ml-6px mr-6px">至</span>
          <el-date-picker
            type="date"
            style="display: flex; width: 160px"
            v-model="ExaminePatListInfo.queueEndDate"
            value-format="YYYY-MM-DD"
            :disabled="dateType !== 1"
          />
        </div>
        <div class="div1">
          <span>状态：</span>
          <el-select
            v-model="ExaminePatListInfo.resultStatus"
            placeholder="请选择"
            style="width: 120px"
            filterable
            clearable
            default-first-option
          >
            <el-option label="已预约" value="0" />
            <el-option label="已执行" value="1" />
            <el-option label="待审核" value="2" />
            <el-option label="已分科审核" value="5" />
            <el-option label="已初步审核" value="7" />
            <el-option label="已最终审核" value="9" />
            <el-option label="非正常结束" value="A" />
            <el-option label="体检挂起" value="P" />
          </el-select>
        </div>

        <div class="div1">
          <el-button @click="getPePatList">查询 </el-button>
        </div>
      </div>
    </div>
    <div class="trage_table">
      <div class="table_left">
        <div
          class="heard_title"
          style="display: flex; justify-content: space-between; align-items: center"
        >
          <span>人员列表</span>
          <div style="color: #333333" v-show="itemDetail.peId"
            >当前体检人员: {{ itemDetail.peId || '' }} | {{ itemDetail.name || '' }}
          </div>
        </div>
        <div class="list_table">
          <el-table
            :data="filteredTableData"
            style="width: 100%; margin-top: 10px"
            height="calc(100vh - 274px)"
            border
            @selection-change="handleSelectionChange"
            ref="multipleTableRef"
            @row-click="itemClick"
            highlight-current-row
          >
            <!-- <el-table-column type="selection" width="60" /> -->
            <el-table-column
              v-for="item in personList"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
            >
              <template #default="scope" v-if="item.prop == 'isPrint'">
                <el-radio
                  :model-value="scope.row.isPrint === '1'"
                  @change="onChangeShow(scope.row, $event)"
                  label="是"
                />
              </template>
            </el-table-column>
            <!-- 在 el-table-column 循环后添加操作列 -->
            <!-- <el-table-column label="操作" width="74" fixed="right"> -->
            <!-- <el-table-column label="详情" width="74" fixed="right">
              <template #default="scope">
                <el-button
                  style="font-size: 18px; color: #fff"
                  type="primary"
                  size="small"
                  @click="showDetail(scope.row)"
                >
                  <el-icon><Avatar /></el-icon>
                </el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <div class="btn">
          <el-button @click="cbAuditDept" :disabled="isFenke">
            <img :src="fenkeshenhe" />分科审核
          </el-button>
          <!-- <el-button @click="fenkejieguo"> <img :src="fenkejieguo" />分科结果 </el-button> -->

          <el-button @click="firstAudit" :disabled="isChubu">
            <img :src="chubushenhe" />初步审核
          </el-button>

          <el-button @click="cbLastAuditDept" :disabled="isZuizhong">
            <img :src="zuizhongshenhe" />最终审核
          </el-button>

          <el-button @click="finalReport"> <img :src="tijianbaogao" />体检报告 </el-button>

          <el-button @click="saveAudit">保存</el-button>
        </div>
      </div>
      <div class="table_right">
        <el-tabs type="border-card" class="right_tabs" @tab-change="tabChanges">
          <el-tab-pane label="分科审核">
            <div class="card_con1">
              <!-- <div class="con_title">
                <div class="t1">一般检查</div>
                <div class="t2">体检医生:张三</div>
                <div class="t3">体检时间:2023/5/19 10:05:18</div>
              </div> -->
              <el-table
                :data="peDeptCheckList"
                style="width: 100%; height: 100%"
                border
                @selection-change="handleSelectionChange"
                @row-click="fenkeClick"
              >
                <el-table-column
                  v-for="column in FenKeColum"
                  :key="column.prop"
                  :prop="column.prop"
                  :label="column.label"
                  :width="column.width"
                  show-overflow-tooltip
                />
                <!-- <el-table-column label="操作" width="120px">
                    <template #default="scope">
                      <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                      >
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column> -->
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="汇总审核">
            <div class="card_con2">
              <div class="con2_left">
                <div class="heard_title">
                  <span>历史体检记录</span>
                  <!-- <div class="btn">
                    <el-button @click="contrast"> <img :src="duibi" />对比</el-button>
                    <el-button @click="shenhe"> <img :src="yulan" />预览</el-button>
                  </div> -->
                </div>
                <div class="con2_table">
                  <el-table :data="historyExamList" style="width: 100%; height: 100%" border>
                    <el-table-column
                      prop="peVisitId"
                      label="次数"
                      width="60"
                      align="center"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      prop="pePreDate"
                      label="体检日期"
                      width="180"
                      align="center"
                      show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                      prop="chiefDoctor"
                      label="体检医生"
                      align="center"
                      show-overflow-tooltip
                    ></el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="con2_right">
                <div class="heard_title">
                  <span style="padding-right: 0">本次体检诊断</span>
                  <div class="btn">
                    <span class="spanTS">（红色为诊断，<br />蓝色为阳性体征）</span>
                    <el-checkbox v-model="selfInpFlag" label="自填" />
                    <el-button @click="openSuggestDialog"> <img :src="jiahao" />新增</el-button>
                    <el-button class="del" @click="deleteSelectedRows">删除</el-button>
                    <!-- <el-button @click="shenhe"> <img :src="huizong" />汇总</el-button> -->
                  </div>
                </div>
                <div class="con2_table">
                  <el-table
                    :data="diaseseList"
                    style="width: 100%; height: 100%"
                    border
                    @selection-change="handleDiaseseSelectionChange"
                  >
                    <!-- 添加选择列 -->
                    <el-table-column type="selection" width="60" />
                    <el-table-column type="index" label="序号" width="60" align="center" />
                    <el-table-column
                      label="疾病诊断阳性体征"
                      width="200"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template #default="scope">
                        <span
                          :style="scope.row.isdisease == 1 ? 'color:#ed2226' : 'color:#3473d1'"
                          >{{ scope.row.name }}</span
                        >
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="suggest"
                      label="对应指导建议"
                      align="center"
                      show-overflow-tooltip
                      width="200"
                    ></el-table-column>
                    <el-table-column
                      prop="isdisease"
                      label="疾病诊断"
                      align="center"
                      width="120"
                      show-overflow-tooltip
                    >
                      <template #default="scope">
                        {{ scope.row.isdisease === 0 ? '否' : '是' }}
                      </template>
                    </el-table-column>
                    <!-- 添加可操作列 -修改 -->
                    <el-table-column label="操作" width="80px" fixed="right">
                      <template #default="scope">
                        <el-button
                          size="small"
                          type="primary"
                          @click="handleEdit(scope.$index, scope.row)"
                        >
                          修改
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="建议指导">
            <div class="card_con3">
              <div class="con3_se">
                <el-table
                  :data="suggestList"
                  style="width: 100%; height: 100%"
                  border
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    v-for="column in jianyiColum"
                    :key="column.prop"
                    :prop="column.prop"
                    :label="column.label"
                    :width="column.width"
                    show-overflow-tooltip
                  />
                </el-table>
              </div>
              <div class="heard_title">
                <span>体检综合建议和健康指导</span>
                <div class="btn">
                  <el-button @click="addDivisionSugges">汇总分科建议</el-button>
                  <el-button @click="addChiefSugges">汇总主检分项建议</el-button>
                  <el-button class="del" @click="clearSugges">清除建议</el-button>
                </div>
              </div>
              <div class="con3_de">
                <el-input v-model="mle_suggest" type="textarea" :rows="8"></el-input>
              </div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="病史记录">
            <div class="con5_table">
              <el-table
                :data="peDeptResultDictDOList"
                style="width: 100%; height: 100%"
                border
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  v-for="column in bingshiColum"
                  :key="column.prop"
                  :prop="column.prop"
                  :label="column.label"
                  :width="column.width"
                  show-overflow-tooltip
                />
              </el-table>
            </div>
          </el-tab-pane> -->
          <!-- 修改科普知识部分的模板代码 -->
          <!-- <el-tab-pane label="科普知识">
            <div class="card_con5">
              <div class="heard_title">
                <span>体检综合建议和健康指导</span>
                <div class="btn">
                  <el-button @click="openKnowledgeDialog">
                    <img :src="jiahao" />增加科普知识
                  </el-button>
                  <el-button class="del" @click="deleteSelectedKnowledge">删除科普知识</el-button>
                </div>
              </div>
              <div class="con5_table">
                <el-table
                  :data="knowledgeRecordList"
                  style="width: 100%; height: 100%"
                  border
                  @selection-change="handleKnowledgeSelectionChange"
                >
                  <el-table-column type="selection" width="40" />
                  <el-table-column
                    v-for="column in knowledgeColum"
                    :key="column.prop"
                    :prop="column.prop"
                    :label="column.label"
                    :width="column.width"
                    show-overflow-tooltip
                    header-algin="center"
                    align="center"
                  />
                </el-table>
              </div>
            </div>
          </el-tab-pane> -->
        </el-tabs>
        <div class="btn">
          <!-- <el-button @click="save">报告确认</el-button> -->
        </div>
      </div>
    </div>
    <div ref="printMe" id="pdfDom" class="pdfDom" v-if="showJson">
      <perExaminationReport :jsonData="jsonData" />
    </div>
    <Dialog
      :model-value="duibiDialogVisible"
      :fullscreen="false"
      :close-on-click-modal="false"
      width="800px"
      class="dict-dialog"
      @close="() => (duibiDialogVisible = false)"
    >
      <template #title>
        <div class="dict-dialog-title">体检结果比较</div>
      </template>
      <div class="trage_search">
        <div class="search1" style="padding: 0 0 6px 0">
          <div class="div1">
            <span class="span1">体检号：</span>
            <el-input
              style="width: 120px; margin-right: 12px"
              v-model="code"
              placeholder="请输入"
              class="select-item"
              clearable
            />
          </div>
          <div class="div1">
            <span class="span1">体检号：</span>
            <el-input
              style="width: 120px; margin-right: 12px"
              v-model="code"
              placeholder="请输入"
              class="select-item"
              clearable
            />
          </div>
          <div class="div1">
            <span class="span1">性别：</span>
            <el-input
              style="width: 120px; margin-right: 12px"
              v-model="code"
              placeholder="请输入"
              class="select-item"
              clearable
            />
          </div>
          <div class="div1">
            <el-button @click="print">查询 </el-button>
          </div>
        </div>
        <div>
          <el-table :data="tableData" style="width: 100%" height="calc(100vh - 500px)" border>
            <el-table-column
              v-for="item in personList"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
            >
              <template #default="scope" v-if="item.prop == 'isPrint'">
                <el-radio
                  :model-value="scope.row.isPrint === '1'"
                  @change="onChangeShow(scope.row, $event)"
                  label="是"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </Dialog>
    <Dialog
      :model-value="fenkeDialogVisible"
      :fullscreen="false"
      :close-on-click-modal="false"
      width="800px"
      class="dict-dialog"
      @close="() => (fenkeDialogVisible = false)"
    >
      <template #title>
        <div class="dict-dialog-title">分科审核详情</div>
      </template>
      <div class="fenke-form">
        <el-form :model="currentFenkeRow" label-width="120px" ref="fenkeFormRef">
          <el-form-item label="科室">
            <el-input disabled v-model="currentFenkeRow.deptName" />
          </el-form-item>
          <el-form-item label="体检医生">
            <el-input disabled v-model="currentFenkeRow.doctorName" />
          </el-form-item>
          <el-form-item label="体检时间">
            <el-date-picker
              v-model="currentFenkeRow.checkTime"
              type="datetime"
              disabled
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择体检时间"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="阳性体征">
            <el-input v-model="currentFenkeRow.positive" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="初步诊断">
            <el-input v-model="currentFenkeRow.abnormal" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="科室小结">
            <el-input v-model="currentFenkeRow.conclusion" type="textarea" :rows="4" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="fenkeJieguo">分科结果 </el-button>
          <el-button @click="fenkeDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveFenkeInfo">保存</el-button>
        </div>
      </template>
    </Dialog>
    <Dialog
      :model-value="konwledgeDialogVisible"
      :fullscreen="false"
      :close-on-click-modal="false"
      width="800px"
      class="dict-dialog"
      @close="() => (konwledgeDialogVisible = false)"
    >
      <template #title>
        <div class="dict-dialog-title">选择科普知识</div>
      </template>
      <div class="trage_search">
        <!-- <div class="search1" style="padding: 0 0 6px 0">
          <div class="div1">
            <span class="span1">症状名称：</span>
            <el-input
              style="width: 200px; margin-right: 12px"
              v-model="knowledgeSearchForm.knowledgeName"
              placeholder="请输入症状名称"
              class="select-item"
              clearable
            />
          </div>
          <div class="div1">
            <el-button @click="searchKnowledge">查询</el-button>
            <el-button @click="resetKnowledgeSearch">重置</el-button>
          </div>
        </div> -->
        <div>
          <el-table
            :data="knowledgeTableData"
            style="width: 100%"
            height="calc(100vh - 500px)"
            border
            @row-dblclick="handleKnowledgeRowDblClick"
          >
            <el-table-column
              prop="knowledgeCode"
              label="序号"
              width="80"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="knowledgeName"
              label="症状"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="knowledgeText"
              label="科普知识"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>

          <el-pagination
            style="margin-top: 15px; text-align: right"
            v-model:current-page="knowledgePagination.currentPage"
            v-model:page-size="knowledgePagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="knowledgePagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="konwledgeDialogVisible = false">取消</el-button>
        </div>
      </template>
    </Dialog>
    <!-- 修改自填建议弹窗 -->
    <Dialog
      :model-value="selfInpSuggestDialogVisible"
      :fullscreen="false"
      :close-on-click-modal="false"
      width="800px"
      class="dict-dialog"
      @close="() => (selfInpSuggestDialogVisible = false)"
    >
      <template #title>
        <div class="dict-dialog-title">
          {{ isEditing ? '编辑建议和生活指导' : '新增建议和生活指导（自填）' }}
        </div>
      </template>
      <div class="suggest-form">
        <el-form :model="selfSuggestForm" label-width="120px">
          <!-- <el-form-item label="序号">
            <el-input v-model="selfSuggestForm.suggestCode" placeholder="请输入" />
          </el-form-item> -->
          <el-form-item label="建议名称">
            <el-input
              v-model="selfSuggestForm.suggestName"
              @change="suggestNameChange"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="建议内容">
            <el-input
              v-model="selfSuggestForm.suggestText"
              type="textarea"
              :rows="8"
              placeholder="请输入"
            />
          </el-form-item>
          <el-button type="primary" @click="quoteSuggest">引用建议指导</el-button>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="selfInpSuggestDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addSelfSuggest">保存</el-button>
        </div>
      </template>
      <Dialog v-model="innerSuggestVisible" title="建议指导" append-to-body width="740px">
        <div>
          <el-table
            :data="suggestInnerTableData"
            style="width: 100%"
            height="calc(100vh - 500px)"
            border
            @row-dblclick="innerSuggestRowDblClick"
          >
            <el-table-column
              prop="suggestCode"
              label="序号"
              width="120"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="suggestName"
              label="建议名称"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="suggestText"
              label="建议内容"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </div>
      </Dialog>
    </Dialog>
    <Dialog
      :model-value="suggestDialogVisible"
      :fullscreen="false"
      :close-on-click-modal="false"
      width="800px"
      class="dict-dialog"
      @close="() => (suggestDialogVisible = false)"
    >
      <template #title>
        <div class="dict-dialog-title">选择建议和生活指导</div>
      </template>
      <div class="trage_search">
        <div class="search1" style="padding: 0 0 6px 0">
          <div class="div1">
            <span class="span1">建议内容：</span>
            <el-input
              style="width: 200px; margin-right: 12px"
              v-model="suggestSearchForm.suggestName"
              placeholder="请输入建议内容"
              class="select-item"
              clearable
            />
          </div>
          <div class="div1">
            <el-button @click="searchSuggest">查询</el-button>
            <el-button @click="resetSuggestSearch">重置</el-button>
          </div>
        </div>
        <div>
          <el-table
            :data="suggestTableData"
            style="width: 100%"
            height="calc(100vh - 500px)"
            border
            @row-dblclick="handleSuggestRowDblClick"
          >
            <el-table-column
              prop="suggestCode"
              label="序号"
              width="120"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="suggestName"
              label="建议名称"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="suggestText"
              label="建议内容"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>

          <el-pagination
            style="margin-top: 15px; text-align: right"
            v-model:current-page="suggestPagination.currentPage"
            v-model:page-size="suggestPagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="suggestPagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleSuggestPageChange"
            @size-change="handleSuggestSizeChange"
          />
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="suggestDialogVisible = false">取消</el-button>
        </div>
      </template>
    </Dialog>
    <!-- 详情弹窗 -->
    <Dialog
      :model-value="detailDialogVisible"
      :fullscreen="false"
      :close-on-click-modal="false"
      width="80%"
      class="dict-dialog"
      @close="() => (detailDialogVisible = false)"
    >
      <template #title>
        <div class="dict-dialog-title">体检详情</div>
      </template>
      <div>
        <el-table :data="detailTableData" style="width: 100%" border>
          <el-table-column prop="name" label="姓名" width="100" align="center" />
          <el-table-column prop="peId" label="体检号" width="120" align="center" />
          <el-table-column prop="peVisitId" label="体检次数" width="100" align="center" />
          <el-table-column
            prop="itemAssemName"
            label="项目组合"
            min-width="150"
            show-overflow-tooltip
          />
          <el-table-column prop="finishStatus" label="完成情况" width="100" align="center">
            <template #default="scope">
              <span :style="{ color: scope.row.finishedSign === '完成' ? 'green' : 'orange' }">
                {{ scope.row.finishedSign }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="doctor" label="检查医生" width="100" align="center" />
          <el-table-column prop="peDeptName" label="检查科室" width="120" align="center" />
          <el-table-column prop="applyNo" label="申请单号" width="" align="center" />
          <el-table-column label="修改完成状态" width="120" align="center">
            <template #default="scope">
              <el-button type="primary" size="small" @click="changeFinishStatus(scope.row)">
                修改
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="取消分科审核" width="120" align="center">
            <template #default="scope">
              <el-button type="danger" size="small" @click="cancelDeptAudit(scope.row)">
                取消
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { VuePrintNext } from 'vue-print-next'
import fenkeshenhe from '@/assets/images/fenkeshenhe.svg'
import fenkejieguo from '@/assets/images/fenkejieguo.svg'
import chubushenhe from '@/assets/images/chubushenhe.svg'
import zuizhongshenhe from '@/assets/images/fenkejieguo.svg'
import tijianbaogao from '@/assets/images/tijianbaogao.svg'
import duibi from '@/assets/images/duibi.svg'
import yulan from '@/assets/images/yulan.svg'
import jiahao from '@/assets/images/jiahao.svg'
import huizong from '@/assets/images/huizong.svg'
import * as Api from '@/api/PerPhyExamination/geTrage/index'
import type { Ref } from 'vue'
import { ElTable, ElLoading, ElMessage } from 'element-plus'
import perExaminationReport from '@/views/PhyExamManage/components/examinationReport/perExaminationReport.vue'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import printJS from 'print-js'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'

const router = useRouter()
interface User {
  isPrint: string
  peId: string
  name: string
  sex: string
  peVisitId: string
  peQueueDate: string
  pePreDate: string
  company?: string
}

const time = ref([])
const code = ref('')
const name = ref('')
const company = ref('')
const checkList = ref(['Value1', 'Value2'])
const dateType = ref<number | null>(1) // 1: 报到时间区间, 2: 预约时间区间
const personList = ref([
  {
    label: '体检号',
    prop: 'peId',
    align: 'center',
    width: 120
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    width: 120
  },
  {
    label: '性别',
    prop: 'sex',
    align: 'center',
    width: 80
  },
  {
    label: '次数',
    prop: 'peVisitId',
    align: 'center',
    width: 80
  },
  // {
  //   label: '报到日期',
  //   prop: 'peQueueDate',
  //   align: 'left'
  // },
  {
    label: '体检日期',
    // prop: 'pePreDate',
    prop: 'peQueueDate',
    align: 'center'
  }
])
const duibiDialogVisible = ref(false)
const printMe = ref(null)
const multipleTableRef: Ref<InstanceType<typeof ElTable> | null> = ref(null)
const multipleSelection = ref<User[]>([])
const value = ref('')
// 获取当前日期并格式化为 YYYY-MM-DD
const getCurrentDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
// 处理日期类型变化
const handleDateTypeChange = (type: number) => {
  // 清除之前选择的时间范围
  if (type === 1) {
    // 选择报到时间区间，清除预约时间区间
    ExaminePatListInfo.value.startDate = ''
    ExaminePatListInfo.value.endDate = ''

    ExaminePatListInfo.value.queueStartDate = getCurrentDate()
    ExaminePatListInfo.value.queueEndDate = getCurrentDate()
  } else if (type === 2) {
    // 选择预约时间区间，清除报到时间区间
    ExaminePatListInfo.value.queueStartDate = ''
    ExaminePatListInfo.value.queueEndDate = ''

    // 设置预约时间的默认值为当天
    ExaminePatListInfo.value.startDate = getCurrentDate()
    ExaminePatListInfo.value.endDate = getCurrentDate()
  }
}

// 计算过滤后的表格数据
const filteredTableData = computed(() => {
  return tableData.value.filter((item) => {
    // 体检号筛选
    if (code.value && !item.peId.includes(code.value)) {
      return false
    }
    // 姓名筛选
    if (name.value && !item.name.includes(name.value)) {
      return false
    }
    // 单位筛选（假设数据中有company字段）
    if (company.value && item.company && !item.company.includes(company.value)) {
      return false
    }
    return true
  })
})

// 监听输入框变化，实时筛选
watch([code, name, company], () => {
  // 这里可以添加防抖逻辑，避免频繁触发筛选
})

const print = () => {
  new VuePrintNext({
    el: printMe.value,
    paperSize: 'A4',
    preview: true,
    paperSize: 'custom',
    customSize: {
      width: '210',
      height: '290',
      unit: 'mm'
    },
    defaultScale: 0.7
  })
}

const onChangeShow = (row: User, val: boolean) => {
  row.isPrint = val ? '1' : '0'
}

const save = () => {
  console.log(multipleSelection.value)
}

const shenhe = () => {
  // 检查是否有选中人员
  if (!itemDetail.value || !itemDetail.value.peId) {
    ElMessage.warning('请先选择体检人员')
    return
  }

  // 构建路由参数
  const query: any = {
    peId: itemDetail.value.peId,
    peVisitId: itemDetail.value.peVisitId
  }

  if (
    peDeptCheckList.value &&
    peDeptCheckList.value.length > 0 &&
    peDeptCheckList.value[0].deptCode
  ) {
    query.deptCode = peDeptCheckList.value[0].deptCode
    query.deptName = peDeptCheckList.value[0].deptName
  } else {
    ElMessage.warning('体检人员没有分科审核信息，无法跳转修改')

    return
  }
  // 跳转
  router.push({
    path: '/PhyExamManage/PpExamination/doctorTriageDesk',
    query
  })
}

const tabChanges = (val: number) => {
  console.log(val)
}

const contrast = () => {
  console.log('对比')
  duibiDialogVisible.value = true
}
//汇总分科建议
const addDivisionSugges = () => {
  const abnormalList = []
  if (mle_suggest.value && mle_suggest.value.length > 0) {
    ElMessageBox.confirm('是否覆盖当前的建议指导内容？', '建议提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        abnormalList.push('您好！本次体检以下结果与建议请您关注：')
        if (peDeptCheckList.value.length > 0) {
          peDeptCheckList.value.forEach((item) => {
            if (item.abnormal) {
              abnormalList.push(item.deptName + '：' + item.abnormal)
            }
          })
        }
        mle_suggest.value = abnormalList.join('\r\n')
      })
      .catch(() => {
        if (peDeptCheckList.value.length > 0) {
          peDeptCheckList.value.forEach((item) => {
            if (item.abnormal) {
              abnormalList.push(item.deptName + '：' + item.abnormal)
            }
          })
        }
        mle_suggest.value = mle_suggest.value + '\r\n' + abnormalList.join('\r\n')
      })
  } else {
    abnormalList.push('您好！本次体检以下结果与建议请您关注：')
    if (peDeptCheckList.value.length > 0) {
      peDeptCheckList.value.forEach((item) => {
        if (item.abnormal) {
          abnormalList.push(item.deptName + '：' + item.abnormal)
        }
      })
    }
    mle_suggest.value = abnormalList.join('\r\n')
  }
}
//汇总主检建议
const addChiefSugges = () => {
  const chiefSuggesList = []
  if (mle_suggest.value && mle_suggest.value.length > 0) {
    ElMessageBox.confirm('是否覆盖当前的建议指导内容？', '建议提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        if (diaseseList.value.length > 0) {
          diaseseList.value.forEach((item, index) => {
            if (item.name) {
              chiefSuggesList.push(index + 1 + '、' + item.name, item.suggest)
            }
          })
        }
        mle_suggest.value = chiefSuggesList.join('\r\n')
      })
      .catch(() => {
        if (diaseseList.value.length > 0) {
          diaseseList.value.forEach((item, index) => {
            if (item.name) {
              chiefSuggesList.push(index + 1 + '、' + item.name, item.suggest)
            }
          })
        }
        mle_suggest.value = mle_suggest.value + '\r\n' + chiefSuggesList.join('\r\n')
      })
  } else {
    if (diaseseList.value.length > 0) {
      diaseseList.value.forEach((item, index) => {
        if (item.name) {
          chiefSuggesList.push(index + 1 + '、' + item.name, item.suggest)
        }
      })
    }
    mle_suggest.value = chiefSuggesList.join('\r\n')
  }
}
//清除建议
const clearSugges = () => {
  mle_suggest.value = ''
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

onMounted(() => {
  // 设置预约时间的默认值为当天
  ExaminePatListInfo.value.queueStartDate = getCurrentDate()
  // ExaminePatListInfo.value.queueStartDate = '2025-07-16'
  ExaminePatListInfo.value.queueEndDate = getCurrentDate()
  getPePatList()
})

const tableData = ref<Array>([])
const ExaminePatListInfo = ref({
  startDate: '',
  endDate: '',
  resultStatus: '2',
  // resultStatus: '7',
  queueStartDate: '',
  queueEndDate: '',
  peId: '',
  peVisitId: '',
  joinUnit: '',
  unitCode: '',
  unitVisitId: '',
  name: ''
})

// 个人体检-主检医生审核-提取人员
const getPePatList = async () => {
  itemDetail.value = {}
  isFenke.value = false
  isChubu.value = false
  isZuizhong.value = false
  const params = { ...ExaminePatListInfo.value }

  // 根据选择的日期类型确定发送哪些参数
  if (dateType.value === 1) {
    // 使用报到时间区间，清除预约时间参数
    params.startDate = ''
    params.endDate = ''
  } else if (dateType.value === 2) {
    // 使用预约时间区间，清除报到时间参数
    params.queueStartDate = ''
    params.queueEndDate = ''
  } else {
    // 都未选择，清除所有时间参数
    params.startDate = ''
    params.endDate = ''
    params.queueStartDate = ''
    params.queueEndDate = ''
  }

  await Api.getPePatList(params).then((res) => {
    tableData.value = res
  })
}
// 审核按钮
const isFenke = ref(false)
const isChubu = ref(false)
const isZuizhong = ref(false)
const zhuJianInfo = ref({})
// 个人体检-主检医生审核-提取
const getExaminePatList = async (row) => {
  zhuJianInfo.value = row
  await Api.getExaminePatList({ peId: row.peId, peVisitId: row.peVisitId }).then((res) => {
    if (res) {
      peDeptCheckList.value = res[0].peDeptCheckList // 分科审核

      peDeptResultDictDOList.value = res[0].peDeptResultDictDOList // 病史

      peDeptResultDictRespVoList.value = res[0].peDeptResultDictRespVoList // 分科体检

      suggestList.value = res[0].suggestList // 建议

      diaseseList.value = res[0].diaseseList // 汇总审核

      knowledgeRecordList.value = res[0].knowledgeRecordList // 科普知识

      if (res[0].resultStatus == '5') {
        // isFenke.value = true
      } else if (res[0].resultStatus == '7') {
        // isFenke.value = true
        // isChubu.value = true
      } else if (res[0].resultStatus == '9') {
        isFenke.value = true
        isChubu.value = true
        isZuizhong.value = true
      } else {
        isFenke.value = false
        isChubu.value = false
        isZuizhong.value = false
      }
      if (peDeptCheckList.value && peDeptCheckList.value[0]?.mle_suggest) {
        mle_suggest.value = peDeptCheckList.value[0].mle_suggest
      }
    }
  })
}

// 保存
const saveAudit = async () => {
  await Api.saveAudit({
    peId: itemDetail.value.peId || '',
    peVisitId: itemDetail.value.peVisitId || '',
    suggest: mle_suggest.value || '',
    examineDiseaseList: diaseseList.value || [],
    knowledgeRecordList: knowledgeRecordList.value || [],
    peDeptCheckList: peDeptCheckList.value || []
  })
    .then((res) => {
      if (res) {
        ElMessage.success('保存成功')
        // 保存成功后重新获取数据
        getExaminePatList(itemDetail.value)
      }
    })
    .catch((error) => {
      console.error('保存失败:', error)
    })
}
// 个人体检-主检医生审核-分科审核
const cbAuditDept = async () => {
  await Api.cbAuditDept({
    peId: itemDetail.value.peId,
    peVisitId: itemDetail.value.peVisitId,
    deptExamineList: peDeptCheckList.value
  })
    .then((res) => {
      if (res) {
        ElMessage.success('分科审核成功')
        // 获取数据
        getExaminePatList(itemDetail.value)
      }
    })
    .catch((error) => {
      console.error('审核失败:', error)
    })
}
// 个人体检-主检医生审核-初步审核
const firstAudit = async () => {
  await Api.firstAudit({
    peId: itemDetail.value.peId || '',
    peVisitId: itemDetail.value.peVisitId || '',
    suggest: mle_suggest.value || '',
    is_rslt_status: 0,
    examineDiseaseList: diaseseList.value || [],
    knowledgeRecordList: knowledgeRecordList.value || [],
    peDeptCheckList: peDeptCheckList.value || []
  })
    .then((res) => {
      if (res) {
        ElMessage.success('初步审核成功')
        // 获取数据
        getExaminePatList(itemDetail.value)
      }
    })
    .catch((error) => {
      console.error('审核失败:', error)
    })
}
// 个人体检-主检医生审核-最终审核
const cbLastAuditDept = async () => {
  await Api.cbLastAuditDept({
    peId: itemDetail.value.peId || '',
    peVisitId: itemDetail.value.peVisitId || '',
    suggest: mle_suggest.value || '',
    examineDiseaseList: diaseseList.value || [],
    knowledgeRecordList: knowledgeRecordList.value || [],
    peDeptCheckList: peDeptCheckList.value || []
  })
    .then((res) => {
      if (res) {
        ElMessage.success('最终审核成功')
        // 获取数据
        getExaminePatList(itemDetail.value)
      }
    })
    .catch((error) => {
      console.error('审核失败:', error)
    })
}
const showJson = ref(false)
const jsonData = ref({})
// 个人体检-主检医生审核-体检报告
const finalReport = async () => {
  await Api.finalReport({
    peId: itemDetail.value.peId || '',
    peVisitId: itemDetail.value.peVisitId || ''
  })
    .then(async (res) => {
      if (res) {
        // 获取数据
        jsonData.value = res
        showJson.value = true
        // await getPdf2(true)
        setTimeout(() => {
          nextTick(async () => {
            await printTjbg()
            jsonData.value = {}
            showJson.value = false
          })
        }, 500)
        // jsonData.value.user = itemDetail.value
        // getPePatList()
      }
    })
    .catch((error) => {
      console.error('审核失败:', error)
    })
}
// 定义响应式变量
const htmlTitle = ref('体检报告')
const loadingInstance = ref(null)
const loadingBox = ref(null)
const examSheet = ref(null)

// 打印 PDF
const printPdf = (pdfData) => {
  printJS({
    printable: pdfData,
    base64: true,
    type: 'pdf',
    style: '@page { size: auto; margin: 0mm; }'
  })
}

// 开始加载动画
const startLoading = () => {
  loadingInstance.value = ElLoading.service({
    target: loadingBox.value,
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.8)'
  })
}

// 停止加载动画
const stopLoading = () => {
  if (loadingInstance.value) {
    loadingInstance.value.close()
    loadingInstance.value = null
  }
  // 清除Dom元素下次打印重新动态加载
  showJson.value = false
}

// 生成 PDF 并下载或打印
const getPdf2 = async (isPrint) => {
  startLoading()
  // 添加短暂的延迟，确保加载动画有机会显示
  await new Promise((resolve) => setTimeout(resolve, 100))
  const element = printMe.value
  const pages = element.querySelectorAll('.page')
  const pdf = new JsPDF('p', 'pt', 'a4')
  let position = 0
  const promises = []

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    const promise = html2Canvas(page, {
      allowTaint: true,
      taintTest: false,
      useCORS: true,
      dpi: window.devicePixelRatio * 4,
      scale: 4
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      const imgWidth = 585.28
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      if (i > 0) {
        pdf.addPage()
        position = 0
      }
      pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight)
      if (i === pages.length - 1) {
        if (isPrint) {
          const pdfDataUrl = pdf.output('datauristring')
          const base64String = pdfDataUrl.split(',')[1] // 提取纯 Base64 字符串
          printPdf(base64String)
        } else {
          pdf.save(htmlTitle.value + '.pdf')
        }
      }
    })
    promises.push(promise)
  }

  try {
    await Promise.all(promises)
  } catch (error) {
    console.error('Error generating images:', error)
  } finally {
    stopLoading()
  }
}
const printTjbg = () => {
  const style = document.createElement('style')
  style.innerHTML = `
        @page {
          size: A4 portrait;
          margin:0mm;
          marks: none;
        }
        html, body {
          overflow: visible !important;
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        #pdfDom {
          display: block !important;
          visibility: visible !important;
        }
      `
  document.head.appendChild(style)

  new VuePrintNext({
    el: '#pdfDom',
    preview: false, // 调试时启用预览
    paperSize: 'A4',
    orientation: 'portrait',
    previewOpenCallback: () => {
      document.head.removeChild(style)
    }
  })
}

const peKonwledgeList = ref([])
const knowledgeColum = [
  {
    label: '序号',
    prop: 'sortNo',
    width: '60px'
  },
  {
    label: '症状',
    prop: 'knowledgeName',
    width: '120px'
  },
  {
    label: '科普知识',
    prop: 'knowledgeText',
    width: ''
  }
  // {
  //   label: '操作',
  //   prop: 'operation',
  // }
]
const bingshiColum = [
  {
    label: '科室',
    prop: 'peDeptName',
    width: ''
  },
  {
    label: '记录人',
    prop: 'doctor',
    width: ''
  },
  {
    label: '记录时间',
    prop: 'peResultDate',
    width: ''
  },
  {
    label: '病史',
    prop: 'medicalHistory',
    width: ''
  }
]
const jianyiColum = [
  {
    label: '科室',
    prop: 'peDeptName',
    width: '180'
  },
  {
    label: '建议',
    prop: 'content',
    width: ''
  }
]
const FenKeColum = [
  {
    label: '科室',
    prop: 'deptName',
    width: '90'
  },
  {
    label: '体检医生',
    prop: 'doctorName',
    width: '90'
  },
  {
    label: '体检时间',
    prop: 'checkTime',
    width: ''
  },
  {
    label: '阳性体征',
    prop: 'positive',
    width: ''
  },
  {
    label: '初步诊断',
    prop: 'abnormal',
    width: ''
  },
  {
    label: '科室小结',
    prop: 'conclusion',
    width: ''
  }
  // {
  //   label: '操作',
  //   prop: 'operation',
  // }
]

const fenkeDialogVisible = ref(false)
const currentFenkeRow = ref({}) // 用于存储当前选中的分科审核行数据
const fenkeClick = (row) => {
  currentFenkeRow.value = { ...row } // 深拷贝当前行数据
  // 如果行数据有唯一标识符如id，则保存该标识符
  // currentFenkeRowId.value = row.id;
  fenkeDialogVisible.value = true
}

// 保存分科审核信息的函数
const saveFenkeInfo = async () => {
  try {
    // 如果有唯一标识符，可以基于id查找更新
    // if (currentFenkeRowId.value && peDeptCheckList.value) {
    //   const index = peDeptCheckList.value.findIndex(item => item.id === currentFenkeRowId.value);
    //   if (index !== -1) {
    //     peDeptCheckList.value[index] = { ...currentFenkeRow.value };
    //   }
    // } else {
    // 如果没有唯一标识符，基于对象内容查找
    const originalRow = peDeptCheckList.value.find((item) => {
      // 根据实际数据结构，比较能唯一标识该行的字段
      return (
        item.deptName === currentFenkeRow.value.deptName &&
        item.doctorName === currentFenkeRow.value.doctorName &&
        item.checkTime === currentFenkeRow.value.checkTime
      )
    })

    if (originalRow) {
      // 更新原始对象的属性
      Object.assign(originalRow, currentFenkeRow.value)
    }
    // }

    // 调用保存审核信息的方法更新所有数据
    await saveAudit()

    ElMessage.success('保存成功')
    fenkeDialogVisible.value = false
  } catch (error) {
    ElMessage.error('保存失败')
  }
}
const itemDetail = ref({
  peId: '',
  name: ''
})
const peDeptCheckList = ref()
const peDeptResultDictDOList = ref()
const peDeptResultDictRespVoList = ref()
const suggestList = ref()
const diaseseList = ref()
const mle_suggest = ref('')
const knowledgeRecordList = ref([])
const itemInfo = ref({
  peId: '',
  peVisitId: ''
})
const debouncedItemClick = debounce((row) => {
  itemInfo.value.peId = row.peId
  itemInfo.value.peVisitId = row.peVisitId
  historyExam(row)
  itemDetail.value = row
  getExaminePatList(itemDetail.value)
}, 500)

const itemClick = (row) => {
  debouncedItemClick(row)
}
const historyExamList = ref([])
// 个人体检-主检医生审核-汇总审核-历史记录
const historyExam = async (row) => {
  await Api.historyExam({ peId: row.peId || '', pePreDate: row.peQueueDate || '' })
    .then((res) => {
      if (res) {
        historyExamList.value = res
      }
    })
    .catch((error) => {
      console.error('审核失败:', error)
    })
}

// 在其他 ref 变量后面添加以下代码
const konwledgeDialogVisible = ref(false)
const knowledgeTableData = ref([])
const knowledgePagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})
const knowledgeSearchForm = ref({
  knowledgeName: ''
})

// 获取科普知识列表
const getPeKnowledge = async (pageNo = 1) => {
  const params = {
    pageNo: pageNo,
    pageSize: knowledgePagination.value.pageSize,
    knowledgeName: knowledgeSearchForm.value.knowledgeName
  }

  await Api.getPeKnowledge(params).then((res) => {
    knowledgeTableData.value = res.records || []
    knowledgePagination.value.total = res.total || 0
    knowledgePagination.value.currentPage = pageNo
  })
}

// 打开科普知识弹窗
const openKnowledgeDialog = () => {
  konwledgeDialogVisible.value = true
  getPeKnowledge(1)
}

// 分页变化处理
const handlePageChange = (pageNo) => {
  getPeKnowledge(pageNo)
}

// 每页条数变化处理
const handleSizeChange = (pageSize) => {
  knowledgePagination.value.pageSize = pageSize
  getPeKnowledge(1)
}

// 双击选择科普知识
const handleKnowledgeRowDblClick = (row) => {
  // 将选中的科普知识添加到 knowledgeRecordList 中
  if (!knowledgeRecordList.value) {
    knowledgeRecordList.value = []
  }

  // 检查是否已存在相同的科普知识
  const exists = knowledgeRecordList.value.some((item) => item.knowledgeName === row.knowledgeName)

  if (!exists) {
    knowledgeRecordList.value.push({
      sortNo: knowledgeRecordList.value.length + 1,
      knowledgeName: row.knowledgeName,
      knowledgeText: row.knowledgeText
    })

    // 添加成功后自动保存·
    saveAudit()
  } else {
    ElMessage.warning('该科普知识已存在')
  }

  // 关闭弹窗
  konwledgeDialogVisible.value = false
}
// 搜索科普知识
const searchKnowledge = () => {
  getPeKnowledge(1)
}

// 重置搜索
const resetKnowledgeSearch = () => {
  knowledgeSearchForm.value.knowledgeName = ''
  getPeKnowledge(1)
}
const selfInpFlag = ref(false)
// 在其他 ref 变量后面添加以下代码
const suggestDialogVisible = ref(false)
const selfInpSuggestDialogVisible = ref(false)
const suggestTableData = ref([])
const suggestPagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})
const suggestSearchForm = ref({
  suggestName: '',
  content: ''
})

// 获取建议和生活指导列表
const getPeSuggestItem = async (pageNo = 1) => {
  const params = {
    pageNo: pageNo,
    pageSize: suggestPagination.value.pageSize,
    suggestName: suggestSearchForm.value.suggestName
  }

  await Api.getPeSuggestItem(params).then((res) => {
    suggestTableData.value = res.records || []
    suggestPagination.value.total = res.total || 0
    suggestPagination.value.currentPage = pageNo
  })
}

// 打开建议弹窗
const openSuggestDialog = () => {
  if (!peDeptCheckList.value) {
    ElMessage.warning('所选受检人员尚未分科审核')
    return
  }
  if (selfInpFlag.value) {
    selfInpSuggestDialogVisible.value = true
  } else {
    suggestDialogVisible.value = true
    getPeSuggestItem(1)
  }
}

// 分页变化处理
const handleSuggestPageChange = (pageNo) => {
  getPeSuggestItem(pageNo)
}

// 每页条数变化处理
const handleSuggestSizeChange = (pageSize) => {
  suggestPagination.value.pageSize = pageSize
  getPeSuggestItem(1)
}

/// 双击选择建议
const handleSuggestRowDblClick = (row) => {
  // 将选中的建议添加到 diaseseList 中
  if (!diaseseList.value) {
    diaseseList.value = []
  }

  // 检查是否已存在相同的建议
  const exists = diaseseList.value.some((item) => item.name === row.suggestName)

  if (!exists) {
    diaseseList.value.push({
      name: row.suggestName || '', // 疾病诊断阳性体征
      suggest: row.suggestText || '', // 对应指导建议
      isdisease: 0 // 默认为否
    })

    // 新增建议后自动保存
    saveAudit()
  }

  // 关闭弹窗
  suggestDialogVisible.value = false
}

// 搜索建议
const searchSuggest = () => {
  getPeSuggestItem(1)
}

// 重置搜索
const resetSuggestSearch = () => {
  suggestSearchForm.value.suggestName = ''
  getPeSuggestItem(1)
}

// 添加选中的诊断列表
const selectedDiaseseRows = ref([])

// 处理诊断表格选择变化
const handleDiaseseSelectionChange = (selection) => {
  selectedDiaseseRows.value = selection
}

// 删除选中的行
const deleteSelectedRows = () => {
  if (selectedDiaseseRows.value.length === 0) {
    ElMessage.warning('请先选择要删除的行')
    return
  }

  // 确保每个项目只被删除一次
  const rowsToDelete = [...selectedDiaseseRows.value]

  diaseseList.value = diaseseList.value.filter((item) => {
    const index = rowsToDelete.findIndex((row) => {
      if (item.id && row.id) {
        return item.id === row.id
      }
      return item.name === row.name && item.suggest === row.suggest
    })

    if (index > -1) {
      rowsToDelete.splice(index, 1)
      return false
    }
    return true
  })

  // 清空选择
  selectedDiaseseRows.value = []
  saveAudit()
}
// 在其他 ref 变量附近添加
const currentEditRow = ref(null)
const isEditing = ref(false)
// 修改 handleEdit 方法
const handleEdit = (index, row) => {
  // 设置当前编辑的行数据
  currentEditRow.value = { ...row } // 深拷贝避免直接修改原数据
  isEditing.value = true

  // 将行数据填充到表单中
  selfSuggestForm.value = {
    suggestName: row.name || '',
    suggestText: row.suggest || ''
    // 如果有其他字段也需要相应添加
  }

  // 打开弹窗
  selfInpSuggestDialogVisible.value = true
}
// 在其他ref变量中添加
const selfSuggestForm = ref({
  suggestCode: '',
  suggestName: '',
  suggestText: ''
})

// 添加自填建议保存方法
// 修改 addSelfSuggest 方法
const addSelfSuggest = () => {
  if (!selfSuggestForm.value.suggestName.trim()) {
    ElMessage.warning('请输入建议名称')
    return
  }

  if (!selfSuggestForm.value.suggestText.trim()) {
    ElMessage.warning('请输入建议内容')
    return
  }

  if (isEditing.value && currentEditRow.value) {
    // 编辑模式：更新现有行数据
    const index = diaseseList.value.findIndex(
      (item) =>
        item.name === currentEditRow.value?.name && item.suggest === currentEditRow.value.suggest
    )

    if (index !== -1) {
      // 更新数据
      diaseseList.value[index] = {
        ...diaseseList.value[index],
        name: selfSuggestForm.value.suggestName,
        suggest: selfSuggestForm.value.suggestText
      }
    }
  } else {
    // 新增模式：添加新行
    if (!diaseseList.value) {
      diaseseList.value = []
    }

    diaseseList.value.push({
      name: selfSuggestForm.value.suggestName,
      suggest: selfSuggestForm.value.suggestText,
      isdisease: 0
    })
  }

  // 保存
  saveAudit()

  // 清空表单
  selfSuggestForm.value = {
    suggestCode: '',
    suggestName: '',
    suggestText: ''
  }

  // 重置编辑状态
  isEditing.value = false
  currentEditRow.value = null

  // 关闭弹窗
  selfInpSuggestDialogVisible.value = false

  ElMessage.success(isEditing.value ? '修改成功' : '添加成功')
}
//修改建议指导内部弹框
const innerSuggestVisible = ref(false)
const suggestInnerTableData = ref([])
const quoteSuggest = async () => {
  await suggestNameChange(selfSuggestForm.value.suggestName)
  innerSuggestVisible.value = true
}
//建议名称修改监听
const suggestNameChange = async (suggestName) => {
  const params = {
    pageNo: 1,
    pageSize: 100,
    suggestName: suggestName
  }

  await Api.getPeSuggestItem(params).then((res) => {
    suggestInnerTableData.value = res.records || []
  })
}
const innerSuggestRowDblClick = (row) => {
  selfSuggestForm.value.suggestText = row.suggestText
  innerSuggestVisible.value = false
}
// 添加选中的科普知识列表
const selectedKnowledgeRows = ref([])

// 处理科普知识表格选择变化
const handleKnowledgeSelectionChange = (selection) => {
  selectedKnowledgeRows.value = selection
}

// 删除选中的科普知识
const deleteSelectedKnowledge = () => {
  if (selectedKnowledgeRows.value.length === 0) {
    ElMessage.warning('请先选择要删除的科普知识')
    return
  }

  // 从 knowledgeRecordList 中移除选中的行
  const selectedIds = selectedKnowledgeRows.value.map((row) => row.sortNo || row.knowledgeName)
  knowledgeRecordList.value = knowledgeRecordList.value.filter((item) => {
    const itemId = item.sortNo || item.knowledgeName
    return !selectedIds.includes(itemId)
  })

  // 重新排序 sortNo
  knowledgeRecordList.value.forEach((item, index) => {
    item.sortNo = index + 1
  })

  // 清空选择
  selectedKnowledgeRows.value = []

  // 自动保存
  saveAudit()

  ElMessage.success('删除成功')
}
// 分科结果按钮点击事件
const fenkeJieguo = () => {
  if (currentFenkeRow.value.deptCode && itemDetail.value.peId && itemDetail.value.peVisitId) {
    router.push({
      path: '/PhyExamManage/PpExamination/doctorTriageDesk',
      query: {
        deptCode: currentFenkeRow.value.deptCode,
        peId: itemDetail.value.peId,
        peVisitId: itemDetail.value.peVisitId
      }
    })
  } else {
    ElMessage.warning('缺少必要参数，无法进行分科结果查看操作')
  }
}

// 在其他 ref 变量后面添加以下代码
const detailDialogVisible = ref(false)
const detailTableData = ref([])
// 显示详情弹窗
const showDetail = async (row) => {
  const getDetailTableDataParams = reactive({
    peId: row.peId || '',
    peVisitId: row.peVisitId || 0,
    pePreDate: row.pePreDate || row.peQueueDate || ''
  })
  await Api.updateFinishedSignList(getDetailTableDataParams).then((res) => {
    detailTableData.value = res
  })
  detailDialogVisible.value = true
}

// 修改完成状态方法（暂时为空）
const changeFinishStatus = async (row) => {
  console.log('修改完成状态:', row)
  await Api.updateFinishedSign(row).then((res) => {
    if (res) {
      ElMessage.success('修改成功')
      showDetail(itemDetail.value)
    }
  })
}

// 取消分科审核方法（暂时为空）
const cancelDeptAudit = async (row) => {
  console.log('取消分科审核:', row)
  await Api.cancleCbAuditDept(row).then((res) => {
    if (res) {
      ElMessage.success('取消成功')
    }
  })
}
</script>
<style lang="scss" scoped>
.per_trage {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 0;
  box-sizing: border-box;
  .trage_search {
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
        .deltrage {
          color: #ed2226;
          border-color: #ed2226;
          background-color: #fff;
        }
      }
    }
  }
  .trage_table {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    .table_left {
      width: 43.8%;
      background-color: #fff;

      .heard_title {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #c5dcff;
        span {
          display: inline-block;
          width: auto;
          height: 40px;
          padding: 0 20px;
          text-align: center;
          color: #3473d1;
          font-weight: bold;
        }
      }
      .list_table {
        padding: 0 8px 0 8px;
        width: 100%;
      }
      .btn {
        height: 48px;
        line-height: 48px;

        .el-button {
          background-color: #3473d1;
          color: #fff;
          border-color: #3473d1;
          margin: 0 6px;
          img {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
        }
      }
    }
    .table_right {
      width: 55.8%;
      background-color: #fff;
      .right_tabs {
        width: 100%;
        height: calc(100vh - 223px);
        .card_con1 {
          width: 100%;
          height: 100%;
          .con_title {
            display: flex;
            align-items: center;
            height: 30px;
            width: 100%;
            background-color: #d7e7ff;
            .t1 {
              padding-left: 8px;
              color: #3473d1;
              font-size: 14px;
              width: 15%;
              overflow: hidden;
            }
            .t2 {
              color: #3473d1;
              font-size: 14px;
              width: 60%;
              overflow: hidden;
            }
            .t3 {
              color: #3473d1;
              font-size: 14px;
              width: 25%;
              overflow: hidden;
            }
          }
          .con_msg {
            display: flex;
            align-items: center;
            height: 54px;
            width: 100%;
            border-bottom: 1px solid #ebeef5;
            border-right: #ebeef5 1px solid;
            border-left: #ebeef5 1px solid;
            span {
              display: inline-block;
              padding-left: 8px;
              background-color: #ebeef5;
              color: #333333;
              font-size: 14px;
              overflow: hidden;
              width: 15%;
              height: 54px;
              line-height: 54px;
            }
            div {
              background-color: #fff;
              width: 85%;
              color: #333333;
              font-size: 14px;
              padding-left: 8px;
            }
          }
        }
        .card_con2 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .con2_left {
            width: 39.8%;
            .heard_title {
              height: 40px;
              line-height: 40px;
              border-bottom: 1px solid #c5dcff;
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                display: inline-block;
                width: auto;
                height: 40px;
                padding: 0 20px;
                text-align: center;
                color: #3473d1;
                font-weight: bold;
              }
              .btn {
                .el-button {
                  background-color: #fff;
                  color: #3473d1;
                  border-color: #3473d1;
                }
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 4px;
                }
              }
            }
            .con2_table {
              height: calc(100vh - 330px);
              margin-top: 8px;
            }
          }
          .con2_right {
            width: 59.8%;
            .heard_title {
              height: 40px;
              line-height: 40px;
              border-bottom: 1px solid #c5dcff;
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                display: inline-block;
                width: auto;
                height: 40px;
                padding: 0 20px;
                text-align: center;
                color: #3473d1;
                font-weight: bold;
              }
              .btn {
                display: flex;
                .spanTS {
                  display: inline-block;
                  height: 40px;
                  line-height: 20px;
                  color: #ed2226;
                }
                .el-button {
                  background-color: #fff;
                  color: #3473d1;
                  border-color: #3473d1;
                }
                .del {
                  background-color: #fff;
                  color: #ed2226;
                  border-color: #ed2226;
                }
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 4px;
                }
              }
            }
            .con2_table {
              height: calc(100vh - 330px);
              margin-top: 8px;
            }
          }
        }
        .card_con3 {
          .heard_title {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #c5dcff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              display: inline-block;
              width: auto;
              height: 40px;
              padding: 0 20px;
              text-align: center;
              color: #3473d1;
              font-weight: bold;
            }
            .btn {
              .el-button {
                background-color: #fff;
                color: #3473d1;
                border-color: #3473d1;
              }
              .del {
                background-color: #fff;
                color: #ed2226;
                border-color: #ed2226;
              }
              img {
                width: 16px;
                height: 16px;
                margin-right: 4px;
              }
            }
          }
          .con3_se {
            // padding: 20px;
            height: calc(100vh - 600px);
            border-bottom: 1px solid #edf1fc;
          }
          .con3_de {
            margin-top: 8px;
            // background-color: #ededed;
            // padding: 12px;
            width: 100%;
            height: auto;
            color: #333333;
            font-size: 14px;
          }
        }
        .card_con4 {
        }
        .card_con5 {
          .heard_title {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #c5dcff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              display: inline-block;
              width: auto;
              height: 40px;
              padding: 0 20px;
              text-align: center;
              color: #3473d1;
              font-weight: bold;
            }
            .btn {
              .el-button {
                background-color: #fff;
                color: #3473d1;
                border-color: #3473d1;
              }
              .del {
                background-color: #fff;
                color: #ed2226;
                border-color: #ed2226;
              }
              img {
                width: 16px;
                height: 16px;
                margin-right: 4px;
              }
            }
          }
          .con5_table {
            height: calc(100vh - 330px);
            margin-top: 8px;
          }
        }
      }
      .btn {
        height: 48px;
        line-height: 48px;
        text-align: right;
        .el-button {
          background-color: #3473d1;
          color: #fff;
          border-color: #3473d1;
          margin: 0 6px;
          img {
            width: 16px;
            height: 16px;
            margin-right: 4px;
          }
        }
      }
    }
  }
}
.pdfDom {
  background-color: #fff;
  overflow: hidden;
  flex: 1;
  overflow: auto;
  margin-top: 6px;
}

.fenke-form {
  padding: 20px;

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-form-item__label {
    font-weight: bold;
  }
}

.suggest-form {
  padding: 20px;

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-form-item__label {
    font-weight: bold;
  }
}
</style>
