import {DBActions} from "../../../helper_classes/datasource/index";
import {Field, Sector} from "../../../datasource/entities";
import {SectorAttributes} from "../../../datasource/entities/Sector";
import {ApiResponse} from "../../../helper_classes/apiresponse/index";
export async function GET() {
    try {
        const dbActions: DBActions = DBActions.getInstance();
        const sectors: SectorAttributes[] = await dbActions.findAllByAssociate({parent: Sector, child: Field});
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.success(sectors))
    }catch (e: any) {
        console.error(e);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.error(e.message));
    }
}