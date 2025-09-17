# 字典弹窗

字典取值公用弹窗组件。

## 使用

```js
import DictDialog from '@/views/components/DictDialog/Index.vue'


<DictDialog
  :visible="tmpVisible"
  title="诊断列表"
  :query-params="{ dictType: '西医诊断' }"
  @callback="onCallback"
  @on-close="
    () => {
      tmpVisible = false
    }
  "
/>
```

## 属性

| 属性名       | 类型         | 含义             | 默认值 |
| ------------ | ------------ | ---------------- | ------ |
| visible      | boolean      | 是否显示弹窗     | false  |
| title        | string       | 弹窗标题         | ''     |
| query-params | IQueryPatams | 接口查询参数     |        |
| callback     | function     | 选中数据回调函数 |        |
| on-close     | function     | 关闭事件         |        |
| width        | string       | 弹窗宽度         | 600px  |
| maxHeight    | string       | 弹窗高度         | 600px  |
| tableHeight  | string       | 表格高度         | 380px  |

## IQueryPatams

```js
export interface IQueryPatams {
  dictType: string // 字典类型
  cons?: string // 请求条数，默认100
}
```
