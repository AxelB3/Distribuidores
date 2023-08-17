import http from '../services/axiosService.js';

class usersService {

    CreateUser(params, callback) {
        return (
            http.post(
                'create_distribuidor',
                params
            )
                .then((response) => {
                    callback(response.data);
                })
                .catch((error) => {
                    try {
                        console.log('error: ', error)
                    } catch (err) {
                        console.error('Error Handled', err);
                    }
                })
        )
    }

    // UpdateUser(params, callback) {
    //     return (
    //         http.post(
    //             'actualizar_usuario',
    //             { params }
    //         )
    //             .then((response) => {
    //                 callback(response);
    //             })
    //             .catch((error) => {
    //                 try {
    //                     console.log('error: ', error)
    //                 } catch (err) {
    //                     console.error('Error Handled', err);
    //                 }
    //             })
    //     )
    // }

    // getUsuarios(params, callback, error) {
    //     return (
    //         http.get(
    //             ('getUsuarios'),
    //             {  params }
    //         )
    //             .then((response) => {
    //                 callback(response.data);
    //             })
    //             .catch((response) => {
    //                 try {
    //                     error(response.data);
    //                 } catch (err) {
    //                     console.error('Error Handled', err);
    //                 }
    //             }))
    // }
    
    // getUsuarioSis(callback, error) {
    //     return (
    //         http.get(
    //             ('usuarios/sistema'),
    //         )
    //             .then((response) => {
    //                 callback(response.data);
    //             })
    //             .catch((response) => {
    //                 try {
    //                     error(response.data);
    //                 } catch (err) {
    //                     console.error('Error Handled', err);
    //                 }
    //             }))
    // }

    postlogin(params, callback) {
        return (
            http.post(
                'distribuidores/usuario/login',
                params
            )
                .then((response) => {
                    callback(response.data);
                })
                .catch((error) => {
                    try {
                        console.log('error: ', error)
                    } catch (err) {
                        console.error('Error Handled', err);
                    }
                })
        )
    }

    sms_cod_verificacion(params, callback, error) {
        return (
            http.post(
                'verificar_numero_dist',
                params,
            )
                .then((response) => {
                    callback(response.data);
                })
                .catch((error) => {
                    try {
                        console.log('error: ', error)
                    } catch (err) {
                        console.error('Error Handled', err);
                    }
                })
        )
    }
    
    // sms_cod_verificacion(params, callback, error) {
    //     var call;
    //     if (call) {
    //         call.cancel();
    //     }
    //     const CancelToken = axios.CancelToken;
    //     call = CancelToken.source();
    //     return (
    //         http.post(
    //             ('verificar_numero_dist'),
    //             { params },
    //             { cancelToken: call.token }
    //         )
    //             .then((response) => {
    //                 callback(response.status);
    //             })
    //             .catch((response) => {
    //                 try {
    //                     if (axios.isCancel(response)) {
    //                         console.log('Peticion Cancelada');
    //                     } else {
    //                         error({
    //                             status: "Falló comunicación con el servicio de mensajería",
    //                             statusText: "Espere unos minutos antes de intentar de nuevo"
    //                         });
    //                     }
    //                 } catch (err) {
    //                     console.error('Error Handled', err);
    //                 }
    //             }))
    // }
}

export default new usersService();
