'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { X, Trash2, Upload } from "lucide-react"

// Types for our state management
type MenuItem = {
  id: string
  text: string
}

type Variant = {
  id: string
  image: string | null
  dishName: string
  price: string
  menuItems: MenuItem[]
}

type Shift = {
  id: string
  type: 'lunch' | 'dinner'
  variants: Variant[]
}

type DayMenu = {
  id: string
  date: string
  shifts: Shift[]
}

export default function Component() {
  // State for managing dates and their menus
  const [days, setDays] = useState<DayMenu[]>([
    {
      id: 'today',
      date: new Date().toISOString().split('T')[0],
      shifts: []
    }
  ])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedShift, setSelectedShift] = useState<'lunch' | 'dinner' | ''>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Helper function to create a new variant
  const createNewVariant = (): Variant => ({
    id: Math.random().toString(36).substr(2, 9),
    image: null,
    dishName: '',
    price: '',
    menuItems: [{ id: Math.random().toString(36).substr(2, 9), text: '' }]
  })

  // Helper function to create a new shift
  const createNewShift = (type: 'lunch' | 'dinner'): Shift => ({
    id: Math.random().toString(36).substr(2, 9),
    type,
    variants: [createNewVariant()]
  })

  // Add a new date
  const handleAddDate = () => {
    if (!selectedDate || days.some(day => day.date === selectedDate)) {
      return // Prevent adding duplicate dates
    }

    const newDay: DayMenu = {
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      shifts: []
    }

    setDays([...days, newDay])
    setSelectedDate('')
  }

  // Remove a specific day's menu
  const handleRemoveDay = (dayId: string) => {
    setDays(days.filter(day => day.id !== dayId))
  }

  // Add a new shift to a date
  const handleAddShift = (dayId: string) => {
    if (!selectedShift) return

    setDays(days.map(day => {
      if (day.id === dayId) {
        if (day.shifts.some(shift => shift.type === selectedShift)) {
          return day // Prevent adding duplicate shifts
        }
        return {
          ...day,
          shifts: [...day.shifts, createNewShift(selectedShift)]
        }
      }
      return day
    }))
    setSelectedShift('')
  }

  // Add a new variant to a shift
  const handleAddVariant = (dayId: string, shiftId: string) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          shifts: day.shifts.map(shift => {
            if (shift.id === shiftId) {
              return {
                ...shift,
                variants: [...shift.variants, createNewVariant()]
              }
            }
            return shift
          })
        }
      }
      return day
    }))
  }

  // Add a new menu item to a variant
  const handleAddMenuItem = (dayId: string, shiftId: string, variantId: string) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          shifts: day.shifts.map(shift => {
            if (shift.id === shiftId) {
              return {
                ...shift,
                variants: shift.variants.map(variant => {
                  if (variant.id === variantId) {
                    return {
                      ...variant,
                      menuItems: [
                        ...variant.menuItems,
                        { id: Math.random().toString(36).substr(2, 9), text: '' }
                      ]
                    }
                  }
                  return variant
                })
              }
            }
            return shift
          })
        }
      }
      return day
    }))
  }

  // Remove a menu item from a variant
  const handleRemoveMenuItem = (dayId: string, shiftId: string, variantId: string, menuItemId: string) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          shifts: day.shifts.map(shift => {
            if (shift.id === shiftId) {
              return {
                ...shift,
                variants: shift.variants.map(variant => {
                  if (variant.id === variantId) {
                    return {
                      ...variant,
                      menuItems: variant.menuItems.filter(item => item.id !== menuItemId)
                    }
                  }
                  return variant
                })
              }
            }
            return shift
          })
        }
      }
      return day
    }))
  }

  // Update variant field values
  const handleVariantChange = (
    dayId: string,
    shiftId: string,
    variantId: string,
    field: keyof Variant,
    value: string
  ) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          shifts: day.shifts.map(shift => {
            if (shift.id === shiftId) {
              return {
                ...shift,
                variants: shift.variants.map(variant => {
                  if (variant.id === variantId) {
                    return {
                      ...variant,
                      [field]: value
                    }
                  }
                  return variant
                })
              }
            }
            return shift
          })
        }
      }
      return day
    }))
  }

  // Update menu item text
  const handleMenuItemChange = (
    dayId: string,
    shiftId: string,
    variantId: string,
    menuItemId: string,
    value: string
  ) => {
    setDays(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          shifts: day.shifts.map(shift => {
            if (shift.id === shiftId) {
              return {
                ...shift,
                variants: shift.variants.map(variant => {
                  if (variant.id === variantId) {
                    return {
                      ...variant,
                      menuItems: variant.menuItems.map(item => {
                        if (item.id === menuItemId) {
                          return { ...item, text: value }
                        }
                        return item
                      })
                    }
                  }
                  return variant
                })
              }
            }
            return shift
          })
        }
      }
      return day
    }))
  }

  // Handle image upload
  const handleImageUpload = (dayId: string, shiftId: string, variantId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleVariantChange(dayId, shiftId, variantId, 'image', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Get minimum date (today) for date picker
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Menu details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {days.map(day => (
                <div key={day.id} className="space-y-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium">
                      {day.id === 'today' ? 'Today' : new Date(day.date).toLocaleDateString()}
                    </h3>
                    {day.id !== 'today' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveDay(day.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Day
                      </Button>
                    )}
                  </div>
                  
                  {day.shifts.map(shift => (
                    <div key={shift.id} className="p-4 bg-white rounded-lg shadow">
                      <h4 className="text-lg font-medium mb-4 capitalize">{shift.type}</h4>
                      {shift.variants.map((variant, variantIndex) => (
                        <Card key={variant.id} className="mb-4 border-2 border-gray-200">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <input
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(day.id, shift.id, variant.id, e)}
                                  accept="image/*"
                                />
                                {variant.image ? (
                                  <div className="relative w-full h-32">
                                    <img
                                      src={variant.image}
                                      alt="Uploaded dish"
                                      className="w-full h-full object-cover rounded"
                                    />
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      className="absolute top-2 right-2"
                                      onClick={() => fileInputRef.current?.click()}
                                    >
                                      Change
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    className="w-full h-32 text-blue-600 border-dashed border-2"
                                    onClick={() => fileInputRef.current?.click()}
                                  >
                                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                                  </Button>
                                )}
                              </div>
                              <div className="space-y-4 col-span-2">
                                <div>
                                  <Input
                                    placeholder="Dish name"
                                    value={variant.dishName}
                                    onChange={(e) => handleVariantChange(day.id, shift.id, variant.id, 'dishName', e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Input
                                    type="number"
                                    placeholder="Enter price"
                                    value={variant.price}
                                    onChange={(e) => handleVariantChange(day.id, shift.id, variant.id, 'price', e.target.value)}
                                  />
                                </div>
                                
                                <div>
                                  <Label>Menu items</Label>
                                  {variant.menuItems.map((item, index) => (
                                    <div key={item.id} className="flex my-2 space-x-2">
                                      <Input
                                        placeholder="Menu item"
                                        className="flex-grow"
                                        value={item.text}
                                        onChange={(e) => handleMenuItemChange(day.id, shift.id, variant.id, item.id, e.target.value)}
                                      />
                                      {index === variant.menuItems.length - 1 ? (
                                        <Button onClick={() => handleAddMenuItem(day.id, shift.id, variant.id)}>
                                          Add
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          onClick={() => handleRemoveMenuItem(day.id, shift.id, variant.id, item.id)}
                                        >
                                          <X className="h-4 w-4 hover:text-red-500" />
                                        </Button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {variantIndex === shift.variants.length - 1 && (
                              <>
                                <Separator className="my-4" />
                                <Button
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => handleAddVariant(day.id, shift.id)}
                                >
                                  Add variant
                                </Button>
                              </>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ))}

                  {/* Add shift section */}
                  {day.shifts.length < 2 && (
                    <div className="flex space-x-2">
                      <Select
                        value={selectedShift}
                        onValueChange={(value) => setSelectedShift(value as 'lunch' | 'dinner')}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select the shift" />
                        </SelectTrigger>
                        <SelectContent>
                          {!day.shifts.some(s => s.type === 'lunch') && (
                            <SelectItem value="lunch">Lunch</SelectItem>
                          )}
                          
                          {!day.shifts.some(s => s.type === 'dinner') && (
                            <SelectItem value="dinner">Dinner</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => handleAddShift(day.id)}>Add</Button>
                    </div>
                  )}
                </div>
              ))}

              {/* Add new date section */}
              <div className="flex space-x-2">
                <Input
                  type="date"
                  className="flex-grow"
                  min={getMinDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <Button onClick={handleAddDate}>Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}