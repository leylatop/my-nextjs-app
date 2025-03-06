'use client'
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { getCodeData } from '@/utils/grid-trade'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  code: z.number().min(100000).max(999999),
  name: z.string().min(1).max(50),
  tlbPrice: z.number().min(0.01).max(9999.99),
  tlbCount: z.number().min(1).max(999999),
  tlbAmount: z.number().min(0.01).max(999999),
  calcLbAmountType: z.enum(['equal', 'arithmetic']),
  profitRate: z.number().min(0.01).max(0.99),
  levelList: z.array(z.number().min(0.01).max(1)),
})

function AddCodeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: 123456,
      name: 'test',
      tlbPrice: 1.00,
      tlbCount: 1000,
      tlbAmount: 1000,
      calcLbAmountType: 'equal',
      profitRate: 0.05,
      levelList: [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5],
    }
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>代码</FormLabel>
          <FormControl>
            <Input placeholder="请输入代码" {...field} />
          </FormControl>
          {/* <FormDescription>
            请输入代码
          </FormDescription> */}
          <FormMessage />
        </FormItem>

      )}
    />
    <FormField
      control={form.control}
      name="tlbPrice"
      render={({ field }) => (
        <FormItem>
          <FormLabel>首次买入价格</FormLabel>
          <FormControl>
            <Input placeholder="请输入首次买入价格" {...field} />
          </FormControl>
          <FormDescription>
            请输入首次买入价格
          </FormDescription>
          <FormMessage />
        </FormItem>
        
      )}
    />
    <FormField
          control={form.control}
          name="calcLbAmountType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Direct messages and mentions
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    <Button type="submit">Submit</Button>
  </form>
</Form>
}
const GridTrade = () => {
  // const code = '123456'
  // const name = 'test'
  // const tlbPrice = 1.00
  // const tlbCount = 1000
  // const tlbAmount = tlbPrice * tlbCount

  // const calcLbAmountType = 'equal' // 等额买入，或等差买入
  // const profitRate = 0.05 // 预期收益率
  // const levelList = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5] // 级别列表
  const codeData = getCodeData(123456, 1, { count: 1000 }, { rate: 0.05 }, [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5], 'equal')
  console.log(JSON.stringify(codeData, null, 2))
  return <div>
    <Sheet>
      <SheetTrigger className="bg-black px-4 py-2 rounded-md text-white">添加品种</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">添加品种</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <AddCodeForm />
      </SheetContent>
    </Sheet>

  </div>
}

export default GridTrade
