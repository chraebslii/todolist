import React from "react";

// assets and styles
import "../styles/index.sass";

// eslint-disable-next-line react/prop-interfaces
export default function Application({ Component, pageProps }){
	return <Component { ...pageProps } />;
}
