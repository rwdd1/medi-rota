'use client'

import { ModifySlotButton} from "./Buttons"
import { usePathname } from "next/navigation";

export default function SlotTable({ slots, setQuery, query }) {
  
  return(
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">Date Range</th>
            <th scope="col">Slot Hours</th>
            <th scope="col">Staff</th>
            <th scope="col">Available</th>
          </tr>
        </thead>
        <tbody>
          {
            slots.map(slot => {
            return <tr key={slot.id}>
              <td>{slot.startdate.toLocaleDateString()} &ndash; {slot.enddate.toLocaleDateString()}</td>
              <td>{slot.slotstarttime.slice(0,5)} &ndash; {slot.slotendtime.slice(0,5)}</td>
              <td>{slot.remainingslots}</td>
              <td> 
                {slot.remainingslots > 0 
                && 
                <ModifySlotButton 
                type={(!slot.chosen) ? "choose" : "discard"} 
                id={slot.id} 
                pathname={usePathname()} 
                query={query} 
                setQuery={setQuery}
                />}
              </td>
            </tr>
            })
          }
        </tbody>
        </table>
    </>
  )
}