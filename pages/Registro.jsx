import { Row, Col, Tabs, Tab, Modal } from "react-bootstrap";
import * as Fa from "react-icons/fa";
import React, { useEffect, useRef, useState, useContext } from "react";
import usersService from "../services/usersService";
import Select from "../components/Select/Select";
import InputMask from "react-input-mask";
import SignaturePad from "react-signature-canvas";
import basicDataService from "../services/basicDataService";
import { data } from "autoprefixer";
import stylesPad from "../styles/styles.module.css";
import { UserContext } from "../context/userContext";

export default function Registro() {
	const { Loading, setLoading, loadingShow } = useContext(UserContext);
	const [colonias, setColonias] = useState(null);
	const [estados, setEstados] = useState(null);
	const [ciudad, setCiudad] = useState(null);
	const [showModalSign, setShowModalSign] = useState(false);
	const [key, setKey] = useState("tab_1");
	const [verifyData, setVerifyData] = useState(null);
	const [dataForm, setDataForm] = useState({
		nom: "",
		apt_pat: "",
		apt_mat: "",
		curp: "",
		ine: null,
		calle: "",
		num_ext: "",
		num_int: "",
		codigo_postal: "",
		colonia: "",
		estado: "",
		ciudad: "",
		correo: "",
		num_celular: "",
		codigo_num: "",
		num_tarjeta: "",
		banco: "",
		titular_tarjeta: "",
		img_tarjeta: null,
		firma_1: "",
		firma_2: "",
	});
	const [errors, setErrors] = useState({});
	const styles = {
		color: "red",
		fontWeight: "bold",
	};
	const sigCanvas = useRef({});
	let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
	let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
	let regexNumbers = /^[0-9]*$/;

	useEffect(() => {
		setErrors(validateForm(dataForm));

		if (key == "tab_2") {
			if (regexNumbers.test(dataForm.codigo_postal) && colonias == null) {
				buscarColonia();
			}
			if (regexNumbers.test(dataForm.estado)) {
				buscarCiudad();
			}

			if (estados == null) {
				basicDataService.getEstados(setEstados, Error);
			}
		}
	}, [dataForm, key]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (e.target.type == "file") {
			onChange(e);
		}
		if (e.target.id == "mask") {
			value = value.replace(/[^a-zA-Z0-9]/g, "");
		}

		if (name == "firma") {
			if (sigCanvas.current.isEmpty()) {
			} else {
				if (dataForm.firma_1 == "") {
					name = name.concat("_1");
					value = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
					sigCanvas.current.clear();
				} else if (dataForm.firma_2 == "") {
					name = name.concat("_2");
					value = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
					setShowModalSign(false);
				}
			}
		}

		if (name == "estado") {
			// debugger;
			buscarCiudad();
		}

		setDataForm({
			...dataForm,
			[name]: value,
		});
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;

		if (name == "codigo_postal") {
			buscarColonia();
		}

		handleChange(e);
		setErrors(validateForm(dataForm));
	};

	const validateForm = (form) => {
		let error = {};

		if (key == "tab_1") {
			if (!form.nom.trim()) {
				error.nom = "El campo 'Nombre(s)' es requerido";
			} else if (!regexName.test(form.nom.trim())) {
				error.nom = "El campo 'Nombre(s)' solo acepta letras y espacios en blanco";
			}

			if (!form.apt_pat.trim()) {
				error.apt_pat = "El campo 'Apellido Paterno' es requerido";
			} else if (!regexName.test(form.apt_pat.trim())) {
				error.apt_pat = "El campo 'Apellido Paterno' solo acepta letras y espacios en blanco";
			}

			if (!form.apt_mat.trim()) {
				error.apt_mat = "El campo 'Apellido Materno' es requerido";
			} else if (!regexName.test(form.apt_mat.trim())) {
				error.apt_mat = "El campo 'Apellido Materno' solo acepta letras y espacios en blanco";
			}

			if (!form.curp.trim()) error.curp = "El campo 'CURP' es requerido";

			if (form.ine == null) error.ine = "El campo 'Subir Identificación' es requerido";
		} else if (key == "tab_2") {
			if (!form.calle.trim()) {
				error.calle = "El campo 'Calle' es requerido";
			} else if (!regexName.test(form.calle.trim())) {
				error.calle = "El campo 'Calle' solo acepta letras y espacios en blanco";
			}

			if (!form.num_ext.trim()) {
				error.num_ext = "El campo 'Número Exterior' es requerido";
			} else if (!regexNumbers.test(form.num_ext.trim())) {
				error.num_ext = "El campo 'Número Exterior' solo acepta números y sin espacios en blanco";
			}

			if (!regexNumbers.test(form.num_int.trim())) {
				error.num_int = "El campo 'Número Interior' solo acepta números y sin espacios en blanco";
			}

			if (!form.codigo_postal.trim()) {
				error.codigo_postal = "El campo 'Código Postal' es requerido";
			} else if (!regexNumbers.test(form.codigo_postal.trim())) {
				error.codigo_postal = "El campo 'Código Postal' solo acepta números y sin espacios en blanco";
			}

			if (!form.colonia.trim()) {
				error.colonia = "El campo 'Colonia' es requerido";
			}

			if (!form.estado.trim()) {
				error.estado = "El campo 'Estado' es requerido";
			}

			if (!form.ciudad.trim()) {
				error.ciudad = "El campo 'Ciudad' es requerido";
			}
		} else if (key == "tab_3") {
			if (!form.correo.trim()) {
				error.correo = "El campo 'Email' es requerido";
			} else if (!regexEmail.test(form.correo.trim())) {
				error.correo = "El campo 'Email' es incorrecto";
			}

			if (!form.num_celular.trim()) {
				error.num_celular = "El campo ' Número de Celular' es requerido";
			} else if (!regexNumbers.test(form.num_celular.trim())) {
				error.num_celular = "El campo ' Número de Celular' solo acepta números y sin espacios en blanco";
			}

			if (!form.codigo_num.trim()) {
				error.codigo_num = "El campo 'Código de Confirmación' es requerido";
			} else if (verifyData == null) {
				error.codigo_num = "El número no ha sido confirmado, verifique de nuevo";
			} else if (form.codigo_num != verifyData.codigoVerificador) {
				error.codigo_num = "El código ingresado es incorrecto, verifique de nuevo";
			}
		} else if (key == "tab_4") {
			if (!form.num_tarjeta.trim()) {
				error.num_tarjeta = "El campo 'Número de Tarjeta' es requerido";
			} else if (form.num_tarjeta.trim().length < 16) {
				error.num_tarjeta = "El campo 'Número de Tarjeta' debe contener 16 digitos";
			}

			if (!form.banco.trim()) {
				error.banco = "El campo 'Nombre del Banco' es requerido";
			} else if (!regexName.test(form.banco.trim())) {
				error.banco = "El campo 'Nombre del Banco' solo acepta letras y espacios en blanco";
			}

			if (!form.titular_tarjeta.trim()) {
				error.titular_tarjeta = "El campo ' Nombre del Titular' es requerido";
			} else if (!regexName.test(form.titular_tarjeta.trim())) {
				error.titular_tarjeta = "El campo ' Nombre del Titular' solo acepta letras y espacios en blanco";
			}

			if (!form.firma_1.trim() || !form.firma_2.trim()) {
				error.firma_1 = "Las 'Firmas' son requeridas";
			}
		}

		return error;
	};

	function onChange(data) {
		let selectedFile = data.target.files;
		let file = null;
		let fileName = "";
		//Check File is not Empty
		if (selectedFile.length > 0) {
			// Select the very first file from list
			let fileToLoad = selectedFile[0];
			fileName = fileToLoad.name;
			// FileReader function for read the file.
			let fileReader = new FileReader();
			// Onload of file read the file content
			fileReader.onload = function (fileLoadedEvent) {
				file = fileLoadedEvent.target.result;
				// Print data in console
				setDataForm({ ...dataForm, [data.target.name]: file });
			};
			// Convert data to base64
			fileReader.readAsDataURL(fileToLoad);
		}
	}

	const capturarDist = () => {
		setLoading(true);
		usersService.CreateUser(dataForm, onConfirmacionDist);
	};

	const limpiar_firma = () => {
		if ((dataForm.firma_1 && dataForm.firma_2) != "") {
			setDataForm({ ...dataForm, firma_1: "", firma_2: "" });
		} else if (dataForm.firma_1 != "") {
			setDataForm({ ...dataForm, firma_1: "" });
		} else if (dataForm.firma_2 != "") {
			setDataForm({ ...dataForm, firma_2: "" });
		}
		sigCanvas.current.clear();
	};

	const buscarColonia = () => {
		if (regexNumbers.test(dataForm.codigo_postal) && dataForm.codigo_postal != "") {
			var params = {
				cp: dataForm.codigo_postal,
			};
			basicDataService.getColonias(params, setColonias, Error);
		}
	};

	const buscarCiudad = () => {
		if (regexNumbers.test(dataForm.estado) && dataForm.estado != "") {
			basicDataService.getCiudades(dataForm.estado, setCiudad, Error);
		}
	};

	const verificarNum = () => {
		if (dataForm.num_celular != "") {
			let params = {
				num_celular: dataForm.num_celular,
			};
			setLoading(true);
			usersService.sms_cod_verificacion(params, onCodigoCargado, Error);
		}
	};

	const onCodigoCargado = (e) => {
		if (e.success) {
			setVerifyData(e);
			setLoading(false);
		}
	};

	const onConfirmacionDist = (data) => {
		if (data.success) {
			console.log("Guardado correctamente");
			setLoading(false);
			window.open(`Login`, "_self");
		}
	};

	return (
		<>
			{loadingShow && (
				<>
					<Loading />
				</>
			)}
			<div className="flex flex-col m-auto gap-10 pt-5">
				<header className="flex justify-center w-full">
					<div>
						<img alt="logo-jardines-funerarios-santa-maria-de-la-luz" className="icono-login" src="Icono-Login.png" />
					</div>
				</header>

				<Row className="flex m-auto justify-center containerSM">
					<Col className="flex m-auto justify-center text-center pb-10">
						<h1>
							Alta <br />
							Distribuidor Oficial
						</h1>
					</Col>

					<Tabs id="form" activeKey={key} onSelect={(k) => setKey(k)} className={"tab"}>
						<Tab eventKey="tab_1" title="Datos Personales">
							<>
								<Row className="flex justify-center flex-col m-auto gap-4 py-5">
									<Row className="m-auto">
										<Col sm={"12"} md={"12"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto"> Nombre(s):</p>
											<span className="flex flex-inline">
												<input name="nom" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} required />
												<p className="m-auto px-2" style={errors.nom ? styles : {}}>
													*
												</p>
											</span>
											{errors.nom && <p style={styles}>{errors.nom}</p>}
										</Col>
									</Row>

									<Row className="m-auto gapSM">
										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Apellido Paterno:</p>
											<span className="flex flex-inline">
												<input name="apt_pat" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} />
												<p className="m-auto px-2" style={errors.apt_pat ? styles : {}}>
													*
												</p>
											</span>
											{errors.apt_pat && <p style={styles}>{errors.apt_pat}</p>}
										</Col>

										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Apellido Materno:</p>
											<span className="flex flex-inline">
												<input name="apt_mat" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} />
												<p className="m-auto px-2" style={errors.apt_mat ? styles : {}}>
													*
												</p>
											</span>
											{errors.apt_mat && <p style={styles}>{errors.apt_mat}</p>}
										</Col>
									</Row>

									<Row className="m-auto">
										<Col sm={"auto"} md={"12"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">CURP:</p>
											<span className="flex flex-inline">
												<input name="curp" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} />
												<p className="m-auto px-2" style={errors.curp ? styles : {}}>
													*
												</p>
											</span>
											{errors.curp && <p style={styles}>{errors.curp}</p>}
										</Col>
									</Row>

									<Row className="m-auto gapSM">
										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Subir Imagen de Identificación:</p>

											<span className="flex flex-inline">
												<label className="w-full py-1 buttonSM flex justify-center cursor-pointer gap-2" htmlFor={"ine"}>
													<> Seleccionar Imagen</>
													{dataForm.ine == null ? <Fa.FaFileUpload className="my-auto" /> : <Fa.FaCheckCircle className="my-auto" />}
												</label>
												<input required id={"ine"} name="ine" onChange={handleChange} type="file" />
												<p className="my-auto px-2" style={errors.ine ? styles : {}}>
													*
												</p>
											</span>
											{errors.ine && <p style={styles}>{errors.ine}</p>}
										</Col>

										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Tomar Foto INE:</p>
											<span className="flex flex-inline">
												<button name="ine" className="w-full py-1 buttonSM flex justify-center">
													<Fa.FaCamera />
												</button>
											</span>
										</Col>
									</Row>

									<Row className="m-auto">
										<Col sm={"auto"} md={"12"} className="flex justify-end">
											<button disabled={Object.entries(errors).length > 0 && key == "tab_1"} onClick={() => setKey("tab_2")}>
												<Fa.FaArrowCircleRight className="arrowIcon" style={Object.entries(errors).length > 0 ? { fill: "#BABABA" } : {}} />
											</button>
										</Col>
									</Row>
								</Row>
							</>
						</Tab>

						<Tab disabled={Object.entries(errors).length > 0 && key == "tab_1"} eventKey="tab_2" title="Datos de Domicilio">
							<>
								<Row className="flex justify-center flex-col m-auto gap-4 py-5">
									<Row className="m-auto">
										<Col sm="auto" md="12" className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Calle:</p>
											<span className="flex flex-inline">
												<input name="calle" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} required />
												<p className="m-auto px-2" style={errors.calle ? styles : {}}>
													*
												</p>
											</span>
											{errors.calle && <p style={styles}>{errors.calle}</p>}
										</Col>
									</Row>

									<Row className="m-auto gapSM">
										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Número Exterior:</p>
											<span className="flex flex-inline">
												<input name="num_ext" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} />
												<p className="m-auto px-2" style={errors.num_ext ? styles : {}}>
													*
												</p>
											</span>
											{errors.num_ext && <p style={styles}>{errors.num_ext}</p>}
										</Col>

										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Número Interior:</p>
											<span className="flex flex-inline">
												<input name="num_int" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} />
											</span>
											{errors.num_int && <p style={styles}>{errors.num_int}</p>}
										</Col>
									</Row>

									<Row className="m-auto gapSM">
										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Código Postal:</p>
											<span className="flex flex-inline">
												<InputMask autoComplete="off" mask="99999" name="codigo_postal" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} />
												<p className="m-auto px-2" style={errors.codigo_postal ? styles : {}}>
													*
												</p>
											</span>
											{errors.codigo_postal && <p style={styles}>{errors.codigo_postal}</p>}
										</Col>

										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Colonia:</p>
											<span className="flex flex-inline">
												<Select name="colonia" options={colonias} className="w-full py-1 focus:outline-none focus:ring-2" callback={handleChange} callbackCompleto={true} />
												<p className="m-auto px-2" style={errors.colonia ? styles : {}}>
													*
												</p>
											</span>
											{errors.colonia && <p style={styles}>{errors.colonia}</p>}
										</Col>
									</Row>

									<Row className="m-auto gapSM">
										{estados != null && (
											<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
												<p className="my-auto">Estado:</p>
												<span className="flex flex-inline">
													<Select name="estado" options={estados} className="w-full py-1 focus:outline-none focus:ring-2" callback={handleChange} callbackCompleto={true} />
													<p className="m-auto px-2" style={errors.estado ? styles : {}}>
														*
													</p>
												</span>
												{errors.estado && <p style={styles}>{errors.estado}</p>}
											</Col>
										)}

										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Ciudad:</p>
											<span className="flex flex-inline">
												<Select name="ciudad" options={ciudad} className="w-full py-1 focus:outline-none focus:ring-2" callback={handleChange} callbackCompleto={true} />
												<p className="m-auto px-2" style={errors.ciudad ? styles : {}}>
													*
												</p>
											</span>
											{errors.ciudad && <p style={styles}>{errors.ciudad}</p>}
										</Col>
									</Row>

									<Row className="m-auto">
										<Col sm={"auto"} md={"12"} className="flex justify-end">
											<button disabled={Object.entries(errors).length > 0} onClick={() => setKey("tab_3")}>
												<Fa.FaArrowCircleRight className="arrowIcon" style={Object.entries(errors).length > 0 ? { fill: "#BABABA" } : {}} />
											</button>
										</Col>
									</Row>
								</Row>
							</>
						</Tab>

						<Tab disabled={key == "tab_1" || (Object.entries(errors).length > 0 && key == "tab_2")} eventKey="tab_3" title="Datos de Contacto">
							<>
								<Row className="flex justify-center flex-col m-auto gap-4 py-5">
									<Row className="m-auto gapSM">
										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Email:</p>
											<span className="flex flex-inline">
												<input name="correo" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} required />
												<p className="m-auto px-2" style={errors.correo ? styles : {}}>
													*
												</p>
											</span>
											{errors.correo && <p style={styles}>{errors.correo}</p>}
										</Col>

										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Número Celular:</p>
											<span className="flex flex-inline">
												<input name="num_celular" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} required />
												<p className="m-auto px-2" style={errors.num_celular ? styles : {}}>
													*
												</p>
											</span>
											{errors.num_celular && <p style={styles}>{errors.num_celular}</p>}
										</Col>
									</Row>

									<Row className="m-auto gapSM">
										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Confirmar Número de Celular:</p>
											<span className="flex flex-inline px-3">
												<button className="w-full py-1 buttonSM flex justify-center" onClick={verificarNum} disabled={errors.num_celular}>
													Confirmar Número de Celular
												</button>
											</span>
										</Col>

										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Código de Confirmación:</p>
											<span className="flex flex-inline">
												<input name="codigo_num" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} required />
												<p className="m-auto px-2" style={errors.codigo_num ? styles : {}}>
													*
												</p>
											</span>
											{errors.codigo_num && <p style={styles}>{errors.codigo_num}</p>}
										</Col>
									</Row>

									<Row className="m-auto">
										<Col sm={"auto"} md={"12"} className="flex justify-end">
											<button disabled={Object.entries(errors).length > 0} onClick={() => setKey("tab_4")}>
												<Fa.FaArrowCircleRight className="arrowIcon" style={Object.entries(errors).length > 0 ? { fill: "#BABABA" } : {}} />
											</button>
										</Col>
									</Row>
								</Row>
							</>
						</Tab>

						<Tab disabled={key == "tab_1" || key == "tab_2" || (Object.entries(errors).length > 0 && key == "tab_3")} eventKey="tab_4" title="Datos de Pago de Comisión">
							<>
								<Row className="flex justify-center flex-col m-auto gap-4 py-5">
									<Row className="m-auto gapSM">
										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Número de Tarjeta:</p>
											<span className="flex flex-inline">
												<InputMask id="mask" name="num_tarjeta" className="w-full py-1 focus:outline-none focus:ring-2" mask="9999-9999-9999-9999" onChange={handleChange} onBlur={handleBlur} required />
												<p className="m-auto px-2" style={errors.num_tarjeta ? styles : {}}>
													*
												</p>
											</span>
											{errors.num_tarjeta && <p style={styles}>{errors.num_tarjeta}</p>}
										</Col>

										<Col sm={"auto"} md={"6"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Nombre del Banco:</p>
											<span className="flex flex-inline">
												<input name="banco" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} required />
												<p className="m-auto px-2" style={errors.banco ? styles : {}}>
													*
												</p>
											</span>
											{errors.banco && <p style={styles}>{errors.banco}</p>}
										</Col>
									</Row>

									<Row className="m-auto">
										<Col sm={"auto"} md={"12"} className="flex flex-col justify-center m-auto gap-2">
											<p className="my-auto">Nombre del Titular:</p>
											<span className="flex flex-inline">
												<input name="titular_tarjeta" className="w-full py-1 focus:outline-none focus:ring-2" onChange={handleChange} onBlur={handleBlur} required />
												<p className="m-auto px-2" style={errors.titular_tarjeta ? styles : {}}>
													*
												</p>
											</span>
											{errors.titular_tarjeta && <p style={styles}>{errors.titular_tarjeta}</p>}
										</Col>
									</Row>

									<Row className="m-auto gapSM">
										<p className="my-auto">Foto Tarjeta (Frente):</p>
										<Col sm={"auto"} md={"6"}>
											<span className="flex flex-inline px-2">
												<label className="w-full py-1 buttonSM flex justify-center cursor-pointer gap-2" htmlFor={"img_tarjeta"}>
													<> Seleccionar Imagen</>
													{dataForm.img_tarjeta == null ? <Fa.FaFileUpload className="my-auto" /> : <Fa.FaCheckCircle className="my-auto" />}
												</label>
												<input required id={"img_tarjeta"} name="img_tarjeta" onChange={handleChange} type="file" />
											</span>
										</Col>

										<Col sm={"auto"} md={"6"}>
											<span className="flex flex-inline px-2">
												<button className="w-full py-1 buttonSM flex justify-center gap-2">
													Tomar Foto Tarjeta (Frente) <Fa.FaCamera className="my-auto" />
												</button>
											</span>
										</Col>
									</Row>

									<Row className="m-auto">
										<p className="my-auto">Firma:</p>
										<Col sm={"auto"} md={"12"}>
											<span className="flex flex-inline">
												<button
													name="firma"
													className="w-full py-1 buttonSM flex justify-center gap-2"
													onClick={() => {
														setShowModalSign(true);
													}}
												>
													Click para Firmar <Fa.FaSignature className="my-auto" />
												</button>
												<p className="my-auto px-2" style={errors.firma_1 ? styles : {}}>
													*
												</p>
											</span>
											{errors.firma_1 && <p style={styles}>{errors.firma_1}</p>}
										</Col>
									</Row>

									<Row className="m-auto flex justify-end gap-2">
										<Col sm={"auto"} md={2}>
											<button onClick={capturarDist} className="w-full py-1 buttonSM flex justify-center gap-2" disabled={Object.entries(errors).length > 0}>
												Unirse
											</button>
										</Col>
									</Row>
								</Row>
							</>
						</Tab>
					</Tabs>
				</Row>
			</div>

			<Modal
				centered
				show={showModalSign}
				onHide={() => {
					setShowModalSign(false);
				}}
				size="md"
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title>Dibuje su Firma </Modal.Title>
				</Modal.Header>

				<div className={stylesPad.container}>
					<div className={stylesPad.sigContainer}>
						<SignaturePad
							ref={sigCanvas}
							canvasProps={{
								width: "495px",
								height: 200,
							}}
						/>
					</div>
				</div>

				<Modal.Footer>
					<Col>
						<button className="w-full py-1 buttonSM flex justify-center gap-2" onClick={limpiar_firma}>
							Limpiar Firma
						</button>
					</Col>
					<Col>
						<button className="w-full py-1 buttonSM flex justify-center gap-2" name="firma" onClick={handleChange}>
							Capturar Firma {dataForm.firma_1 == "" ? 1 : 2}
						</button>
					</Col>
				</Modal.Footer>
			</Modal>
		</>
	);
}
