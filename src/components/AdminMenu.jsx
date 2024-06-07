import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Properties' address='/dashboard/manage-properties'></MenuItem>
      <MenuItem icon={FaUserCog} label='Manage Users' address='/dashboard/manage-users' />
      <MenuItem icon={FaUserCog} label='Manage Reviews' address='/dashboard/manage-reviews' />

    </>
  )
}

export default AdminMenu
