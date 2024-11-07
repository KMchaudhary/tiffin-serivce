"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Mock data for demonstration
const orders = [
  { id: 1, name: "John Doe", mobile: "123-456-7890", address: "123 Main St", status: "Pending", assignedTo: "Agent 1" },
  { id: 2, name: "Jane Smith", mobile: "098-765-4321", address: "456 Elm St", status: "Completed", assignedTo: "Agent 2" },
  { id: 3, name: "Bob Johnson", mobile: "555-555-5555", address: "789 Oak St", status: "In Progress", assignedTo: "Agent 3" },
]

export default function OrderDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [assigneeName, setAssigneeName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter states
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [shift, setShift] = useState('')
  const [status, setStatus] = useState('')
  const [isGroupedByAddress, setIsGroupedByAddress] = useState(false)

  // Initialize filter states from URL parameters on component mount
  useEffect(() => {
    const dateParam = searchParams.get('date')
    const shiftParam = searchParams.get('shift')
    const statusParam = searchParams.get('status')
    const groupByAddressParam = searchParams.get('groupByAddress')

    if (dateParam) setDate(new Date(dateParam))
    if (shiftParam) setShift(shiftParam)
    if (statusParam) setStatus(statusParam)
    setIsGroupedByAddress(groupByAddressParam === 'true')
  }, [searchParams])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(orders.length / itemsPerPage)

  const handleRowSelection = (orderId: number) => {
    setSelectedRows(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleSelectAllRows = (checked: boolean) => {
    if (checked) {
      setSelectedRows(currentItems.map(order => order.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleAssignDeliveryBox = () => {
    console.log(`Assigning delivery box to ${assigneeName} for orders:`, selectedRows)
    setIsModalOpen(false)
    setAssigneeName("")
    setSelectedRows([])
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (date) params.set('date', date.toISOString())
    if (shift) params.set('shift', shift)
    if (status) params.set('status', status)
    params.set('groupByAddress', isGroupedByAddress.toString())
    
    router.push(`?${params.toString()}`)
    console.log("Filters applied and URL updated")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      
      <div className="bg-white p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
        <div className="flex flex-wrap gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={shift} onValueChange={setShift}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch
              id="group-by-address"
              checked={isGroupedByAddress}
              onCheckedChange={setIsGroupedByAddress}
            />
            <label
              htmlFor="group-by-address"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Group by address
            </label>
          </div>
          <Button onClick={applyFilters}>Apply filter</Button>
        </div>
      </div>

      <div className="mb-4">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button disabled={selectedRows.length === 0}>
              Assign delivery box
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Delivery Box</DialogTitle>
              <DialogDescription>
                Enter the name of the assignee for the selected orders.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee-name" className="text-right">
                  Assignee Name
                </Label>
                <Input
                  id="assignee-name"
                  value={assigneeName}
                  onChange={(e) => setAssigneeName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAssignDeliveryBox}>Assign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="w-[50px]">
                <Checkbox 
                    checked={currentItems.length > 0 && selectedRows.length === currentItems.length}
                    onCheckedChange={handleSelectAllRows}
                />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned to</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {currentItems.map((order) => (
                <TableRow key={order.id}>
                <TableCell>
                    <Checkbox
                    checked={selectedRows.includes(order.id)}
                    onCheckedChange={() => handleRowSelection(order.id)}
                    />
                </TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.mobile}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.assignedTo}</TableCell>
                <TableCell className="text-right">
                    <Button variant="outline" size="sm">Update</Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4">
            <div>
            {selectedRows.length} of {orders.length} row(s) selected.
            </div>
            <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(parseInt(value))}>
                <SelectTrigger className="w-[70px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div>
                Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-1">
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                <span className="sr-only">First page</span>
                <ChevronFirstIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                <span className="sr-only">Previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                <span className="sr-only">Next page</span>
                <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                <span className="sr-only">Last page</span>
                <ChevronLastIcon className="h-4 w-4" />
                </Button>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}