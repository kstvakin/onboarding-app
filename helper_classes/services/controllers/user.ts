import {GetAbstractClass} from "./abstract";
import {DBActions} from "../../datasource/index";
import {User} from "../../../datasource/entities/index";
import {UserAttributes} from "../../../datasource/entities/User";

interface PostBody{
    name: string,
    sectors: string,
    id: string
}

export class UserService extends GetAbstractClass {
    private static instance: UserService = new UserService();
    public static getInstance(): UserService{
        return this.instance;
    }

    get(req?: Request): Promise<UserAttributes[]> {
        const dbActions: DBActions = DBActions.getInstance();
        return dbActions.findAll(User, {});
    }

    getOneUser(user: string): Promise<UserAttributes>{
        const dbActions: DBActions = DBActions.getInstance();
        return dbActions.findOne(User, {id: user});
    }

    async post(
        req: Request,
        entity: typeof User,
        user: string
    ): Promise<PostBody>{
        const {name, sectors} = await req.json();
        const postBody: PostBody = {
            name: String(name.value).toLowerCase(),
            sectors: sectors.value.map((el:any)=> el.name).join(','),
            id: user
        };
        const dbActions: DBActions = DBActions.getInstance();
        await dbActions.edit(User, postBody);
        return postBody;
    }

}