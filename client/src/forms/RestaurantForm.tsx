import { Form } from '@/components/ui/form'
import type { Restaurant } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import DetailsSection from './components/DetailsSection'
import { Separator } from '@/components/ui/separator'
import CuisinesSection from './components/CuisinesSection'
import MenuSection from './components/MenuSection'
import ImageSection from './components/ImageSection'
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'

const formSchema = z
  .object({
    name: z.string({
      required_error: 'restaurant name is required',
    }),
    city: z.string({
      required_error: 'city is required',
    }),
    country: z.string({
      required_error: 'country is required',
    }),
    deliveryPrice: z.coerce.number({
      required_error: 'delivery price is required',
      invalid_type_error: 'must be a valid number',
    }),
    deliveryTime: z.coerce.number({
      required_error: 'estimated delivery time is required',
      invalid_type_error: 'must be a valid number',
    }),
    cuisines: z.array(z.string()).nonempty({
      message: 'please select at least one item',
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, 'name is required'),
        price: z.coerce.number().min(1, 'price is required'),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: 'image is required' }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: 'Either image URL or image File must be provided',
    path: ['imageFile'],
  })

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
  restaurant?: Restaurant
  onSave: (restaurantFormData: FormData) => void
  isLoading: boolean
}

function RestaurantForm({ onSave, isLoading, restaurant }: Props) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: '', price: 0 }],
    },
  })

  const onSubmit = (formDataJson: RestaurantFormData) => {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 bg-primary-foreground rounded-lg md:p-4'>
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  )
}

RestaurantForm.propTypes = {}

export default RestaurantForm
