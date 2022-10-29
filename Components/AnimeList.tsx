import Link from 'next/link';
import React from 'react'

const AnimeList = ({ Datas, heading }) => {
    return (
        <div className='w-[90vw] max-w-[80rem] pt-28'>
            <h2 className='text-white text-[3rem]'>
                {heading}
            </h2>
            <div>
            </div>
            <table className=' text-gray-500 p-2'>
                <thead>
                    <tr className="py-2 bg-gray-800 ">
                        <th className='min-w-[3.5rem]'>
                            <div className='h-10 flex justify-center items-center'>S.No</div>
                        </th>
                        <th>Title</th>
                        <th className='w-[6rem] max700:hidden'>Type</th>
                        <th className='w-[6rem] '>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {Datas.map((item, index) => {
                        const id = item.id;
                        if (item) {
                            return <tr key={item.id} className={`${index % 2 !== 0 ? "bg-[#202020]" : "bg-zinc-900"}  text-justify`} >
                                <td className='text-center mr-3'>
                                    <div className='h-10 flex justify-center items-center'>{index + 1}</div>
                                </td>
                                <td className='max-w-[40rem] w-[30vw]'>
                                    <Link href={`/anime/${id}`} >
                                        <div className={" cursor-pointer"}>{item.title.english || item.title.romaji}</div>
                                    </Link>
                                </td>
                                <td className='text-center mr-3 max700:hidden'>Anime</td>
                                <td className='text-center'>Love</td>
                            </tr>
                        } else {
                            return;
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AnimeList