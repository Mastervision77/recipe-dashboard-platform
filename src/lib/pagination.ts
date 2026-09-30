export const PER_PAGE = 10;

/** شكل الـ meta اللي بيرجع من الباك (Laravel paginate) */
export type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type ListResponse<T> = {
    data: T[];
    meta?: PaginationMeta;
};

/** بيقبل array مباشرة أو { data, meta } ويرجّعها دايمًا بنفس الشكل */
export function normalizeList<T>(raw: unknown): ListResponse<T> {
    if (Array.isArray(raw)) return { data: raw as T[] };

    const obj = (raw ?? {}) as Partial<ListResponse<T>>;
    return {
        data: Array.isArray(obj.data) ? obj.data : [],
        meta: obj.meta,
    };
}

/**
 * لو الباك بيعمل pagination (فيه meta) بنستخدمه زي ما هو،
 * لو لأ بنقسّم الداتا في الفرونت.
 */
export function getPageView<T>(
    res: ListResponse<T> | undefined,
    page: number,
    perPage = PER_PAGE,
) {
    const all = res?.data ?? [];

    if (res?.meta) {
        return {
            rows: all,
            pagesCount: Math.max(1, res.meta.last_page),
            total: res.meta.total,
        };
    }


    return {
        rows: all.slice((page - 1) * perPage, page * perPage),
        pagesCount: Math.max(1, Math.ceil(all.length / perPage)),
        total: all.length,
    };
}
