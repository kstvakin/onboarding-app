import {DBActions} from "../../../helper_classes/datasource/index";
import {Field, Sector} from "../../../datasource/entities";
import {SectorAttributes} from "../../../datasource/entities/Sector";
export async function GET() {
    try {
        const dbActions: DBActions = DBActions.getInstance();
        const sectors: SectorAttributes[] = await dbActions.findAllByAssociate({parent: Sector, child: Field});

        return Response.json({data: sectors})
    }catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}