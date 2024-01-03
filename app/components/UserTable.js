'use client'

import { DiscardSlotButton } from "./Buttons"
import { usePathname } from "next/navigation"

export default function UserTable({ slots }) {
  return(
    <>
      {(!slots) 
      ? 
      <p>You have not chosen any slots.</p>
      :
      <table>
        <thead>
          <tr>
            <th scope="col">Site</th>
            <th scope="col">Specialty</th>
            <th scope="col">Ward</th>
            <th scope="col">Period</th>
            <th scope="col">Hours</th>
            <th scope="col">Modify</th>
          </tr>
        </thead>
        <tbody>
          {
            slots.map(slot => {
            return <tr key={slot.id}>
              <td>{slot.site}</td>
              <td>{slot.specialty}</td>
              <td>{slot.ward}</td>
              <td>{slot.startdate.toLocaleDateString()} &ndash; {slot.enddate.toLocaleDateString()}</td>
              <td>{slot.slotstarttime.slice(0,5)} &ndash; {slot.slotendtime.slice(0,5)}</td>
              <td> 
                <DiscardSlotButton id={slot.id} pathname={usePathname()}/>
              </td>
            </tr>
            })
          }
        </tbody>
        </table>
      }
    </>
  )
}