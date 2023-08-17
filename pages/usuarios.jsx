import { Row, Col } from "react-bootstrap";
import { Button, TextField, IconButton } from "@mui/material";
import * as FaIcons from "react-icons/fa";
import useStyles from "../hooks/useStyles";
import React, { useState, useContext, useEffect } from "react";
import SelectNew from "../components/Select/Select";
import InputNew from '../components/Input/Input'
import usersService from "../services/usersService";
import { UserContext } from '../context/userContext';

export default function Usuarios() {

    const { user } = useContext(UserContext);
    const gender = ['Hombre', 'Mujer']
    const [nombre, setNombre] = useState('')
    const [fecha_de_nacimiento, setFecha] = useState('')
    const [telefono, setTelefono] = useState('')
    const [password, setPassword] = useState('')
    const [correo, setCorreo] = useState('')
    const [domicilio, setDomicilio] = useState('')
    const [rfc, setRfc] = useState('')
    const [puesto, setPuesto] = useState('')
    const [permisos, setPermisos] = useState('')
    const [id_user, setIdUser] = useState('')
    const [nickname, setNickname] = useState('')
    const [curp, setCurp] = useState('')
    const [sexo, setSexo] = useState('')
    const [estado_civil, setEstadoCivil] = useState('')
    const [sueldo, setSueldo] = useState('')
    const [url, setUrl] = React.useState(null)
    const [option, setOption] = useState({ edUser: false, newUser: false })

    const infoData = () => {
        if (user != null){
            if (user.user != undefined) {
            
            setIdUser (user.user.id)    
            setNombre(user.user.nombre)
            setFecha(user.user.fecha_de_nacimiento)
            setTelefono(user.user.telefono)
            setPassword(user.user.password)
            setCorreo(user.user.correo)
            setDomicilio(user.user.domicilio)
            setRfc(user.user.rfc)
            setPuesto(user.user.puesto)
            setPermisos(user.user.permisos)
            setNickname(user.user.nickname)
            setCurp(user.user.curp)
            setSexo(user.user.sexo)
            setEstadoCivil(user.user.estado_civil)
            setSueldo(user.user.sueldo)
    
            }
        }
    }

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
                setUrl(file);
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    

    const cleanData = () => {
        setNombre('')
        setFecha('')
        setTelefono('')
        setPassword('')
        setCorreo('')
        setDomicilio('')
        setRfc('')
        setPuesto('')
        setPermisos('')
        setNickname('')
        setCurp('')
        setSexo('')
        setEstadoCivil('')
        setSueldo('')
        setUrl('')
    }


    const userData = {
        id_user: id_user,
        nombre: nombre,
        fecha_de_nacimiento: fecha_de_nacimiento,
        active: 1,
        telefono: telefono,
        password: password,
        correo: correo,
        domicilio: domicilio,
        rfc: rfc,
        puesto: puesto,
        permisos: permisos,
        nickname: nickname,
        curp: curp,
        sexo: sexo,
        estado_civil: estado_civil,
        sueldo: sueldo,
        avatar: url
    }
    
    function GuardarUsuario() {
        usersService.CreateUser(userData);
    }

    function ActualizarUsuario() {
        usersService.UpdateUser(userData);
    }
    return (
        <>
            <div className="flex flex-col items-center py-5 gap-7">
                <Row>
                    <h1 className="text-3xl">Usuarios</h1>
                </Row>

                <Row className="m-5">
                    <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap" >
                        <Button onClick={() => { setOption({ ...option, edUser: true }); infoData() }} variant="outlined" startIcon={<FaIcons.FaUserEdit />}>
                            Editar Usuario
                        </Button>
                        <Button onClick={() => { setOption({ ...option, newUser: true }) }} variant="outlined" startIcon={<FaIcons.FaUserPlus />}>
                            Nuevo Usuario
                        </Button>
                    </Col>

                </Row>
                {(option.edUser == true) &&
                    <>
                        <Row className="items-center">

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    <TextField className={'w-full sm:w-2/5'} value={nombre} label="Nombre del Empleado" variant="standard" onChange={(data) => { setNombre(data.target.value) }} />
                                    <InputNew className={'w-full sm:w-2/5'} value={fecha_de_nacimiento} date={true} mask='99/99/9999' label='Fecha de Nacimiento' onChange={(data) => { setFecha(data.target.value) }} />
                                    <TextField className={'w-full sm:w-2/5'} value={curp} label="CURP" variant="standard" onChange={(data) => { setCurp(data.target.value) }} />
                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    {/* <TextField label="Número de Seguro Social" variant="standard" onChange={(data) => { setData({...userData, fecha_de_nacimiento: data.target.value}) }} /> */}
                                    <TextField className={'w-full sm:w-2/5'} value={rfc}  label="RFC" variant="standard" onChange={(data) => { setRfc(data.target.value) }} />
                                    <InputNew className={'w-full sm:w-2/5'} value={telefono} date={true} label="Teléfono" mask='9999999999' onChange={(data) => { setTelefono(data.target.value) }} />
                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap" >
                                    <TextField label="Domicilio" value={domicilio} className="w-full sm:w-full" variant="standard" onChange={(data) => { setDomicilio(data.target.value) }} />
                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    <SelectNew label='Sexo' options={gender} value={sexo} className={'w-full sm:w-2/5'} callback={(data) => { setSexo(data) }} />
                                    <TextField label="Estado Civil" value={estado_civil} className={'w-full sm:w-2/5'} variant="standard" onChange={(data) => { setEstadoCivil(data.target.value) }} />
                                    <TextField type='email' label="E-mail" value={correo}  className={'w-full sm:w-2/5'} variant="standard" onChange={(data) => { setCorreo(data.target.value) }} />
                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    <TextField className={'w-full sm:w-2/5'} value={nickname} label="Nombre de Usuario" variant="standard" onChange={(data) => { setNickname(data.target.value) }} />
                                    <TextField className={'w-full sm:w-2/5'} value={password} type='password' label="Contraseña" variant="standard" onChange={(data) => { setPassword(data.target.value) }} />
                                    <TextField className={'w-full sm:w-2/5'} value={puesto} label="Cargo" variant="standard" onChange={(data) => { setPuesto(data.target.value) }} />

                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    <InputNew className={'w-full sm:w-2/5'} value={sueldo} price={true} label="Sueldo" variant="standard" onChange={(data) => { setSueldo(data.target.value) }} />
                                    <TextField className={'w-full sm:w-2/5'} value={permisos} type='email' label="Permisos" variant="standard" onChange={(data) => { setPermisos(data.target.value) }} />
                                </Col>
                            </Row>
                            <br />
                            <br />
                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap justify-around gap-10">
                                    <label htmlFor="icon-button-file" >
                                        Foto de Usuario
                                        <input className='hidden' accept="image/*" id="icon-button-file" type="file" onChange={(data) => { onChange(data) }} muted />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <FaIcons.FaCamera />
                                        </IconButton>
                                    </label>
                                    <Button variant="outlined" onClick={() => { ActualizarUsuario() }}>Actualizar</Button>
                                    <Button variant="outlined" onClick={() => { setOption({...option, edUser:false}); cleanData() }}>Cancelar</Button>
                                </Col>
                            </Row>
                        </Row>
                    </>
                }
                
                {(option.newUser == true) &&
                    <>
                        <Row className="items-center">

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    <TextField className={'w-full sm:w-2/5'} label="Nombre del Empleado" variant="standard" onChange={(data) => { setNombre(data.target.value) }} />
                                    <InputNew className={'w-full sm:w-2/5'} date={true} mask='99/99/9999' label='Fecha de Nacimiento' onChange={(data) => { setFecha(data.target.value) }} />
                                    <TextField className={'w-full sm:w-2/5'} label="CURP" variant="standard" onChange={(data) => { setCurp(data.target.value) }} />
                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    {/* <TextField label="Número de Seguro Social" variant="standard" onChange={(data) => { setUserData({...userData, fecha_de_nacimiento: data.target.value}) }} /> */}
                                    <TextField className={'w-full sm:w-2/5'} label="RFC" variant="standard" onChange={(data) => { setRfc(data.target.value) }} />
                                    <InputNew className={'w-full sm:w-2/5'} date={true} label="Teléfono" mask='9999999999' onChange={(data) => { setTelefono(data.target.value) }} />
                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap" >
                                    <TextField label="Domicilio" className="w-full sm:w-full" variant="standard" onChange={(data) => { setDomicilio(data.target.value) }} />
                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    <SelectNew label='Sexo' options={gender} className={'w-full sm:w-2/5'} callback={(data) => { setSexo(data) }} />
                                    <TextField label="Estado Civil" className={'w-full sm:w-2/5'} variant="standard" onChange={(data) => { setEstadoCivil(data.target.value) }} />
                                    <TextField type='email' label="E-mail" className={'w-full sm:w-2/5'} variant="standard" onChange={(data) => { setCorreo(data.target.value) }} />
                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    <TextField className={'w-full sm:w-2/5'} label="Nombre de Usuario" variant="standard" onChange={(data) => { setNickname(data.target.value) }} />
                                    <TextField className={'w-full sm:w-2/5'} type='password' label="Contraseña" variant="standard" onChange={(data) => { setPassword(data.target.value) }} />
                                    <TextField className={'w-full sm:w-2/5'} label="Cargo" variant="standard" onChange={(data) => { setPuesto(data.target.value) }} />

                                </Col>
                            </Row>

                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap gap-10 sm:flex-nowrap">
                                    <InputNew className={'w-full sm:w-2/5'} price={true} label="Sueldo" variant="standard" onChange={(data) => { setSueldo(data.target.value) }} />
                                    <TextField className={'w-full sm:w-2/5'} type='email' label="Permisos" variant="standard" onChange={(data) => { setPermisos(data.target.value) }} />
                                </Col>
                            </Row>
                            <br />
                            <br />
                            <Row className="m-5">
                                <Col sm={'auto'} md={'auto'} className="flex flex-wrap justify-around gap-10">
                                    <label htmlFor="icon-button-file" >
                                        Foto de Usuario
                                        <input className='hidden' accept="image/*" id="icon-button-file" type="file" onChange={(data) => { onChange(data) }} muted />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <FaIcons.FaCamera />
                                        </IconButton>
                                    </label>
                                    <Button variant="outlined" onClick={() => { GuardarUsuario() }}>Guardar</Button>
                                    <Button variant="outlined" onClick={() => { setOption({...option, newUser:false}); cleanData() }}>Cancelar</Button>
                                </Col>
                            </Row>
                        </Row>
                    </>
                }
            </div>
        </>

    )
}
