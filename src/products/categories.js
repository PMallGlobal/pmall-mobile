import React from 'react'
import CategoryHeader from '../components/CategoryHeader';
import PlainProductGrid from './PlainProductGrid';

export default function Categories() {
  return (
    <div className='category-container'>
        <CategoryHeader title='Category' />
        <div className='flex flex-ccl g-40 w-100'>
            <div className='flex justsb g-10' style={{width: '100%'}}>
            <PlainProductGrid />
            </div>
        </div>
    </div>
  )
}
