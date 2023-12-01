import {DBActions} from "../../../helper_classes/datasource/index";
import {User} from "../../../datasource/entities";
interface PostBody{
    name: string,
    agreed_date: Date,
    sectors: string
}
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const postBody: PostBody = {
            name: String(body.name.value).toLowerCase(),
            sectors: body.sectors.value.map((el: any) => el.name).join(','),
            agreed_date: new Date()
        }
        const dbActions: DBActions = DBActions.getInstance();
        const user = await dbActions.add(User, postBody);
        return Response.json({data: user})
    }catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
}