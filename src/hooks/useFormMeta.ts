import _ from "lodash"
import {reactive, ref, toRaw} from "vue";
import {FormInstance} from "vant"

/**
 * 繁杂的表单数据处理钩子，实现了重置、验证、弹框开关功能
 * @template T
 * @template R
 * @param data {T} 表单数据
 * @param rulesData {R} 表单数据
 * @param show {boolean} 表单模态框默认状态
 * @returns {{formRef: ?any, _formData: {show:boolean,data:T}, onValidate: (function(): Promise<boolean>), formData:{show:boolean,data:T},rules:R, getFormData: (function(): T), toggleModal: (function(show:boolean, row:*=): boolean)}}
 */
export function useFormMeta<T extends any>(data: Partial<T> = {}, rulesData: Partial<any> = {}, show = false) {
    // 表单数据
    const formData = reactive({
        show,
        data,
    });
    const rules = reactive(rulesData)
    // InstanceType<typeof El>可以获取组件El的类型
    const formRef = ref<FormInstance | null>(); // 表单元素 只能应用到ElForm上
    // 原始数据拷贝恢复时使用
    const _formData = _.cloneDeep(toRaw(formData));

    return {
        rules,
        formRef,
        formData,
        validate(): Promise<boolean> { // 表单验证
            return new Promise(async (resolve) => {
                if (formRef.value) { // 存在表单，则重置表单的验证状态
                    await formRef.value.validate();
                    const validStatus = formRef.value.getValidationStatus();
                    resolve(validStatus['passed'] === 'passed')
                } else { // 不存在表单元素无需验证
                    resolve(true)
                }
            })
        },
        getFormData() { // 取表单数据（会进行拷贝处理）
            return _.cloneDeep(toRaw(formData)).data;
        },
        reset() { // 重置表单到初始状态
            formData.data = _.cloneDeep(_formData.data)
        },
        toggleModal(show: boolean, data: Partial<T> = {}) { // // 打开、关闭弹框
            formData.show = _.isBoolean(show) ? show : !formData.show;
            formData.data = Object.assign({}, _.cloneDeep(_formData.data), data)

            // 存在表单，则重置表单的验证状态
            formRef.value?.resetValidation();
            return formData.show;
        }
    }
}
