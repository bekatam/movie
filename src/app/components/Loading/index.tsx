import React from "react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const Loading = () => {
	return (
		<p
			className={`p-[450px] text-center text-4xl text-purple-300 ${bebas.className}`}
		>
			Loading. Please wait...
		</p>
	);
};

export default Loading;
