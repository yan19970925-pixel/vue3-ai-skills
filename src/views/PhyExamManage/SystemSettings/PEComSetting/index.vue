<template>
  <div class="base-setting">
    <div style="width: 100%; height: 100%; overflow: auto">
      <el-row style="height: 100%">
        <el-col :span="6" class="pr-4px" style="height: 100%">
          <div class="content">
            <div class="base-title">科室列表</div>
            <el-table
              :data="deptList"
              border
              class="mt-6px"
              style="width: 100%; height: calc(100% - 60px); min-height: 300px; overflow: auto"
              highlight-current-row
              stripe
              @row-click="handleDeptClick"
            >
              <el-table-column label="分类" prop="peDeptClass" width="100" show-overflow-tooltip />
              <el-table-column label="科室名称" prop="peDeptName" show-overflow-tooltip />
              <el-table-column label="外部科室" prop="label2" width="100" show-overflow-tooltip />
            </el-table>
          </div>
        </el-col>
        <el-col :span="18" style="height: 100%">
          <div class="base-box" style="background-color: #fff">
            <div class="base-title mb-2px">组合详情</div>

            <div class="base-cont">
              <span class="cont-span">组合代码:</span>
              <el-input
                style="width: 16%"
                v-model="formInfo.itemAssemCode"
                placeholder="请输入"
                class="select-item"
                disabled
              />
              <span class="cont-span">组合名称:</span>
              <el-input
                style="width: 16%"
                v-model="formInfo.itemAssemName"
                placeholder="请输入"
                class="select-item"
                @blur="generateInputCode"
              />
              <span class="cont-span">输入码:</span>
              <el-input
                style="width: 16%"
                v-model="formInfo.inputCode"
                placeholder="请输入"
                class="select-item"
              />

              <span class="cont-span">对应类别:</span>
              <el-select
                v-model="formInfo.form"
                placeholder="请选择机构名称"
                style="width: 8%"
                class="select-item"
                filterable
                clearable
                default-first-option
              >
                <el-option
                  v-for="(item, key) in AssemClassList"
                  :key="key"
                  :label="item.className"
                  :value="item.className"
                />
              </el-select>
              <el-button type="primary" style="width: 6%" @click="setClass">类别维护</el-button>
            </div>
            <div class="base-cont">
              <span class="cont-span">所属科室:</span>
              <el-select
                v-model="formInfo.peDeptCode"
                placeholder="请选择机构名称"
                style="width: 16%"
                class="select-item"
                filterable
                clearable
                default-first-option
              >
                <el-option
                  v-for="(item, key) in deptList"
                  :key="key"
                  :label="item.peDeptName"
                  :value="item.peDeptCode"
                />
              </el-select>
              <span class="cont-span">性别:</span>
              <el-select
                v-model="formInfo.sex"
                placeholder="性别"
                style="width: 16%"
                class="select-item"
                filterable
                clearable
                default-first-option
              >
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>

              <span class="cont-span">价格(元):</span>
              <el-input
                style="width: 16%"
                v-model="formInfo.discountPrice"
                placeholder="请输入"
                class="select-item"
              />
              <span class="cont-span">单检价格(元):</span>
              <el-input
                style="width: 16%"
                v-model="formInfo.personPrice"
                placeholder="请输入"
                class="select-item"
              />
            </div>
            <div class="base-cont">
              <span class="cont-span">团检价格(元):</span>
              <el-input
                style="width: 16%"
                v-model="formInfo.unitPrice"
                placeholder="请输入"
                class="select-item"
              />

              <span class="cont-span">抽血:</span>
              <el-select
                v-model="formInfo.peBlood"
                class="select-item"
                style="width: 16%"
                placeholder="请选择"
              >
                <el-option label="抽血" value="抽血" />
                <el-option label="不抽血" value="不抽血" />
              </el-select>
              <span class="cont-span">指引单分组:</span>
              <el-select
                v-model="formInfo.chartCode"
                placeholder="请选择机构名称"
                style="width: 16%"
                class="select-item"
                filterable
                clearable
                default-first-option
              >
                <el-option
                  v-for="(item, key) in chartList"
                  :key="key"
                  :label="item.chartName"
                  :value="item.chartCode"
                />
              </el-select>
              <span class="cont-span">指引单内容:</span>
              <el-input
                style="width: 16%"
                v-model="formInfo.chartGuide"
                placeholder="请输入"
                class="select-item"
              />
            </div>
            <div class="base-cont">
              <!-- <span class="cont-span">指引单分组:</span>
              <el-select
                v-model="formInfo.chartCode"
                placeholder="请选择机构名称"
                style="width: 16%"
                class="select-item"
                filterable
                clearable
                default-first-option
              >
                <el-option
                  v-for="(item, key) in chartList"
                  :key="key"
                  :label="item.chartName"
                  :value="item.chartCode"
                />
              </el-select>
              <span class="cont-span">指引单内容:</span>
              <el-input
                style="width: 16%"
                v-model="formInfo.chartGuide"
                placeholder="请输入"
                class="select-item"
              /> -->
              <span class="cont-span">标本:</span>
              <el-input
                style="width: 16%"
                v-model="formInfo.sample"
                placeholder="请输入"
                class="select-item"
                readonly
              >
                <template #append>
                  <el-button :icon="Search" @click="openSampleDictDialog" />
                </template>
              </el-input>
              <span class="cont-span">试管:</span>
              <el-select
                v-model="formInfo.priceItemCode"
                placeholder="请选择机构名称"
                style="width: 8%"
                class="select-item"
                filterable
                clearable
                default-first-option
              >
                <el-option
                  v-for="(item, key) in TubeList"
                  :key="key"
                  :label="item.testTubeName"
                  :value="item.testTubeCode"
                />
              </el-select>
              <el-select
                v-model="formInfo.cuvette"
                placeholder="颜色"
                style="width: 6%"
                class="select-item"
                filterable
                clearable
                default-first-option
              >
                <el-option label="黑色" value="黑" />
                <el-option label="红色" value="红" />
                <el-option label="黄色" value="黄" />
                <el-option label="蓝色" value="蓝" />
                <el-option label="绿色" value="绿" />
                <el-option label="紫色" value="紫" />
                <el-option label="亚红色" value="亚红" />
                <el-option label="白色" value="白" />
                <el-option label="橘色" value="橘" />
              </el-select>
            </div>

            <div class="base-cont">
              <div style="width: 26; margin-left: 2%">
                <el-checkbox v-model="checked4" style="" label="免费" />
                <el-checkbox v-model="checked1" style="" label="显示" />
                <el-checkbox v-model="checked2" style="" label="报告图片" />
                <el-checkbox v-model="checked3" style="" label="不出报告" />
              </div>

              <div class="base-cont" style="width: 28%">
                <el-button
                  class="resetBtn"
                  style="width: 20%; margin-right: -8px"
                  @click="handleAdd"
                >
                  <el-icon><Plus /></el-icon>新增
                </el-button>
                <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button> -->
                <el-button type="primary" style="width: 20%" @click="save">保存</el-button>
                <el-button class="resetBtn" @click="handleOutApply">对外申请对照表</el-button>
                <el-button class="resetBtn" @click="handleHuaJiaDuiZhao">划价对照表</el-button>
              </div>
            </div>
          </div>
          <div style="width: 100%; height: calc(100% - 243px)">
            <el-row style="height: 100%" class="mt-4px">
              <el-col :span="8" class="pr-4px" style="height: 100%">
                <div class="content">
                  <div class="base-title">项目组合</div>
                  <div class="base-cont">
                    <!-- <span class="cont-span">过滤条件：</span> -->
                    <el-select
                      v-model="option1"
                      placeholder="请选择机构名称"
                      style="width: 24%"
                      class="select-item"
                      filterable
                      clearable
                      default-first-option
                    >
                      <el-option
                        v-for="(item, index) in filteredOptions"
                        :key="index"
                        :label="item.className"
                        :value="item.classCode"
                      />
                    </el-select>
                    <el-select
                      v-model="option2"
                      placeholder="请选择机构名称"
                      style="width: 24%"
                      class="select-item"
                      filterable
                      clearable
                      default-first-option
                    >
                      <el-option
                        v-for="(item, index) in showItem"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>

                    <el-button
                      class="resetBtn"
                      style="width: 30%; margin-right: -8px"
                      @click="handleAddHisItem"
                    >
                      <el-icon><Plus /></el-icon>新增HIS项目
                    </el-button>
                  </div>
                  <!-- <div class="base-cont"> 
                    <span class="cont-span" style="width: 2%"></span>
                    <el-input
                      style="width: 24%"
                      v-model="certName"
                      placeholder="请输入"
                      class="select-item"
                    />
                    <el-button type="primary" @click="handleSaveDocument">定位组合</el-button>
                  </div> -->
                  <el-table
                    :data="itemsList"
                    border
                    class="mt-6px"
                    style="
                      width: 100%;
                      height: calc(100% - 90px);
                      min-height: 300px;
                      overflow: auto;
                    "
                    highlight-current-row
                    stripe
                    @row-click="handleItemsClick"
                    :row-class-name="tableRowClassName"
                  >
                    <el-table-column
                      label="代码"
                      prop="itemAssemCode"
                      width="120"
                      show-overflow-tooltip
                    />
                    <el-table-column label="组合项目" prop="itemAssemName" show-overflow-tooltip />

                    <el-table-column
                      label="标记"
                      width="60"
                      prop="itemAssemName"
                      show-overflow-tooltip
                    >
                      <template #default="{ row }">
                        <span v-if="row.displayFlag == 0">显示</span>
                        <span v-else-if="row.displayFlag == 2">互联网显示</span>
                        <span v-else>不显示</span>
                      </template>
                    </el-table-column>
                    <!-- 右侧操作列，删除功能 -->
                    <el-table-column label="操作" width="80">
                      <template #default="scope">
                        <el-button
                          type="text"
                          size="small"
                          style="color: red; font-weight: 500; font-size: 14px"
                          @click="delItem(scope.row)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="16" style="height: 100%">
                <div class="base-box" style="background-color: #fff; height: 100%">
                  <div class="base-title mb-2px">项目选择</div>
                  <div
                    style="
                      width: 100%;
                      height: calc(100% - 47px);
                      padding: 4px 8px 0;
                      display: flex;
                      align-items: center;
                    "
                  >
                    <div style="width: 68%; height: 100%; margin-right: 8px">
                      <div class="base-title1"
                        >可选

                        <el-input style="width: 88%" v-model="leftFilter" placeholder="请输入" />
                      </div>
                      <div
                        style="
                          width: 100%;
                          height: calc(100% - 42px);
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
                            grid-template-columns: repeat(2, 48%);
                            gap: 4px;
                            padding: 5px;
                            overflow-y: auto;
                            width: 100%;
                          "
                        >
                          <div
                            v-for="item in filteredLeftData"
                            :key="item.peItemCode"
                            style="
                              height: 30px;
                              display: flex;
                              align-items: center;
                              overflow: hidden;
                            "
                          >
                            <el-checkbox v-model="unSelect" :label="item.peItemCode">
                              {{ item.itemAssemNameAppendItemCode }}
                            </el-checkbox>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="width: 30%; height: 100%">
                      <div class="base-title1"
                        >已选

                        <el-input style="width: 68%" v-model="rightFilter" placeholder="请输入" />
                      </div>
                      <div
                        style="
                          width: 100%;
                          height: calc(100% - 42px);
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
                        <!-- grid-template-columns: repeat(2, 40%); -->
                        <div
                          style="
                            display: grid;
                            grid-template-columns: repeat(1, 95%);
                            gap: 5px;
                            padding: 5px;
                            overflow-y: auto;
                          "
                        >
                          <div
                            v-for="item in filteredRightData"
                            :key="item.peItemCode"
                            style="
                              height: 30px;
                              display: flex;
                              align-items: center;
                              overflow: hidden;
                            "
                          >
                            <el-checkbox v-model="selected" :label="item.peItemCode">
                              {{ item.itemAssemNameAppendItemCode }}
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
        </el-col>
      </el-row>
    </div>
    <!-- 类别维护 -->
    <Dialog
      :fullscreen="false"
      :model-value="setClassDialog"
      title="类别维护"
      width="45%"
      class="auditDialog"
      @close="setClassDialog = false"
    >
      <div class="con">
        <div class="base-cont">
          <span class="cont-span">执行时间:</span>
          <el-date-picker
            style="width: 12vw"
            v-model="value1"
            type="date"
            placeholder="请选择"
            :default-value="new Date()"
          />
          <span class="cont-span">操作者:</span>
          <el-input
            style="width: 12vw"
            v-model="certName"
            placeholder="请输入"
            class="select-item"
          />
        </div>
      </div>
      <el-table
        :data="AssemClassList"
        border
        @row-click="handleAssemRowClick"
        style="text-align: center; height: 350px"
      >
        <el-table-column prop="serialNo" label="序号" width="80"> </el-table-column>
        <el-table-column prop="classCode" label="代码" width="120"> </el-table-column>
        <el-table-column prop="className" label="名称"> </el-table-column>
        <!-- 可删除的操作列 -->
        <el-table-column
          label="操作"
          width="60px
        "
        >
          <template #default="scoped">
            <!-- 使用迷你尺寸的按钮 -->
            <span style="font-weight: 500; color: red" @click="handleDeleteAssemClass(scoped.row)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="base-cont">
        <span class="cont-span">序号:</span>
        <el-input
          style="width: 12vw"
          v-model="classitem.serialNo"
          placeholder="请输入"
          class="select-item"
        />
        <span class="cont-span">名称:</span>
        <el-input
          style="width: 12vw"
          v-model="classitem.className"
          placeholder="请输入"
          class="select-item"
        />
        <span class="cont-span">代码:</span>
        <el-input
          style="width: 12vw"
          v-model="classitem.classCode"
          placeholder="请输入"
          class="select-item"
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="setClassDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleSaveAssemClass">保 存</el-button>
        </div>
      </template>
    </Dialog>
    <!-- 对外申请对照表 -->
    <Dialog
      :fullscreen="false"
      :model-value="showDuiZhaoShenQingDialog"
      :title="'对外申请对照表'"
      width="65%"
      class="auditDialog"
      :top="'calc(15vh - 50px)'"
      @close="closeDuiWaiShenQingDialog()"
    >
      <div class="con">
        <div class="base-cont">
          <span class="">项目代码:</span>
          <span style="width: 12vw" class="select-item">{{ formInfo.itemAssemCode }}</span>

          <span class="cont-span">项目名称:</span>
          <span style="width: 12vw" class="select-item">{{ formInfo.itemAssemName }}</span>
        </div>
      </div>
      <div class="base-cont">
        <div class="title" style="font-size: 16px; font-weight: 600">对应诊疗项目</div>
        <el-button class="resetBtn" @click="handleAddZhenLiao">
          <el-icon><Plus /></el-icon>新增
        </el-button>
        <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button> -->
        <el-button type="primary" @click="refresh">刷新</el-button>
      </div>
      <el-table
        :data="zhenliaoList"
        border
        @row-click="handleZhenLiaoRowClick"
        style="text-align: center; height: 168px"
      >
        <!-- itemClass 列 -->
        <el-table-column label="序号" width="80" prop="itemNo">
          <template #default="{ row }">
            <el-input v-model="row.itemNo" style="width: 100%" />
          </template>
        </el-table-column>
        <el-table-column label="项目分类" width="150" prop="itemClass">
          <template #default="{ row }">
            <div :ref="(el) => setSelectRef(el, row)">
              <el-select v-model="row.itemClass" style="width: 100%">
                <el-option
                  v-for="item in ZLFenLeiDict"
                  :key="item.classCode"
                  :label="item.className"
                  :value="item.classCode"
                />
              </el-select>
            </div>
          </template>
        </el-table-column>
        <!-- 动态渲染列 -->
        <el-table-column
          v-for="(column, index) in zhenliaoClumns"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :width="column.width ? column.width : undefined"
        >
          <template #default="{ row }">
            <div>
              <el-input
                v-if="column.prop === 'itemName'"
                type="text"
                v-model.trim="row[column.prop]"
                placeholder="请输入"
                clearable
                :maxlength="50"
              >
                <template #append>
                  <el-button
                    :icon="Search"
                    @click="onMailingAddressAreaAddress(row, '诊疗项目名称字典')"
                  />
                </template>
              </el-input>
              <el-input
                v-else-if="column.prop === 'itemCode'"
                disabled
                v-model="row[column.prop]"
              />
              <el-input v-else v-model="row[column.prop]" />
            </div>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="60px">
          <template #default="scoped">
            <span style="font-weight: 500; color: red" @click="handleDelZhenLiaoItem(scoped.row)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDuiWaiShenQingDialog">取 消</el-button>
          <el-button type="primary" @click="handleSavePeAssemVsClinic">保 存</el-button>
        </div>
      </template>
    </Dialog>

    <!-- 划价对照表 -->
    <Dialog
      :fullscreen="false"
      :model-value="showHuaJia"
      title="划价对照表"
      width="65%"
      class="auditDialog"
      :top="'calc(15vh - 50px)'"
      @close="closeDialog"
    >
      <div class="con">
        <div class="base-cont">
          <span class="">项目代码:</span>
          <span style="width: 12vw" class="select-item">{{ formInfo.itemAssemCode }}</span>

          <span class="cont-span">项目名称:</span>
          <span style="width: 12vw" class="select-item">{{ formInfo.itemAssemName }}</span>
        </div>
      </div>
      <div class="base-cont">
        <div class="title" style="font-size: 16px; font-weight: 600">对应诊疗项目</div>
        <el-button class="resetBtn" @click="handleAddZhenLiao">
          <el-icon><Plus /></el-icon>新增
        </el-button>
        <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button> -->
        <el-button type="primary" @click="refresh">刷新</el-button>
      </div>
      <el-table
        :data="zhenliaoList"
        border
        @row-click="handleZhenLiaoRowClick"
        style="text-align: center; height: 168px"
      >
        <!-- itemClass 列 -->
        <el-table-column label="序号" width="80" prop="itemNo">
          <template #default="{ row }">
            <el-input v-model="row.itemNo" style="width: 100%" />
          </template>
        </el-table-column>
        <el-table-column label="项目分类" width="150" prop="itemClass">
          <template #default="{ row }">
            <div :ref="(el) => setSelectRef(el, row)">
              <el-select v-model="row.itemClass" style="width: 100%">
                <el-option
                  v-for="item in ZLFenLeiDict"
                  :key="item.classCode"
                  :label="item.className"
                  :value="item.classCode"
                />
              </el-select>
            </div>
          </template>
        </el-table-column>
        <!-- 动态渲染列 -->
        <el-table-column
          v-for="(column, index) in zhenliaoClumns"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :width="column.width ? column.width : undefined"
        >
          <template #default="{ row }">
            <div>
              <el-input
                v-if="column.prop === 'itemName'"
                type="text"
                v-model.trim="row[column.prop]"
                placeholder="请输入"
                clearable
                :maxlength="50"
              >
                <template #append>
                  <el-button
                    :icon="Search"
                    @click="onMailingAddressAreaAddress(row, '诊疗项目名称字典')"
                  />
                </template>
              </el-input>
              <el-input
                v-else-if="column.prop === 'itemCode'"
                disabled
                v-model="row[column.prop]"
              />
              <el-input v-else v-model="row[column.prop]" />
            </div>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="60px">
          <template #default="scoped">
            <span
              style="font-weight: 500; color: red"
              @click="handleDelZhenLiaoItemInHuaJia(scoped.row)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>

      <div>
        <div class="base-cont">
          <div class="title" style="font-size: 16px; font-weight: 600">对应价表项目</div>
          <el-button class="resetBtn" @click="handleTongBuHIS"> 同步HIS价表 </el-button>
          <el-button class="resetBtn" @click="handleAddHuaiJia">
            <el-icon><Plus /></el-icon>新增
          </el-button>
          <!-- <el-button type="danger" @click="handleSaveDocument">删除</el-button> -->
          <el-button type="primary" @click="refresh">刷新</el-button>
        </div>
        <el-table
          :data="jiabiaoList"
          border
          @row-click="handleJiaBiaoRowClick"
          style="text-align: center; height: 168px"
        >
          <!-- itemClass 列 -->
          <el-table-column width="80" label="序号" prop="itemNo">
            <template #default="{ row }">
              <el-input v-model="row.itemNo" style="width: 100%" />
            </template>
          </el-table-column>
          <el-table-column label="项目分类" width="150" prop="itemClass">
            <template #default="{ row }">
              <div :ref="(el) => setSelectRef(el, row)">
                <el-select v-model="row.itemClass" style="width: 100%">
                  <el-option
                    v-for="item in ZLFenLeiDict"
                    :key="item.classCode"
                    :label="item.className"
                    :value="item.classCode"
                  />
                </el-select>
              </div>
            </template>
          </el-table-column>
          <!-- 动态渲染列 -->
          <el-table-column
            v-for="(column, index) in jiabiaoClumns"
            :key="index"
            :prop="column.prop"
            :label="column.label"
            :width="column.width || ''"
          >
            <template #default="{ row }">
              <div>
                <el-input
                  v-if="column.prop === 'itemName'"
                  type="text"
                  v-model.trim="row[column.prop]"
                  placeholder="请输入"
                  clearable
                  :maxlength="50"
                >
                  <template #append>
                    <el-button
                      :icon="Search"
                      @click="onMailingAddressAreaAddress(row, '所有价表')"
                    />
                  </template>
                </el-input>

                <el-input
                  v-else-if="column.prop === 'itemCode'"
                  disabled
                  v-model="row[column.prop]"
                />
                <el-input v-else v-model="row[column.prop]" />
              </div>
            </template>
          </el-table-column>

          <!-- 可删除的操作列 -->
          <el-table-column label="操作" width="60px">
            <template #default="scoped">
              <span style="font-weight: 500; color: red" @click="handleDelPriceItem(scoped.row)"
                >删除</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="handleSavePeAssemVsPrice">保 存</el-button>
        </div>
      </template>
    </Dialog>

    <DictDialog
      :visible="DictDialogVisible"
      :title="DictType"
      :query-params="QueryParams"
      width="800px"
      @callback="DictCallback"
      @on-close="DictDialogVisible = false"
    />

    <!-- 导入HIS检查、检验项目 -->
    <Dialog
      :fullscreen="false"
      :model-value="isAddHisItem"
      title="导入HIS检查、检验项目"
      width="45%"
      style="height: 60vh; background-color: #f5f7fa"
      class="addHis"
      @close="isAddHisItem = false"
    >
      <div class="con">
        <div class="base-cont">
          <span class="cont-span">当前体检分类</span>

          <span class="cont-span">检索:</span>
          <el-input
            style="width: 12vw"
            v-model="hisDeptSearch"
            placeholder="请输入"
            class="select-item"
          />
        </div>
      </div>
      <div class="addHisContent mt-6px">
        <div class="left">
          <el-table
            :data="filteredHISDeptList"
            border
            style="width: 100%; height: calc(380px); min-height: 300px; overflow: auto"
            highlight-current-row
            stripe
            @selection-change="handleHISDeptSelectionChange"
            ref="hisDeptTableRef"
            @row-click="handleHISDeptClick"
          >
            <el-table-column label="科室名称" prop="deptName" width="90" show-overflow-tooltip />
            <el-table-column label="分类" prop="classType" width="" show-overflow-tooltip />
          </el-table>
        </div>
        <div class="right">
          <div class="top">
            <!-- 顶部项目列表 -->
            <el-table
              :data="filteredHISItemList"
              border
              style="width: 100%; height: calc(200px); overflow: auto"
              highlight-current-row
              stripe
              @selection-change="handleHISItemSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="HIS编码" prop="itemCode" width="120" show-overflow-tooltip />
              <el-table-column label="HIS名称" width="160" prop="itemName" show-overflow-tooltip />
              <el-table-column label="价格" prop="clinicCharges" width="80" show-overflow-tooltip />
              <el-table-column
                label="项目分类"
                prop="classType"
                width="160"
                show-overflow-tooltip
              />
              <el-table-column
                label="科室分类"
                prop="itemClassname"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column
                label="诊疗项目分类"
                prop="itemClass"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column
                label="检查分类"
                prop="examClass"
                width="100"
                show-overflow-tooltip
              />
              <el-table-column label="科室名称" prop="deptName" width="100" show-overflow-tooltip />
              <el-table-column label="输入码" prop="inputCode" width="120" show-overflow-tooltip />
            </el-table>
          </div>
          <div class="bottom">
            <div class="base-cont">
              <span class="">以下是当前选择的体检项目</span>
              <el-button class="resetBtn" style="margin-right: -8px" @click="confirmImport">
                确认导入
              </el-button>
              <!-- <el-button class="resetBtn" style="margin-right: -8px" @click="cancelImport">
                取消导入
              </el-button> -->
            </div>
            <el-table
              :data="selectedHISItems"
              border
              style="width: 100%; height: calc(134px); overflow: auto"
              highlight-current-row
              stripe
            >
              <el-table-column label="HIS编码" prop="itemCode" width="120" show-overflow-tooltip />
              <el-table-column label="HIS名称" prop="itemName" width="180" show-overflow-tooltip />
              <el-table-column label="价格" prop="clinicCharges" width="80" show-overflow-tooltip />
              <el-table-column
                label="项目分类"
                prop="classType"
                width="160"
                show-overflow-tooltip
              />
              <el-table-column
                label="科室分类"
                prop="itemClassname"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column
                label="诊疗项目分类"
                prop="itemClass"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column
                label="检查分类"
                prop="examClass"
                width="120"
                show-overflow-tooltip
              />
              <el-table-column label="科室名称" prop="deptName" width="120" show-overflow-tooltip />
              <el-table-column label="输入码" prop="inputCode" width="120" show-overflow-tooltip />
            </el-table>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isAddHisItem = false">取 消</el-button>
          <!-- <el-button type="primary" @click="handleSaveAssemClass">保 存</el-button> -->
        </div>
      </template>
    </Dialog>
    <DictDialog
      :visible="sampleDictDialogVisible"
      title="标本字典"
      :query-params="sampleQueryParams"
      width="800px"
      @callback="sampleDictCallback"
      @on-close="sampleDictDialogVisible = false"
    />
  </div>
