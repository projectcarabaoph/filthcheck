export type TListComponent<T> = {
    as?: React.ElementType;
    className?: string;
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
};

export type TEmptyComponent = {
    className?: string
    message?: string
    subMessage?: string
    action?: React.ReactNode
    icon?: React.ReactNode
}

export interface IPaginationComponent {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    showPageNumbers?: boolean;
    maxVisiblePages?: number;
}