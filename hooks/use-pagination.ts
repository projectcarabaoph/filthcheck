import { useState } from "react";
import type { IPaginationReturnValue, IUsePagination } from "@/hooks/_types";

const usePagination = ({
    totalItems,
    initialPage = 1,
    pageSize = 10,
}: IUsePagination): IPaginationReturnValue => {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    const totalPages = Math.ceil(totalItems / pageSize);

    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

    const startIndex = (validCurrentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const setPage = (page: number) => {
        const newPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(newPage);
    };

    const nextPage = () => {
        if (validCurrentPage < totalPages) {
            setCurrentPage(validCurrentPage + 1);
        }
    };

    const prevPage = () => {
        if (validCurrentPage > 1) {
            setCurrentPage(validCurrentPage - 1);
        }
    };

    const paginatedItems = <T>(items: T[]): T[] => {
        return items.slice(startIndex, endIndex + 1);
    };

    return {
        currentPage: validCurrentPage,
        totalPages,
        pageSize,
        startIndex,
        endIndex,
        setPage,
        nextPage,
        prevPage,
        canNextPage: validCurrentPage < totalPages,
        canPrevPage: validCurrentPage > 1,
        paginatedItems,
    };
}

export default usePagination