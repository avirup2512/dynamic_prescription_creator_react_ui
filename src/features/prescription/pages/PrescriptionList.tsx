import ListingPage from '../../../components/shared/ListingPage'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import type { ListingAction } from '../../../components/shared/type/ListingType';
import { Edit, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux';
function PrescriptionList()
{
    const HeaderState = useSelector((state:any)=> state.header);
    const [savedHeadersData,setSavedHeaders] = useState<Array<any>>(HeaderState.allTemplates);
    const { type } = useParams();
    useEffect(()=>{
        const allSavedHeader = JSON.parse(localStorage.getItem("savedHeaderList")) || [];
        const allTemplates = JSON.parse(localStorage.getItem("savedTemplateList")) || [];        
        if(type == "saved_header")
            setSavedHeaders(allSavedHeader || HeaderState?.allSavedHeader);
        else
            setSavedHeaders(allTemplates);
    },[type]);

    const navigate = useNavigate()
    const onCreate = ()=>{
        navigate('../prescription/create/');
    }
    const onEdit = (item: any) => {
        
    }

    const onDelete = (item: any) => {
        // TODO: Implement delete functionality
        console.log('Delete:', item)
    }

    const actions: ListingAction<any>[] = [
        { label: 'Edit', icon: <Edit className="size-4" />, onClick: onEdit },
        { label: 'Delete', icon: <Trash2 className="size-4" />, onClick: onDelete },
    ]
    return (
        <ListingPage
            title="Prescription"
            onCreate = {onCreate}
            description="Create and manage reusable prescription headers."
            createLabel="New Prescription"
            searchPlaceholder="Search Prescription"
            columns={[
                { key: 'id', label: 'Id' },
                { key: 'templateId', label: 'Template Id' },
                { key: 'name', label: 'Name' }
            ]}
            data={[]}
            actions={actions}
        />
    )
}
export default PrescriptionList