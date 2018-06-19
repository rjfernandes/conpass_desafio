
import UserList from '../modules/User/UserList'
import UserAdd from '../modules/User/UserAdd'
import UserPicture from '../modules/User/UserPicture'

export default [
    {
        path: '/',
        component: UserList,
    },
    {
        path: '/user/add',
        component: UserAdd,
    },
    {
        path: '/user/picture',
        component: UserPicture,
    },
]