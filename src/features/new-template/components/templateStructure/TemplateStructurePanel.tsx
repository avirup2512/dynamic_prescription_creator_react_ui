// ---------- Data ----------

import FolderSection from "./FolderSection";
import Footer from "./Footer";
import MetadataFooter from "./MetadataFooter";
import PanelHeader from "./PanelHeader";
import type { FolderGroup } from "../../type/TemplateStructure";
import { useEffect } from "react";

// ---------- Root component ----------
const TemplateStructurePanel: React.FC<{ header: FolderGroup, body: FolderGroup, footer: FolderGroup, lastSavedTime?: number | null }> = ({ header, body, footer, lastSavedTime }) => {
    useEffect(() => {
        console.log(header)
    }, [header])
    return (
        <div className="h-full min-h-0 w-full overflow-auto bg-slate-50 text-slate-800">
            <div className="h-full min-h-0 flex flex-col mx-auto w-full max-w-full bg-white px-3 py-3 shadow-sm md:max-w-[640px]">
                <PanelHeader />

                <div className="mt-2.5 space-y-0">
                    <FolderSection folder={header} sectionType="header" />
                    <FolderSection folder={body} sectionType="body" />
                    <FolderSection folder={footer} sectionType="footer" />
                    {/* <AddSectionButton /> */}
                </div>

                <MetadataFooter />
                <Footer lastSavedTime={lastSavedTime} />
            </div>
        </div>
    );
};

export default TemplateStructurePanel;
