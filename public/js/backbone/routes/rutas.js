var app = app || {};
var rutas = Backbone.Router.extend({
	routes: {		
		'': 'book',
		'libros/:id': 'detalle'
	},

	detalle: function(id) {
		window.libroID = id;
		window.stade = 'detalle';
	},

	book: function () {
		window.stade = 'libro';
	}
});

app.route = new rutas();