</template>

<script lang="ts" setup name="PEComSet">
import { ref, computed } from 'vue'
import * as Api from '@/api/systemSetting/PEComSetting/index'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { queryDictByConfig } from '@/api/system/deptManage'
import DictDialog from '@/views/components/DictDialog/Index.vue'
import { Search } from '@element-plus/icons-vue'
import { object } from 'vue-types'
import InputCode from '@/views/system/platformManger/inputCode.vue'

// ===================== 响应式数据 =====================
const deptList = ref([])
const itemsList = ref([])

const zhenliaoList = ref([]) // 对应诊疗项目
const jiabiaoList = ref([]) // 对应价表项目
const zhenliaoItem = ref({})
const jiabiaoItem = ref({})
const zhenliaoClumns = ref([
  { label: '项目代码', prop: 'itemCode', width: '140' },
  { label: '项目名称', prop: 'itemName', width: '' },
  { label: '数量', prop: 'amount', width: '100' }
])
const jiabiaoClumns = ref([
  { label: '项目代码', prop: 'itemCode', width: '140' },
  { label: '项目名称', prop: 'itemName', width: '' },
  { label: '规格', prop: 'itemSpec', width: '100' },
  { label: '单位', prop: 'units', width: '100' },
  { label: '数量', prop: 'amount', width: '100' },
  { label: '当前价格', prop: 'currentPrice', width: '100' },
  { label: '单价', prop: 'appendPrice', width: '80' }
])

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
// 监听三个checked的值变化，改变formInfo中对应的值
watch([checked1, checked2, checked3, checked4], () => {
  formInfo.value.displayFlag = checked1.value ? 0 : 1
  formInfo.value.examSheet = checked2.value ? 1 : 0
  formInfo.value.reportFlag = checked3.value ? 1 : 0
  formInfo.value.freeFlag = checked4.value ? 1 : 0
})

