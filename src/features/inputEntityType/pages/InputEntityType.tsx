import { Edit, Edit2, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import ListingPage from '../../../components/shared/ListingPage'
import InputEntityTypeArray from '../../../constant/inputEntityType'
import { type InputEntityType } from '../../../demoData/globalStore'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import InputEntityTypeService from '../services/InputEntityTypeService'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'
import QuantityService from '../services/quantityService'



function InputEntityTypePage() {
  const InputEnitytState = useSelector((state: any) => state.inputEntityType);
  const inputEntityTypeService = InputEntityTypeService;
  const quantityService = QuantityService;
  const { type } = useParams()
  const navigate = useNavigate()
  const entityType = type === "input" ? "INPUT_TYPE_1" : type === "dropdown" ? "INPUT_TYPE_2" : type === "textbox" ? "INPUT_TYPE_3" : "";
  const selectedType = InputEntityTypeArray.find(
    (inputType: { label: string; type: string }) => inputType.type === entityType,
  )
  const [inputList, setInputList] = useState<any[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<any>(null)

  useEffect(() => {
    if (type == "quantity")
    {
      getAllQuantity();
    }else
    getAllInputEntity()
  }, [type])

  const getAllInputEntity = async () => {
    const response = await inputEntityTypeService.getInputEntityTypes(entityType)
    if (response.success) {
      const allData = response.data
      setInputList(allData)
    }
  }
  const getAllQuantity = async () => {
    const response = await quantityService.getAllQuantity();
    console.log(response.data);
    if (response.success) {
      const allData = response.data
      setInputList(allData)
    }
  }

  const title = selectedType ? selectedType.label : 'Input'

  function onCreate() {
    navigate('create')
  }

  function onEdit(item: any) {
    navigate(`edit/${item.id}`)
  }

  function onDelete(item: any) {
    setPendingDelete(item)
    setConfirmOpen(true)
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return
    if (type === "quantity")
    {
      const response = await quantityService.deleteQuantity(pendingDelete.id?.toString());
      if (response.success) {
        setConfirmOpen(false)
        setPendingDelete(null)
        getAllInputEntity()
      }
    } else {
      const response = await inputEntityTypeService.deleteInputEntityType(
      pendingDelete.id?.toString(),
    )
    if (response.success) {
      setConfirmOpen(false)
      setPendingDelete(null)
      getAllInputEntity()
    }
    }
    
  }

  return (
    <>
      <ListingPage
        title={`${title} List`}
      description={`Create and manage ${title.toLowerCase()} input entities.`}
      createLabel="New Input"
      searchPlaceholder={`Search ${title.toLowerCase()}`}
      onCreate={onCreate}
      actions={[
        {
          label: 'Edit',
          icon: <Edit2 className="size-3" />, 
          onClick: onEdit,
        },
        {
          label: 'Delete',
          icon: <Trash2 className="size-3 text-red-600" />,
          onClick: onDelete,
        },
      ]}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'id', label: 'Id' },
        { key: 'value', label: 'Value' },
        { key: 'created_at', label: 'Created At' },
      ]}
      data={inputList}
    />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Delete ${title}`}
        description={`Are you sure you want to delete ${pendingDelete?.name ?? 'this item'}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        intent="destructive"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  )
}

export default InputEntityTypePage
