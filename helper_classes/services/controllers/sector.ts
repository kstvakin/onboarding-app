import {GetAbstractClass} from "./abstract";
import {DBActions} from "../../datasource/index";
import {Field, Sector} from "../../../datasource/entities/index";
import {SectorAttributes} from "../../../datasource/entities/Sector";

export class SectorService implements GetAbstractClass {
    private static instance: SectorService = new SectorService();
    public static getInstance(): SectorService{
        return this.instance;
    }

    async get(req?: Request): Promise<SectorAttributes[]> {
        const dbActions: DBActions = DBActions.getInstance();
        return  dbActions.findAllByAssociate({parent: Sector, child: Field});
    }

}