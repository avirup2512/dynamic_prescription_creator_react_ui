import { useDispatch, useSelector } from 'react-redux'
import ListingPage from '../../../components/shared/ListingPage'
import { useNavigate } from 'react-router-dom'
import TemplateService from '../service/TemplateService';
import { useEffect } from 'react';
import { SetAllTemplateList } from "../store/TemplateSlice";
import type { ListingAction } from '@/components/shared/type/ListingType';
import { Edit, Trash2 } from 'lucide-react';
export default function TemplateList() {
    const TemplateState = useSelector((state: any) => state.template);
    const templateService = TemplateService;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onCreate = () => {
        navigate('create');
    }
    useEffect(() => {
        fetchTemplates();
    }, []);
    async function fetchTemplates() {
        try {
            const response = await templateService.getAllTemplates();
            if (response.success) {
                console.log("Fetched templates:", response.data);
                dispatch(SetAllTemplateList(response.data));
                // You can also update the state or local storage with the fetched templates here

            }
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    }
    const onEdit = (item: any) => {
        navigate(`../edit/${item.id}`, { state: { editData: item } })
    }
    const onDelete = (item: any) => {
        // navigate(`../edit/${item.id}`, { state: { editData: item } })
    }
    const actions: ListingAction<any>[] = [
        { label: 'Edit', icon: <Edit className="size-4" />, onClick: onEdit },
        { label: 'Delete', icon: <Trash2 className="size-4" />, onClick: onDelete },
    ]
    return (
        <ListingPage
            title="Full Prescription Templates"
            onCreate={onCreate}
            description="Create and manage complete prescription templates combining headers, bodies, and footers."
            createLabel="New template"
            searchPlaceholder="Search templates"
            columns={[
                { key: 'name', label: 'Name' },
                {
                    key: 'header', label: 'Header',
                    render: (item) => (
                        (item.is_header == 1 || item.is_header == true) &&
                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                            {item?.section_name}
                        </span>
                    ),
                },
                {
                    key: 'body', label: 'Body',
                    render: (item) => (
                        (item.is_body == 1 || item.is_body == true) &&
                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                            {item?.section_name}
                        </span>
                    ),
                },
                {
                    key: 'footer', label: 'Footer',
                    render: (item) => (
                        (item.is_footer == 1 || item.is_footer == true) &&
                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                            {item?.section_name}
                        </span>
                    ),
                },
                // {
                //     key: 'status',
                //     label: 'Status',
                //     render: (item) => (
                //         <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                //             {item.status}
                //         </span>
                //     ),
                // },
                {
                    key: 'updated_at', label: 'Updated',
                    render: (item) => {
                        const date = new Date(item?.created_at).toUTCString();
                        return (
                            <span>{date}</span>
                        )
                    }
                },
            ]}
            data={TemplateState.allTemplates}
            actions={actions}
        />
    )
}