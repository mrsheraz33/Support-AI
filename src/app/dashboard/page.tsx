import DashboardClient from '@/components/DashboardClient'
import { getSession } from '@/lib/getSession'

async function Dashboard() {
  const session  = await getSession()                 
  return (
<> 
<DashboardClient ownerId={session?.user?.id!}/>
</>
  )
}

export default Dashboard