import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import UseAuth from './routes/UseAuth';
import UpdateUserModal from './UpdateUserModal';
import UpdateUserModalAgent from './UpdateUserModalAgent';

const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = UseAuth();

  const [isOpenAdminModal, setIsOpenAdminModal] = useState(false);
  const [isOpenAgentModal, setIsOpenAgentModal] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async role => {
      const { data } = await axios.patch(
        `https://real-estate-server-a12.vercel.app/users/update/${user?.email}`,
        role
      );
      return data;
    },
    onSuccess: data => {
      refetch();
      toast.success('User role updated successfully!');
      setIsOpenAdminModal(false);
      setIsOpenAgentModal(false);
    },
  });

  const modalHandler = async selected => {
    if (loggedInUser.email === user.email) {
      toast.error('Action Not Allowed');
      return setIsOpenAdminModal(false);
    }

    const userRole = {
      role: selected,
      status: 'Verified',
    };

    try {
      await mutateAsync(userRole);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`https://real-estate-server-a12.vercel.app/user/${user.email}`);
      toast.success('User deleted successfully!');
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    }
  };

  const markAsFraud = async () => {
    try {
      await axios.patch(`https://real-estate-server-a12.vercel.app/users/update/${user.email}`, {
        role: 'Fraud',
      });
      refetch()
      toast.success('User marked as fraud successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to mark user as fraud');
    }
  };

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'} whitespace-no-wrap`}>
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user.role === 'Agent' && user.status !== 'Fraud' && (
          <>
            <button onClick={() => setIsOpenAdminModal(true)} className='button-green  bg-black text white p-2 border-2 border-white rounded-lg text-white'>
              Admin
            </button>
            <UpdateUserModal
              isOpen={isOpenAdminModal}
              setIsOpen={setIsOpenAdminModal}
              modalHandler={modalHandler}
              user={user}
            />
            <button onClick={() => setIsOpenAgentModal(true)} className='button-green  bg-blue-400 text white p-2 border-2 border-white rounded-lg text-white'>
              Agent
            </button>
            <UpdateUserModalAgent
              isOpen={isOpenAgentModal}
              setIsOpen={setIsOpenAgentModal}
              modalHandler={modalHandler}
              user={user}
            />
            <button onClick={markAsFraud} className='button-red  bg-green-400 px-3 text white p-2 border-2 border-white rounded-lg text-white'>
              Mark as Fraud
            </button>
          </>
        )}
        {user.status === 'Fraud' && (
          <p className='text-red-500 whitespace-no-wrap'>Fraud</p>
        )}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user.role === 'User' && user.status !== 'Fraud' && (
         <>
         <button onClick={() => setIsOpenAdminModal(true)} className='button-green bg-black text white p-2 border-2 border-white rounded-lg text-white'>
           Admin
         </button>
         <UpdateUserModal
           isOpen={isOpenAdminModal}
           setIsOpen={setIsOpenAdminModal}
           modalHandler={modalHandler}
           user={user}
         />
         <button onClick={() => setIsOpenAgentModal(true)} className='button-green  bg-blue-400 text white p-2 border-2 border-white rounded-lg text-white'>
           Agent
         </button>
         <UpdateUserModalAgent
           isOpen={isOpenAgentModal}
           setIsOpen={setIsOpenAgentModal}
           modalHandler={modalHandler}
           user={user}
         />
       </>
        )}
        {user.status === 'Fraud' && (
          <p className='text-red-500 whitespace-no-wrap'>Fraud</p>
        )}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={deleteUser} className='button-red  bg-red-800 text white p-2 border-2 border-white rounded-lg text-white'>
          Delete
        </button>
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
