class SectionUtilsService{
    getWidthClass = (width: number) => {
    switch (width) {
      case 100:
        return "col-span-12"
      case 50:
        return "col-span-6"

      case 34 :
        return "col-span-4"
      case 25:
        return "col-span-3"
      default:
        return "col-span-12"
    }
    }
    calculateWidthAfterColumnDeletion = (currentColumnsLength: number) => {
        console.log(currentColumnsLength);
      if(currentColumnsLength == 1 || currentColumnsLength == 0)
      {
        return 100;
      }else if(currentColumnsLength == 2)
      {
        return 50;
      }else{
        return 34;
    }
    }
}

export default new SectionUtilsService()