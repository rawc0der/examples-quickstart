define([
  'underscore',
  'library/full/ejs'



], function(_){
	/**
	 * Custom Module adapted for the Widget template processing interface
	 * @type {Object}
	 */
	var TemplateProcessor = {};

	(function(module){
		/**
		 * Extend the module with any utility functions from external sources
		 */
		_.extend( module, {

			template: function(templateFileUrl, templateDataObj){
				return new EJS( { url: templateFileUrl } ).render( templateDataObj );
			}

		});

		// console.log(module.template('js/templates/score.ejs', {matches:{score:6}}))
	})(TemplateProcessor);	

	return TemplateProcessor;

});