export interface IUsePagination {
    totalItems: number;
    initialPage?: number;
    pageSize?: number;
}

export interface IPaginationReturnValue {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    startIndex: number;
    endIndex: number;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    canNextPage: boolean;
    canPrevPage: boolean;
    paginatedItems: <T>(items: T[]) => T[];
}

export interface IScreenSize {
    width: number;
    height: number;
}