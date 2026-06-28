import type { CanvasSection } from "./prescriptionCanvasTypes";
import SectionRenderer from "./SectionRenderer";

interface PreviewLayerProps {
    sections: CanvasSection[];
}

export default function PreviewLayer({ sections }: PreviewLayerProps) {
    return (
        <div>
            {sections.map((section) => (
                <SectionRenderer key={section.id} section={section} mode="preview" selection={{}} onSelect={() => undefined} />
            ))}
        </div>
    );
}
