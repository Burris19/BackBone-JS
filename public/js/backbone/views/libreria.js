var app = app || {};
app.Libreria = Backbone.View.extend({

	el: '#app', //# este Id pertece al body

	events: {
		'click #crear': 'crearLibro'
	},

	initialize: function() {
		this.listenTo(app.libros, 'add', this.mostrarLibro);
		this.listenTo(app.libros, 'remove', this.resetLibro);
		app.libros.fetch();
	},

	mostrarLibro: function(modelo){
		var vista = new app.MostrarLibroView({model:modelo});
		$('.libros').append(vista.render().$el);
		
	},

	crearLibro: function() {
		app.libros.create({
			"titulo": $('#inputTitulo').val(),
			"autor": $('#inputAutor').val(),
			"categoria": $('#inputCategoria').val()
		});
	},

	resetLibro: function(){
		this.$('.libros').html('');
		app.libros.each(this.mostrarLibro, this)
	}
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
	tagName: 'li',
	className: 'list-group-item',

	events: {
		'click #detalle': 'detalleLibro',
		'click #eliminar': 'eliminarLibro' 
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
		var self = this;
		if(window.stade === "libro"){
			$('.detalle').hide();
			$('#myModal').modal('hide');
			this.$el.html( this.template( this.model.toJSON() ) );
		}else if(window.stade === "detalle"){
			$('.detalle').show();
			if(this.model.get('id') === window.libroID){
				new app.DetalleLibroView({model:this.model});
			}
		}
		return this;
	},

	detalleLibro: function(){
		Backbone.history.navigate('libros/' + this.model.get('id'), {trigger:true});
	},

	eliminarLibro: function(){
		this.model.destroy();
	}
});

app.DetalleLibroView = Backbone.View.extend({
	el: '.detalle',
	template: _.template($('#tplDetalleLibro').html()),

	events: {
		'click .atrasLibros' : 'atrasLibro'
	},

	initialize: function() {
		this.render();
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		$('#myModal').modal();
	},

	atrasLibro: function () {
		Backbone.history.navigate('', {trigger:true});
	}
});