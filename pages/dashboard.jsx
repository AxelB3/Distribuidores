import { useState, useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "@mui/material";
import * as FaIcons from "react-icons/fa";
import Link from 'next/link'
import { UserContext } from '../context/userContext';

const Dashboard = ({ children }) => {
  const { user, sidebar, setSidebar, signOut } = useContext(UserContext);

  let image = "";
  let nombre = "";
  let puesto = "";

  if (user != null) {
    if (user.user != undefined) {
      nombre = user.user.nombre
      puesto = user.user.puesto
      if (user.avatar != null) {
        image = user.avatar
      }
      else {
        image = ""
      }
    }
  }

  return (
    <>
      <div>
        {(user != null) &&
          <header className='w-full bg-gray-900 h-14'>
            <nav className='flex h-full gap-2 pl-3 w-fit'>
              <div className='m-auto bg-yellow-300 rounded-full'>
                <img alt='logo_empresa' src='logo.svg' className='w-8' />
              </div>
              <p className='m-auto'>
                Enterprise
              </p>
              <span className='flex justify-center w-10 h-10 mx-5 my-auto rounded-full aling-center bg-black/40'>
                <label htmlFor="menu-control" className='my-auto'>
                  <FaIcons.FaStream className='m-auto cursor-pointer' />
                </label>
                <input type="checkbox" id="menu-control" className="menu-control" onChange={(() => { setSidebar(!sidebar) })}></input>
              </span>

            </nav>
          </header>
        }

        <main className='flex aside-index'>
          <aside className={(sidebar == true) ? 'w-56 bg-gray-900 aside-index sidebar_true' : 'w-56 bg-gray-900 aside-index sidebar'}>
            <div className='flex gap-1 py-5 sidebar-elements'>
              <div className='mx-3 my-auto bg-transparent rounded-full'>
                <img alt={nombre} src={image} className='w-12 rounded-full' />
              </div>
              <h1 className='my-auto text-xl'>{nombre.split(' ')[0]} / {puesto}</h1>
            </div>

            <div className='flex flex-col gap-5 py-5 sidebar-elements'>
              <h1 className='px-5'>Menú</h1>
              <Link href={{ pathname: '/usuarios' }}>
                <p className='flex gap-3 px-5'><FaIcons.FaUserAlt className='my-auto' />Usuarios</p>
              </Link>

              <p className='flex gap-3 px-5'><FaIcons.FaTag className='my-auto' /> Carga de Productos</p>
              <p className='flex gap-3 px-5'><FaIcons.FaUserCheck className='my-auto' /> Asistencias</p>
              <p className='flex gap-3 px-5'><FaIcons.FaClipboardList className='my-auto' /> Inventario</p>
              <p className='flex gap-3 px-5'><FaIcons.FaFileAlt className='my-auto' /> Reporte de Ventas</p>
            </div>

            <div className='flex flex-col gap-5 py-5 sidebar-elements'>
              <h1 className='px-5'>Others</h1>
              <p className='flex gap-3 px-5'><FaIcons.FaHeadset className='my-auto' /> Support</p>
              <p className='flex gap-3 px-5'><FaIcons.FaCog className='my-auto' /> Setting</p>
            </div>
            <Col sm={'auto'} md={'auto'} className="flex flex-wrap justify-around gap-10 m-auto">
            <Button variant="outlined" size='small' onClick={signOut} >Cerrar Sesión</Button>
            </Col>
          </aside>
          <section className={(sidebar == true) ? 'w-full pointer-events-none section-index' : 'w-full section-index'} id='content'>
            {children}
          </section>
        </main>
      </div>
    </>
  )
}
export default Dashboard;
