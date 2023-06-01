import React from "react";
interface loadingProps {
    bebas: any
}
const Loading:React.FC<loadingProps> = ({bebas}) => {
	return (
		<p
			className={`p-[450px] text-center text-4xl text-purple-300 ${bebas.className}`}
		>
			Loading. Please wait...
		</p>
	);
};

export default Loading;
