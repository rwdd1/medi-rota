'use server'

import Manage from '../components/Manage';
import { auth } from '@/auth';


export default async function Dashboard() {
const cred = await auth();
  return (
      <Manage 
        admin={cred.user.admin} 
        id={cred.user.id} 
        username={cred.user.username}
      /> 
  )
}
