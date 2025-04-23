import type { TooltipProps } from 'recharts';

export default function AnalyticsCustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card p-2 shadow-lg border border-border/40 text-sm">
                <p className="font-medium">{label}</p>
                <p className="text-primary font-medium">
                    {`${(payload[0].value as number).toLocaleString()} requests`}
                </p>
            </div>
        );
    }

    return null;
}

