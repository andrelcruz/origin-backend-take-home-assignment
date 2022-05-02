import { util } from 'config'

export class EnvironmentHelper {
  static getConfigAsObject = () => {
    return util.toObject()
  }
}
