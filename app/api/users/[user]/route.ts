import {User} from "../../../../datasource/entities/index";
import {UserAttributes} from "../../../../datasource/entities/User";
import {ApiResponse} from "../../../../helper_classes/apiresponse/index";
import {UserService} from "../../../../helper_classes/services/controllers/user";
interface PostBody{
    name: string,
    sectors: string,
    id: string
}

export async function GET(
    request: Request,
    { params }: { params: { user: string }}
    ) {
    try {
        const userService: UserService = UserService.getInstance();
        const user: UserAttributes = await userService.getOneUser(params.user);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.success(user))
    }catch (e: any) {
        console.error(e);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.error(e.message));
    }
}

export async function POST(
    req: Request,
    { params }: { params: { user: string }}
) {
    try {
        const userService: UserService = UserService.getInstance();
        const postBody: PostBody = await userService.post(req, User, params.user);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.success(postBody))
    }catch (e: any) {
        console.error(e);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.error(e.message));
    }
}