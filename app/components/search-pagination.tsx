'use client'
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchPagination({
  page,
  total
}: {
  page: number,
  total: number
}) {
  const route = useRouter()
  const search = useSearchParams()
  const handleChange = (event: React.ChangeEvent<unknown>, p: number) => {
    console.log(p)
    const newSearch = new URLSearchParams(search.toString())
    newSearch.set('page', (p - 1).toString())
    route.push(`/search?${newSearch.toString()}`)
  }
  return (
    <Pagination page={page + 1} count={Math.ceil(total / 10)} shape="rounded" 
      onChange={handleChange} />
  )
}
