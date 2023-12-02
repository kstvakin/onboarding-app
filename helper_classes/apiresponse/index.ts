import {IResponse} from "../../utilities/intefaces/api_response";

abstract class IApiResponse {
    abstract success(data: unknown): IResponse;

    abstract error(message: string): IResponse;
}

export class ApiResponse implements IApiResponse {
    private static instance: ApiResponse = new ApiResponse();
    public static getInstance(): ApiResponse{
        return this.instance;
    }

    success(data: unknown): IResponse {
        return {
            status: 'success',
            message: 'successful',
            data
        };
    }

    error(message: string): IResponse {
        return {
            status: 'error',
            message
        };
    }

}