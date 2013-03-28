define([
  'underscore',
  'views/Widget',
  'modules/utils/buildOptions'

], function(_, Widget, buildOptions){
	/**
	 * Custom Module that holds references to utility classes and custom attributes
	 * @type {Object}
	 */
	var UI = {};

	(function(module){
		/**
		 * Extend the module with any utility functions from external sources
		 */
		_.extend( module, {

				StatsWidget: Widget.extend({
					templateString: '<div> <div id="stat_total"></div> <div id="stat_checked"> </div> <button id="stat_completed"> Show Completed </button> <button id="stat_all"> Show All </button> </div>',
					templateDataObject: {},
					observer: null,
					containerEl: null,
					initialize: function(){
						console.log('StatsWidget::Init', this);
						this.attachToContainer();
						this.observer.on('on:changeTotal', function(total){
							this.showTotal(total);
						}, this);
					},
					attachToContainer: function(){
						console.log('View injected inside container:', this.containerEl);
						this.containerEl.prepend(this.$el);
					},
					showAll: function(){},
					showCompleted: function(){},
					showTotal: function(total){
						$('#stat_total').html(total + ' Total Items ');
					},
					showCompleted: function(){}

				}),

				TodoAddButton: Widget.extend({
					templateString: '<button id="AddTodo" > Add todo Item </button> ',
					templateDataObject: {},
					observer: null,
					containerEl: null,
					initialize: function(){
						console.log('TodoAddButton::Init', this);
						
						var self = this;
						this.$el.click(function(){
							console.log('TodoAddButton::Announce Observer');
							self.anounceAddTodo();
						});
						this.attachToContainer();
					},
					attachToContainer: function(){
						console.log('View injected inside container:', this.containerEl);
						this.containerEl.prepend(this.$el);
					},
					anounceAddTodo: function(){
						if(this.observer) this.observer.trigger('on:AddTodo');
						else console.log('Err:: You have not passed an observer param! ');
					}
				}),

				TodoListItem: Widget.extend({
					observer: null,
					templateString: 
					'<div class="todo_item"> \
						 <button class="remove">X</button> \
						 <input type="text" value="What to do.."/> \
						 <input type="checkbox"> \
					</div>',
					templateDataObject: {},
					checkedItem: false,
					initialize: function(){
						console.log('TodoListItem::Init', this);
						// this.$el.find('input[type=checkbox]').addClass(this.cid);
						// this.$el.find('input[type=text]').addClass(this.cid);
						// this.$el.find('button').addClass(this.cid);
						var self = this;
						this.$el.find('button.remove').click(function(){ 
							self.observer.trigger('on:removeTodo', self);							 
						});
						this.$el.find('input[type=checkbox]').click(function(){
							self.checkedItem = this.checked ? true : false;
							self.observer.trigger('on:toggleCheck', self);
						});
					}					
				}),

				TodoContainer: Widget.extend({
					_subviews: [],
					observer: null,
					containerEl: null,
					childItem: null,
					initialize: function(){
						console.log('TodoContainer::Init', this.$el);
						this.attachToContainer();
						// var self = this;
						this.observer.on('on:AddTodo', function(){
							console.log('TodoAddContainer::Adding Todo');
							this.addItem( new this.childItem({}) );
						}, this);
						this.observer.on('on:removeTodo', function(viewObj){
							console.log('TodoAddContainer::removing Todo', viewObj);
							this.removeItemByReference(viewObj);
						}, this);

						

					},
					attachToContainer: function(){
						console.log('View injected inside container:', this.containerEl);
						this.containerEl.append(this.$el);
					},
					_announceObserverChange: function(){
						var total = this.countItems();
						this.observer.trigger('on:changeTotal', total);
					},
					addItem: function(){
						console.log('TodoContainer::addItem', arguments[0]);
						this.$el.append(arguments[0].$el);
						this._subviews.push(arguments[0]);
						this._announceObserverChange();
					},
					removeItem: function(idx){
						// var $elem = this._subviews[idx].$el;
						this._subviews[idx].remove();
						this._subviews.splice(idx,1);
						this._announceObserverChange();
						// console.log( this.$el.find($elem) );
					},
					removeItemByReference: function(viewObj){
						var viewIdx = this._getItemIndex(viewObj);
						this.removeItem(viewIdx);
					},
					countItems: function(){
						return this._subviews.length;
					},
					filterCheckedItems: function(){
						for (var i = 0; i < this._subviews.length; i++){
							if ( this._subviews[i].checked !== 'false' ) {
								this._subviews[i].$el.addClass('hide_tmp');
							}
						}
					},
					showAll: function(){
						for (var i = 0; i < this._subviews.length; i++){
							this._subviews[i].$el.removeClass('hide_tmp');						
						}
					},
					showStats: function(){
						var total = this.countItems();
						$('#info_box').html(total + ' Items');
					},
					_getItemIndex: function(viewObj){
						for (var i = 0, arrLen = this._subviews.length; i < arrLen; i++ ){
							if ( this._subviews[i] === viewObj ) return i;
						}
					},

				})


		});

	})(UI);	

	return UI;

});				