const formInfo = ref({
  itemAssemCode: '',
  itemAssemName: '',
  peDeptCode: '',
  peBlood: '',
  chartCode: '',
  unitPrice: 0,
  personPrice: 0,
  discountPrice: 0,
  sample: '',
  form: '',
  inputCode: '',
  clinicItemCode: '',
  priceItemCode: '',
  chartGuide: '',
  displayFlag: '',
  reportFlag: '',
  sex: '',
  examSheet: '',
  sortNo: '',
  cuvette: '',
  examSort: '',
  itemAssmDesc: '',
  createDatetime: '',
  freeFlag: ''
})

const showApply = ref(false) // 是否显示对外申请对照表
const showHuaJia = ref(false) // 是否显示划价对照表

// 获取分类数据
const getDept = async () => {
  const res = await Api.getPeDeptList('application/x-www-form-urlencoded')
  deptList.value = res
  if (res.length > 0) {
    handleDeptClick(res[0])
  }
}
const deptDetail = ref()
// 点击科室列表行事件
const handleDeptClick = (row) => {
  // peDeptCode
  hisItemList.value = []
  formInfo.value = {}
  allDataSelected.value = []
  allDataUnselect.value = []
  deptDetail.value = row
  peDeptCode.value = row.peDeptCode

  getPeitemAssemLists(peDeptCode.value)
}

