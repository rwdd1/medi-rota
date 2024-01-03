'use client'

import { findSlot } from '../lib/actions';
import SlotTable from './SlotTable';
import FinderForm from './FinderForm';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SlotSearch() {  
  const [query, setQuery] = useState({site: "", specialty: "", ward: ""});
  const [results, setResults] = useState(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("site", query.site);
    params.set("specialty", query.specialty);
    params.set("ward", query.ward);
    replace(`${pathname}?${params.toString()}`);
    async function fetchRows() {
      const rows = await findSlot(query.site, query.specialty, query.ward);
      setResults(rows);
    }
    fetchRows()
  }, [query])
  
  return (
    <>
      <h1>Find available slots</h1>
      <FinderForm setQuery={setQuery} initialQuery={query} />
      {(!results) 
      ? 
      <p>No slots found matching your search criteria.</p> 
      :
      <SlotTable slots={results} setQuery={setQuery} query={query}/>}
    </>
  )
}