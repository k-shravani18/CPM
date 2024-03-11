import React from 'react'
import style from './styles.module.css'

const Adddevice = () => {
    return (
        <div>
            {/* form */}
            <form>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='mt-5'>
                        <div className='px-5'>

                            <label htmlFor="devicetype" className="text-black text-base font-medium">
                                Device Type
                            </label>
                            <select id="devicetype" className='w-full h-[42px] my-4 pl-3 bg-white rounded border border-neutral-200
                                 placeholder-stone-600 text-stone-700 text-sm font-normal'>
                                <option value="">-Select-</option>
                                <option value="router">Router</option>
                                <option value="loadbalancer">LoadBalancer</option>
                                <option value="idrack">IDRack</option>
                            </select>

                            <label htmlFor="devicelocation" className="text-black text-base font-medium">
                                Device Location
                            </label>
                            <select id="devicelocation"
                                className='w-full h-[42px] my-4 pl-3 bg-white rounded border border-neutral-200
                            placeholder-stone-600 text-stone-700 text-sm font-normal'>
                                <option value="">-Select-</option>
                                <option value="hyd">HYD</option>
                                <option value="bglr">BGLR</option>
                                <option value="bom">BOM</option>
                            </select>

                            <label htmlFor="deviceowner" className="text-black text-base font-medium">
                                Device Owner
                            </label>
                            <input
                                type="text"
                                id="deviceOwner"
                                className='w-full h-[42px] pl-3 my-2 bg-white rounded border border-neutral-200
                   placeholder-stone-600 text-stone-700 text-sm font-normal'
                                placeholder="Owner"
                            />
                        </div>
                    </div>

                    {/* image */}
                    <div className='flex-grow-1 p-20 hidden lg:block'>
                    </div>
                </div>

                {/* Checkbox */}
                <div className='flex items-center justify-center mt-12'>
                    <input type="checkbox" id="confirmInfo" className="w-6 h-6 mr-3 bg-white border border-neutral-400" />
                    <label htmlFor="confirmInfo" className="text-black text-sm font-medium">
                        I confirm that the information provided is accurate
                    </label>
                </div>


                {/* Button */}
                <div className='flex items-center justify-center lg:justify-end mt-7 mx-2 md:mx-5'>
                    <button className="ml-[30px] p-2.5 bg-red-700 rounded justify-center items-center gap-2.5 inline-flex">
                        <span className="text-center text-white text-sm font-bold">Add Device</span>
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Adddevice