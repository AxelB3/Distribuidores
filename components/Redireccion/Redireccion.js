import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../../context/userContext';

export default function Redireccion() {
  const router = useRouter()
  const { isLogged } = useContext(UserContext);
  let entro = false

  useEffect(() => {

    // Si no esta logeado lo manda al login
    if (router.pathname == "/_error") {
      // router.push(router.asPath);
      // router.push("/");
    }
    if (router.asPath != "/Login" && !isLogged()) {
      // Have SSR render bad routes as a 404.
      if (router.asPath === '/Registro') {
        router.push("/Registro")
        entro = true
      } else {
        router.push("/Login");
        entro = false
      }
    }
    // Si esta logeado y en pantalla login lo redirecciona a home
    else if (router.asPath == "/Login" && isLogged()) {
      router.push("/");
    }
    // else if (router.asPath != "/Login" && isLogged()) {
    //   router.push("/");
    // }
    // No hace nada
    else {
      router.push("/");
    }
  }, [])

  return entro
}
