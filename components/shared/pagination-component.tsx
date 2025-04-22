import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import ListComponent from "@/components/shared/list-component";
import type { IPaginationComponent } from "@/components/shared/_types";

import { cn } from "@/lib/utils";


export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
    className,
    showPageNumbers = true,
    maxVisiblePages = 5,
}: IPaginationComponent) {

    const getPageNumbers = () => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const halfVisible = Math.floor(maxVisiblePages / 2);
        let startPage = Math.max(currentPage - halfVisible, 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage === totalPages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
        );
    };

    const pageNumbers = showPageNumbers ? getPageNumbers() : [];

    const showDotsStart = currentPage > Math.ceil(maxVisiblePages / 2) + 1 && totalPages > maxVisiblePages;
    const showDotsEnd = currentPage < totalPages - Math.floor(maxVisiblePages / 2) && totalPages > maxVisiblePages;

    return (
        <div className={cn("flex items-center justify-center space-x-2", className)}>
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Go to previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {showPageNumbers && (
                <>

                    {showDotsStart && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange(1)}
                                aria-label="Go to first page"
                                className="hidden sm:inline-flex"
                            >
                                1
                            </Button>
                            <span className="hidden sm:inline-flex px-2 py-2 text-sm text-muted-foreground">...</span>
                        </>
                    )}

                    <ListComponent
                        data={pageNumbers}
                        className="flex flex-row space-x-1"
                        renderItem={(pageNumber) => (
                            <Button
                                key={pageNumber}
                                variant={currentPage === pageNumber ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(pageNumber)}
                                aria-label={`Page ${pageNumber}`}
                                aria-current={currentPage === pageNumber ? "page" : undefined}
                                className={cn("hidden sm:inline-flex", currentPage === pageNumber && "bg-custome-pink hover:bg-custome-pink/90")}
                            >
                                {pageNumber}
                            </Button>
                        )}
                    />

                    {showDotsEnd && (
                        <>
                            <span className="hidden sm:inline-flex px-2 py-2 text-sm text-muted-foreground">...</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange(totalPages)}
                                aria-label="Go to last page"
                                className="hidden sm:inline-flex"
                            >
                                {totalPages}
                            </Button>
                        </>
                    )}
                </>
            )}

            <div className="text-sm text-muted-foreground sm:hidden">
                Page {currentPage} of {totalPages}
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Go to next page"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}