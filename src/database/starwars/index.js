import * as objects from './modelObject'
import * as users from './modelUser'

export const database = {objects, users}
export {connectDatabase} from './connect'