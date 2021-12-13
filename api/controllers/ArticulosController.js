/**
 * ArticulosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    get: async(request, response) => {
        const query = "SELECT a.idArticulos, a.nombre, a.descripcion, i.cantidad AS cantidad, a.precioVenta, a.precioCompra FROM articulos a INNER JOIN inventario i ON a.idArticulos=i.idArticulos";
        var select = await Usuarios.getDatastore().sendNativeQuery(query);
        select = JSON.parse(JSON.stringify(select.rows));
        return response.view('pages/productos', {
            layout: 'layouts/layout',
            products_data: select
        });
    },
    getNuevo: async(request, response) => {
        return response.view('pages/nuevo-producto', {
            layout: 'layouts/layout',
        });
    },
    post : async(request, response) => {
        var columnas="(nombre, descripcion, fecha, precioCompra, precioVenta, activo)";
        const body = request.body
        var valores="('"+body["nombre"]+"', '"+body["descripcion"]+"', '"+body["fecha"]+"', "+body["precioCompra"]+", "+body["precioVenta"]+", "+body["activo"]+")";
        await Articulos.getDatastore().sendNativeQuery(
            "INSERT INTO articulos "+columnas+" VALUES "+valores
        );
        var select = await Articulos.getDatastore().sendNativeQuery(
            "SELECT * FROM articulos WHERE nombre='"+body["nombre"]+"' AND descripcion='"+body["descripcion"]+"' LIMIT 1"
        )
        var articulo = JSON.parse(JSON.stringify(select.rows[0]));
        columnas="(idArticulos, cantidad)";
        valores="("+articulo.idArticulos+", "+body["cantidad"]+")"
        await Inventario.getDatastore().sendNativeQuery(
            "INSERT INTO inventario "+columnas+" VALUES "+valores
        );
        return response.send({success:'ok'});
    }
};

