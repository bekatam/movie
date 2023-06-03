'use client'
import React, {useEffect, useState} from 'react'
import {MdFilterList} from 'react-icons/md'
import {Montserrat} from 'next/font/google'
import {SiImdb} from 'react-icons/si'
import {AiOutlinePlayCircle} from 'react-icons/ai'
import Link from 'next/link'

const monsterrat = Montserrat({subsets: ['latin'], weight: '400'})

interface MWProps {
    bebas: any;
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2UxNWM4ZGFkZGY0NjEyMGVhZGMxODY4Yjk0MTE3NyIsInN1YiI6IjY0NWYwZDE3YTY3MjU0MDBlM2QxMGY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GCuufYSvD8TQGe3uud6nYRX6ot3QfKvwrN22SfkyRdU'
    }
};


const MustWatch:React.FC<MWProps> = ({bebas}) => {
    const [results, setResults] = useState([]);
    useEffect(() => {
        const getTopRated = async () => {
            let fetchData:any = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setResults(response.results))
            .catch(err => console.error(err));
        }
        getTopRated()    
    }, [])
  return (
    <div className="blur-bg px-14 py-10 mt-24 min-h-[650px]">
        <div className={monsterrat.className + ' text-white mb-10'}>
            <div className="flex justify-between font-bold">
                <div className="text-white uppercase text-xl">Movies you must watch</div>
                <button className="flex text-xl items-center ">
                    <div className="mr-2">Filters</div>
                    <MdFilterList />
                </button>
            </div>
        </div>
        <div className="flex text-white justify-between">
        {results.length > 0 ? (
          results.splice(0,6).map((item: any, index: number) => {
                return (
                    <Link href={`/movie/${item.id}`} key = {index} className="relative flex pb-3 flex-col hover:border-gray-600 w-[270px] hover:border-[1px] rounded-3xl">
                        <img src={'http://image.tmdb.org/t/p/w342' + item.poster_path} className='rounded-3xl mb-3 h-[390px] w-full'/>
                        <button><AiOutlinePlayCircle className='text-6xl transition duration-300 ease-in-out opacity-50 hover:opacity-100 text-purple-400 bg-purple-900 rounded-full absolute bottom-20 translate-x-52'/></button>
                        <div className='pl-3'>
                            <p className='text-start w-3/4'>{item.title}</p>
                            <p className='mb-1'>{item.release_date[0] + item.release_date[1] + item.release_date[2] + item.release_date[3]}</p>
                            <div className='flex items-center'>
                                <SiImdb className='text-logo text-2xl mr-2'/>
                                {item.vote_average}
                            </div>
                        </div>
                    </Link>
                )
            })
        ) : (
          <p className='tac mt-5 text-4xl'>Loading...</p>
        )}
        </div>
    </div>
  )
}

export default MustWatch