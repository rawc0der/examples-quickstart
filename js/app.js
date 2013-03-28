define([
  'jquery', 
  'underscore', 
  'backbone',
  // 'controllers/MyController',
  'controllers/TodoController',
  // 'modules/MyModule'

], function($, _, Backbone, TodoController){
  /**
   * Main Application File Module
   * Store Components inside this object for global refs handles
   * @type {[type]}
   */
  var App = {};

  (function(module){

    _.extend ( module, {
      /**
       * Application Entry point. It is called the first time DOM finishes loading
       * @return {[function]} 
       */
      initialize: function(){

        console.log('App::initialize', this);

        this.Controller.start();

        return this;

      },

      Controller: TodoController,

      // CustomModule: MyModule

    });

  })(App);

  return App;
});