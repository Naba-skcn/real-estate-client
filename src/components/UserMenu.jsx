import MenuItem from "./MenuItem"
import { BsFillHouseAddFill } from 'react-icons/bs'
import { PiListHeartFill } from "react-icons/pi";
import { MdReviews } from "react-icons/md";
const UserMenu = () => {
  
  return (
    <>
 <MenuItem  label='Wishlist' address='/dashboard/wishlist' icon={PiListHeartFill}></MenuItem>
 <MenuItem label='Property Bought' address='/dashboard/bought' icon={BsFillHouseAddFill}></MenuItem>
 <MenuItem label='My Reviews' address='/dashboard/my-reviews' icon={MdReviews}></MenuItem>
      </>

      
  )
}

export default UserMenu

 
 
 
 