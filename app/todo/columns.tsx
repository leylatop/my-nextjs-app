"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
  id: string
  created_at: string
  task: string
  completed: boolean
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      // format date
      const date = new Date(row.original.created_at)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "task",
    header: "Task",
  },
  {
    accessorKey: "completed",
    header: "Completed",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const handleDelete = () => {
        fetch(`/api/todos/${row.original.id}`, {
          method: "DELETE",
        })
      }
      const handleEdit = () => {
        
      }
      return <div>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    },
  },
]
