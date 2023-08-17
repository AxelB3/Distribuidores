import Head from "next/head";
import React, { useState, useContext } from "react";
import usersService from "../services/usersService";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import Containersm from "../components/Containersm/Containersm";

const Login = () => {
	const router = useRouter();
	const [nickname, setUser] = useState("");
	const [password, setPassword] = useState("");

	const { signIn } = useContext(UserContext);

	async function login(event) {
		event.preventDefault();
		await usersService.postlogin({ nickname, password }, onCallback);
	}

	function onCallback(data) {
		if (data.success == true) {
			localStorage.setItem("user", JSON.stringify(data));
			signIn(data.data);
			setTimeout(() => {
				router.push("/");
			}, 300);
			console.log("Access");
		} else if (data.success == false) {
			console.log("Error");
		}
	}

	return (
		<>
			<div className="m-auto p-4">
				<header className="flex justify-center w-full p-4">
					<div>
						<img alt="logo-jardines-funerarios-santa-maria-de-la-luz" className="icono-login" src="Icono-Login.png" />
					</div>
				</header>
				<main className="flex justify-center w-full">
					<article className="login-container">
						<div className="p-5 text-lg border-solid login-content flex flex-col gap-3">
							<Containersm>
								<p className="m-auto py-1">Usuario</p>
								<input
									onChange={(data) => {
										setUser(data.target.value);
									}}
									type="text"
									className="block w-full px-3 py-1 focus:outline-none focus:ring-2"
								/>
							</Containersm>

							<Containersm>
								<p className="m-auto py-1">Contraseña</p>
								<input
									onChange={(data) => {
										setPassword(data.target.value);
									}}
									type="password"
									className="block w-full px-3 py-1 focus:outline-none focus:ring-2 "
								/>
							</Containersm>

							<Containersm className={"forgot-pass"}>
								<p className="m-auto">¿Olvidó su contraseña?</p>
							</Containersm>

							<Containersm>
								<button
									className="w-full px-3 py-1 buttonSM"
									onClick={(event) => {
										login(event);
									}}
								>
									Iniciar Sesión
								</button>
							</Containersm>

							<Containersm>
								<button
									className="w-full px-3 py-1 buttonSM"
									onClick={() => {
										window.open(`Registro`, "_self");
									}}
								>
									Registrarse
								</button>
							</Containersm>
						</div>
					</article>
				</main>
			</div>
		</>
	);
};
export default Login;
