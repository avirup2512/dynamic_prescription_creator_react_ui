import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TemplateService from '@/features/template/service/TemplateService';
import PrescriptionSection from '../components/PrescriptionSection';
import type { Section } from '@/features/template/type/TemplateType';

interface CreatePrescriptionProps {
  initialTemplate?: any;
}

function CreatePrescription({ initialTemplate }: CreatePrescriptionProps) {
  console.log("initialTemplate", initialTemplate);
  const templateService = TemplateService;
  const [currentTemplateList, setCurrentTemplateList] = useState<any[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(initialTemplate ?? null);


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
  const hasData = () => {
    return initialTemplate?.header.length || initialTemplate?.body.length || initialTemplate?.footer.length;
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
    <div className="min-h-[80vh] bg-slate-100 p-6 flex justify-center">
      <div className="w-full max-w-[980px] bg-white px-10 py-10 shadow-sm">
        <div className="space-y-4 border-b border-slate-200 pb-6">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Prescription document</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Prescription</h1>
          {/* <p className="max-w-3xl text-sm leading-6 text-slate-600">
            A simple letter-style preview without section cards, using clean margins and minimal formatting.
          </p> */}
        </div>

        <div className="mt-8 space-y-6">
          {!initialTemplate && (
            <div className="rounded-3xl bg-slate-50 p-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-700">Prescription</p>
                <div className="grid gap-4">
                  <h2 className="text-2xl font-semibold text-slate-900">Select a saved template</h2>
                  <p className="text-sm leading-6 text-slate-600">
                    Choose a template from the list below before you continue with the prescription details.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <label className="text-sm font-medium text-slate-800">Template list *</label>
                <select
                  value={selectedTemplateId}
                  onChange={handleTemplateChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
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
          )}

          {initialTemplate ? (
            <div className="space-y-6">
              <div className="bg-white px-8 py-10 text-slate-900">
                <div className="space-y-8 text-slate-900">
                  {
                    initialTemplate?.header && initialTemplate.header.map((section: Section, index:number) =>
                      <PrescriptionSection key={index} section={section || []} />
                    )
                  }
                  {
                    initialTemplate?.body && initialTemplate.body.map((section: Section, index:number) =>
                      <PrescriptionSection key={index} section={section || []} />
                    )
                  }
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-8 text-sm text-slate-500">
              Select a template to render its document preview here.
            </div>
          )}
          {
            !hasData() && 
            <p className=' text-center text-sm leading-6 text-slate-600'>No Data</p>
          }
        </div>
      </div>
    </div>
  );
}

export default CreatePrescription