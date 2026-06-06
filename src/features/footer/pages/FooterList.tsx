import ListingPage from '../../../components/shared/ListingPage'
import { useNavigate, useParams } from 'react-router-dom'

type FooterItem = {
  id: number
  name: string
  code: string
  status: string
  updatedAt: string
}

const footers: FooterItem[] = [
  {
    id: 1,
    name: 'Doctor Details',
    code: 'DOCTOR_DETAILS',
    status: 'Active',
    updatedAt: 'Today',
  },
  {
    id: 2,
    name: 'Footer Notes',
    code: 'FOOTER_NOTES',
    status: 'Draft',
    updatedAt: 'Yesterday',
  },
]

export default function FooterList()
{
    const navigate = useNavigate()
    const { type } = useParams()
    
    const onCreate = ()=>{
        if (type === 'saved_footer') {
            navigate('../saved_footer/create')
        } else {
            navigate('../footer_template/create')
        }
    }
    return (
        <ListingPage
            title="Footers"
            onCreate = {onCreate}
            description="Create and manage reusable prescription footers."
            createLabel="New footer"
            searchPlaceholder="Search footers"
            columns={[
                { key: 'name', label: 'Name' },
                { key: 'code', label: 'Code' },
                {
                    key: 'status',
                    label: 'Status',
                    render: (item) => (
                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                            {item.status}
                        </span>
                    ),
                },
                { key: 'updatedAt', label: 'Updated' },
            ]}
            data={footers}
        />
    )
}
