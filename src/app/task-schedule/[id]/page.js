import TableData from '@/app/components/TableData'
import { notFound } from 'next/navigation'
import EachTaskData from '../page'
import PrintComp from '@/app/components/PrintComp'

// simulate DB/API call
async function getTaskById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''} https://gp-silk.vercel.app/api/taskList/${id}`, {
  cache: 'no-store',
})



    if (!res.ok) return null
  const json = await res.json()
  return json.result
}

export default async function ItemPage({ params }) {
  const { id } = await params
  const item = await getTaskById(id)

  if (!item) return notFound()

  return (
    <div className="flex flex-col h-[calc(100vh-115px)]  text-white p-4">
     

      {/* Scrollable Table Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-[#1e1e1e] rounded-xl shadow-md border border-[#1f1f1f] p-4">
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  {["No", "Task", "Assignment"].map((col, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {item.cleaningList.map((task, index) => (
                  <tr key={index} className="hover:bg-[#2b2b2b]">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{task.place}</td>
                    <td className="px-4 py-2">
                      {task.cleaner.map((person, idx) => (
                        <p key={idx}>{person}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
       {/* Fixed Header or Info Area */}
 <div className="w-full gap-1.5  p-4 flex justify-end">
<PrintComp data={item}/>

</div>

    </div>
  )
}
