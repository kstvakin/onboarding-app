import {DBActions} from "../../../helper_classes/datasource/index";
import {User} from "../../../datasource/entities";
import {UserAttributes} from "../../../datasource/entities/User";
import {ApiResponse} from "../../../helper_classes/apiresponse/index";
interface IPostBody {
    name: string,
    agreed_date: Date,
    sectors: string
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const postBody: IPostBody = {
            name: String(body.name.value).toLowerCase(),
            sectors: body.sectors.value.map((el: any) => el.name).join(','),
            agreed_date: new Date()
        }
        const dbActions: DBActions = DBActions.getInstance();
        const user: UserAttributes = await dbActions.add(User, postBody);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.success(user))
    }catch (e: any) {
        console.error(e);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.error(e.message));
    }
}