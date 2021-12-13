/**
 * UsuariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
    
    get: async(request, response) => {
        const query = "SELECT * FROM usuarios";
        /*Usuarios.getDatastore().sendNativeQuery(query, function(err, rawResult){
            var select = rawResult.rows
            return response.send({success: select})
        })*/
        var select = await Usuarios.getDatastore().sendNativeQuery(query);
        return response.view('pages/usuarios', {
            layout: 'layouts/layout',
            data: select.rows
        });
        
    }

};

