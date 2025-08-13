import FilterTable from '@/app/components/FilterTable'
import { notFound } from 'next/navigation'



async function getTaskById(id) {
  const res = await fetch(`https://gp-silk.vercel.app/api/taskList/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  const json = await res.json()
  return json.result
}

export default async function ItemPage({ params }) {
  const { id } = await params
  const item = await getTaskById(id)

  if (!item) return notFound()

  return <FilterTable item={item} />
}
