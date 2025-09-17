import { Layout } from '@/utils/routerHelper'

const homeRouter: AppRouteRecordRaw[] = [
  // {
  //   path: '/medical',
  //   component: Layout,
  //   name: 'Medical',
  //   meta: { hidden: true },
  //   children: [
  //     {
  //       path: 'nurse',
  //       component: () => import('@/views/INPNurse/Index.vue'),
  //       name: 'nurse',
  //       meta: {
  //         title: '住院护士站',
  //         noCache: false,
  //         canTo: true,
  //         affix: false
  //       }
  //     },
  //     {
  //       path: 'singleDetail',
  //       component: () => import('@/views/INPNurse/singleDetail/Index.vue'),
  //       name: 'singleDetail',
  //       meta: {
  //         title: '患者信息',
  //         noCache: false,
  //         canTo: true,
  //         affix: false
  //       }
  //     },
  //     {
  //       path: 'dictionary',
  //       component: () => import('@/views/EmrMtenance/dicMtenance/Index.vue'),
  //       name: 'dictionary',
  //       meta: {
  //         title: '字典维护',
  //         noCache: false,
  //         canTo: true,
  //         affix: false
  //       }
  //     },
  //     {
  //       path: 'element',
  //       component: () => import('@/views/EmrMtenance/eleMtenance/Index.vue'),
  //       name: 'element',
  //       meta: {
  //         title: '数据元维护',
  //         noCache: false,
  //         canTo: true,
  //         affix: false
  //       }
  //     },
  //     {
  //       path: 'tempManager',
  //       component: () => import('@/views/EmrMtenance/tempMtenance/Index.vue'),
  //       name: 'tempManager',
  //       meta: {
  //         title: '模板维护',
  //         noCache: false,
  //         canTo: true,
  //         affix: false
  //       }
  //     }
  //   ]
  // },
  // 基础设施
  {
    path: '/infra',
    meta: { hidden: true },
    component: Layout,
    name: 'infra',
    children: [
      {
        path: 'build',
        component: () => import('@/views/infra/build/index.vue'),
        name: 'build',
        meta: {
          title: '表单构建',
          noCache: false,
          canTo: true,
          affix: false
        }
      },
      {
        path: 'swagger',
        component: () => import('@/views/infra/swagger/index.vue'),
        name: 'swagger',
        meta: {
          title: '系统接口',
          noCache: false,
          canTo: true,
          affix: false
        }
      },
      {
        path: 'druid',
        component: () => import('@/views/infra/druid/index.vue'),
        name: 'druid',
        meta: {
          title: 'DB 监控',
          noCache: false,
          canTo: true,
          affix: false
        }
      },
      {
        path: 'admin-server',
        component: () => import('@/views/infra/server/index.vue'),
        name: 'admin-server',
        meta: {
          title: 'Java 监控',
          noCache: false,
          canTo: true,
          affix: false
        }
      },
      {
        path: 'skywalking',
        component: () => import('@/views/infra/skywalking/index.vue'),
        name: 'skywalking',
        meta: {
          title: '监控平台',
          noCache: false,
          canTo: true,
          affix: false
        }
      }
    ]
  },
  // 体检系统管理
  {
    path: '/PhyExamManage',
    meta: { hidden: true },
    component: Layout,
    name: 'PhyExamManage',
    children: [
      {
        path: 'SystemSet',
        name: 'PhyExam-SystemSettings', // 避免命名冲突
        meta: { title: '系统设置', hidden: false }, // 添加 meta 字段
        children: [
          {
            path: 'deptSetting',
            component: () => import('@/views/PhyExamManage/SystemSettings/deptSetting/index.vue'),
            name: 'PhyExam-deptSetting',
            meta: {
              title: '科室设置',
              noCache: false,
              canTo: true,
              affix: false
            }
          }
        ]
      }
    ]
  }
  // {
  //   path: '/emr',
  //   component: Layout,
  //   name: 'EMR ',
  //   meta: { hidden: true },
  //   children: [
  //     {
  //       path: 'emrTemp',
  //       component: () => import('@/views/EMREditor/Index.vue'),
  //       name: 'emrTemp',
  //       meta: {
  //         title: '模板编辑器',
  //         noCache: false,
  //         canTo: true,
  //         affix: false
  //       }
  //     }
  //   ]
  // }
]

export default homeRouter