const matchedItem = ref()
// 获取项目组合数据
const getPeitemAssemLists = async (peDeptCode, form = 'option1') => {
  const itemsListInfo = ref({
    pageNo: 1,
    pageSize: 1000000,
    peDeptCode: peDeptCode || '',
    form: form == 'option1' ? '' : form || '',
    displayFlag: option2.value || ''
  })
  if (form !== 'option1') {
    itemsListInfo.value.peDeptCode = ''
    itemsListInfo.value.displayFlag = ''
  }
  const res = await Api.getPeItemAssemList(itemsListInfo.value)
  itemsList.value = res.records
  matchedItem.value = res.records.find((record) => record.itemAssemCode === itemAssemCode.value)
  if (res.records.length > 0) {
    handleItemsClick(matchedItem.value || res.records[0])
  }
}
// 点击套餐行时触发
const handleItemsClick = (row) => {
  allDataUnselect.value = []
  allDataSelected.value = []
  formInfo.value = row
  checked1.value = row.displayFlag == 0 ? true : false
  checked2.value = row.examSheet == 0 ? false : row.reportFlag == 0 ? false : true
  checked4.value = row.freeFlag == 1 ? true : false
  itemAssemCode.value = row.itemAssemCode
  // peDeptCode.value = row.peDeptCode
  // checked.value = formInfo.value.displayFlag == 1 ? false : true // 显示复选框状态
  // checked1.value = formInfo.value.displayFlag == 2 ? true : false
  // setCode.value = row.setCode
  getAllItems(row.itemAssemCode, row.peDeptCode)
}

