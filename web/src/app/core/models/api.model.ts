export interface IBaseSuccessResponse {
    success: boolean;
}

export interface IBaseResponse<Data> extends IBaseSuccessResponse {
    data: Data;
}

