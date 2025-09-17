import introJs from 'intro.js'
import { IntroJs, Step, Options } from 'intro.js'
import 'intro.js/introjs.css'

import { useDesign } from '@/hooks/web/useDesign'

export const useIntro = (setps?: Step[], options?: Options) => {
  const { variables } = useDesign()

  const defaultSetps: Step[] = setps || [
    {
      element: `#${variables.namespace}-menu`,
      title: '菜单',
      intro: '以路由的结构渲染的菜单栏',
      position: 'right'
    },
    {
      element: `#${variables.namespace}-tool-header`,
      title: '工具',
      intro: '用于设置定制系统',
      position: 'left'
    },
    {
      element: `#${variables.namespace}-tags-view`,
      title: '标签页',
      intro: '用于记录路由历史记录',
      position: 'bottom'
    }
  ]

  const defaultOptions: Options = options || {
    prevLabel: '上一步',
    nextLabel: '下一步',
    skipLabel: '跳过',
    doneLabel: '结束'
  }

  const introRef: IntroJs = introJs()

  introRef.addSteps(defaultSetps).setOptions(defaultOptions)

  return {
    introRef
  }
}
