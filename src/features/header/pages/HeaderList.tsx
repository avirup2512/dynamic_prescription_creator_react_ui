import ListingPage from '../../../components/shared/ListingPage'
import { useNavigate, useParams } from 'react-router-dom'
import AppObject from '../../../demoData/AllData';
import { useEffect, useState } from 'react';
import type { ListingAction } from '../../../components/shared/type/ListingType';
import { Edit, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux';
export default function HeaderList()
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
        if (type === 'saved_header') {
            navigate('../saved_header/create')
        } else {
            navigate('../header_template/create')
        }
    }
    const onEdit = (item: any) => {
        if (type === 'saved_header') {
            navigate(`../saved_header/edit/${item.id}`, { state: { editData: item } })
        } else {
            navigate(`../header_template/edit/${item.id}`, { state: { editData: item } })
        }
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
            title="Headers"
            onCreate = {onCreate}
            description="Create and manage reusable prescription headers."
            createLabel="New header"
            searchPlaceholder="Search headers"
            columns={[
                { key: 'id', label: 'Id' },
                { key: 'templateId', label: 'Template Id' },
                { key: 'name', label: 'Name' }
            ]}
            data={savedHeadersData}
            actions={actions}
        />
    )
}
