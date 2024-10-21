import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { filtersOptions } from '@/utils'
import React, { Fragment } from 'react'

const ProductFilter = ({ filters, handleFilter }) => {
    return (
        <div className='bg:background rounded-lg shadow-sm'>
            <div className="p-4 border-b">
                <h2 className='text-lg font-semibold'>Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filtersOptions).map(keyItem => (
                        <Fragment key={keyItem}>
                            <div>
                                <h3 className='text-base font-extrabold'>{keyItem}</h3>
                                <div className="grid gap-2 mt-2">
                                    {
                                        filtersOptions[keyItem].map(option => {
                                            const isChecked = filters[keyItem]?.includes(option.id);
                                            return (
                                                <Label className="flex items-center gap-2 font-medium" key={option.label}>
                                                    <Checkbox
                                                        checked={isChecked}
                                                        onCheckedChange={() => {
                                                            handleFilter(keyItem, option.id)
                                                        }} 
                                                    />
                                                    {option.label}
                                                </Label>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <Separator />
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductFilter
