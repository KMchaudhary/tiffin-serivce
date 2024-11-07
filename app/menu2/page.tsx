import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function Component() {
  return (
    <div className="flex gap-5">
        <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
        <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-6">
            <CardTitle className="text-3xl font-bold">Today's Menu</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary">Lunch</h3>
                <div className="grid gap-6 md:grid-cols-2">
                <MenuCard
                    title="Full Dish"
                    items={["Dal Chaval", "Mung sabji", "Buttur milk"]}
                    price={120}
                />
                <MenuCard
                    title="Half Dish"
                    items={["Dal Chaval", "Buttur milk"]}
                    price={80}
                />
                </div>
            </div>
            <Separator />
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary">Dinner</h3>
                <div className="grid gap-6 md:grid-cols-2">
                <MenuCard
                    title="Full Dish"
                    items={["Alu parota", "Mung sabji", "Buttur milk"]}
                    price={120}
                />
                </div>
            </div>
            </CardContent>
        </Card>

        <CollapsibleSection title="Tomorrow" />
        <CollapsibleSection title="08/11/2024" />
        </div>
    </div>

  )
}

function MenuCard({ imageUrl, title, items, price }) {
  return (
    <Card className="flex flex-col sm:flex-row p-4 w-full">
      <div className="w-full sm:w-1/3 aspect-square relative mb-4 sm:mb-0">
        <Image
          src= {imageUrl}
          alt="Full Dish"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        placeholder="empty"
        />
      </div>
      <div className="sm:ml-6 flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <ul className="space-y-1">
            {
                items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))
            }
          </ul>
          <p className="text-xl font-semibold">Price: ₹{price}/-</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button className="bg-blue-400 hover:bg-blue-500 text-white">Add to Cart</Button>
          <Button className="bg-blue-400 hover:bg-blue-500 text-white">Order now</Button>
        </div>
      </div>
    </Card>
  )
}

function CollapsibleSection({ title }) {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="w-full">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <span className="text-lg font-semibold">{title}</span>
            <ChevronDown className="h-5 w-5" />
          </CardContent>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <Card>
          <CardContent className="p-4">
            <div className="text-muted-foreground">Menu coming soon...</div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}