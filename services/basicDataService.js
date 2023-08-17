import http from '../services/axiosService.js';

class basicDataService {
    getColonias(params, callback, error) {
        return (
            http.get(
                ('colonias_afiliados'),
                {params}
            )
                .then((response) => {
                    callback(response.data);
                })
                .catch((response) => {
                    try {
                        error(response.data);
                    } catch (err) {
                        console.error('Error Handled', err);
                    }
                }))
    }

    getEstados(callback, error) {
        return (
            http.get(
                ('estados')
            )
                .then((response) => {
                    callback(response.data);
                })
                .catch((response) => {
                    try {
                        error(response.data);
                    } catch (err) {
                        console.error('Error Handled', err);
                    }
                }))
    }

    getCiudades(params, callback, error) {
        return (
            http.get(
                ('estados/ciudades/' + params)
            )
                .then((response) => {
                    callback(response.data);
                })
                .catch((response) => {
                    try {
                        error(response.data);
                    } catch (err) {
                        console.error('Error Handled', err);
                    }
                }))
    }
}

export default new basicDataService();
