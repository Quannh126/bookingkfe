import AdminLayout from '@/components/layout/admin'
// import { useRouter } from 'next/router'
import { NextpageWithLayout } from '../models'

const Admin: NextpageWithLayout = () =>{
  // const router = useRouter()
  // function goToListDetail(){
  //     router.push({
  //          pathname:'/search'
  //     })
  // }
  return (
      <div>
        Homepage
      </div>
  )
}

Admin.Layout = AdminLayout

export default Admin