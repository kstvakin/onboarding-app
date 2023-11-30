import {edit, findOne} from "../../../../helper_classes/datasource/index";
import {User} from "../../../../datasource/entities/index";
interface PostBody{
    name: string,
    sectors: string,
    id: number
}

export async function GET(
    request: Request,
    { params }: { params: { user: string }}
    ) {
    try {
        const userId = params.user;
        const user = await findOne(User, {id: userId});
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
        const postBody = {
            name: String(name.value).toLowerCase(),
            sectors: sectors.value.map((el:any)=> el.name).join(','),
            id: params.user
        }
        await edit(User, postBody);
        return Response.json({data: postBody});
    }catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
}