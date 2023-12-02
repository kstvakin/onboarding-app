import {PostAbstractClass} from "./abstract";
import {DBActions} from "../../datasource/index";
import User, {UserAttributes} from "../../../datasource/entities/User";

interface IPostBody {
    name: string,
    sectors: string,
    agreed_date: Date
}

export class Register implements PostAbstractClass {
    private static instance: Register = new Register();
    public static getInstance(): Register{
        return this.instance;
    }

    async post(req: Request, entity: typeof User): Promise<UserAttributes> {
        const body = await req.json();
        const postBody: IPostBody = {
            name: String(body.name.value).toLowerCase(),
            sectors: body.sectors.value.map((el: any) => el.name).join(','),
            agreed_date: new Date()
        }
        const dbActions: DBActions = DBActions.getInstance();
        return  dbActions.add(entity, postBody);
    }

}