'use client'


import { format } from 'date-fns'


import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import PaginationComponent from "@/components/shared/pagination-component";
import ListComponent from "@/components/shared/list-component";

import type { IAnalyticsRequestTable, IApiRequest } from "@/app/home/project/_types";

import usePagination from "@/hooks/use-pagination";

import { cn } from "@/lib/utils";
import { formatResponseTime } from '@/utils/misc/format-response-time';


export default function AnalyticsRequestTable({
    requests,
    pageSize = 10,
    caption = "A list of recent API requests."
}: IAnalyticsRequestTable) {

    const {
        currentPage,
        totalPages,
        setPage,
        paginatedItems,
    } = usePagination({
        totalItems: requests.length,
        pageSize,
    });

    const currentRequests = paginatedItems(requests);

    const getStatusBadgeClass = (status: number) => {
        if (status >= 200 && status < 300) {
            return "bg-green-100 text-green-800 border-green-200";
        }
        if (status >= 300 && status < 400) {
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        }
        if (status >= 400) {
            return "bg-red-100 text-red-800 border-red-200";
        }
        return "";
    };

    const getMethodBadgeClass = (method: IApiRequest["method"]) => {
        switch (method) {
            case "GET": return "bg-blue-100 text-blue-800 border-blue-200";
            case "POST": return "bg-green-100 text-green-800 border-green-200";
            case "PUT": return "bg-amber-100 text-amber-800 border-amber-200";
            case "DELETE": return "bg-red-100 text-red-800 border-red-200";
            case "PATCH": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "";
        }
    };
    return (
        <div className="space-y-4">
            <div className="rounded-md border shadow-sm">
                <div className="pl-4 py-3 flex flex-col gap-2">
                    <h2 className="font-semibold leading-none tracking-tight">Request Logs</h2>
                    <p className="text-sm text-muted-foreground">{caption}</p>
                </div>

                <div className="overflow-x-auto">
                    <Table className='border-collapse'>
                        <TableHeader className='hidden lg:table-header-group'>
                            <TableRow className="bg-muted/50">
                                <TableHead className="md:w-[100px]">Project Code</TableHead>
                                <TableHead>Path</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Response Time</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead className="text-right">Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>

                        <ListComponent
                            as="tbody"
                            data={currentRequests}
                            renderItem={(request) => (
                                <TableRow key={request.id} className="`block lg:table-row mb-4 lg:mb-0   p-3 lg:p-0 rounded-md  hover:bg-muted/30">
                                    <TableCell className="p-3 flex justify-between lg:table-cell" data-label="Project Code">
                                        <span className="lg:hidden font-bold">Project Code: </span>
                                        {request.project_code}
                                    </TableCell>
                                    <TableCell className="p-3 flex justify-between lg:table-cell" data-label="Path">
                                        <span className="lg:hidden font-bold">Path: </span>
                                        <span className='max-w-[200px] truncate font-mono text-xs'>
                                            {request.path}
                                        </span>
                                    </TableCell>
                                    <TableCell className="p-3 flex justify-between lg:table-cell" data-label="Method">
                                        <span className="lg:hidden font-bold">Method: </span>
                                        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", getMethodBadgeClass(request.method))}>
                                            {request.method}
                                        </span>
                                    </TableCell>
                                    <TableCell className="p-3 flex justify-between lg:table-cell" data-label="Status">
                                        <span className="lg:hidden font-bold">Status: </span>
                                        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", getStatusBadgeClass(request.status_code))}>
                                            {request.status_code}
                                        </span>
                                    </TableCell>
                                    <TableCell className="p-3 flex justify-between lg:table-cell" data-label="Response Time">
                                        <span className="lg:hidden font-bold">Response Time: </span>
                                        {formatResponseTime(request.response_time_ms)}
                                    </TableCell>
                                    <TableCell className="p-3 flex justify-between lg:table-cell text-muted-foreground text-sm" data-label="IP Address">
                                        <span className="lg:hidden font-bold">Response Time: </span>
                                        {request.ip_address}
                                    </TableCell>

                                    <TableCell className="p-3 flex justify-between lg:table-cell text-right text-muted-foreground text-sm" data-label="Timestamp">
                                        <span className="lg:hidden font-bold">Timestamp: </span>
                                        {format(new Date(request.created_at), 'MMM dd, yyyy hh:mm:ss aa')}
                                    </TableCell>
                                </TableRow>
                            )}
                            empty={
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        No API requests found.
                                    </TableCell>
                                </TableRow>
                            }
                        />
                    </Table>
                </div>
            </div>


            {requests.length > 0 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    className="mt-4"
                />
            )}
        </div>
    );
}