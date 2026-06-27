import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BuilderCanvas from "../components/main/BuilderCanvas";
import PropertiesPanel from "../components/PropertiesPanel";
import EditorSheet from "../components/editor/EditorSheet";
import { BuilderProvider } from "../context/BuilderContext";
import { useEffect, useState } from "react";
import TemplateStructurePanel from "../components/templateStructure/TemplateStructurePanel";
import TemplateService from "../service/TemplateService";
import { useParams } from "react-router-dom";
import type { FolderGroup } from "../type/TemplateStructure";
import { useDispatch, useSelector } from "react-redux";
import { CurrentTemplate, SetCurrentTemplate } from "../store/TemplateSlice";

export type InspectorType =
  | "section"
  | "row"
  | "column"
  | "alternative"
  | "field";

export default function CreateTemplate() {
  const templateService = TemplateService;
  const TemplateState = useSelector((state: any) => state.template);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const headerGroup: FolderGroup = {
    kind: "folder",
    id: "header",
    label: "Header",
    count: 0,
    children: []
  };
  const bodyGroup: FolderGroup = {
    kind: "folder",
    id: "body",
    label: "Body",
    count: 0,
    children: []
  };
  const footerGroup: FolderGroup = {
    kind: "folder",
    id: "footer",
    label: "Footer",
    count: 0,
    children: []
  };
  useEffect(() => {
    if (id && isEditMode) {
      getTemplateInfoById(id);
    } else {
      dispatch(SetCurrentTemplate(CurrentTemplate))
    }
  }, [id, isEditMode]);
  useEffect(() => {
    console.log(TemplateState);
  }, [TemplateState])
  async function getTemplateInfoById(id: any) {
    try {
      const fetchedTemplateData = await templateService.getTemplateById(id);
      if (fetchedTemplateData && fetchedTemplateData.success) {
        const templateData = fetchedTemplateData.data;
        for (let x = 0; x < templateData?.header?.length; x++) {
          const sectionChild = templateData?.header[x];
          sectionChild.kind = "section"
          sectionChild.label = templateData?.header[x].name
          templateData?.header[x].rows.forEach((row: any) => {
            row.kind = "row"
            row.label = row.row_name;
            row.columns.forEach((col: any) => {
              col.kind = "column"
              col.label = col.column_name
            })
          });
          sectionChild.children = templateData?.header[x].rows
          headerGroup.children.push(sectionChild);
        }
        for (let x = 0; x < templateData?.body?.length; x++) {
          const sectionChild = templateData?.body[x];
          sectionChild.kind = "section"
          sectionChild.label = templateData?.body[x].name
          templateData?.body[x].rows.forEach((row: any) => {
            row.kind = "row"
            row.label = row.row_name;
            row.columns.forEach((col: any) => {
              col.kind = "column"
              col.label = col.column_name
            })
          });
          sectionChild.children = templateData?.body[x].rows
          bodyGroup.children.push(sectionChild);
        }
        dispatch(SetCurrentTemplate({ header: headerGroup, body: bodyGroup, footer: footerGroup }));
      }
    } catch (error) {

    }
  }
  const [, setInspectorOpen] = useState(false);

  const [inspectorType, setInspectorType] =
    useState<InspectorType>();

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const openInspector = (
    type: InspectorType,
    data: any
  ) => {
    setInspectorType(type);
    setSelectedItem(data);
    setInspectorOpen(true);
  };
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

          <EditorSheet />
        </ResizablePanelGroup>
      </BuilderProvider>
    </>
  )
}
