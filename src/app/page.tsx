"use client";
import { useEffect, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import MustWatch from "./components/MustWatch";
import MainInfo from "./components/MainInfo";
import Loading from "./components/Loading";
import Recommended from "./components/Recommended";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function Home() {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2UxNWM4ZGFkZGY0NjEyMGVhZGMxODY4Yjk0MTE3NyIsInN1YiI6IjY0NWYwZDE3YTY3MjU0MDBlM2QxMGY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GCuufYSvD8TQGe3uud6nYRX6ot3QfKvwrN22SfkyRdU",
		},
	};
	const [genres, setGenres] = useState<string[]>([]);
	const [data, setData] = useState([
		{
			id: 0,
		},
	]);

	const [movie, setMovie] = useState();
	useEffect(() => {
		const getData = async () => {
			const response = await fetch(
				"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
				options
			);
			let data = await response.json();
			data = data.results;
			setData([...data]);
			let random = Math.floor(Math.random() * data.length);
			setMovie(data[random]);
			await fetch(
				`https://api.themoviedb.org/3/movie/${data[random].id}?language=en-US`,
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
		};
		getData();
	}, []);

	const { id } = data[0];

	return (
		<main className="">
			{id !== 0 ? (
				<>
					<MainInfo movie={movie} genres={genres} mainPage={false}/>
					<MustWatch bebas={bebas} />
					<Recommended />
				</>
			) : (
				<Loading />
			)}
		</main>
	);
}
