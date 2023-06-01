'use client'
import Loading from '@/app/components/Loading';
import MainInfo from '@/app/components/MainInfo';
import { usePathname } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2UxNWM4ZGFkZGY0NjEyMGVhZGMxODY4Yjk0MTE3NyIsInN1YiI6IjY0NWYwZDE3YTY3MjU0MDBlM2QxMGY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GCuufYSvD8TQGe3uud6nYRX6ot3QfKvwrN22SfkyRdU'
    }
  };

const Movie = () => {
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState<string[]>([]);
    let idPath = usePathname().substring(7);
    useEffect(()=>{
        const getMovie = async () => {
            fetch(`https://api.themoviedb.org/3/movie/${idPath}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setMovie(response))
            .catch(err => console.error(err));
            let genres: any = await fetch(
                `https://api.themoviedb.org/3/movie/${idPath}?language=en-US`,
                options
            )
            .then((response) => response.json())
            .then((response) => {
                response = response.genres;
                let genres = response.map((item: any) => {
                return item.name;
                });
                setGenres(genres);
            });
        }
        getMovie()
    },[])
    return (
        <div className='text-white'>
            {movie ? <MainInfo movie={movie} genres={genres} mainPage={true}/> : <Loading bebas={bebas}/>}
        </div>
  )
}

export default Movie