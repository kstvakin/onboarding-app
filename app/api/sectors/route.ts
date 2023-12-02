import {SectorAttributes} from "../../../datasource/entities/Sector";
import {ApiResponse} from "../../../helper_classes/apiresponse/index";
import {SectorService} from "../../../helper_classes/services/controllers/sector";
export async function GET() {
    try {
        const sectorService: SectorService = SectorService.getInstance();
        const sectors: SectorAttributes[] = await sectorService.get();
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.success(sectors))
    }catch (e: any) {
        console.error(e);
        const apiResponse: ApiResponse = ApiResponse.getInstance();
        return Response.json(apiResponse.error(e.message));
    }
}