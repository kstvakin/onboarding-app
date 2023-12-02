abstract class IDBActions {
    abstract add(entity: any, data: Record<string, any>): Promise<any>;

    abstract findAllByAssociate(entities: Record<string, any>): Promise<any>;
    
    abstract findOne(entity: any, query: Record<string, any>): Promise<any>;
    
    abstract edit(entity: any, data: Record<string, any>): Promise<any>;

    abstract findAll(entity: any, query: Record<string, any>): Promise<any>;
}

export class DBActions implements IDBActions {
    private static instance: DBActions = new DBActions();
    public static getInstance(): DBActions{
        return this.instance;
    }

    async add(entity: any, data: Record<string, any>):  Promise<any> {
        return entity.create(data);
    }

    findAllByAssociate(entities: Record<string, any>): Promise<any>{
        return entities['child'].findAll({include: entities['parent']})
    }

    findOne(entity: any, query: Record<string, any>): Promise<any> {
        return entity.findOne({
            where: query
        });
    }

    async edit(entity: any, data: Record<string, any>): Promise<any>{
        return entity.update(data,
            {
                returning: true,
                where: {id: data.id},
                plain: true
            }
        );
    }

    findAll(entity: any, query: Record<string, any>): Promise<any> {
        return entity.findAll({
            where: query
        });
    }
}