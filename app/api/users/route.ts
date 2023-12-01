import {DBActions} from "../../../helper_classes/datasource/index";
import {User} from "../../../datasource/entities/index";
export async function GET() {
    const dbActions: DBActions = DBActions.getInstance();
    const user = await dbActions.findAll(User, {});
    return Response.json({data: user} )
}
