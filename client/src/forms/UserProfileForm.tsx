import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import LoadingButton from '@/components/LoadingButton'

const formSchema = z.object({
  email: z.string().optional(),
  username: z.string().min(3, 'username is required'),
  name: z.string().min(3, 'name is required'),
  address: z.string().min(3, 'Address Line is required'),
  city: z.string().min(3, 'City is required'),
  country: z.string().min(3, 'Country is required'),
})

export type UserFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (userProfileData: UserFormData) => void
  isLoading: boolean
}

const UserProfileForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className='space-y-4 bg-primary-foreground rounded-lg md:p-4'>
        <div>
          <h2 className='text-2xl font-bold'>User Profile</h2>
          <FormDescription>View and change your profile information here</FormDescription>
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled
                  className='bg-white'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='bg-white'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='bg-white'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='bg-white'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='bg-white'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className='bg-white'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            type='submit'
            className='bg-chart-5'>
            Submit
          </Button>
        )}
      </form>
    </Form>
  )
}

export default UserProfileForm
