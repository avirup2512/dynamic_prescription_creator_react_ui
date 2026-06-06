class HeaderUtilsService{
    getWidthClass = (width: number) => {
    switch (width) {
      case 100:
        return "col-span-12"
      case 50:
        return "col-span-6"

      case 33.33:
        return "col-span-4"
      case 34:
        return "col-span-4"
      case 25:
        return "col-span-3"
      default:
        return "col-span-12"
    }
  }
}

export default new HeaderUtilsService()