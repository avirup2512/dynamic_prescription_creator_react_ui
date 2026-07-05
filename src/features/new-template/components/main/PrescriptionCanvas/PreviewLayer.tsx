import type { CanvasSection } from "./prescriptionCanvasTypes";
import SectionRenderer from "./SectionRenderer";
import { useSelector } from "react-redux";

interface PreviewLayerProps {
    sections: CanvasSection[];
}

export default function PreviewLayer({ sections }: PreviewLayerProps) {
    const TemplateState = useSelector((state: any) => state.template);

    return (
        <div>
            {TemplateState?.CurrentTemplate?.header?.map((section: any) => (
                <SectionRenderer key={section.id} section={section} mode="preview" selection={{}} onSelect={() => undefined} />
            ))}
        </div>
    );
}
