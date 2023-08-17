import { Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";

export default function Select({ autoFocus, name, options, callback, placeholder, className, disabled, size, value, required, multiple, style, optionStyle, callbackCompleto, contado, conFecha , selected}) {
	const [seleccionado, setSeleccionado] = useState(value);

	callbackCompleto = callbackCompleto || false;
	multiple = multiple || false;
	disabled = disabled || false;
	value = value || "";
	placeholder = placeholder || "";

	// Cada que value cambia se actualiza el estado
	useEffect(() => {
		setSeleccionado(value);
	}, [value]);

	return (
		<>
			{options != [] && (
				<select
					value={seleccionado}
					name={name}
					multiple={multiple}
					autoFocus={autoFocus}
					required={required}
					style={style}
					disabled={disabled}
					className={className}
					onChange={(e) => {
						!callbackCompleto ? callback(e.target.value) : callback(e);
						multiple ? setSeleccionado(Array.from(e.target.selectedOptions, (option) => option.value)) : setSeleccionado(e.target.value);
					}}
				>
					{/* PlaceHolder para poner un valor por defecto  */}
					{placeholder && (
						<option style={optionStyle} value={""} key="">
							{placeholder}
						</option>
					)}

					{/* Ciclo de Opciones que se reciben mediante atributo "options" que es un Array*/}
					{options &&
						options.map((opcion, index) => (
							<option selected={selected} style={optionStyle} key={index} value={opcion.id != undefined ? opcion.id : opcion.val }>
								{/* Impresion de Opciones descartando nombres por prioridad de parametros */}
								{conFecha && opcion.nombre != undefined ? opcion.nombre + " | " + opcion.fecha : opcion.nombre != undefined ? opcion.nombre : opcion.anio != undefined && contado ? opcion.pagos_anuales + " Pagos" : opcion.anio != undefined ? opcion.anio + " Años | " + Math.floor(opcion.pagos_anuales * opcion.anio) + " Pagos" : opcion.descripcion != undefined ? opcion.descripcion : opcion.name != undefined ? opcion.name : opcion.nombre_solicitante != undefined ? opcion.nombre_solicitante : opcion.folio != undefined ? opcion.folio : opcion.razon_social ? opcion.razon_social : opcion.numero}
							</option>
						))}
				</select>
			)}
		</>
	);
}
