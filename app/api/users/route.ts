import {findOne} from "../../../helper_classes/datasource/index";
import {User} from "../../../datasource/entities/index";
export async function GET() {
    // const { searchParams } = new URL(req.url);
    // console.log(searchParams)
    // const id = searchParams.get('id')
    const user = await findOne(User, {id:2});
    return Response.json({data: user} )
}
