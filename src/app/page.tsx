'use client'
import Nav from './components/Nav';
import {useEffect, useState} from 'react'
import Image from 'next/image'
import { Bebas_Neue } from 'next/font/google';
import {BsFillPlayFill} from 'react-icons/bs'
import {AiOutlinePlusSquare} from 'react-icons/ai'
import {SiImdb} from 'react-icons/si'

const bebas = Bebas_Neue({subsets: ['latin'], weight: "400"})

export default function Home() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2UxNWM4ZGFkZGY0NjEyMGVhZGMxODY4Yjk0MTE3NyIsInN1YiI6IjY0NWYwZDE3YTY3MjU0MDBlM2QxMGY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GCuufYSvD8TQGe3uud6nYRX6ot3QfKvwrN22SfkyRdU'
    }
  };

  const [images, setImages] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [voteAverage, setVoteAverage] = useState<string[]>([]);
  const [year, setYear] = useState<string[]>([]);
  const [title, setTitle] = useState<string[]>([]);
  const [description, setDescription] = useState<string[]>([]);

  const getData = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
    let data = await response.json();
    data = data.results;
    return data;
  };

  let random = Math.floor(Math.random() * images.length);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getData();
      const images = res.map(item => {
        return item.backdrop_path;
      })
      const title = res.map(item => {
        return item.title;
      })
      const description = res.map(item => {
        return item.overview;
      })
      let year = res.map(item => {
        return item.release_date;
      })
      const voteAverage = res.map(item => {
        return item.vote_average;
      })
      year = year.map(item=>{
        let mov = item.split('-')
        return mov[0]
      })
      const id = res.map(item=>{
        return item.id
      })
      let genres:any = await fetch(`https://api.themoviedb.org/3/movie/${id[random]}?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        response = response.genres;
        let genres = response.map(item => {
          return item.name
        })
        return genres;
      })
      setImages(images);
      setTitle(title);
      setDescription(description);
      setYear(year);
      setVoteAverage(voteAverage);
      setGenres(genres);
    };

    fetchData();
  }, []);
  
  return (
    <main className='relative'>
      <img alt='backdrop' src={'http://image.tmdb.org/t/p/w1280' + images[random]} className='w-full bg-cover bg-no-repeat bg-center brightness-50'/>
      <div className="absolute bottom-[300px] pl-10">
        <p className={bebas.className + ' text-white text-8xl mb-3 w-1/3'}>{title[random]}</p>
        <p className={bebas.className + ' text-white text-3xl w-1/3 mb-3'}>{description[random]}</p>
        <div className="buttons flex text-xl mb-6 font-bold">
          <button className='flex items-center rounded-3xl bg-purple-500 text-white px-5 py-3 mr-10'>
            <BsFillPlayFill/> 
            <span className='ml-2'>Watch</span>
          </button>
          <button className='flex items-center rounded-3xl bg-purple-200 text-black px-5 py-3'>
            <AiOutlinePlusSquare/> 
            <span className='ml-2'>My List</span>
          </button>
        </div>
        <div className="info  text-2xl flex font-bold text-white items-center text-[1em] mb-5">
          <div className="imdb flex text-logo mr-5 items-center text-2xl"><SiImdb className='text-5xl mr-3'/> {voteAverage[random]}</div>
          <div className="mr-5 rounded-3xl border-[1px] px-3 py-1 w-[3.4em] text-center">U/A</div>
          <div className="mr-5 rounded-3xl border-[1px] px-2 py-1 w-[3.4em] text-center">4K</div>
          <div className="">{year[random]}</div>
        </div>
        <div className="genre flex text-white text-lg">
          {genres.map((item, index )=> (
            <p className="mr-4" key={index}>{item}</p>
          ))}
        </div>
      </div>
    </main>
  )
}
