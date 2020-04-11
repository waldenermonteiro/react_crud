import Base from '../../../services/base'
class UserService extends Base {
  constructor() {
    super('/users')
  }
}
export default new UserService()
