import ListingPage from '../../../components/shared/ListingPage'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { ListingAction } from '../../../components/shared/type/ListingType'
import { Edit, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function BodyList() {
    const BodyState = useSelector((state: any) => state.body)
    const [savedBodyData, setSavedBodies] = useState<Array<any>>(BodyState?.allTemplates)
    const { type } = useParams()

    useEffect(() => {
        const allSavedBody = JSON.parse(localStorage.getItem("savedBodyList") || "[]")
        const allTemplates = JSON.parse(localStorage.getItem("savedBodyTemplateList") || "[]")

        if (type === "saved_body") {
            setSavedBodies(allSavedBody || BodyState?.allSavedBody || [])
        } else {
            setSavedBodies(allTemplates || [])
        }
    }, [BodyState?.allSavedBody, type])

    const navigate = useNavigate()
    
    const onCreate = ()=>{
        if (type === 'saved_body') {
            navigate('../saved_body/create')
        } else {
            navigate('../body_template/create')
        }
    }

    const onEdit = (item: any) => {
        if (type === 'saved_body') {
            navigate(`../saved_body/edit/${item.id}`, { state: { editData: item } })
        } else {
            navigate(`../body_template/edit/${item.id}`, { state: { editData: item } })
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
            title="Bodies"
            onCreate = {onCreate}
            description="Create and manage reusable prescription body sections."
            createLabel="New body"
            searchPlaceholder="Search bodies"
            columns={[
                { key: 'id', label: 'Id' },
                { key: 'templateId', label: 'Template Id' },
                { key: 'name', label: 'Name' },
            ]}
            data={savedBodyData}
            actions={actions}
        />
    )
}

