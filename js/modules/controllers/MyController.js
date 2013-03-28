define([
 'underscore', 
 'backbone',
 'views/Widget',
 'modules/utils/ejsEngineAdaptor'

], function(_, Backbone, Widget, EJSAdaptor){
	/**
	 * Controller Object responsible for View construction and application event flow
	 * @type {[Object]}
	 */
	var MyController = _.extend( {}, Backbone.Events );

	(function(module){
		/**
		 * Define application logic here, by extending the Controller
		 */
		_.extend( module, {
			/**
			 * Function called immediately after App Initialize 
			 */
			start: function(){

				var TestWidget = Widget.extend({
					// templateString: '<div id="<%= id_attr %>">',
					// templateDataObject: {
					// 	id_attr: 'my-id-from-options'
					// },
					// templateEngine: _
					// templateEngine: EJSAdaptor,
					// templateString: 'js/templates/score.ejs',
					// templateDataObject: {matches: {score: '101'}}

				});

				var myTestWidget = new TestWidget({
					setOptions: {
						viewOptions: ['templateString', 'templateEngine'],
						configOptions: {
							renderTemplate: true
						}
					},
					templateEngine: EJSAdaptor,
					templateString: 'js/templates/score.ejs',
					templateDataObject: {matches: {score: '101'}}

				});

				// Using EJS Template Engine for processing templates
				// myTestWidget.setTemplate('js/templates/score.ejs');
				// myTestWidget.setTemplateEngine(EJSAdaptor);
				// myTestWidget.renderTemplate({matches: {score: '101'}});

				$('body').append('<div id="display_wrapper">');
				$('#display_wrapper').append(myTestWidget.$el);

				console.log('Controller::Start  --> ', myTestWidget);
				
			}

		});

	})(MyController);

	return MyController;

});