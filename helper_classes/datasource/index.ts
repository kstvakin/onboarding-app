export const add = async (entity: any, data: any) => {

    const user = await findOne(entity, {name: data.name});

    if (!user) {
        return entity.create(data);
    }
    return user;
}

export const edit = async (entity: any, data: any) => {
    return entity.update(data,
        {
            returning: true,
            where: {id: data.id},
            plain: true
        }
    );
}

export const findAll = (entity: any) => {
    return entity.findAll();
}

export const findOne = (entity: any, query: any) => {
    return entity.findOne({
        where: query
    });
}

export const findAllByAssociate = (entities: Record<string, any>) => {
    return entities['child'].findAll({include: entities['parent']})
}