import ListingPage from '../../../components/shared/ListingPage'
import { useNavigate, useParams } from 'react-router-dom'
import AppObject from '../../../demoData/AllData';
import { useEffect, useState } from 'react';
import type { ListingAction } from '../../../components/shared/type/ListingType';
import { Edit, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux';
import SectionService from '../service/SectionService';
export default function SectionList()
{
    const SectionState = useSelector((state: any) => state.section);
    const sectionService = SectionService;
    const [sectionList, setSectionList] = useState<Array<any>>(SectionState.allSectionTemplates);
    const { type } = useParams();
    useEffect(()=>{
        getAllSection();
    },[]);
    const getAllSection = async () => {
        try {
            const allSection = await sectionService.getAllSections();
            if (allSection && allSection.success)
            {
                setSectionList(allSection.data);
            }
        } catch (error) {
            
        }
    }
    const navigate = useNavigate()
    const onCreate = ()=>{
        navigate('../create')
    }
    const onEdit = (item: any) => {
        navigate(`../edit/${item.id}`, { state: { editData: item } })
    }

    const onDelete =async (item: any) => {
        // TODO: Implement delete functionality
        console.log('Delete:', item)
        const deletedSection = await sectionService.deleteSection(item.id);
    }

    const actions: ListingAction<any>[] = [
        { label: 'Edit', icon: <Edit className="size-4" />, onClick: onEdit },
        { label: 'Delete', icon: <Trash2 className="size-4" />, onClick: onDelete },
    ]
    return (
        <ListingPage
            title="Sections"
            onCreate = {onCreate}
            description="Create and manage reusable prescription sections."
            createLabel="New section"
            searchPlaceholder="Search sections"
            columns={[
                { key: 'id', label: 'Id' },
                { key: 'name', label: 'Name' },
                { key: 'createdAt', label: 'Created At' }
            ]}
            data={sectionList}
            actions={actions}
        />
    )
}
