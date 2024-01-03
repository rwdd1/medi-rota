'use client'

import { deleteSlot, chooseSlot, discardSlot } from "../lib/actions";

export function DeleteSlotButton({ id }) {
  const deleteSlotId = deleteSlot.bind(null, id);

  return (
    <form action={deleteSlotId}>
      <button>Delete</button>
    </form>
  )
}

export function DiscardSlotButton({ id, pathname }) {
  const discardSlotId = discardSlot.bind(null, id, pathname);

  return (
    <form action={discardSlotId}>
      <button>Discard</button>
    </form>
  )
}

export function ModifySlotButton({ type, id, pathname, query, setQuery }) {
  const action = (type === "choose") ? chooseSlot.bind(null, id) : discardSlot.bind(null, id, pathname);
  async function handleSlotChoice() {
    setQuery({})
    setTimeout(() => setQuery({...query}), 500);
  }
  return (
    <form action={action}>
      <button onClick={handleSlotChoice}>{(type === "choose") ? "Choose" : "Discard"}</button>
    </form>
  )
}