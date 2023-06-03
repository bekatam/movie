"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlusSquare, AiOutlineCheck } from "react-icons/ai";
import { SiImdb } from "react-icons/si";
import { HiExternalLink } from "react-icons/hi";
import Link from "next/link";
interface mainInfoProps {
	movie: any;
	genres: string[];
	mainPage: boolean;
}
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const MainInfo: React.FC<mainInfoProps> = ({
	movie,
	genres,
	mainPage,
}) => {
		const [onWatchList, setOnWatchList] = useState(false);
		const handleWatchList = () => {
			setOnWatchList((prev) => !prev);
		}
		return (
			<>
				<img
					alt="backdrop"
					src={"http://image.tmdb.org/t/p/w1280" + movie.backdrop_path}
					className="background_image w-full absolute bg-cover bg-no-repeat bg-center brightness-50 h-[1000px]"
				/>
				<div className="pl-10 pt-72 min-h-[830px]">
					<p className={bebas.className + " text-white text-8xl mb-3 w-1/3"}>
						{movie.title}
					</p>
					<p className={bebas.className + " text-white text-3xl w-1/2 mb-3"}>
						{movie.overview}
					</p>
					<div className="buttons flex text-xl mb-6 font-bold">
						<button className="flex items-center rounded-3xl bg-purple-500 hover:bg-purple-700 transition duration-500 text-white px-5 py-3 mr-10">
							<BsFillPlayFill />
							<span className="ml-2">Watch</span>
						</button>
						<button onClick={handleWatchList} className={onWatchList ?  "flex items-center rounded-3xl bg-green-400 text-black px-5 py-3 mr-10" : 
							"flex items-center transition duration-700 rounded-3xl bg-purple-200 hover:bg-green-400 text-black px-5 py-3 mr-10"
						}>
							{onWatchList ? <AiOutlineCheck/> : <AiOutlinePlusSquare />}
							<span className="ml-2">My List</span>
						</button>
						{mainPage ? (
							<></>
						) : (
							<Link
								href={`/movie/${movie.id}`}
								className="flex items-center cursor-alias rounded-3xl bg-orange-200 text-black px-5 py-3 transition duration-500 hover:bg-orange-400"
							>
								<HiExternalLink />
								<span className="ml-2">More</span>
							</Link>
						)}
					</div>
					<div className="info  text-2xl flex font-bold text-white items-center text-[1em] mb-5">
						<div className="imdb flex text-logo mr-5 items-center text-2xl">
							<SiImdb className="text-5xl mr-3" /> {String(movie.vote_average).substring(0,3)}
						</div>
						<div className="mr-5 rounded-3xl border-[1px] px-3 py-1 w-[3.4em] text-center">
							U/A
						</div>
						<div className="mr-5 rounded-3xl border-[1px] px-2 py-1 w-[3.4em] text-center">
							4K
						</div>
						<div className="">{movie.release_date.slice(0, 4)}</div>
					</div>
					<div className="genre flex text-white text-lg">
						{genres.map((item, index) => (
							<p className="mr-4" key={index}>
								{item}
							</p>
						))}
					</div>
				</div>
			</>
		);
	};

export default MainInfo;
