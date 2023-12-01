import {DBActions} from "../../../helper_classes/datasource/index";
import {User} from "../../../datasource/entities/index";
import {UserAttributes} from "../../../datasource/entities/User";
export async function GET() {
    const dbActions: DBActions = DBActions.getInstance();
    const user: UserAttributes[] = await dbActions.findAll(User, {});
    return Response.json({data: user} )
}
