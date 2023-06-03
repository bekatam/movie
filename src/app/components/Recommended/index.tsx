'use client'
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Link from "next/link";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { SiImdb } from "react-icons/si";

const Recommended = () => {
    const [movieList, setMovieList] = useState([{
        id: 0,
        title: '',
        overview: '',
        vote_average: 0,
        release_date: '0000',
        poster_path: ''
    }]);
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2UxNWM4ZGFkZGY0NjEyMGVhZGMxODY4Yjk0MTE3NyIsInN1YiI6IjY0NWYwZDE3YTY3MjU0MDBlM2QxMGY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GCuufYSvD8TQGe3uud6nYRX6ot3QfKvwrN22SfkyRdU'
            }
          };
          fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2', options)
            .then(response => response.json())
            .then(response => setMovieList(response.results))
            .catch(err => console.error(err));
    },[])
	return (
		<div className="mt-12 px-14 text-white">
			<div className="uppercase text-xl mb-12">Recommended for you</div>
            <div className="flex flex-wrap justify-between">
                {movieList.length > 0 ? 
                    <>
                        {movieList.slice(0, movieList.length-2).map((item,index) => {
                            return <>
                                <Link href={`/movie/${item.id}`} key = {index} className="flex pb-3 flex-col relative hover:border-gray-600 w-[270px] hover:border-[1px] rounded-3xl mb-8 mr-5">
                                    <img src={'http://image.tmdb.org/t/p/w342' + item.poster_path} className='rounded-3xl mb-3 w-full h-[390px]'/>
                                    <button className="text-6xl transition duration-300 ease-in-out opacity-50 hover:opacity-100 text-purple-400 bg-purple-900 rounded-full absolute bottom-20 translate-x-52">
                                        <AiOutlinePlayCircle/>
                                    </button>
                                    <div className="pl-3">
                                        <p className='text-start w-3/4'>{item.title}</p>
                                        <p className='mb-1'>{item.release_date[0] + item.release_date[1] + item.release_date[2] + item.release_date[3]}</p>
                                        <div className='flex items-center'>
                                            <SiImdb className='text-logo text-2xl mr-2'/>
                                            {item.vote_average}
                                        </div>
                                    </div>
                                </Link>
                                </>
                        })}
                    </>
                    :
                    <Loading/>
                }
            </div>
		</div>
	);
};

export default Recommended;