// 获取项目组合数据
const getAllItems = (itemAssemCode, peDeptCode) => {
  allDataUnselect.value = []
  allDataSelected.value = []
  getItemUnselectList(itemAssemCode, peDeptCode)
  getItemSelectedList(itemAssemCode, peDeptCode)
}
const ItemUnselectListParams = reactive({
  itemAssemCode: '',
  peDeptCode: '',
  inputCode: ''
})
// 获取可选项目
const getItemUnselectList = async (itemAssemCode, peDeptCode, inputCode = '') => {
  ItemUnselectListParams.inputCode = inputCode || ''
  ItemUnselectListParams.peDeptCode = peDeptCode || ''
  ItemUnselectListParams.itemAssemCode = itemAssemCode || ''
  const res = await Api.getPeSetItemUnselectList(ItemUnselectListParams)
  allDataUnselect.value = res.records || []
  filteredLeftData.value = res.records || []
}
const ItemSelectedListParams = reactive({
  itemAssemCode: '',
  peDeptCode: '',
  inputCode: ''
})
// 获取已选项目
const getItemSelectedList = async (itemAssemCode, peDeptCode, inputCode = '') => {
  ItemSelectedListParams.itemAssemCode = itemAssemCode || ''
  ItemSelectedListParams.peDeptCode = peDeptCode || ''
  ItemSelectedListParams.inputCode = inputCode || ''
  const res = await Api.getPeSetItemSelectedList({
    itemAssemCode: itemAssemCode,
    peDeptCode: peDeptCode
  })
  allDataSelected.value = res || []
  filteredRightData.value = res || []
}

const allDataUnselect = ref([]) // 可选项目列表
const allDataSelected = ref([]) // 已选项目列表

const leftFilter = ref('') // 可选搜索框输入内容
const rightFilter = ref('') // 已选搜索框输入内容

const itemAssemCode = ref('')
const peDeptCode = ref('')

// 过滤后的可选数据
/* const filteredLeftData = computed(() => {
  // const filterValue = leftFilter.value.toLowerCase()
  // return allDataUnselect.value.filter((item) =>
  //   item.peItemName?.toLowerCase().includes(filterValue)
  // )
  return allDataUnselect.value
}) */

// 将原来的 computed 属性改为 ref
const filteredLeftData = ref([])

// 使用 watch 监听 leftFilter 的变化，调用接口进行过滤
watch(
  () => leftFilter.value,
  async (newVal) => {
    const filterValue = newVal.toLowerCase()
    if (filterValue) {
      // 当有过滤条件时调用后端接口
      try {
        const res = await Api.getPeSetItemUnselectList({
          ...ItemUnselectListParams,
          inputCode: filterValue
        })
        filteredLeftData.value = res.records || []
      } catch (error) {
        console.error('获取过滤数据失败:', error)
        filteredLeftData.value = []
      }
    } else {
      // 无过滤条件时返回所有未选择项目
      filteredLeftData.value = allDataUnselect.value
    }
  },
  { immediate: true } // 初始化时执行一次
)

// 过滤后的已选数据
// const filteredRightData = computed(() => {
//   const filterValue = rightFilter.value.toLowerCase()
//   return allDataSelected.value.filter((item) =>
//     item.peItemName?.toLowerCase().includes(filterValue)
//   )
// })

// 过滤后的已选数据
// 将原来的 computed 属性改为 ref
const filteredRightData = ref([])

// 使用 watch 监听 rightFilter 的变化，调用接口进行过滤
watch(
  () => rightFilter.value,
  async (newVal) => {
    const filterValue = newVal.toLowerCase()
    if (filterValue) {
      // 当有过滤条件时调用后端接口
      try {
        const res = await Api.getPeSetItemSelectedList({
          ...ItemSelectedListParams,
          inputCode: filterValue
        })
        filteredRightData.value = res || []
      } catch (error) {
        console.error('获取已选过滤数据失败:', error)
        filteredRightData.value = []
      }
    } else {
      // 无过滤条件时返回所有已选择项目
      filteredRightData.value = allDataSelected.value
    }
  },
  { immediate: true } // 初始化时执行一次
)
const unSelect = ref<number[]>([]) // 未选中项的 key 列表
const selected = ref<number[]>([]) // 已选中项的 key 列表

watch(
  () => unSelect.value,
  (newValue) => {
    if (newValue.length > 0) {
      handleUnSelectClick(newValue[0], 'unSelect')
    }
  }
)

watch(
  () => selected.value,
  (newValue) => {
    if (newValue.length > 0) {
      handleUnSelectClick(newValue[0], 'selected')
    }
  }
)

