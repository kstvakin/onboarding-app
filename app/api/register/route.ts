import {User} from "../../../datasource/entities";
import {UserAttributes} from "../../../datasource/entities/User";
import {ApiResponse} from "../../../helper_classes/apiresponse/index";
import {Register} from "../../../helper_classes/services/controllers/register";

export async function POST(req: Request) {
    try {
        const register: Register = Register.getInstance();
        const user: UserAttributes = await register.post(req, User);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.success(user))
    }catch (e: any) {
        console.error(e);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.error(e.message));
    }
}