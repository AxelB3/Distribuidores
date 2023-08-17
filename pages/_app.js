import "../styles/globals.css";
import Head from "next/head";
import dynamic from "next/dynamic";
const Redireccion = dynamic(import("../components/Redireccion/Redireccion"), { ssr: false });
const Dashboard = dynamic(import("./dashboard"), { ssr: false });
import UserContextProvider from "../context/userContext";
import { ThemeProvider } from "@mui/material";
import theme from "../assets/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
	const router = useRouter();

	let pantalla = router.pathname.replace(/\//g, "");

	return (
		<>
			<Head>
				<title> {pantalla} | | Santa Maria de la Luz</title>
				<link rel="shortcut icon" type="image/ico" href="/logo.png" />
				<link rel="stylesheet" href="https://unpkg.com/react-bootstrap-typeahead/css/Typeahead.css" />
			</Head>
			<ThemeProvider theme={theme}>
				<UserContextProvider usuario={user}>
					<Redireccion />
					<div className="containerPrincipal">
							<Component props={pageProps} />
					</div>
				</UserContextProvider>
			</ThemeProvider>
		</>
	);
}

MyApp.getServerSideProps = async () => {
	var user = null;
	if (globalThis.localStorage != null) {
		user = await JSON.parse(localStorage.getItem("user"));
	}
	return user;
};
let user = MyApp.getServerSideProps().then((data) => (user = data));

export default MyApp;
