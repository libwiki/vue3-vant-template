export interface IPageBaseMeta { // 分页数据基本信息
    current_page: number, // 当前分页
    total: number, // 总数据量
    per_page: number, // 每页请求的条数
    total_pages: number, // 总页数
    isEnd: boolean,
}

export interface IPageMeta<T> extends IPageBaseMeta { // 分页数据
    data: T[],
}


export enum EBoolean {
    false,
    true,
}


export interface INumberObject {
    [key: string]: number
}


export enum EGender { // 性别枚举
    male = "male",
    female = "female",
}

