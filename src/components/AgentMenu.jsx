import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'

const AgentMenu = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label='Add Property' address='/dashboard/add-property' />
      <MenuItem icon={MdHomeWork} label='My added properties' address='/dashboard/my-properties' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Sold Properties'
        address='/dashboard/sold-properties'
      />
      <MenuItem icon={MdOutlineManageHistory} label='Requested Properties' address='/dashboard/requested-properties'></MenuItem>
    </>
  )
}

export default AgentMenu
