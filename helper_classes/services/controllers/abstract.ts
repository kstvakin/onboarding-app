export abstract class PostAbstractClass {
    abstract post(
        req: Request,
        entity: unknown,
        params: unknown
    ): unknown;
}

export abstract class GetAbstractClass {
    abstract get(req: Request): unknown;
}