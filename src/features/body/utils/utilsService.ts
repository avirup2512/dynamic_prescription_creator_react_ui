import HeaderUtilsService from '../../header/utils/utilsService'

class BodyUtilsService {
  getWidthClass = (width: number) => HeaderUtilsService.getWidthClass(width)
}

export default new BodyUtilsService()
