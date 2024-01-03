import { getHours, getSlots } from "../lib/utils";
import CreateForm from "./CreateForm";
import AdminTable from "./AdminTable";
import UserTable from "./UserTable";

export default async function Manage({ admin, id, username }) {
  const myHours = await getHours(id);
  const mySlots = (admin) ? await getSlots(id) : null; 

    return (
    <>
      <h1>Dashboard</h1>
      <p>Hi {username}, welcome to your dashboard.</p>
      
      <section>
          <h2>My Hours</h2>
          <UserTable slots={myHours}/>
      </section>
      
      {
      (admin) 
      &&
      <>
        <section>
            <h2>My Slots</h2>
            <AdminTable slots={mySlots}/>
        </section>
        
        <section>
          <h2>Create Slot</h2>
          <CreateForm />
        </section>
      </>
      }
    </>
  )
}
