import { useEffect, useState } from "react";

const Footer: React.FC<{ lastSavedTime?: number | null }> = ({ lastSavedTime }) => {
    const [elapsedTime, setElapsedTime] = useState<string>("just now");

    useEffect(() => {
        if (!lastSavedTime) {
            setElapsedTime("just now");
            return;
        }

        const calculateElapsedTime = () => {
            const now = Date.now();
            const diffMs = now - lastSavedTime;
            const diffSecs = Math.floor(diffMs / 1000);
            const diffMins = Math.floor(diffSecs / 60);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffSecs < 60) {
                return { text: `${diffSecs}s ago`, nextUpdate: (60 - diffSecs) * 1000 };
            } else if (diffMins < 60) {
                return { text: `${diffMins}m ago`, nextUpdate: (60 - (diffSecs % 60)) * 1000 };
            } else if (diffHours < 24) {
                return { text: `${diffHours}h ago`, nextUpdate: (60 - (diffMins % 60)) * 60 * 1000 };
            } else {
                return { text: `${diffDays}d ago`, nextUpdate: (24 - (diffHours % 24)) * 60 * 60 * 1000 };
            }
        };

        const { text, nextUpdate } = calculateElapsedTime();
        setElapsedTime(text);

        const timeout = setTimeout(() => {
            const { text: newText } = calculateElapsedTime();
            setElapsedTime(newText);
        }, nextUpdate);

        return () => clearTimeout(timeout);
    }, [lastSavedTime]);

    return (
        <div className="mt-2.5 flex items-center justify-between border-t border-slate-200 px-0 pb-0 pt-2">
            <span className="text-[10px] text-slate-500 font-medium">Auto-saved {elapsedTime}</span>
            <div className="flex items-center gap-1.5">
                {/* <img
                    src="https://i.pravatar.cc/64?img=12"
                    alt="Dr. Khan avatar"
                    className="h-5 w-5 rounded-full object-cover"
                /> */}
                {/* <span className="text-[11px] font-medium text-slate-700">Dr. Khan</span> */}
            </div>
        </div>
    );
};
export default Footer;
