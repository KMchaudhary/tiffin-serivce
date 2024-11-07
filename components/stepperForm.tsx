'use client'

import { useState } from 'react'
import { useForm, SubmitHandler, setValue } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

// Define the schema for each step
const step1Schema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  email: z.string().email().optional(),
  profile: z.instanceof(File).optional(),
})

const step2Schema = z.object({
  payment_method: z.string().min(1, "Payment method is required"),
  amount: z.number().min(1, "Amount is required"),
  transaction_proof: z.any().refine((file) => file instanceof File, "Transaction proof is required"),
})

// Combine both schemas
const formSchema = z.object({
  step1: step1Schema,
  step2: step2Schema,
})

type FormData = z.infer<typeof formSchema>

export default function StepperForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<FormData>>({})

  const { register, handleSubmit, formState: { errors, isValid }, trigger, setValue } = useForm<FormData['step1'] | FormData['step2']>({
    resolver: zodResolver(step === 1 ? step1Schema : step2Schema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormData['step1'] | FormData['step2']> = (data) => {
    if (step === 1) {
      setFormData({ ...formData, step1: data as FormData['step1'] })
      setStep(2)
    } else {
      setFormData({ ...formData, step2: data as FormData['step2'] })
      console.log('Form submitted:', { ...formData, step2: data })
      // Here you would typically send the data to your server
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // @ts-ignore: Object is possibly 'null'.
      register(field).onChange(e)
      // Set the file value manually
      setValue(field as any, file)
      trigger(field as any)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Step {step} of 2</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input id="full_name" {...register('full_name')} />
                {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
              </div>
              <div>
                <Label htmlFor="mobile">Mobile *</Label>
                <Input id="mobile" {...register('mobile')} />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="profile">Profile Photo</Label>
                <Input id="profile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'profile')} />
                {errors.profile && <p className="text-red-500 text-sm mt-1">{errors.profile.message}</p>}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="payment_method">Payment Method *</Label>
                <Select onValueChange={(value) => register('payment_method').onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="debit_card">Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
                {errors.payment_method && <p className="text-red-500 text-sm mt-1">{errors.payment_method.message}</p>}
              </div>
              <div>
                <Label htmlFor="amount">Amount *</Label>
                <Input id="amount" type="number" {...register('amount', { valueAsNumber: true })} />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
              </div>
              <div>
                <Label htmlFor="transaction_proof">Transaction Proof *</Label>
                <Input id="transaction_proof" type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'transaction_proof')} />
                {errors.transaction_proof && <p className="text-red-500 text-sm mt-1">{errors.transaction_proof.message}</p>}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 2 && (
            <Button type="button" onClick={() => setStep(1)} variant="outline">
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button type="submit" disabled={!isValid}>Next</Button>
          ) : (
            <Button type="submit" disabled={!isValid}>Submit</Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}