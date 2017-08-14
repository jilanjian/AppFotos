var Imagen = require ('../models/imagenes');
owner_check = require("./image_permission");


module.exports = function (req,res,next){
	Imagen.findById(req.params.id, function(err,imagen){
				if(imagen != null){
					console.log("ENCONTRE "+imagen.creator)
					res.locals.imagen = imagen;
					next();
				}else{
					console.log("no entra a populate")
					res.redirect("/app");
		}
	})
}/*
)
		.populate("creator")
		.exec(
 && owner_check(imagen,req,res)


*/