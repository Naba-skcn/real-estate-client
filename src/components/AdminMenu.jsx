import { FaUserCog } from 'react-icons/fa'
import { TbHomeCog } from "react-icons/tb";
import { MdOutlineReviews } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={TbHomeCog} label='Manage Properties' address='/dashboard/manage-properties'></MenuItem>
      <MenuItem icon={RiAdvertisementFill} label='Advertise property' address='/dashboard/advertise-properties'></MenuItem>
      <MenuItem icon={FaUserCog} label='Manage Users' address='/dashboard/manage-users' />
      <MenuItem icon={MdOutlineReviews} label='Manage Reviews' address='/dashboard/manage-reviews' />

    </>
  )
}

export default AdminMenu
