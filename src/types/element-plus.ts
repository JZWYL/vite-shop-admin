import { ElForm } from 'element-plus'
import { FormItemRule } from 'element-plus/lib/components/form/src/form.type'
export type IElForm = InstanceType<typeof ElForm>

// export type IFormRule = InstanceType<typeof FormItemRule[]>
export type IFormRule = Record<string, FormItemRule[]>