// 处理添加/移除项目
const handleUnSelectClick = async (val, type) => {
  if (type === 'unSelect') {
    await Api.addPeSetVsItem({
      peItemCode: val,
      itemAssemCode: itemAssemCode.value
    }).then((res) => {
      if (res) {
        unSelect.value = []
      }
    })
  } else if (type === 'selected') {
    await Api.removePeSetVsItem({
      peItemCode: val,
      itemAssemCode: itemAssemCode.value
    }).then((res) => {
      if (res) {
        selected.value = []
      }
    })
  }
  getAllItems(itemAssemCode.value, peDeptCode.value)
}
// 获取分类列表
const getPeItemAssemClassList = async () => {
  const res = await Api.getPeItemAssemClassList('application/x-www-form-urlencoded')
  AssemClassList.value = res
  filteredOptions.value = [{ classCode: 'option1', className: '全部类型' }, ...AssemClassList.value]
}
const AssemClassList = ref([])
// 检验试管查询
const getPeTestTubeDictList = async () => {
  const res = await Api.getPeTestTubeDictList({
    testTubeCode: ''
  })
  TubeList.value = res
}
const TubeList = ref([])
// 指引单查询
const getPeChartDictList = async () => {
  const res = await Api.getPeChartDictList({
    testTubeCode: ''
  })
  chartList.value = res
}
const chartList = ref([])

// 点击新增
const handleAdd = async () => {
  const res = await Api.getPeItemAssembledNo({ peDeptCode: peDeptCode.value })
  formInfo.value = {
    itemAssemCode: res || '',
    itemAssemName: '',
    peDeptCode: deptDetail.value.peDeptCode || '',
    peBlood: '',
    chartCode: '',
    unitPrice: 0,
    personPrice: 0,
    discountPrice: 0,
    sample: '',
    form: '',
    inputCode: '',
    clinicItemCode: '',
    priceItemCode: '',
    chartGuide: '',
    displayFlag: '',
    reportFlag: '',
    sex: '',
    examSheet: '',
    sortNo: '',
    cuvette: '',
    examSort: '',
    itemAssmDesc: '',
    createDatetime: ''
  }
  // formInfo.peDeptCode
  // deptDetail.value
  checked1.value = true

  formInfo.value.displayFlag = '0'
  checked2.value = false
  checked3.value = false
}

// 点击保存
const save = () => {
  // 判断formInfo.chartCode是否为空，如果为空不执行保存
  if (formInfo.value.chartCode === '') {
    ElMessage.warning('请选择指引单分组')
    return
  }
  Api.savePeItemAssembled(formInfo.value).then((res) => {
    if ((res = true && formInfo.value.itemAssemCode !== '')) {
      handleDeptClick(deptDetail.value)
      ElMessage.success('保存成功')
    } else if ((res = true && formInfo.value.itemAssemCode == '')) {
      ElMessage.success('新增成功')
    }
  })
  getAllItems(itemAssemCode.value, peDeptCode.value)
}
import { ElMessageBox } from 'element-plus'

