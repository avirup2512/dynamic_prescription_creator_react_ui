import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BuilderCanvas from "../components/main/BuilderCanvas";
import { BuilderProvider } from "../context/BuilderContext";
import { useEffect, useState } from "react";
import TemplateStructurePanel from "../components/templateStructure/TemplateStructurePanel";
import TemplateService from "../service/TemplateService";
import { Outlet, useParams, useNavigationType } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CurrentTemplate, SetCurrentTemplate } from "../store/TemplateSlice";
import { redefineTemplate } from "../utils/TemplateUtilsService";
import { toast } from "sonner"
import { useLoader } from "@/hooks/useLoader";

export default function CreateTemplate() {
  const templateService = TemplateService;
  const TemplateState = useSelector((state: any) => state.template);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [template, setTemplate] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { showLoader, hideLoader } = useLoader();
  const [lastSavedTime, setLastSavedTime] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  useEffect(() => {
    if (id && isEditMode) {
      getTemplateInfoById(id);
    } else {
      dispatch(SetCurrentTemplate(CurrentTemplate))
    }
  }, [id, isEditMode]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log(TemplateState);
  }, [TemplateState.CurrentTemplate.header])

  // Auto-save on every change (debounced)
  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsSaving(true);
      await templateService.updateTemplate(id as string, { data: TemplateState.CurrentTemplate });
      setLastSavedTime(Date.now());
      toast("Template is saved.", {
        description: "",
      })
      setIsSaving(false);
    }, 10000); // Debounce 10 seconds
    return () => clearTimeout(timer);
  }, [TemplateState?.CurrentTemplate]);

  async function getTemplateInfoById(id: any) {
    try {
      showLoader({
        title: "Fetching Your Template",
        description: "Preparing your workspace..."
      });
      const fetchedTemplateData = await templateService.getTemplateById(id);
      if (fetchedTemplateData && fetchedTemplateData.success) {
        const templateData = fetchedTemplateData.data;
        console.log(templateData)
        const template = redefineTemplate(templateData);
        dispatch(SetCurrentTemplate(template));
      }
    } catch (error) {

    } finally {
      hideLoader()
    }
  }
  return (
    <>
      <BuilderProvider>
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          <ResizablePanelGroup
            orientation={isMobile ? "vertical" : "horizontal"}
            className="flex-1 min-h-0 overflow-hidden"
          >
            <ResizablePanel
              defaultSize={isMobile ? 32 : 20}
              minSize={isMobile ? 22 : 15}
              className="min-h-0 overflow-auto"
            >
              <TemplateStructurePanel
                header={TemplateState.CurrentTemplate.header}
                body={TemplateState.CurrentTemplate.body}
                footer={TemplateState.CurrentTemplate.footer}
                lastSavedTime={lastSavedTime}
              />
            </ResizablePanel>

            <ResizableHandle className={isMobile ? "h-2 w-full" : "w-2"} />

            <ResizablePanel
              defaultSize={isMobile ? 40 : 55}
              minSize={isMobile ? 24 : 20}
              className="min-h-0 overflow-auto"
            >
              <BuilderCanvas header={TemplateState.CurrentTemplate.header}
                body={TemplateState.CurrentTemplate.body}
                footer={TemplateState.CurrentTemplate.footer} />
            </ResizablePanel>

            <ResizableHandle className={isMobile ? "h-2 w-full" : "w-2"} />

            <Outlet />
          </ResizablePanelGroup>
        </div>
      </BuilderProvider>
    </>
  )
}
