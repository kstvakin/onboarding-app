import {DBActions} from "../../../helper_classes/datasource/index";
import {User} from "../../../datasource/entities/index";
import {UserAttributes} from "../../../datasource/entities/User";
import {ApiResponse} from "../../../helper_classes/apiresponse/index";
export async function GET() {
    try {
        const dbActions: DBActions = DBActions.getInstance();
        const users: UserAttributes[] = await dbActions.findAll(User, {});
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.success(users))
    }catch (e: any) {
        console.error(e);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.error(e.message));
    }
}