// 点击删除
const delItem = (val) => {
  ElMessageBox.confirm(
    `确定要删除组合项目 "${val.itemAssemName}" 吗？此操作不可恢复。`,
    '删除确认',
    {
      confirmButtonText: '确定删除',
      confirmButtonClass: 'el-button--danger',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      Api.delPeItemAssembled({
        itemAssemCode: val.itemAssemCode,
        peDeptCode: val.peDeptCode
      }).then((res) => {
        if (res) {
          ElMessage.success('删除成功')
          // getAllItems(itemAssemCode.value, peDeptCode.value)
          handleDeptClick(deptDetail.value)
        }
      })
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}
const setClassDialog = ref(false)
const classitem = ref({})
// 类别维护
const setClass = () => {
  // 开启弹窗
  setClassDialog.value = true
  classitem.value = AssemClassList.value[0]
}
// 类别维护表格点击
const handleAssemRowClick = (row) => {
  classitem.value = row
}
// 点击类别维护删除
const handleDeleteAssemClass = async (row) => {
  await Api.delPeItemAssemClass({ classCode: row.classCode }).then((res) => {})
}
// 点击类别维护保存
const handleSaveAssemClass = async () => {
  classitem.value.optionFlag = '2' // 1 添加 2 修改
  await Api.savePeItemAssemClass(classitem.value).then((res) => {
    if (res) {
      ElMessage.success('保存成功')
    }
  })
}
const ZLFenLeiDict = ref()
const ZLXiangMuiDict = ref()
const JBFenLeiDict = ref()
const JBMingChengDict = ref()
onMounted(async () => {
  ZLFenLeiDict.value = await queryDictByConfig({
    keyWord: '',
    dictType: '诊疗项目分类字典',
    cons: ''
  })
  ZLXiangMuiDict.value = await queryDictByConfig({
    keyWord: '',
    dictType: '诊疗项目名称字典',
    cons: ''
  })
  JBFenLeiDict.value = await queryDictByConfig({
    keyWord: '',
    dictType: '价表项目分类字典',
    cons: ''
  })
  JBMingChengDict.value = await queryDictByConfig({
    keyWord: '',
    dictType: '所有价表',
    cons: ''
  })
  getPeItemAssemClassList()
  getPeTestTubeDictList()
  getPeChartDictList()
  getDept()
})
// -------------------------------------------
const filteredOptions = ref([]) // ,
const showItem = ref([
  { value: '0', label: '显示项目' },
  { value: '1', label: '不显示项目' }
])
const option1 = ref('option1')
const option2 = ref('0')
watch(option1, (newVal) => {
  getPeitemAssemLists(peDeptCode.value, newVal)
})
watch(option2, () => {
  getPeitemAssemLists(peDeptCode.value)
})
// 关闭
const closeDialog = () => {
  showHuaJia.value = false
}
const closeDuiWaiShenQingDialog = () => {
  showDuiZhaoShenQingDialog.value = false
}
const showDuiZhaoShenQingDialog = ref(false) // 对外申请对照表弹窗
// 点击对外申请对照表
const handleOutApply = () => {
  showDuiZhaoShenQingDialog.value = true
  getPeAssemVsClinic()
}
// 点击划价对照表
const handleHuaJiaDuiZhao = () => {
  showHuaJia.value = true
  getPeAssemVsPrice()
}
// 项目组合划价对照-对应的价表项目查询
const getPeAssemVsPrice = async () => {
  const res = await Api.getPeAssemVsPriceClinic({
    itemAssemCode: formInfo.value.itemAssemCode,
    itemIndicator: '1',
    itemClass: '' // deptDetail.value?.peDeptClass
  })
  if (res) {
    zhenliaoList.value = res || []
    handleZhenLiaoRowClick(zhenliaoList.value[0]) // 默认选中第一行
  }
  const res1 = await Api.getPeAssemVsPrice({
    itemAssemCode: formInfo.value.itemAssemCode,
    itemIndicator: '0'
  })
  if (res1) {
    jiabiaoList.value = res1 || []
  }
}
// 项目组合与诊疗项目对照-查询
const getPeAssemVsClinic = async () => {
  const res = await Api.getPeAssemVsClinic({
    itemAssemCode: formInfo.value.itemAssemCode
  })
  if (res) {
    zhenliaoList.value = res || []
    handleZhenLiaoRowClick(zhenliaoList.value[0]) // 默认选中第一行
  }
}
// 项目组合划价对照-同步His价表查询
const handleTongBuHIS = async () => {
  const res = await Api.getHisItemPrice({
    itemAssemCode: zhenliaoItem.value.itemCode,
    itemIndicator: '1'
  })
  if (res) {
    // ElMessage.success('同步成功')
    // zhenliaoList.value = res || []
    jiabiaoList.value = [...jiabiaoList.value, ...res] // 合并到现有的价表项目列表
  }
  /* const res1 = await Api.getHisItemPrice({
    itemAssemCode: formInfo.value.itemAssemCode,
    itemIndicator: '1'
  })
  if (res1) {
    ElMessage.success('同步成功')
    jiabiaoList.value = res1 || []
  } */
}
// 刷新
const refresh = async () => {
  getPeAssemVsPrice()
}
// 格式化项目分类
const formatItemClass = (value: string): string => {
  switch (value) {
    case 'A':
      return '西药'
    case 'B':
      return '中药'
    case 'C':
      return '化验'
    case 'D':
      return '检查'
    case 'E':
      return '治疗'
    case 'F':
      return '手术'
    case 'G':
      return '麻醉'
    default:
      return ''
  }
}

const handleJiaBiaoRowClick = (row) => {
  jiabiaoItem.value = row
}
const handleZhenLiaoRowClick = (row) => {
  zhenliaoItem.value = row
}
// 删除对外申请对照表中的诊疗项目
const handleDelZhenLiaoItem = (row) => {
  const index = zhenliaoList.value.indexOf(row)
  if (index !== -1) {
    zhenliaoList.value.splice(index, 1)
    // optionFlag.value = '3'
    savePeAssemVsClinic('3')
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('找不到该条目')
  }
  getPeAssemVsClinic()
}
// 删除划价对照表中的诊疗项目
const handleDelZhenLiaoItemInHuaJia = (row) => {
  const index = zhenliaoList.value.indexOf(row)
  if (index !== -1) {
    zhenliaoList.value.splice(index, 1)
    // optionFlag.value = '3'
    savePeAssemVsPrice('3')
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('找不到该条目')
  }
  getPeAssemVsPrice()
}
// 删除价表项目
const handleDelPriceItem = (row) => {
  const index = jiabiaoList.value.indexOf(row)
  if (index !== -1) {
    jiabiaoList.value.splice(index, 1)
    // optionFlag.value = '3'
    savePeAssemVsPrice('3')
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('找不到该条目')
  }
  getPeAssemVsPrice()
}

// 点击保存对外申请对照表
const handleSavePeAssemVsClinic = async () => {
  savePeAssemVsClinic('1')
}
// 点击保存划价对照表
const handleSavePeAssemVsPrice = async () => {
  await savePeAssemVsPrice('1')
  // 保存完成后调用所需方法
  await getPeitemAssemLists(peDeptCode.value)
  // 查找匹配的项目并触发点击
  // const matchedItem = itemsList.value.find((item) => item.itemAssemCode === itemAssemCode.value)
  if (matchedItem.value) {
    handleItemsClick(matchedItem.value)
  }
  // showHuaJia.value = false
}
// 项目组合  划价对照-保存
const savePeAssemVsPrice = async (flag) => {
  await Api.savePeAssemVsPrice({
    assemCode: formInfo.value.itemAssemCode,
    assemName: formInfo.value.itemAssemName,
    clinicList: zhenliaoList.value,
    priceList: jiabiaoList.value
  }).then((res) => {
    if (res && flag === '1') {
      ElMessage.success('保存成功')
    } else if (res && flag === '2') {
      ElMessage.success('新增成功')
    } else if (res && flag === '3') {
      ElMessage.success('删除成功')
    } else {
      ElMessage.error('保存失败')
    }
  })

  getPeAssemVsPrice()
}
// 项目组合  对外申请对照-保存
const savePeAssemVsClinic = async (flag) => {
  await Api.savePeAssemVsClinic({
    assemCode: formInfo.value.itemAssemCode,
    assemName: formInfo.value.itemAssemName,
    list: zhenliaoList.value
  }).then((res) => {
    if (res && flag === '1') {
      ElMessage.success('保存成功')
    } else if (res && flag === '2') {
      ElMessage.success('新增成功')
    } else if (res && flag === '3') {
      ElMessage.success('删除成功')
    } else {
      ElMessage.error('保存失败')
    }
  })

  getPeAssemVsClinic()
}

// 新增诊疗项
const handleAddZhenLiao = () => {
  const newItem = {
    itemNo: zhenliaoList.value.length + 1,
    itemClass: '',
    itemCode: '',
    amount: 1,
    itemName: ''
  }

  zhenliaoList.value.push(newItem)

  nextTick(() => {
    const target = selectRefs.value.find((ref) => ref.row === newItem)
    if (target && target.el) {
      const selectElement = target.el.querySelector('.el-select__inner') as HTMLInputElement
      if (selectElement) {
        selectElement.focus()
      }
    }
  })
}
const selectRefs = ref<{ row: any; el: HTMLElement }[]>([])

// 存储每行对应的 select DOM
const setSelectRef = (el: HTMLElement, row: any) => {
  if (el) {
    selectRefs.value.push({ row, el })
  }
}
// 新增划价
const handleAddHuaiJia = () => {
  const newItem = {
    itemNo: jiabiaoList.value.length + 1,
    itemClass: '',
    itemCode: '',
    itemName: '',
    itemSpec: '',
    units: '',
    amount: 1,
    currentPrice: 0,
    appendPrice: 0
  }

  jiabiaoList.value.push(newItem)

  // 使用 nextTick 等待 DOM 更新
  nextTick(() => {
    // 查找刚刚新增的行对应的 select 元素并聚焦
    const target = selectRefs.value.find((ref) => ref.row === newItem)
    if (target && target.el) {
      const selectElement = target.el.querySelector('.el-select__inner') as HTMLInputElement
      if (selectElement) {
        selectElement.focus()
      }
    }
  })
}
const zhenliaoDetail = ref()
const jiabiaoDetail = ref()
const QueryParams = ref({
  dictType: '检查子类字典',
  cons: '',
  keyWord: '',
  counts: ''
})
const DictCallback = (row) => {
  if (index.value !== undefined) {
    if (DictType.value === '诊疗项目名称字典') {
      zhenliaoList.value[index.value].itemName = row.itemName
      // zhenliaoList.value[index.value].itemClass = row.itemClass
      zhenliaoList.value[index.value].itemCode = row.itemCode
    } else if (DictType.value === '所有价表') {
      jiabiaoList.value[index.value].itemName = row.itemName
      // jiabiaoList.value[index.value].itemClass = row.itemClass
      jiabiaoList.value[index.value].itemCode = row.itemCode
    }
  }
  if (DictType.value === '诊疗项目名称字典') {
    zhenliaoDetail.value.itemName = row.itemName
  } else if (DictType.value === '所有价表') {
    jiabiaoDetail.value.itemName = row.itemName
  }
  DictDialogVisible.value = false
}

const DictDialogVisible = ref(false)

const index = ref()
const DictType = ref()

const onMailingAddressAreaAddress = (row, dictType) => {
  DictType.value = dictType
  if (DictType.value === '诊疗项目分类字典' || DictType.value === '诊疗项目名称字典') {
    zhenliaoDetail.value = row
    index.value = zhenliaoList.value.findIndex((item) => item === row)
  } else if (DictType.value === '所有价表' || DictType.value === '检查项目分类字典') {
    jiabiaoDetail.value = row
    index.value = jiabiaoList.value.findIndex((item) => item === row)
  }
  QueryParams.value = {
    dictType: dictType,
    // dictType: '诊疗项目',
    cons: `item_class:${row.itemClass}`,
    keyWord: '',
    counts: '300'
  }
  DictDialogVisible.value = true
}

const isAddHisItem = ref(false)

// HIS科室相关数据
const hisDeptSearch = ref('') // HIS科室搜索关键词
const selectedHISDepts = ref([]) // 已选择的HIS科室
const hisDeptTableRef = ref() // HIS科室表格引用

// 获取HIS科室列表（左侧数据）
const getHISDeptList = async () => {
  try {
    const res = await Api.getPeItemHisClassList({
      itemClass: deptDetail.value?.peDeptClass || '',
      deptName: deptDetail.value?.label2 || ''
    })
    hisDeptList.value = res || []
  } catch (error) {
    console.error('获取HIS科室列表失败:', error)
    ElMessage.error('获取HIS科室列表失败')
  }
}

// 获取HIS项目列表（顶部数据）
const getHISItemList = async () => {
  try {
    const res = await Api.getPeClinicItemHisPage({
      pageNo: 1,
      pageSize: 1000000,
      itemClass: deptDetail.value?.peDeptClass || '',
      deptName: selectedHISDeptClass.value?.deptName || '',
      classType: selectedHISDeptClass.value?.classType || '',
      itemName: hisItemSearch.value || ''
    })
    hisItemList.value = res.records || []
  } catch (error) {
    console.error('获取HIS项目列表失败:', error)
    ElMessage.error('获取HIS项目列表失败')
  }
}

// 处理左侧科室选择
const handleHISDeptClick = (row) => {
  selectedHISDeptClass.value = row
  // 选择科室后获取对应的项目列表
  getHISItemList()
}

// 处理HIS科室选择变化
const handleHISDeptSelectionChange = (selection) => {
  selectedHISDepts.value = selection
}

// 全选HIS科室
const selectAllHisDept = () => {
  hisDeptTableRef.value?.selectAll()
}

// 取消全选HIS科室
const clearAllHisDept = () => {
  hisDeptTableRef.value?.clearSelection()
}

// 从已选中列表中移除
const removeFromSelected = (row) => {
  hisDeptTableRef.value?.toggleRowSelection(row, false)
}

// 确认导入
const confirmImport = async () => {
  if (selectedHISItems.value.length === 0) {
    ElMessage.warning('请至少选择一个项目')
    return
  }

  try {
    // 构造请求参数
    const importData = {
      peItemAssembledDictDO: formInfo.value,
      list: selectedHISItems.value
    }

    // 调用导入接口
    const res = await Api.importPeClinicItemHis(importData)

    if (res) {
      ElMessage.success(`导入成功`)
      selectedHISDepts.value = [] // 清空已选择的HIS科室
      // 关闭对话框
      isAddHisItem.value = false
      handleDeptClick(deptDetail.value)

      // 重新加载项目组合数据
      // if (itemAssemCode.value && peDeptCode.value) {
      //   getAllItems(itemAssemCode.value, peDeptCode.value)
      // }
    } else {
      ElMessage.error('导入失败')
    }
  } catch (error) {
    console.error('导入HIS科室失败:', error)
    ElMessage.error('导入失败，请重试')
  }
}

// 取消导入
const cancelImport = () => {
  clearAllHisDept()
  selectedHISDepts.value = []
}

// 刷新HIS科室列表
const reserchHisItem = () => {
  getHISDeptList()
}

// 在打开对话框时获取HIS科室列表
const handleAddHisItem = () => {
  isAddHisItem.value = true
  // 清空搜索和选择
  hisDeptSearch.value = ''
  selectedHISDepts.value = []
  // 获取HIS科室列表
  nextTick(() => {
    getHISDeptList()
  })
}

// HIS科室相关数据（左侧）
const hisDeptList = ref([]) // HIS科室列表
const selectedHISDeptClass = ref(null) // 选中的HIS科室

// HIS项目相关数据（顶部）
const hisItemList = ref([]) // HIS项目列表
const selectedHISItems = ref([]) // 已选择的HIS项目
const hisItemSearch = ref('') // HIS项目搜索关键词

// 过滤后的HIS科室列表
const filteredHISDeptList = computed(() => {
  if (!hisDeptSearch.value) {
    return hisDeptList.value
  }
  const searchValue = hisDeptSearch.value.toLowerCase()
  return hisDeptList.value.filter(
    (dept) =>
      dept.deptName?.toLowerCase().includes(searchValue) ||
      dept.classType?.toLowerCase().includes(searchValue)
  )
})

// 过滤后的HIS项目列表
const filteredHISItemList = computed(() => {
  if (!hisItemSearch.value) {
    return hisItemList.value
  }
  const searchValue = hisItemSearch.value.toLowerCase()
  return hisItemList.value.filter(
    (item) =>
      item.itemName?.toLowerCase().includes(searchValue) ||
      item.deptName?.toLowerCase().includes(searchValue)
  )
})

// 从已选中列表中移除项目
const removeFromSelectedItems = (row) => {
  const index = selectedHISItems.value.findIndex((item) => item.itemCode === row.itemCode)
  if (index > -1) {
    selectedHISItems.value.splice(index, 1)
  }
}

// 处理HIS项目选择变化
const handleHISItemSelectionChange = (selection) => {
  selectedHISItems.value = selection
}

// 标本字典弹窗相关数据
const sampleDictDialogVisible = ref(false)
const sampleQueryParams = ref()

// 打开标本字典弹窗
const openSampleDictDialog = () => {
  sampleQueryParams.value = {
    dictType: '标本字典',
    cons: '',
    keyWord: '',
    counts: '300'
  }
  sampleDictDialogVisible.value = true
}

// 标本字典选择回调
const sampleDictCallback = (row) => {
  formInfo.value.sample = row.specimanName
  sampleDictDialogVisible.value = false
}

import { pinyin } from 'pinyin-pro'
const generateInputCode = () => {
  const pinyinResult = pinyin(formInfo.value.itemAssemName, {
    pattern: 'first', // 只获取首字母
    toneType: 'none', // 不包含声调
    type: 'array' // 返回数组格式
  })

  // 将拼音首字母数组连接成字符串并转为大写
  formInfo.value.inputCode = formInfo.value.inputCode = pinyinResult
    .join('')
    .toUpperCase()
    .substring(0, 8)
}

const tableRowClassName = ({ row, rowIndex }) => {
  if (row.clinicFlag == 0) {
    return 'highlightRow'
  }
  return ''
}
</script>

<style lang="scss" scoped>
:deep(.highlightRow) {
  // background-color: rgb(255, 0, 0) !important;
  color: #f00 !important;
}
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
  padding: 4px;

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
  padding: 0 8px 8px;
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
.base-title1 {
  padding: 0 0px;
  color: #3473d1;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
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
.addHisContent {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  display: flex;
  .left {
    width: 34%;
  }
  .right {
    padding-left: 6px;
    width: 65.5%;
    .top {
      width: 100%;
      background-color: #ffffff;
      margin-bottom: 6px;
    }
    .bottom {
      width: 100%;
      background-color: #ffffff;
    }
  }
}
:deep(.el-dialog__body) {
  padding: 10px 10px !important;
}
:deep(.auditDialog) {
  .el-dialog__footer {
    padding-bottom: 10px !important;
  }
}
</style>
