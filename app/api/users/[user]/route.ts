import {DBActions} from "../../../../helper_classes/datasource/index";
import {User} from "../../../../datasource/entities/index";
import {UserAttributes} from "../../../../datasource/entities/User";
import {ApiResponse} from "../../../../helper_classes/apiresponse/index";
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
        const userId = params.user;
        const dbActions: DBActions = DBActions.getInstance();
        const user: UserAttributes = await dbActions.findOne(User, {id: userId});
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
        const {name, sectors} = await req.json();
        const postBody: PostBody = {
            name: String(name.value).toLowerCase(),
            sectors: sectors.value.map((el:any)=> el.name).join(','),
            id: params.user
        };
        const dbActions: DBActions = DBActions.getInstance();
        await dbActions.edit(User, postBody);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.success(postBody))
    }catch (e: any) {
        console.error(e);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.error(e.message));
    }
}