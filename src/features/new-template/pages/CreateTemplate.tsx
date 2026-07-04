import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BuilderCanvas from "../components/main/BuilderCanvas";
import { BuilderProvider } from "../context/BuilderContext";
import { useEffect } from "react";
import TemplateStructurePanel from "../components/templateStructure/TemplateStructurePanel";
import TemplateService from "../service/TemplateService";
import { Outlet, useParams, useNavigationType } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CurrentTemplate, SetCurrentTemplate } from "../store/TemplateSlice";
import { redefineTemplate } from "../utils/TemplateUtilsService";

export default function CreateTemplate() {
  const templateService = TemplateService;
  const TemplateState = useSelector((state: any) => state.template);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigationType = useNavigationType();

  useEffect(() => {
    if (TemplateState.callTemplateAPI) {
      if (id && isEditMode) {
        getTemplateInfoById(id);
      } else {
        dispatch(SetCurrentTemplate(CurrentTemplate))
      }
    }
  }, [id, isEditMode]);
  useEffect(() => {
    console.log(TemplateState);
  }, [TemplateState.CurrentTemplate.header])
  async function getTemplateInfoById(id: any) {
    try {
      const fetchedTemplateData = await templateService.getTemplateById(id);
      if (fetchedTemplateData && fetchedTemplateData.success) {
        const templateData = fetchedTemplateData.data;
        console.log(templateData)
        const template = redefineTemplate(templateData);
        dispatch(SetCurrentTemplate(template));
      }
    } catch (error) {

    }
  }
  return (
    <>
      <BuilderProvider>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-screen"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={15}
          >
            <TemplateStructurePanel header={TemplateState.CurrentTemplate.header}
              body={TemplateState.CurrentTemplate.body}
              footer={TemplateState.CurrentTemplate.footer} />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel
            defaultSize={55}
          >
            <BuilderCanvas header={TemplateState.CurrentTemplate.header}
              body={TemplateState.CurrentTemplate.body}
              footer={TemplateState.CurrentTemplate.footer} />
          </ResizablePanel>

          <ResizableHandle />

          <Outlet />
        </ResizablePanelGroup>
      </BuilderProvider>
    </>
  )
}
