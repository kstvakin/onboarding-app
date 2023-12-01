import {DBActions} from "../../../../helper_classes/datasource/index";
import {User} from "../../../../datasource/entities/index";
import {UserAttributes} from "../../../../datasource/entities/User";
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
        return Response.json({data: user})
    }catch (e) {
        console.error(e);
        return Promise.reject(e);
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
        return Response.json({data: postBody});
    }catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
}