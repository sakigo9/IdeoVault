'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm, type FieldValues } from 'react-hook-form'
const Jobster = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm()
  const handleFormSubmit = (data: FieldValues) => {
    router.push(
      `/api/template-1?company=${data.companyName}&salary=${data.salary}&location=${data.location}&designation=${data.designation}&icon=${data.icon}`,
    )
    reset()
  }
  return (
    <div className='w-full flex justify-center items-center h-full'>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label htmlFor='title'>Enter a Company Name:</label>
          <input
            type='text'
            placeholder='Company Name'
            {...register('companyName', {
              required: 'Company Name is mandatory',
            })}
          />
          {errors.companyName && (
            <small>{`${errors.companyName.message}`}</small>
          )}
        </div>
        <div>
          <label htmlFor='title'>Enter the Salary Range:</label>
          <input type='text' placeholder='Salary' {...register('salary')} />
        </div>
        <div>
          <label htmlFor='title'>Enter the Designation:</label>
          <input
            type='text'
            placeholder='Designation'
            {...register('designation', {
              required: 'Designation is important',
            })}
          />
          {errors.desination && <small>{`${errors.desination.message}`}</small>}
        </div>
        <div>
          <label htmlFor='title'>Enter the Location:</label>
          <input type='text' placeholder='Location' {...register('location')} />
        </div>
        <div>
          <label htmlFor='title'>Different Icon:</label>
          <input type='text' placeholder='Icon' {...register('icon')} />
        </div>
        <button
          type='submit'
          className='border-white bg-transparent hover:bg-primary/5 text-black p-1 px-2 h-auto font-normal'
        >
          Generate Image
        </button>
      </form>
    </div>
  )
}

export default Jobster
