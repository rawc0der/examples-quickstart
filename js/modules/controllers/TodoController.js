define([
  'underscore',
  'backbone',
  'views/Widget',
  'views/ui',
  'modules/utils/buildOptions',
  'observers/TodoItemsObserver'

], function(_, Backbone, Widget, UI, buildOptions, todoItemsObserver){
	/**
	 * Custom Module that holds references to utility classes and custom attributes
	 * @type {Object}
	 */
	var TodoController = {};

	(function(module){
		/**
		 * Extend the module with any utility functions from external sources
		 */
		_.extend( module, {

			start: function(){

				$('body').append('<div id="display_wrapper">');

				console.log('Loading UI Pack', UI);

				var statsPanel = new UI.StatsWidget({
					setOptions: buildOptions.defaultsOptions.WidgetOptions.setOptions,
					containerEl: $('#display_wrapper'),
					observer: todoItemsObserver
				});

				var addButton = new UI.TodoAddButton({
					setOptions: buildOptions.defaultsOptions.WidgetOptions.setOptions,
					containerEl: $('#display_wrapper'),
					observer: todoItemsObserver
					
				});

				var todoItem = UI.TodoListItem.extend({ 
					setOptions: buildOptions.defaultsOptions.WidgetOptions.setOptions,
					observer: todoItemsObserver
				});

				var todoWidget = new UI.TodoContainer({
					setOptions: buildOptions.defaultsOptions.WidgetOptions.setOptions,
					containerEl: $('#display_wrapper'),
					observer: todoItemsObserver,
					childItem: todoItem
				});

				todoWidget.addItem( new todoItem() );

				console.log('TodoController::Creating new Todo Widget', todoWidget);


				// $('body').append(myTodoList);
				
			}

		});

	})(TodoController);	

	return TodoController;

});