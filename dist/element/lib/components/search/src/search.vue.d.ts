/**
 * @name: 列表搜索组件
 * @author: itmobai
 * @date: 2023-07-09 11:27
 * @description：列表搜索组件
 * @update: 2023-07-09 11:27
 */

declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: import("vue").PropType<Object>;
        required: true;
    };
    size: {
        type: import("vue").PropType<import("./search").SizeEnum>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: import("vue").PropType<Object>;
        required: true;
    };
    size: {
        type: import("vue").PropType<import("./search").SizeEnum>;
    };
}>>, {}, {}>;
export default _default;
