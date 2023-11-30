import {findAllByAssociate} from "../../../helper_classes/datasource/index";
import {Field, Sector} from "../../../datasource/entities";
export async function GET() {
    try {
        const sectors = await findAllByAssociate({parent: Sector, child: Field});

        return Response.json({data: sectors})
    }catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}