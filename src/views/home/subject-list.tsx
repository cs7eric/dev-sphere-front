import { columns } from "@/components/tasks/components/columns"
import { DataTable } from "@/components/tasks/components/data-table"


// Simulate a database read for tasks.
function getTasks() {
  const data =  [
    {
      id: "TASK-1234",
      title: "Implement user login UI",
      status: "in progress",
      label: "feature",
      priority: "high"
    },
    {
      id: "TASK-5678",
      title: "Fix API response validation",
      status: "done",
      label: "bug",
      priority: "medium"
    },
    {
      id: "TASK-90122",
      title: "Optimize database queries",
      status: "todo",
      label: "documentation",
      priority: "low"
    },
    {
      id: "TASK-901422",
      title: "Optimize database queries",
      status: "todo",
      label: "documentation",
      priority: "low"
    },
    {
      id: "TASK-901222",
      title: "Optimize database queries",
      status: "todo",
      label: "documentation",
      priority: "low"
    },
    {
      id: "TASK-90122",
      title: "Optimize database queries",
      status: "todo",
      label: "documentation",
      priority: "low"
    },
    {
      id: "TASK-901d422",
      title: "Optimize database queries",
      status: "todo",
      label: "documentation",
      priority: "low"
    }
  ]

  return data
}

export default function ListPage() {
  const tasks =  getTasks()

  return (
    <>
      <div className="md:hidden">

      </div>
      <div className="hidden  flex-1 flex-col space-y-8 p-8 md:flex">

        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
