import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TemplateService from '@/features/template/service/TemplateService';
import PrescriptionHeader from '../components/PrescriptionHeader';
function CreatePrescription() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const templateService = TemplateService;
  const [currentTemplateList, setCurrentTemplateList] = useState<any[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  useEffect(() => {
    getAllTemplateList()
  }, []);
  const getAllTemplateList = async ()=> {
      try {
        const fetchedALlTemplate = await templateService.getAllTemplates();
        if (fetchedALlTemplate && fetchedALlTemplate.success)
        {
          setCurrentTemplateList(fetchedALlTemplate.data);
        }
      } catch (error) {
        
      }
  }
  const handleTemplateChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextTemplateId = event.target.value;
    try {
      setSelectedTemplateId(nextTemplateId);
      const fetchedTemplateData:any = await templateService.getTemplateById(nextTemplateId);
      console.log(fetchedTemplateData)
      if (fetchedTemplateData && fetchedTemplateData.success)
      {
        const templateData = fetchedTemplateData.data;
        setSelectedTemplate(templateData);
      }
    } catch (error) {
      console.error('Error fetching template data:', error);
    }
  };
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">Create prescription</p>
            <h1 className="text-2xl font-semibold">Select a saved template first</h1>
            <p className="text-sm text-muted-foreground">
              Choose a template from the list below before you continue with the prescription details.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <label className="text-sm font-medium">Template list *</label>
            <select
              value={selectedTemplateId}
              onChange={handleTemplateChange}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
            >
              <option value="">Choose a template</option>
              {currentTemplateList.map((template: any) => {
                const displayName =
                  template?.name ||
                  template?.header?.name ||
                  template?.body?.name ||
                  `Template ${template.id}`;

                return (
                  <option key={template.id} value={String(template.id)}>
                    {displayName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {selectedTemplate ? (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-primary">Template preview</p>
                <h2 className="text-lg font-semibold">
                  {/* {selectedTemplate.header?.name || selectedTemplate.body?.name || selectedTemplate.name} */}
                </h2>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {selectedTemplateId}
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-background">
              <div className="border-b border-border bg-muted/30 px-4 py-3 text-sm font-medium">
                Rendered document preview
              </div>
              <div className="p-4">
                <div
                  className="prose prose-sm max-w-none"
                  // dangerouslySetInnerHTML={{ __html: previewHtmlHeader }}
                  >
                  <PrescriptionHeader headerData={selectedTemplate?.header || {}} />
                </div>
              </div>
              <div className="p-4">
                <div
                  className="prose prose-sm max-w-none"
                >
                  <PrescriptionHeader headerData={selectedTemplate?.header || {}} />
                  </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
            Select a template to render its document preview here.
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePrescription