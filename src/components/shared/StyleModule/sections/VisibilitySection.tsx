import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import Section from "../reUsableComponents/Section";
import { Eye } from "lucide-react";

const VisibilitySection = function () {
    const [on, setOn] = useState(true);

    const InlineSwitch = (
        <Switch.Root
            checked={on}
            onCheckedChange={setOn}
            className="relative inline-flex h-[18px] w-8 items-center rounded-full outline-none transition-colors bg-slate-300 data-[state=checked]:bg-blue-600"
        >
            <Switch.Thumb className="block h-[13px] w-[13px] rounded-full bg-white shadow-sm transition-transform translate-x-[2px] data-[state=checked]:translate-x-[15px]" />
        </Switch.Root>
    );

    return (
        <Section
            value="visibility"
            icon={<Eye size={12} />}
            title="Visibility"
            inline={InlineSwitch}
        />
    );
}
export default VisibilitySection;