import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Component() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Lunch</h3>
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-16 bg-muted rounded-lg" />
                  <div className="space-y-1">
                    <h4 className="font-semibold">Full Dish</h4>
                    <ul className="text-sm text-muted-foreground">
                      <li>Dal Chaval</li>
                      <li>Mung sabji</li>
                      <li>Buttur milk</li>
                    </ul>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold mb-2">Price: 120/-</div>
                  <Button>Order now</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-16 bg-muted rounded-lg" />
                  <div className="space-y-1">
                    <h4 className="font-semibold">Half Dish</h4>
                    <ul className="text-sm text-muted-foreground">
                      <li>Dal Chaval</li>
                      <li>Buttur milk</li>
                    </ul>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold mb-2">Price: 80/-</div>
                  <Button>Order now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Dinner</h3>
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-16 bg-muted rounded-lg" />
                  <div className="space-y-1">
                    <h4 className="font-semibold">Full Dish</h4>
                    <ul className="text-sm text-muted-foreground">
                      <li>Alu parota</li>
                      <li>Mung sabji</li>
                      <li>Buttur milk</li>
                    </ul>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold mb-2">Price: 120/-</div>
                  <Button>Order now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Collapsible className="w-full">
        <CollapsibleTrigger className="w-full">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <span className="font-semibold">Tomorrow</span>
              <ChevronDown className="h-4 w-4" />
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

      <Collapsible className="w-full">
        <CollapsibleTrigger className="w-full">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <span className="font-semibold">08/11/2024</span>
              <ChevronDown className="h-4 w-4" />
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
    </div>
  )
}