/**
 * @name: search
 * @author: itmobai
 * @date: 2023-07-09 11:27
 * @description：search
 * @update: 2023-07-09 11:27
 */
export declare enum TypeEnum {
    small = "small",
    large = "large"
}
export interface SearchProps {
    column?: string[];
    type?: TypeEnum;
}
