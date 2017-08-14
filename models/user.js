var mongoose = require('mongoose');
var Schema = mongoose.Schema; 


mongoose.Promise = global.Promise;

var mongoDB = mongoose.connect('mongodb://localhost/fotos', {
	useMongoClient: true
});


var posiblesvalores = ["M", "F"];


var emailmatch = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email válido"];

var password_validation = {
	validator: function(pss){
		return this.password_confirmation == pss;
},
	message: "contrasenas no son iguales"
};

var user_schema = new Schema({
	name: String,
	last_name: String,
	username: String,
	password: { type: String, minlength: [2, "El password es muy corto"], validate: password_validation},
	age: { type: Number, mix: [7, "la edad no puede ser menor a 7"], max: [100, "la edad no puede ser mayor a 100"] },
	email: { type: String, required: true, match: emailmatch },
	date_of_birth: Date,
	sex: {type:String,enum: {values:posiblesvalores, message:"Opción inválida"} }


}); 
user_schema.virtual("password_confirmation").get(function() {
	return this.pwconf;
}).set(function(password) {
	this.pwconf = password;
});







var User = mongoose.model("Users", user_schema);

module.exports.User = User; 