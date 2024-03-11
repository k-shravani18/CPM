import React, { useState } from 'react';
import Image from 'next/image';
import InstanceData from './instanceData';
import { LuChevronsUpDown } from 'react-icons/lu'

interface DataItem {
    instanceId: string;
    instanceName: string;
}

const Addvm = () => {
    const [selectedSubscription, setSelectedSubscription] = useState('');

    const handleSubscriptionChange = (event: any) => {
        setSelectedSubscription(event.target.value);
    };

    const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null); // Provide the type here
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: any) => {
        if (column === sortColumn) {
            const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(newSortOrder);
        } else {
            setSortOrder('asc');
            setSortColumn(column);
        }
    };

    const sortedItems = [...InstanceData].sort((a, b) => {
        if (sortColumn) {
            if (sortOrder === 'asc') {
                return a[sortColumn].localeCompare(b[sortColumn]);
            } else {
                return b[sortColumn].localeCompare(a[sortColumn]);
            }
        }
        return 0;
    });

    return (
        <>
            <div>
                {/* form */}
                <form>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        <div className='mt-5'>
                            <div className='px-5'>

                                <label htmlFor="subscription" className="text-black text-base font-medium">
                                    Subscription
                                </label>
                                <select
                                    id="subscription"
                                    className='w-full h-[42px] my-4 pl-3 bg-white rounded border border-neutral-200
                                placeholder-stone-600 text-stone-700 text-sm font-normal'
                                    onChange={handleSubscriptionChange}
                                    value={selectedSubscription}
                                >
                                    <option value="">-Select-</option>
                                    <option value="Subscription ID 1">Subscription ID 1</option>
                                    <option value="Subscription ID 2">Subscription ID 2</option>
                                    <option value="Subscription ID 3">Subscription ID 3</option>
                                </select>
                                <div className={selectedSubscription === 'Subscription ID 1' ? '' : 'hidden'}>
                                    <div className="lg:w-full overflow-x-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        <table className="w-full table-auto" style={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                                            <thead>
                                                <tr className="bg-slate-100 mb-4">
                                                    <th className="py-2 px-4 flex items-start">
                                                        <input type="checkbox" className="bg-white border border-zinc-500 mr-2" />
                                                        <span className="text-violet-950 text-sm font-medium">Select</span>
                                                    </th>
                                                    <th className="text-violet-950 text-sm font-medium py-2 px-4 text-left">
                                                        <div className="flex items-center">
                                                            <span>Instance ID</span>
                                                            <div onClick={() => handleSort('instanceId')} className="ml-2 cursor-pointer">
                                                                <LuChevronsUpDown />
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th className="text-violet-950 text-sm font-medium py-2 px-4 text-left hidden lg:block">Instance Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedItems.map((data) => (
                                                    <tr key={data.instanceId} className="bg-neutral-50 mb-4">
                                                        <td className="py-2 px-4 text-center">
                                                            <input type="checkbox" className="bg-white border border-zinc-500 mr-2" />
                                                        </td>
                                                        <td className="py-2 px-4 text-left text-neutral-700 text-sm font-normal">
                                                            {data.instanceId}</td>
                                                        <td className="py-2 px-4 text-left text-neutral-700 text-sm font-normal hidden lg:block">
                                                            {data.instanceName}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* image */}
                        <div className='flex-grow-1 p-20 hidden lg:block'>
                        </div>
                    </div>
                    {/* Checkbox */}

                    <div className={`flex items-center justify-center mt-12 ${selectedSubscription === 'Subscription ID 1' ? '' : 'hidden'}`}>
                        <input type="checkbox" id="confirmInfo" className='w-6 h-6 mr-3 bg-white border border-neutral-400' />
                        <label htmlFor="confirmInfo" className="text-black text-sm font-medium">
                            I confirm that the information provided is accurate
                        </label>
                    </div>

                    {/* Button */}
                    <div className={`flex items-center justify-center lg:justify-end mt-7 mx-2 md:mx-5 ${selectedSubscription === 'Subscription ID 1' ? '' : 'hidden'}`}>
                        <button className="ml-[30px] p-2.5 bg-red-700 rounded justify-center items-center gap-2.5 inline-flex">
                            <span className="text-center text-white text-sm font-bold">Add VM</span>
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
};

export default Addvm;