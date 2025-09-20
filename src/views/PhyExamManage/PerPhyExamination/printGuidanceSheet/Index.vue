<template>
  <div class="per_report">
    <div class="report_search">
      <div class="search1" style="padding-bottom: 6px">
        <!-- <div class="div1">
          <span class="span1">单位代码：</span>
          <el-input
            style="width: 120px"
            v-model="searchParams.unitCode"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1">次数：</span>
          <el-input
            style="width: 100px"
            v-model="searchParams.unitVisitId"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div> -->
        <!-- <div class="div1">
          <el-button @click="search">查询</el-button>
        </div> -->
        <div class="div1">
          <span class="span1">预约时间区间：</span>
          <el-date-picker
            v-model="time"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="!w-230px"
            @change="search"
          />
        </div>

        <div class="div1">
          <span class="span1">体检号：</span>
          <el-input
            style="width: 120px; margin-right: 12px"
            v-model="searchParams.peId"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1">次数：</span>
          <el-input
            style="width: 64px"
            v-model="searchParams.peVisitId"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <!-- <div class="div1">
          <el-button>查询</el-button>
        </div> -->
        <div class="div1">
          <span class="span1">姓名：</span>
          <el-input
            style="width: 120px"
            v-model="searchParams.name"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1 !w-70px" style="text-align: right">身份证：</span>
          <el-input
            style="width: 180px"
            v-model="searchParams.idNo"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <!-- <div class="div1">
          <span class="span1">电话：</span>
          <el-input
            style="width: 130px"
            v-model="searchParams.number"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div> -->

        <!-- <div class="div1">
          <el-button @click="search">查询</el-button>
        </div> -->

        <!-- <div class="div1">
          <span class="span1">婚检编码：</span>
          <el-input
            style="width: 120px"
            v-model="searchParams.premaritalCode"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div> -->
        <!-- <div class="div1">
          <span class="span1">两癌编码：</span>
          <el-input
            style="width: 120px"
            v-model="searchParams.screeningCode"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div> -->
        <div class="div1">
          <span>
            <!-- <b style="color: #ed2226">*</b> -->
            体检类型：</span
          >
          <el-select
            v-model="searchParams.peTypeName"
            placeholder="体检类型"
            style="width: 120px"
            class="select-item"
            filterable
            clearable
            default-first-option
            @change="changePeType(searchParams.peTypeName)"
          >
            <el-option
              v-for="item in petypeNameList"
              :key="item.keyCode"
              :label="item.keyValue"
              :value="item.keyValue"
            />
          </el-select>
        </div>
        <div class="div1">
          <el-button @click="search">查询</el-button>
        </div>
      </div>
      <div class="search1" style="padding-bottom: 6px">
        <div class="div1">
          <span class="span1">单位名称：</span>
          <el-input
            style="width: 120px"
            v-model="searchParams.unitName"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
          <span class="selectBtn">
            <el-button :icon="Search" @click="onFocusUnitCode()" />
          </span>
        </div>
        <div class="div1">
          <span class="span1">单位代码：</span>
          <el-input
            style="width: 120px"
            v-model="searchParams.unitCode"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1">单位次数：</span>
          <el-input
            style="width: 64px"
            v-model="searchParams.unitVisitId"
            placeholder="请输入"
            class="select-item"
            clearable
            @change="search"
          />
        </div>
        <div class="div1">
          <span class="span1">打印内容：</span>
          <el-checkbox @change="printType1" v-model="guidanceSheet" label="指引单" size="large" />
        </div>
        <!-- <div class="div1">
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            class="!w-98px"
            controls-position="right"
          />
        </div> -->
        <div class="div1">
          <!-- <el-checkbox
            @change="printType2"
            v-model="printParams.labSheetTag"
            label="检验申请单"
            size="large"
          />
          <el-checkbox
            @change="printType3"
            v-model="printParams.personTag"
            label="人员条形码"
            size="large"
          /> -->
        </div>
        <!-- <div class="div1">
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            class="!w-98px"
            controls-position="right"
          />
        </div> -->
        <div class="div1">
          <!-- <el-checkbox
            @change="printType4"
            v-model="printParams.labTag"
            label="检验条码"
            size="large"
          />
          <el-checkbox
            @change="printType5"
            v-model="printParams.examSheetTag"
            label="检查申请单"
            size="large"
          /> -->
          <!-- <el-checkbox
            @change="printType6"
            v-model="medicalCertificate"
            label="健康证明"
            size="large"
          /> -->
        </div>
        <div class="div1">
          <el-button class="read" @click="print"> <img :src="dayin" />打印 </el-button>
          <!-- <el-button class="read" @click="uploadPdf"
            ><el-icon><Upload /></el-icon>上传健康证明PDF</el-button
          > -->
          <!-- <el-button type="primary" @click="beginSign">开始签名</el-button> -->
          <!-- <img
            v-if="SignUrl && SignUrl.length > 0"
            style="height: 40px; margin-left: 10px; border: 1px solid #eee"
            :src="SignUrl"
            alt="签名图片"
          /> -->
        </div>
      </div>
      <!-- <div class="search1" style="padding-top: 6px">
        
      </div> -->
    </div>
    <div class="report_table">
      <div class="table_item">
        <div class="list_table">
          <!-- <el-checkbox-group v-model="multipleSelectionArr" @change="handleSelectionChange">
            <el-checkbox
              v-for="(item, index) in tableData"
              :key="index"
              :label="item.uniqueId || `${item.peId}_${item.peVisitId}`"
            >
              <span style="padding-right: 12px">{{ item.peId }}-{{ item.peVisitId }}</span>
              <span>{{ item.name }}</span>
            </el-checkbox>
          </el-checkbox-group> -->
          <el-table
            :data="tableData"
            style="width: 100%"
            height="calc(100vh - 262px)"
            border
            @selection-change="handleSelectionChange"
            ref="multipleTableRef"
            @row-click="handleRowClick"
            highlight-current-row
          >
            <el-table-column type="selection" align="center" width="60" />
            <el-table-column
              v-for="item in personList"
              :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              :align="item.align"
              :width="item.width"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
          <div style="width: 190px; height: 20px; font-size: 20px; color: #666"
            >合计：{{ tableData.length || '0' }} 人</div
          >
        </div>
      </div>
    </div>
    <!-- <div id="printMe" :style="tableData.length > 0 ? 'display:block;' : 'display:none;'"> -->
    <div id="printMe">
      <div class="print_content" v-for="(perItem, perIndex) in mediaPrintData" :key="perIndex">
        <div class="print_heard">
          <div class="hos_t">
            <div>北戴河疗养中心</div>
            <img :src="perItem.peVisitListRespVo.imgUrl" />
          </div>
          <div class="title">体检指引单</div>
          <div class="per_msg">
            <el-row>
              <el-col :span="4">姓名：{{ perItem.peVisitListRespVo.name }}</el-col>
              <el-col :span="6"
                >性别：{{
                  perItem.peVisitListRespVo.sex ? perItem.peVisitListRespVo.sex : ''
                }}</el-col
              >
              <el-col :span="5">年龄：{{ perItem.peVisitListRespVo.age }}</el-col>
              <el-col :span="5">婚姻：{{ perItem.peVisitListRespVo.maritalStatus }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4"
                >体检性质：{{
                  perItem.peVisitListRespVo.chargeType ? perItem.peVisitListRespVo.chargeType : ''
                }}</el-col
              >
              <el-col style="white-space: nowrap; overflow: hidden" :span="6"
                >体检类型：{{
                  perItem.peVisitListRespVo.peTypeName ? perItem.peVisitListRespVo.peTypeName : ''
                }}</el-col
              >
              <el-col :span="5"
                >体检日期：{{
                  perItem.peVisitListRespVo.pePreDate
                    ? formatDate(perItem.peVisitListRespVo.pePreDate, 'YYYY-MM-DD')
                    : ''
                }}</el-col
              >
              <el-col :span="5"
                >体检次数：{{
                  perItem.peVisitListRespVo.peVisitId ? perItem.peVisitListRespVo.peVisitId : ''
                }}</el-col
              >
              <!-- <el-col :span="5">岗位：暂无</el-col> -->
            </el-row>
            <el-row>
              <!-- <el-col :span="6"
      >体检日期：{{
        perItem.peVisitListRespVo.pePreDate
          ? formatDate(perItem.peVisitListRespVo.pePreDate, 'YYYY-MM-DD')
          : ''
      }}</el-col
    > -->
              <el-col :span="4">优先级：{{ perItem.peVisitListRespVo.peLevel }}</el-col>
              <el-col :span="7">体检套餐：{{ perItem.peVisitListRespVo.setCode }}</el-col>
              <el-col :span="9"
                >体检单位：{{
                  perItem.peVisitListRespVo.unitname ? perItem.peVisitListRespVo.unitname : ''
                }}</el-col
              >
            </el-row>
            <!-- 使用绝对定位放置图片，避免影响其他元素布局 -->
            <div style="position: absolute; right: 60px; top: -25px; width: 80px">
              <div style="margin-bottom: 5px">
                <img
                  v-if="perItem.peVisitListRespVo.photo"
                  :src="perItem.peVisitListRespVo.photo"
                  style="width: 100%; height: auto; display: block"
                  alt="个人照片"
                />
              </div>
            </div>

            <div style="position: absolute; right: 20px; top: 73px; width: 160px">
              <img
                :src="perItem.peVisitListRespVo.HisImgUrl"
                style="width: 100%; height: auto"
                alt="条形码"
              />
            </div>
          </div>
          <div class="tishi">
            <div class="tishi_in">
              <div class="tishi_t" style="width: 55px">温馨<br />提示</div>
              <div class="tishi_con" style="width: calc(100% - 55px)">
                <div v-if="perItem.peVisitListRespVo.kindReminder">
                  <div v-if="perItem.peVisitListRespVo.kindReminderList.length > 0">
                    <el-row
                      v-for="(kindMsg, kindIndex) in perItem.peVisitListRespVo.kindReminderList"
                      :key="kindIndex"
                    >
                      <el-col :span="24">
                        {{ kindMsg }}
                      </el-col>
                    </el-row>
                  </div>
                  <div v-else>
                    <el-row>
                      <el-col :span="24">
                        {{ perItem.peVisitListRespVo.kindReminder }}
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div v-else>
                  <el-row>
                    <el-col :span="24">* 呼气试验、抽血超声等项目请空腹，抽血后请按压5分钟</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"
                      >*
                      孕期，哺乳期，备孕(半年内，包括男士)请勿做X线检查。泌尿系，经腹妇科彩超请先憋尿，未婚女性请勿做妇科检查</el-col
                    >
                  </el-row>
                  <el-row>
                    <el-col :span="24"
                      >* 体检完成，请把本指引单交回前台，以免影响您的体检报告的发放</el-col
                    >
                  </el-row>
                </div>
              </div>
            </div>
            <div class="tishi_in" style="border-bottom: none">
              <div class="tishi_t" style="width: 80px"
                ><span
                  style="
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border: #333333 1px solid;
                    margin-right: 5px;
                  "
                ></span
                >一般情况</div
              >
              <div class="tishi_con">
                <el-row style="line-height: 26px; height: 26px">
                  <el-col :span="5"
                    >身高：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cm</el-col
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-col :span="5"
                    >体重：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;kg</el-col
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-col :span="6"
                    >血压：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mmHg</el-col
                  >
                </el-row>
              </div>
            </div>
            <div
              class="tishi_in"
              v-if="perItem.peVisitListRespVo.sumCharges"
              style="border-top: none"
            >
              <div class="tishi_t" style="font-weight: normal; text-align: right; width: 80px"
                >体检费</div
              >
              <div class="tishi_con">
                <el-row>
                  <el-col :span="24"
                    >{{ perItem.peVisitListRespVo.sumCharges }}元
                    <span v-if="perItem.peVisitListRespVo.otherCosts"
                      >（耗材金额&nbsp;&nbsp;{{ perItem.peVisitListRespVo.otherCosts }}元）</span
                    >
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div class="print_con">
          <div class="table">
            <div class="table_t">
              <el-row>
                <el-col :span="3">检查单条码</el-col>
                <el-col :span="1">序号</el-col>
                <el-col :span="10">体检项目</el-col>
                <el-col :span="2">拒检签字</el-col>
                <el-col :span="8" style="text-align: center">提示信息</el-col>
              </el-row>
              <div v-for="(item, index) in perItem.noJiaxiangList" :key="index" class="neirong">
                <el-row>
                  <el-col :span="3"
                    ><img
                      :style="item.imgUrl ? '' : 'display:none'"
                      style="width: 100%; height: 32px; line-height: 36px"
                      :src="item.imgUrl"
                      alt=""
                  /></el-col>
                  <el-col :span="1">{{ index + 1 }}</el-col>
                  <el-col :span="10"
                    >{{ item.assemName
                    }}{{ item.charges ? '（' + item.charges + '元）' : '' }}</el-col
                  >
                  <el-col :span="2">{{}}</el-col>
                  <el-col
                    :class="item.chartGuide && item.chartGuide.length > 18 ? col_LH : ''"
                    :span="8"
                    >{{ item.chartGuide }}</el-col
                  >
                </el-row>
              </div>
              <div class="neirong" v-if="perItem.jiaxiangList && perItem.jiaxiangList.length > 0">
                <el-row>
                  <el-col :span="3"></el-col>
                  <el-col :span="1"><span style="font-weight: bold">加项</span></el-col>
                  <el-col :span="10"></el-col>
                  <el-col :span="2"></el-col>
                  <el-col :span="8"></el-col>
                </el-row>
              </div>
              <div v-for="(item, index) in perItem.jiaxiangList" :key="index" class="neirong">
                <el-row>
                  <el-col :span="3"
                    ><img
                      :style="item.imgUrl ? '' : 'display:none'"
                      style="width: 100%; height: 32px; line-height: 36px"
                      :src="item.imgUrl"
                      alt=""
                  /></el-col>
                  <el-col :span="1">{{ index + 1 }}</el-col>
                  <el-col :span="10">{{ item.assemName }}</el-col>
                  <el-col :span="2">{{}}</el-col>
                  <el-col
                    :class="item.chartGuide && item.chartGuide.length > 18 ? col_LH : ''"
                    :span="8"
                    >{{ item.chartGuide }}</el-col
                  >
                </el-row>
              </div>
            </div>
          </div>
          <div class="b_msg">
            <div class="tishi_in">
              <div class="tishi_t" style="width: 310px; display: flex">
                受检者确认签字：
                <img
                  v-if="perItem.peVisitListRespVo.signValueString"
                  style="height: 56px; display: inlineblock; transform: translateY(-30%)"
                  :src="perItem.peVisitListRespVo.signValueString"
                  alt="签名图片"
                />
              </div>
            </div>
            <div class="b_c">
              温馨提示:如果您处在孕期或近期有怀孕计划，请不要做放射性检查(如:X线，CT等)
            </div>
            <!-- <div class="b_p">第{{ index + 1 }}页/共{{ perItem.length }}页</div> -->
          </div>
          <!-- <div class="bot">
            <div class="bot_l">体检报告<br />领取凭条</div>
            <div class="bot_r">
              <el-row>
                <el-col :span="6">体检号：{{ item[1].peId ? item[1].peId : '' }}</el-col>
                <el-col :span="6">姓名：{{ item[1].name ? item[1].name : '' }}</el-col>
                <el-col :span="6">性别：{{ item[1].sex ? item[1].sex : '' }}</el-col>
                <el-col :span="6">年龄：{{ item[1].age ? item[1].age : '' }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">工作单位：{{ item[1].unitName ? item[1].unitName : '' }}</el-col>
                <el-col :span="12"
                  >体检日期：{{
                    item[1].peQueueDate ? formatDate(item[1].peQueueDate, 'YYYY-MM-DD') : ''
                  }}</el-col
                >
              </el-row>
              <el-row>
                <el-col :span="12"></el-col>
                <el-col :span="12"
                  >联系电话：{{ item[1].phoneNumber ? item[1].phoneNumber : '' }}</el-col
                >
              </el-row>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div id="health" ref="examSheet">
      <div class="health_page page">
        <div class="health_h">
          <div class="h_div1">联勤保障部队北戴河疗养中心</div>
          <div class="h_div2">体检编号：{{ healthTabelData.healthExaminationId }}</div>
        </div>
        <div class="health_t">北京市从业人员健康证明</div>
        <div class="health_i">直接接触入口食品人员</div>
        <div class="health_per">
          <div class="per_yb">一般情况</div>
          <div class="per_na">
            <div class="div1">姓名</div>
            <div class="div2">{{ healthTabelData.name }}</div>
            <div class="div3">性别</div>
            <div class="div4">{{ healthTabelData.genderName }}</div>
            <img :src="healthTabelData.photo" />
          </div>
          <div class="per_sfz">
            <div class="div1">身份证号</div>
            <div class="div2">{{ healthTabelData.identifierValue }}</div>
          </div>
          <div class="per_jk">健康检查信息</div>
        </div>
        <div class="div_table">
          <table class="data_table">
            <tr class="tr1">
              <td rowspan="2" class="td1">疾病名称</td>
              <td colspan="3" class="td2">检查结果</td>
              <td rowspan="2" class="td3">医师<br />签章</td>
              <td rowspan="2" class="td4">检查日期</td>
            </tr>
            <tr class="tr2">
              <td class="td1">无</td>
              <td class="td2">有</td>
              <td class="td3">备注</td>
            </tr>
            <tr
              class="tr3"
              v-if="
                healthTabelData.hasBacterialDysentery == '1' ||
                healthTabelData.hasBacterialDysentery == '2'
              "
            >
              <td class="td1">细菌性痢疾</td>
              <td class="td2">{{ healthTabelData.hasBacterialDysentery == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasBacterialDysentery == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.bacterialDysenteryNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.bacterialDysenteryPractitionerName" /> -->
                <!-- {{ healthTabelData.bacterialDysenteryPractitionerName }} -->
                汤鹏玲
              </td>
              <td class="td6">{{ healthTabelData.bacterialDysenteryDate }}</td>
            </tr>
            <tr
              class="tr3"
              v-if="healthTabelData.hasTyphoid == '1' || healthTabelData.hasTyphoid == '2'"
            >
              <td class="td1">伤寒和副伤寒</td>
              <td class="td2">{{ healthTabelData.hasTyphoid == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasTyphoid == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.typhoidNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.typhoidPractitionerName" /> -->
                <!-- {{ healthTabelData.typhoidPractitionerName }} -->
                汤鹏玲
              </td>
              <td class="td6">{{ healthTabelData.typhoidDate }}</td>
            </tr>
            <tr
              class="tr3"
              v-if="
                healthTabelData.hasViralHepatitis == '1' || healthTabelData.hasViralHepatitis == '2'
              "
            >
              <td class="td1">病毒性肝炎<br />(甲型、戊型)</td>
              <td class="td2">{{ healthTabelData.hasViralHepatitis == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasViralHepatitis == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.viralHepatitisNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.viralHepatitisPractitionerName" /> -->
                <!-- {{ healthTabelData.viralHepatitisPractitionerName }} -->
                景建瑜
              </td>
              <td class="td6">{{ healthTabelData.viralHepatitisDate }}</td>
            </tr>
            <tr
              class="tr3"
              v-if="healthTabelData.hasActiveTB == '1' || healthTabelData.hasActiveTB == '2'"
            >
              <td class="td1">活动性肺结核</td>
              <td class="td2">{{ healthTabelData.hasActiveTB == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasActiveTB == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.activeTBNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.activeTBPractitioner" /> -->
                {{ healthTabelData.activeTBPractitioner }}
              </td>
              <td class="td6">{{ healthTabelData.activeTBDate }}</td>
            </tr>
            <tr
              class="tr3"
              v-if="
                healthTabelData.hasSkinDiseases == '1' || healthTabelData.hasSkinDiseases == '2'
              "
            >
              <td class="td1">化脓性或渗出性皮肤病</td>
              <td class="td2">{{ healthTabelData.hasSkinDiseases == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasSkinDiseases == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.skinDiseasesNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.skinDiseasesPractitionerName" /> -->
                <!-- {{ healthTabelData.skinDiseasesPractitionerName }} -->
                温宏伟
              </td>
              <td class="td6">{{ healthTabelData.skinDiseasesDate }}</td>
            </tr>
            <tr
              class="tr3"
              v-if="healthTabelData.hasHandFungal == '1' || healthTabelData.hasHandFungal == '2'"
            >
              <td class="td1">手部真菌感染性疾病<br />(如手癣、指甲癣等)</td>
              <td class="td2">{{ healthTabelData.hasHandFungal == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasHandFungal == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.handFungalNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.handFungalPractitionerName" /> -->
                <!-- {{ healthTabelData.handFungalPractitionerName }} -->
                温宏伟
              </td>
              <td class="td6">{{ healthTabelData.handFungalDate }}</td>
            </tr>
            <tr
              class="tr3"
              v-if="healthTabelData.hasCholera == '1' || healthTabelData.hasCholera == '2'"
            >
              <td class="td1">霍乱</td>
              <td class="td2">{{ healthTabelData.hasCholera == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasCholera == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.choleraNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.choleraPractitionerName" /> -->
                <!-- {{ healthTabelData.choleraPractitionerName }} -->
                汤鹏玲
              </td>
              <td class="td6">{{ healthTabelData.choleraTestDate }}</td>
            </tr>
            <tr
              class="tr3"
              v-if="
                healthTabelData.hasAmebicDysentery == '1' ||
                healthTabelData.hasAmebicDysentery == '2'
              "
            >
              <td class="td1">阿米巴性痢疾</td>
              <td class="td2">{{ healthTabelData.hasAmebicDysentery == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasAmebicDysentery == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.amebicDysenteryNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.amebicDysenteryPractitionerName" /> -->
                <!-- {{ healthTabelData.amebicDysenteryPractitionerName }} -->
                汤鹏玲
              </td>
              <td class="td6">{{ healthTabelData.amebicDysenteryDate }}</td>
            </tr>
            <tr
              class="tr3"
              v-if="healthTabelData.hasHandEczema == '1' || healthTabelData.hasHandEczema == '2'"
            >
              <td class="td1">手部湿疹</td>
              <td class="td2">{{ healthTabelData.hasHandEczema == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasHandEczema == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.handEczemaNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.handEczemaPractitionerName" /> -->
                <!-- {{ healthTabelData.handEczemaPractitionerName }} -->
                温宏伟
              </td>
              <td class="td6">{{ healthTabelData.handEczemaDate }}</td>
            </tr>
            <tr
              class="tr3"
              v-if="
                healthTabelData.hasHandPsoriasis == '1' || healthTabelData.hasHandPsoriasis == '2'
              "
            >
              <td class="td1">手部的银屑病或者鳞屑</td>
              <td class="td2">{{ healthTabelData.hasHandPsoriasis == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.hasHandPsoriasis == '1' ? '✓' : '' }}</td>
              <td class="td4">{{ healthTabelData.handPsoriasisNote }}</td>
              <td class="td5">
                <!-- <img :src="healthTabelData.handPsoriasisPractitionerName" /> -->
                <!-- {{ healthTabelData.handPsoriasisPractitionerName }} -->
                温宏伟
              </td>
              <td class="td6">{{ healthTabelData.handPsoriasisDate }}</td>
            </tr>
            <tr class="tr3" v-if="healthTabelData.bsl == '1' || healthTabelData.bsl == '2'">
              <td class="td1">辨色力</td>
              <td class="td2">{{ healthTabelData.bsl == '2' ? '✓' : '' }}</td>
              <td class="td3">{{ healthTabelData.bsl == '1' ? '✓' : '' }}</td>
              <td class="td4"></td>
              <td class="td5">
                <!-- <img :src="healthTabelData.bsldoctor" /> -->
                {{ healthTabelData.bsldoctor }}
              </td>
              <td class="td6">{{ healthTabelData.bslDate }}</td>
            </tr>
          </table>
        </div>
        <div class="health_bz"
          >备注:本表自体检合格(发表)日起有效期一年，本次化验检查结果，只对本次送检标本负责。</div
        >
        <div class="health_qz">
          <div>医疗机构：<br />（盖章有效）</div>
          <div>日期：{{ healthTabelData.examDate?.split(' ')[0] }}</div>
        </div>
      </div>
    </div>
    <Dialog
      v-model="pdfVisible"
      width="100%"
      top="0vh"
      :fullscreen="true"
      :close-on-click-modal="false"
      class="pdfVisible"
      :modal="false"
      @close="pdfVisible = false"
      :title="'体检指引单导出'"
    >
      <div>
        <PrintPdf :data="mediaPrintData"></PrintPdf>
      </div>
    </Dialog>
    <img ref="tijianSrc" style="display: none" />
    <img ref="HisSrc" style="display: none" />

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
  </div>
</template>
<script setup lang="ts">
import { VuePrintNext } from 'vue-print-next'
import readCard from '@/assets/images/readCard.svg'
import report from '@/assets/images/report.svg'
import dayin from '@/assets/images/dayin.svg'
import noReport from '@/assets/images/noReport.svg'
import JsBarcode from 'jsbarcode'
import {
  selectPeGuidSheetList,
  selectPeGuidSheetPrint,
  printLabSheet,
  printPersonalBar,
  printBarCode,
  printExamSheet,
  healthCertificateInfo,
  healthCertificateInfoUpload,
  upPdfEmployees,
  peSign
} from '@/api/PerPhyExamination/printGuidanceSheet/index'
import { formatDate } from '@/utils/formatTime'
import PrintPdf from './printPdf.vue'
import { ElLoading, ElMessage } from 'element-plus'
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import printJS from 'print-js'
import { queryDictByConfig, getPeUnitList } from '@/api/PerPhyExamination/perExamination/index'
import { Search } from '@element-plus/icons-vue'

const tijianSrc = ref<HTMLImageElement | null>(null)
const HisSrc = ref<HTMLImageElement | null>(null)
const searchParams = ref({
  preBeginDate: '',
  preEndDate: '',
  unitName: '',
  unitCode: '',
  unitVisitId: '',
  peId: '',
  peVisitId: '',
  idNo: '',
  number: '',
  name: '',
  peTypeName: ''
})
const pdfVisible = ref(false)
const printParams = ref({
  peVisitReqVoList: [],
  labTag: false,
  personTag: false,
  labSheetTag: false,
  examSheetTag: false
})
const time = ref([formatDate(new Date(), 'YYYY-MM-DD'), formatDate(new Date(), 'YYYY-MM-DD')])
const personList = ref([
  {
    label: '体检类型',
    prop: 'peTypeName',
    align: 'center',
    width: '180'
  },
  {
    label: '套餐名称',
    prop: 'setName',
    align: 'center',
    width: ''
  },
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
    label: '体检次数',
    prop: 'peVisitId',
    align: 'center',
    width: 90
  },
  {
    label: '性别',
    prop: 'sex',
    align: 'center',
    width: 60
  },
  {
    label: '年龄',
    prop: 'age',
    align: 'center',
    width: 60
  },
  {
    label: '身份证号',
    prop: 'idNo',
    align: 'center',
    width: ''
  },
  {
    label: '婚姻状况',
    prop: 'maritalStatus',
    align: 'center',
    width: 100
  },
  {
    label: '出生日期',
    prop: 'dateOfBirth',
    align: 'center',
    width: 140
  },
  {
    label: '联系电话',
    prop: 'phoneNumber',
    align: 'center',
    width: 120
  },
  {
    label: '团检单位',
    prop: 'unitname',
    align: 'center',
    width: 160
  }
  // {
  //   label: '两癌编码',
  //   prop: 'screeningCode',
  //   align: 'center',
  //   width: 120
  // },
  // {
  //   label: '婚检编码',
  //   prop: 'premaritalCode',
  //   align: 'center',
  //   width: 120
  // }
])
const guidanceSheet = ref(true)
const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<User[]>([])
const multipleSelectionArr = ref<User[]>([])
const deleteRow = (index: number) => {}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
  // multipleSelectionArr.value = val
  // if (!val || val.length === 0) {
  //   multipleSelection.value = []
  //   return
  // }
  // // 解析选中的唯一标识符，找到对应的完整数据项
  // multipleSelection.value = tableData.value.filter((item) => {
  //   const uniqueId = `${item.peId}-${item.peVisitId}`
  //   return val.includes(uniqueId)
  // })

  console.log(multipleSelection.value, 'multipleSelection')
}
const num = ref(1)

// watch(time, (newValue) => {})
const delReport = () => {}
const printType1 = () => {
  if (guidanceSheet.value) {
    printParams.value.labTag = false
    printParams.value.personTag = false
    printParams.value.labSheetTag = false
    printParams.value.examSheetTag = false
    medicalCertificate.value = false
  }
}
const printType2 = () => {
  if (printParams.value.labSheetTag) {
    guidanceSheet.value = false
    printParams.value.labTag = false
    printParams.value.personTag = false
    printParams.value.examSheetTag = false
    medicalCertificate.value = false
  }
}
const printType3 = () => {
  if (printParams.value.personTag) {
    guidanceSheet.value = false
    printParams.value.labTag = false
    printParams.value.labSheetTag = false
    printParams.value.examSheetTag = false
    medicalCertificate.value = false
  }
}
const printType4 = () => {
  if (printParams.value.labTag) {
    guidanceSheet.value = false
    printParams.value.personTag = false
    printParams.value.labSheetTag = false
    printParams.value.examSheetTag = false
    medicalCertificate.value = false
  }
}
const printType5 = () => {
  if (printParams.value.examSheetTag) {
    guidanceSheet.value = false
    printParams.value.labTag = false
    printParams.value.personTag = false
    printParams.value.labSheetTag = false
    medicalCertificate.value = false
  }
}
const medicalCertificate = ref(false)
const printType6 = () => {
  if (medicalCertificate.value) {
    guidanceSheet.value = false
    printParams.value.labTag = false
    printParams.value.personTag = false
    printParams.value.labSheetTag = false
    printParams.value.examSheetTag = false
  }
}
const printMe = ref()
const mediaPrintData = ref([])
const exportPdf = () => {
  if (multipleSelection.value.length > 0) {
    printParams.value.peVisitReqVoList = multipleSelection.value
    let otherPrintParams = {
      flag: 0,
      peVisitReqVoList: multipleSelection.value
    }
    mediaPrintData.value = []
    let printData = []
    if (guidanceSheet.value) {
      // 指引单打印
      selectPeGuidSheetPrint(printParams.value).then((res) => {
        // console.log(res, '指引单打印数据')
        if (res && res.length > 0) {
          printData = res
          if (printData.length > 0) {
            // zhiyindan
            mediaPrintData.value = jsonTo3DArray(printData, 26)
            console.log(mediaPrintData.value, '指引单打印数据')
            nextTick(() => {
              pdfVisible.value = true
            })
          }
        }
      })
    }
  }
}
const PrintZhiYinDan = (params = {}) => {
  let printData = []
  selectPeGuidSheetPrint({
    peVisitReqVoList: [
      {
        peId: params.peId || '',
        // peId: 'TJ10000015',
        peVisitId: params.peVisitId || 1,
        peDeptClass: params.peDeptClass || '',
        applyNo: '',
        applyNoList: []
      }
    ],
    labTag: false,
    personTag: false,
    labSheetTag: false,
    examSheetTag: false
  }).then((res) => {
    console.log(res, '指引单打印数据')
    if (res && res.length > 0) {
      printData = res
      if (printData.length > 0) {
        // zhiyindan
        // mediaPrintData.value = jsonTo3DArray(printData, 20)
        let jiaxiangList = []
        let noJiaxiangList = []

        printData.forEach((item) => {
          // 手写电子签名
          /*  if (item.peVisitListRespVo.signValueString) {
            item.peVisitListRespVo.signValueString =
              'data:image/png;base64,' + item.peVisitListRespVo.signValueString
            console.log(
              '%c Line:822 🍑 手写电子签名',
              'color:#7f2b82',
              item.peVisitListRespVo.signValueString
            )
          } */
          // PeId条形码
          JsBarcode(tijianSrc.value, item.peVisitListRespVo.peId, {
            // displayValue: false,
            fontSize: 18,
            width: 2,
            height: 30,
            margin: 4
          })
          item.peVisitListRespVo.imgUrl = tijianSrc.value?.src || ''

          // HIS患者ID条形码
          JsBarcode(HisSrc.value, item.peVisitListRespVo.patientId, {
            fontSize: 18,
            width: 2,
            height: 30,
            margin: 4
          })
          item.peVisitListRespVo.HisImgUrl = HisSrc.value?.src || ''

          if (item.personalItemToPrintRespVoList && item.personalItemToPrintRespVoList.length > 0) {
            item.personalItemToPrintRespVoList.forEach((item1) => {
              if (item1.addItem) {
                noJiaxiangList.push(item1)
              } else {
                jiaxiangList.push(item1)
              }
              if (item1.peDeptClass == '检查类' && item1.applyNo) {
                JsBarcode(tijianSrc.value, item1.applyNo, {
                  displayValue: false,
                  fontSize: 18,
                  width: 2,
                  height: 28
                  // margin: 4
                })
                item1.imgUrl = tijianSrc.value?.src || ''
              }
            })
            item.jiaxiangList = jiaxiangList
            item.noJiaxiangList = noJiaxiangList
          }
        })
        mediaPrintData.value = printData
        console.log(mediaPrintData.value, '指引单打印数据')
        nextTick(() => {
          let style = document.createElement('style')
          style.innerHTML = `html, body {overflow: visible !important; height: 100% !important;}`
          document.head.appendChild(style)
          new VuePrintNext({
            el: '#printMe',
            previewOpenCallback: () => {
              document.head.removeChild(style)
            }
          })
        })
      }
    }
  })
}
// 健康证数据
const healthTabelData = ref({})
const print = () => {
  if (multipleSelection.value.length > 0) {
    printParams.value.peVisitReqVoList = multipleSelection.value
    let otherPrintParams = {
      flag: 0,
      peVisitReqVoList: multipleSelection.value
    }
    mediaPrintData.value = []
    let printData = []
    if (guidanceSheet.value) {
      // 指引单打印
      selectPeGuidSheetPrint(printParams.value).then((res) => {
        // selectPeGuidSheetPrint({ peId: 'TJ10000030' }).then((res) => {
        // console.log(res, '指引单打印数据')
        if (res && res.length > 0) {
          printData = res
          if (printData.length > 0) {
            // zhiyindan
            // mediaPrintData.value = jsonTo3DArray(printData, 26)
            let jiaxiangList = []
            let noJiaxiangList = []

            printData.forEach((item) => {
              // 手写电子签名
              /* if (item.peVisitListRespVo.signValueString) {
                item.peVisitListRespVo.signValueString =
                  'data:image/png;base64,' + item.peVisitListRespVo.signValueString
              } */
              jiaxiangList = []
              noJiaxiangList = []
              JsBarcode(tijianSrc.value, item.peVisitListRespVo.peId, {
                // displayValue: false,
                fontSize: 18,
                width: 2,
                height: 30,
                margin: 4
              })
              item.peVisitListRespVo.imgUrl = tijianSrc.value?.src || ''
              // HIS患者ID条形码
              JsBarcode(HisSrc.value, item.peVisitListRespVo.patientId, {
                fontSize: 18,
                width: 2,
                height: 30,
                margin: 4
              })
              item.peVisitListRespVo.HisImgUrl = HisSrc.value?.src || ''
              if (
                item.peVisitListRespVo.kindReminder &&
                item.peVisitListRespVo.kindReminder.includes('\r\n')
              ) {
                item.peVisitListRespVo.kindReminderList =
                  item.peVisitListRespVo.kindReminder.split('\r\n')
              } else {
                item.peVisitListRespVo.kindReminderList = []
              }
              if (
                item.personalItemToPrintRespVoList &&
                item.personalItemToPrintRespVoList.length > 0
              ) {
                item.personalItemToPrintRespVoList.forEach((item1) => {
                  if (item1.addItem) {
                    noJiaxiangList.push(item1)
                  } else {
                    jiaxiangList.push(item1)
                  }
                  if (item1.peDeptClass == '检查类' && item1.applyNo) {
                    JsBarcode(tijianSrc.value, item1.applyNo, {
                      displayValue: false,
                      fontSize: 18,
                      width: 2,
                      height: 28
                      // margin: 4
                    })
                    item1.imgUrl = tijianSrc.value?.src || ''
                  }
                })
                item.jiaxiangList = jiaxiangList
                item.noJiaxiangList = noJiaxiangList
              }
            })
            mediaPrintData.value = printData
            console.log(
              '%c Line:931 🍤 mediaPrintData.value',
              'color:#6ec1c2',
              mediaPrintData.value
            )
            console.log(mediaPrintData.value, '指引单打印数据')
            nextTick(() => {
              let style = document.createElement('style')
              style.innerHTML = `html, body {overflow: visible !important; height: 100% !important;}`
              document.head.appendChild(style)
              new VuePrintNext({
                el: '#printMe',
                // paperSize: 'A4' // 设置纸张尺寸为 A4
                // orientation: 'landscape', // 设置纸张方向为横向
                // preview: true, // 启用预览模式
                // previewTitle: '打印指引单', // 设置弹出窗口的标题
                // previewPrintBtnLabel: '确认打印', // 预览按钮文本
                // paperSize: 'custom', // 设置为自定义尺寸
                // customSize: {
                //   width: '210', // 宽度
                //   height: 'auto', // 高度
                //   unit: 'mm' // 单位：mm、cm、in、px
                // }
                // extraCss: 'https://cdn.example.com/print-styles.css' // 可选：外部打印样式

                // windowMode: true // 启用窗口模式
                // defaultScale: 0.7, // 设置默认缩放比例
                // standard: 'css', // 使用 CSS 控制打印样式
                popTitle: '页码', // 弹出窗口的标题，可以为空字符串以避免显示网址或标题栏
                // openCallback: (vm) => {
                //   // 在打印前隐藏头部和底部
                //   height = '290'
                //   const header = document.querySelector('.header')
                //   const footer = document.querySelector('.footer')
                //   if (header) header.style.display = 'none'
                //   if (footer) footer.style.display = 'none'
                //   document.getElementById('printMe').style = 'width: 100%; height: 100%'
                //   console.log('打印前执行的操作', vm, header, footer)
                // },
                // previewBeforeOpenCallback: (vm) => {
                // height = '580'
                // // 打印后恢复显示
                // const header = document.querySelector('.header')
                // const footer = document.querySelector('.footer')
                // if (header) header.style.display = ''
                // if (footer) footer.style.display = ''
                // document.getElementById('printMe').style = 'width: 100%; height: 100%;overflow-y: auto;'
                // console.log('打印后执行的操作', vm, header, footer)

                // },
                previewOpenCallback: () => {
                  document.head.removeChild(style)
                }
              })
            })
          }
        }
      })
    } else if (printParams.value.labSheetTag) {
      // 检验申请单打印
      otherPrintParams.flag = 1
      printLabSheet(otherPrintParams).then((res) => {
        console.log(res, '检验申请单打印数据')
        if (res && res.length > 0) {
          printData = res
        }
      })
      if (printData.length > 0) {
        // jianyan
      }
    } else if (printParams.value.personTag) {
      // 个人条码打印
      otherPrintParams.flag = 1
      printPersonalBar(otherPrintParams).then((res) => {
        console.log(res, '个人条码打印数据')
        if (res && res.length > 0) {
          printData = res
        }
      })
      if (printData.length > 0) {
        // geren
      }
    } else if (printParams.value.labTag) {
      // 检验条码打印
      otherPrintParams.flag = 1
      printBarCode(otherPrintParams).then((res) => {
        console.log(res, '检验条码打印数据')
        if (res && res.length > 0) {
          printData = res
        }
      })
      if (printData.length > 0) {
        // jianyantiaoma
      }
    } else if (printParams.value.examSheetTag) {
      // 检查申请单打印
      otherPrintParams.flag = 1
      printExamSheet(otherPrintParams).then((res) => {
        console.log(res, '检查申请单打印数据')
        if (res && res.length > 0) {
          printData = res
        }
      })
      if (printData.length > 0) {
        // jiancha
      }
    } else if (medicalCertificate.value) {
      if (multipleSelection.value.length > 1) {
        ElMessage.error('健康证明暂不支持多人员批量打印')
        return
      } else {
        healthCertificateInfo({
          peId: multipleSelection.value[0].peId,
          peVisitId: multipleSelection.value[0].peVisitId
        }).then((res) => {
          if (res) {
            console.log(res, '健康证明打印数据')
            healthTabelData.value = res
            nextTick(() => {
              let style = document.createElement('style')
              style.innerHTML = `html, body {overflow: visible !important; height: 100% !important;}`
              document.head.appendChild(style)
              new VuePrintNext({
                el: '#health',
                previewOpenCallback: () => {
                  document.head.removeChild(style)
                }
              })
            })
            // setTimeout(() => {
            //   healthCertificateInfoUpload({
            //     peId: multipleSelection.value[0].peId,
            //     peVisitId: multipleSelection.value[0].peVisitId
            //   }).then((res) => {
            //     getPdf2()
            //   })
            // }, 500)
          }
        })
      }
    }
  } else {
    ElMessage.error('请选择要打印的数据')
    return
  }
}
const uploadPdf = () => {
  if (multipleSelection.value.length > 0) {
    if (multipleSelection.value.length > 1) {
      ElMessage.error('健康证明暂不支持多人员批量上传')
      return
    } else {
      healthCertificateInfo({
        peId: multipleSelection.value[0].peId,
        peVisitId: multipleSelection.value[0].peVisitId
      }).then((res) => {
        if (res) {
          console.log(res, '健康证明上传数据')
          healthTabelData.value = res
          setTimeout(() => {
            healthCertificateInfoUpload({
              peId: multipleSelection.value[0].peId,
              peVisitId: multipleSelection.value[0].peVisitId
            }).then((res) => {
              getPdf2()
            })
          }, 500)
        }
      })
    }
  } else {
    ElMessage.error('请选择要上传的数据')
    return
  }
}
const tableData = ref([])
const search = () => {
  if (time.value && time.value.length > 0) {
    searchParams.value.preBeginDate = time.value[0]
    searchParams.value.preEndDate = time.value[1]
  } else {
    searchParams.value.preBeginDate = ''
    searchParams.value.preEndDate = ''
  }
  selectPeGuidSheetList(searchParams.value).then((res) => {
    if (res && res.length > 0) {
      // tableData.value = splitArrayByLength(res, 23)
      // 为每个数据项添加 uniqueId 属性
      tableData.value = res.map((item) => {
        return {
          ...item,
          uniqueId: `${item.peId}-${item.peVisitId}`
        }
      })
    } else {
      tableData.value = []
    }
  })
}
/**
 * 将JSON数组转换为三维数组
 * @param {Array} arr 输入JSON数组
 * @returns {Array} 三维数组，结构如下：
 * 1. 第一维：按peId分组
 * 2. 第二维：每个peId组内包含一个合并后的数组
 * 3. 第三维：将合并后的数组拆分成不超过num条的子数组
 */
const jsonTo3DArray = (arr, num) => {
  // 1. 按peId分组
  const peIdMap = new Map()
  arr.forEach((item) => {
    if (!peIdMap.has(item.peId)) {
      peIdMap.set(item.peId, [])
    }
    peIdMap.get(item.peId).push(item)
  })

  // 2. 处理每个peId组
  const result = []
  for (const [peId, items] of peIdMap) {
    // 2.1 按peDeptClass分组并收集类型标记
    const deptClassMap = new Map()
    const mergedArray = []

    items.forEach((item) => {
      if (!deptClassMap.has(item.peDeptClass)) {
        deptClassMap.set(item.peDeptClass, true)
        //mergedArray.push({ type: item.peDeptClass, peId: item.peId })
      }
      mergedArray.push(item)
    })

    // 3. 按num条一组拆分
    const chunked = []
    for (let i = 0; i < mergedArray.length; i += num) {
      chunked.push(mergedArray.slice(i, i + num))
    }

    result.push(chunked)
  }

  return result
}

const splitArrayByLength = (arr, length) => {
  let result = []
  for (let i = 0; i < arr.length; i += length) {
    let end = Math.min(i + length, arr.length)
    result.push(arr.slice(i, end))
  }
  return result
}

// const htmlTitle = ref('体检报告')
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
    text: '上传健康证明中...',
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
}

// 生成 PDF 并下载或打印
const getPdf2 = async () => {
  startLoading()
  // 添加短暂的延迟，确保加载动画有机会显示
  await new Promise((resolve) => setTimeout(resolve, 100))
  const element = examSheet.value
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
    }).then(async (canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      const imgWidth = 585.28
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      if (i > 0) {
        pdf.addPage()
        position = 0
      }
      pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight)
      if (i === pages.length - 1) {
        // if (isPrint) {
        const pdfDataUrl = pdf.output('datauristring')
        const base64String = pdfDataUrl.split(',')[1] // 提取纯 Base64 字符串
        // console.log('pdfDataUrl', pdfDataUrl)

        const pdfFile = base64PdfToFile(pdfDataUrl, `${multipleSelection.value[0].name}.pdf`)
        // 验证结果
        console.log(pdfFile) // true
        console.log(pdfFile.name) // "report.pdf"
        console.log(pdfFile.type) // "application/pdf"
        if (!pdfFile) {
          console.error('pdfFile is empty')
          return
        }

        // 打印数据，确保是最新的
        console.log('Uploading PDF:', pdfFile)
        try {
          const formData = new FormData()
          formData.append('file', pdfFile)
          formData.append('reportId', multipleSelection.value[0].peId)

          // 发送请求
          const response = await upPdfEmployees(formData).then((res) => {
            if (res.code === 200) {
              ElMessage.success('上传健康证明成功')
            }
          })
          console.log('Upload success:', response)
          ElMessage.success('上传健康证明成功')
        } catch (error) {
          console.error('Upload failed:', error)
          ElMessage.error('上传健康证明失败')
        }
        // upPdfEmployees({
        //   file: pdfFile,
        //   reportId: multipleSelection.value[0].peId
        // }).then((res) => {
        //   ElMessage.success('上传健康证明成功')
        // })
        // printPdf(base64String)
        // } else {
        //   pdf.save(htmlTitle.value + '.pdf')
        // }
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
/**
 * 将Base64 PDF字符串转换为File对象
 * @param {string} base64Pdf - 包含MIME类型的Base64 PDF字符串（如："data:application/pdf;base64,JVBERi0xLjQK..."）
 * @param {string} [fileName="document.pdf"] - 自定义文件名
 * @returns {File} PDF文件对象
 */
const base64PdfToFile = (base64Pdf, fileName = 'document.pdf') => {
  // 参数校验
  if (typeof base64Pdf !== 'string' || !base64Pdf.includes(';base64,')) {
    throw new Error('Invalid Base64 PDF format')
  }

  // 提取MIME类型和纯Base64数据
  const [metadata, base64Data] = base64Pdf.split(',')
  const mimeType = metadata.match(/:(.*?);/)[1]

  // 验证PDF类型
  if (mimeType !== 'application/pdf') {
    console.warn(`Expected PDF type but got ${mimeType}`)
  }

  // 解码并转换
  const binaryData = atob(base64Data)
  const arrayBuffer = new ArrayBuffer(binaryData.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i)
  }

  // 创建File对象
  return new File([uint8Array], fileName, {
    type: 'application/pdf',
    lastModified: Date.now()
  })
}

onMounted(async () => {
  petypeNameList.value = await queryDictByConfig({
    dictType: '体检类型字典',
    cons: 'dict_name:体检类型'
  })
  search()
  initPlugin()
})

defineExpose({ PrintZhiYinDan })
const writeSign = ref<string | null>(null)
const SignUrl = ref<string>('')

import { onMounted, ref } from 'vue'
import PluginNSV from '@/utils/writeSign/js-NSV'
import { display } from 'html2canvas/dist/types/css/property-descriptors/display'

interface PluginInstance {
  DestroyPlugin?(): void
  InitPlugin(callback: (state: number) => void): void
  setPenSizeRange(min: number, max: number, callback: any): void
  setPenColor(r: number, g: number, b: number, callback: any): void
  onConfirm: (() => void) | null
  onClear: (() => void) | null
  onCancel: (() => void) | null
  NoSigned: (() => void) | null
  beginSign(callback: (state: number, args: any) => void): void
  endSign(callback: (state: number, args: any) => void): void
  clearSign(callback: (state: number, args: any) => void): void
  saveSignToBase64(x: number, y: number, callback: (state: number, args: string[]) => void): void
}

let plugin: PluginInstance | null = null

function debugPrint(text: string) {
  console.log(`%c DebugPrint: ${text}`, 'color:#fca650')
}

function initPlugin() {
  if (plugin) {
    plugin.DestroyPlugin?.()
  }

  plugin = new PluginNSV()

  plugin.InitPlugin((state) => {
    if (state === 1) {
      plugin?.setPenSizeRange(3, 9, null)
      plugin?.setPenColor(0, 0, 0, null)
      // document.getElementById('label_state')!.innerText = '服务连接成功.'
      debugPrint('initialize plugin OK.')
    } else {
      // document.getElementById('label_state')!.innerText = '连接失败.'
      debugPrint('initialize plugin fails.')
    }
  })

  plugin.onConfirm = () => {
    saveSignToBase64()
    endSign()
  }

  plugin.onClear = () => {
    clearSign()
  }

  plugin.onCancel = () => {
    endSign()
  }

  plugin.NoSigned = () => {
    if (plugin) {
      plugin.NoSign((state, args) => {
        if (state) {
          debugPrint('NoSign OK')
        } else {
          debugPrint('NoSign error: ' + args[0])
        }
      })
    }
  }
}

function clearSign() {
  if (plugin) {
    plugin.clearSign((state, args) => {
      if (state) {
        debugPrint('clearSign OK')
      } else {
        debugPrint('clearSign error: ' + args[0])
      }
    })
  }
}

function beginSign() {
  // document.getElementById('img_sign_result')!.src = ''
  if (multipleSelection.value.length < 1) {
    ElMessage.error('请至少选择一个受检人员')
    return
  }
  if (multipleSelection.value.length > 1) {
    ElMessage.error('最多只能选择一个受检人员')
    return
  }

  if (plugin) {
    plugin.beginSign((state, args) => {
      if (state) {
        plugin?.setDisplayMapMode(1, state)
        debugPrint('beginSign OK')
      } else {
        debugPrint('beginSign error: ' + args[0])
      }
    })
  }
}

function endSign() {
  if (plugin) {
    plugin.endSign((state, args) => {
      if (state) {
        debugPrint('endSign OK')
      } else {
        debugPrint('endSign error: ' + args[0])
      }
    })
  }
}

function saveSignToBase64() {
  if (!plugin) {
    ElMessage.error('签名服务未初始化')
    return
  }

  plugin.saveSignToBase64(0, 0, (state, args) => {
    if (state && args.length > 0) {
      const imgBase64 = args[0]
      writeSign.value = imgBase64
      SignUrl.value = 'data:image/png;base64,' + imgBase64

      if (multipleSelection.value?.[0]?.peId && multipleSelection.value[0]?.peVisitId) {
        SaveSign(SignUrl.value)
      } else {
        ElMessage.error('请选择有效的受检人员')
      }
    } else {
      debugPrint('saveSignToBase64 error: ' + args[0])
    }
  })
}
// 在 script setup 中添加
watch(SignUrl, (newVal, oldVal) => {
  if (newVal && newVal.length > 0) {
  }
})

function destroyPlugin() {
  if (plugin && plugin.DestroyPlugin) {
    plugin.DestroyPlugin()
  }
  plugin = null
}

onBeforeRouteLeave((to, from, next) => {
  destroyPlugin()
  multipleSelection.value = []
  next()
})

onBeforeUnmount(() => {
  destroyPlugin()
  multipleSelection.value = []
})

// 如果组件使用了 keep-alive，重新激活时再次初始化
onActivated(() => {
  initPlugin()
})

const SaveSign = async (sign) => {
  if (!multipleSelection.value || multipleSelection.value.length === 0) {
    ElMessage.error('请选择受检人员')
    return
  }

  const selected = multipleSelection.value[0]
  if (!selected.peId || !selected.peVisitId) {
    ElMessage.error('请选择有效的受检人员')
    return
  }

  await peSign({
    peId: selected.peId,
    peVisitId: selected.peVisitId,
    signValue: sign
  }).then((res) => {
    if (res) {
      ElMessage.success('签名成功')
      search()
    }
  })
}

//根据体检类型筛选套餐分类
const changePeType = (val) => {
  search()
}
const petypeNameList = ref<any>([])
const unitInfo = ref<any>({})
// 根据单位编码查询报道人信息
// const searchByUnitCode = async () => {
//   if (formInfo.unitCode) {
//     // let res = await getPeUnitDict({
//     let res = await getUnitInfo({
//       unitCode: formInfo.unitCode
//     })
//     if (res && res.unitName) {
//       formInfo.unitName = res.unitName
//       formInfo.unitCode = res.unitCode
//       formInfo.unitVisitId = res.unitVisitId
//       unitInfo.value = res
//     } else {
//       formInfo.unitName = ''
//       formInfo.unitCode = ''
//       formInfo.unitVisitId = ''
//       unitInfo.value = {}
//       ElMessage.warning('未查询到预约信息')
//     }
//     // await getList()
//   }
// }
const selectUnitCodeVisiable = ref(false)
// 点击单位row数据进行赋值操作
const selectUnitCodeClick = async (row) => {
  searchParams.value.unitCode = row.unitCode
  searchParams.value.unitName = row.unitName
  searchParams.value.unitVisitId = row.unitVisitId
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

const handleRowClick = (row, column, event) => {
  // 切换选中状态
  multipleTableRef.value?.toggleRowSelection(row)
}
</script>
<style lang="scss" scoped>
.per_report {
  background-color: #f5f7f9;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  width: 100%;
  height: calc(100vh - 54px);
  overflow: hidden;
  padding: 40px 8px 0;
  box-sizing: border-box;
  .report_search {
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
      }
    }
  }
  .report_table {
    display: flex;
    justify-content: space-between;
    .table_item {
      width: 100%;
      height: calc(100vh - 218px);
      background-color: #fff;
      margin-top: 8px;
      overflow-x: auto;
      // display: flex;
      align-items: center;
      padding: 8px;
      .list_table {
        // margin: 0 8px;
        width: 100%;
        /* padding: 12px; */
        :deep(.el-checkbox-group) {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          height: calc(100vh - 257px);
          gap: 9px;
          column-gap: 19px;
          align-content: flex-start;
        }
      }
    }
    .heard_title {
      height: 40px;
      line-height: 40px;
      /* padding-left: 20px; */
      /* margin-bottom: 11px; */
      border-bottom: 1px solid #c5dcff;
      span {
        display: inline-block;
        width: auto;
        height: 40px;
        padding: 0 20px;
        text-align: center;
        /* border-bottom: 2px solid #3473d1; */
        color: #3473d1;
        font-weight: bold;
      }
    }
  }
}
.print_content {
  page-break-after: always; /* 每块内容后强制分页 */
  break-inside: avoid; /* 防止内容块内部分页 */
  width: 210mm;
  height: 290mm;

  .print_heard {
    .hos_t {
      display: flex;
      justify-content: center;
      height: 40px;
      align-items: center;
      font-size: 26px;
      font-weight: bold;
      position: relative;
      img {
        position: absolute;
        left: 0px;
        top: 0;
      }
    }
    .title {
      width: 100%;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      height: 40px;
      font-weight: bold;
    }
    .per_msg {
      position: relative;
      font-family: 'SimSun', 'STSong', serif;
      .el-row {
        .el-col {
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
        }
      }
      img {
        width: 80px;
        height: 110px;
        position: absolute;
        right: 20px;
        top: -54px;
      }
    }
    .tishi {
      border-top: #333333 1px solid;

      .tishi_in {
        width: 100%;
        font-size: 14px;
        display: flex;
        /* border-top: 2px solid #333333; */
        border-bottom: 1px solid #333333;
        /* height: 64px; */
      }
      .tishi_in:last-child {
        border-top: none;

        border-bottom: none;
      }
      .tishi_t {
        width: 120px;
        /* line-height: 30px; */
        color: #333333;
        font-weight: bold;
        /* border-right: #333333 1px solid; */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tishi_con {
        width: calc(100% - 121px);
        color: #666666;
        word-break: break-all;
        overflow: hidden;
        /* line-height: 20px; */
        .el-row {
          line-height: 20px;
          height: 20px;
          .el-col:first-child {
            padding-left: 8px;
          }
        }
      }
    }
  }
  .print_con {
    .table {
      width: 100%;
      height: calc(290mm - 300px);
      overflow: hidden !important;
      .table_t {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-top: 1px solid #333333;
        border-bottom: 1px solid #333333;
        font-size: 14px;
        .neirong {
          /* border-bottom: #333333 1px solid; */
          .el-row {
            line-height: 36px;
            height: 36px;
          }
          .el-col {
            line-height: 36px;
            height: 36px;
            white-space: normal;
            overflow: hidden;
          }
          .weizhi {
            font-weight: bold;
            font-size: 16px;
          }
          .el-col {
            overflow: hidden;
            height: 36px;
            display: block;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .col_LH {
            font-size: 12px;
            line-height: 18px;
          }
        }
        .neirong:last-child {
          border-bottom: none;
        }
      }
    }
    .b_msg {
      width: 100%;
      text-align: center;
      height: 60px;
      /* border-top: #333333 1px solid; */
      /* border-bottom: #333333 1px solid; */

      font-size: 14px;
      color: #333333;
      position: relative;
      .tishi_in {
        width: 100%;
        font-size: 14px;
        display: flex;
        /* border-top: 1px solid #333333; */
        border-bottom: 1px solid #333333;
        height: 30px;
      }
      .tishi_t {
        width: 120px;
        height: 30px;
        line-height: 30px;
        color: #333333;
        font-weight: bold;
        /* border-right: #333333 1px solid; */
        text-align: center;
      }
      .b_c {
        height: 30px;
        line-height: 30px;
      }
      .b_p {
        position: absolute;
        top: 0px;
        right: 6px;
      }
    }
    .bot {
      display: flex;
      border-bottom: #333333 1px solid;
      width: 100%;
      .bot_l {
        width: 120px;
        height: 96px;
        text-align: center;
        font-weight: bold;
        padding-top: 15px;
        font-size: 16px;
        border-right: #333333 1px solid;
      }
      .bot_r {
        width: 100%;
        height: 96px;
        .el-row {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #333333;
        }
      }
    }
  }
}
:deep(.pdfVisible) {
  margin: 0;
  .el-dialog {
    margin: 0 !important;
  }
  .el-dialog__body {
    padding: 0 !important;
  }
}
#health {
  width: 210mm;
  height: 290mm;
  .health_page {
    width: 100%;
    height: 100%;
    padding: 10px 0px;
    background-color: #fff;
    .health_h {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      height: 40px;
      align-items: center;
      .h_div1 {
      }
      .h_div2 {
        font-weight: bold;
      }
    }
    .health_t {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 22px;
    }
    .health_per {
      border-right: #333333 1px solid;
      div {
        height: 40px;
        width: 100%;
      }
      .per_yb {
        display: flex;
        align-items: center;
        padding-left: 8px;
        font-size: 18px;
        border-top: 1px solid #333333;
        border-left: #333333 1px solid;
        /* border-right: #333333 1px solid; */
      }
      .per_na {
        width: 100%;
        display: flex;
        align-items: center;
        /* padding-left: 8px; */
        font-size: 14px;
        border-top: #333333 1px solid;
        position: relative;
        div {
          padding-left: 8px;
          border-left: #333333 1px solid;
          line-height: 40px;
          border-bottom: #333333 1px solid;
        }
        .div1 {
          width: 15%;
        }
        .div2 {
          width: 25%;
        }
        .div3 {
          width: 15%;
        }
        .div4 {
          width: calc(25% + 1px);
          padding-right: 1px;
          border-right: #333333 1px solid;
        }
        img {
          width: 80px;
          height: 110px;
          text-align: center;
          position: absolute;
          right: 38px;
          top: 5px;
        }
      }
      .per_sfz {
        width: 100%;
        display: flex;
        align-items: center;
        /* padding-left: 8px; */
        font-size: 14px;
        .div1 {
          width: 15%;
          border-left: #333333 1px solid;
          line-height: 40px;
          border-bottom: #333333 1px solid;
          padding-left: 8px;
        }
        .div2 {
          width: calc(65% + 1px);
          line-height: 40px;
          border-bottom: #333333 1px solid;
          padding-left: 8px;
          padding-right: 1px;
          border-left: #333333 1px solid;
          border-right: #333333 1px solid;
        }
      }
      .per_jk {
        width: calc(80% + 1px);
        display: flex;
        align-items: center;
        padding-left: 8px;
        font-size: 18px;
        border-left: #333333 1px solid;
        border-right: #333333 1px solid;
      }
    }
    .div_table {
      width: 100%;
      border-top: #333333 1px solid;
      height: calc(290mm - 360px);
      .data_table {
        width: 100%;
        .tr1 {
          height: 36px;
          width: 100%;
          text-align: center;
          border-bottom: #333333 1px solid;
          .td1 {
            width: 35%;
            border-right: #333333 1px solid;
            border-left: #333333 1px solid;
          }
          .td2 {
            width: 45%;
          }
          .td3 {
            width: 8%;
            border-right: #333333 1px solid;
            border-left: #333333 1px solid;
          }
          .td4 {
            width: 12%;
            border-right: #333333 1px solid;
          }
        }
        .tr2 {
          height: 36px;
          width: 100%;
          text-align: center;
          border-bottom: #333333 1px solid;
          .td1 {
            width: 7.5%;
            border-right: #333333 1px solid;
          }
          .td2 {
            width: 7.5%;
            border-right: #333333 1px solid;
          }
          .td3 {
            width: 30%;
            border-right: #333333 1px solid;
          }
        }
        .tr3 {
          height: 50px;
          width: 100%;
          text-align: center;
          border-bottom: #333333 1px solid;
          .td1 {
            text-align: left;
            width: 35%;
            border-right: #333333 1px solid;
            border-left: #333333 1px solid;
            overflow: hidden;
            text-align: center;
          }
          .td2 {
            width: 7.5%;
            border-right: #333333 1px solid;
          }
          .td3 {
            width: 7.5%;
            border-right: #333333 1px solid;
          }
          .td4 {
            width: 30%;
            border-right: #333333 1px solid;
          }
          .td5 {
            width: 8%;
            border-right: #333333 1px solid;
            border-left: #333333 1px solid;
            text-align: center;
            img {
              width: 60px;
              height: 23px;
            }
          }
          .td6 {
            width: 12%;
            border-right: #333333 1px solid;
          }
        }
      }
    }
    .health_bz {
      width: 100%;
      line-height: 22px;
      font-size: 14px;
    }
    .health_qz {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 80px;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
</style>
<style>
@media print {
  @page {
    height: 100%;
    width: 100%;
    padding: 10px 20px;
    margin: 15px;
  }
  html,
  body {
    height: 100% !important;
    width: 100% !important;
    overflow: visible !important;
  }
  .print_content {
    page-break-after: auto;
    /* padding: 0 20px; */
  }
  /* 样式名称要唯一避免功能样式冲突 */
  .print_heard {
    /* position: fixed;
    top: 0;
    width: 100%;
    height: 152px;
    background: white;
    z-index: 0; */
  }
  /* 样式名称要唯一避免功能样式冲突 */
  .print_con {
    /* page-break-after: always; */
    /* margin-top: 152px; */
  }
  /* 避免最后一页多出空白 */
  .print_con:last-child {
    page-break-after: auto;
  }
  /* 其他打印样式调整 */
  /* .no-print {
    display: none !important;
  } */
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
</style>
