import axios from 'axios'
import UseAuth from '../routes/UseAuth'
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
  const { user, loading } = UseAuth()


  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios(`http://localhost:5000/user/${user?.email}`)
      return data.role
    },
  })

  //   Fetch user info using logged in user email

  return [role, isLoading]
}

export default useRole
