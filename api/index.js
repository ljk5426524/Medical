import user from './user'
import patient from './patient'
import search from './search'
import doctor from './doctor'

export default {
    ...user,
    ...patient,
    ...search,
    ...doctor
}