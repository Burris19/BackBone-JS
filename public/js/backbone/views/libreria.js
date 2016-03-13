var app = app || {};
app.Libreria = Backbone.View.extend({

	el: '#app', //# este Id pertece al body

	initialize: function() { //pasamos la coleccion de datos al doby
		
		app.libros.on('add', this.mostrarLibro);		

		app.libros.fetch();
	},
	// ,

	mostrarLibro: function(modelo){
		var vista = new app.MostrarLibroView({model:modelo});
		$('.libros').append(vista.render().$el);
		
	},

	// el: '.vista',

	// initialize: function () {
	// 	this.render();
	// },

	// render: function(){
	// 	this.$el.html('<p>El metodo render en accion</p>')
	// },

	// events: {
	// 	'click .cambiarColor': 'cambiarColor'
	// },

	// cambiarColor: function() {
	// 	this.$el.css('color', 'red');
	// }
});

app.MostrarLibroView = Backbone.View.extend({
	template: _.template($('#tplMostrarLibro').html()),

	events: {
		'click h2': 'detalleLibro'
	},

	initialize: function() {
		var self = this;
		app.route.on('route:book', function(){
			self.render();
		});
		app.route.on('route:detalle', function(){
			self.render();
		});
	},

	render: function() {
		if(window.stade === "libro"){
			$('.libros').show();
			$('.detalle').hide();
			this.$el.html( this.template( this.model.toJSON() ) );
		}else if(window.stade === "detalle"){
			$('.detalle').show();
			$('.libros').hide();
			if(this.model.get('id') === window.libroID){
				new app.DetalleLibroView({model: this.model});
			}
		}
		
		return this;
	},

	detalleLibro: function(){
		Backbone.history.navigate('libros/' + this.model.get('id'), {trigger:true});
	}
});

app.DetalleLibroView = Backbone.View.extend({
	el: '.detalle',
	template: _.template($('#tplDetalleLibro').html()),

	events: {
		'click .atrasLibro' : 'atrasLibro'
	},

	initialize: function() {
		this.render();
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
	},

	atrasLibro: function () {
		Backbone.history.navigate('', {trigger:true});
	}
});