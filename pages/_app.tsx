import React from "react";

// assets and css
import "../css/index.sass";

// eslint-disable-next-line react/prop-types
export default function Application({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
