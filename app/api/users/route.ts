import {UserAttributes} from "../../../datasource/entities/User";
import {ApiResponse} from "../../../helper_classes/apiresponse/index";
import {UserService} from "../../../helper_classes/services/controllers/user";
export async function GET() {
    try {
        const userService: UserService = UserService.getInstance();
        const users: UserAttributes[] = await userService.get();
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.success(users))
    }catch (e: any) {
        console.error(e);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.error(e.message));
    }
}
