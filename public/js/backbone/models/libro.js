var app = app || {};

app.Libro = Backbone.Model.extend({
	initialize: function(){
		console.log("Se ha creado una nueva instancia")

		this.on("change", function() {
			console.log("El modelo ha sido cambiado")
		})
	},
	defaults: {
		autor: "Desconocido"
	},

	validate: function (atributos) {
		if(!atributos.titulo) {
			return "Debe tener titulo"
		}
	}


});