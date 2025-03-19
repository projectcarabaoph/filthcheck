import { FileText } from "lucide-react"

import type { TEmptyComponent } from "@/components/shared/_types"
import { cn } from "@/lib/utils"

export default function EmptyComponent({
    className,
    message = "No Apps Found.",
    subMessage = "Create an app to get started.",
    action,
    icon = <FileText className="w-12 h-12 text-gray-400" />,
}: TEmptyComponent) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-6 text-gray-500", className)}>
            {icon}
            <p className="text-lg mt-2">{message}</p>
            <p className="text-md mt-2">{subMessage}</p>
            {action && <div className="mt-2">{action}</div>}
        </div>
    )
}


