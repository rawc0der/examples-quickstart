define([
  'underscore'

], function(_){
	/**
	 * Custom Module that holds references to utility classes and custom attributes
	 * @type {Object}
	 */
	var todoItemsObserver = _.extend( {}, Backbone.Events );

	(function(module){
		/**
		 * Extend the module with any utility functions from external sources
		 */
		_.extend( module, {} );

		module.on('on:changeTotal', function(no){
			console.log('Total now', no);
		});

	})(todoItemsObserver);	



	return todoItemsObserver;

});