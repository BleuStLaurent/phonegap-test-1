var HomeView = function(store) {
 
	this.render = function() {
	    this.el.html(HomeView['home-tpl']);
	    return this;
	};
	
    this.findByName = function() {
        console.log('findByName');
        store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                employee_list = HomeView['employee-li-tpl'].replace(/:id/g,e.id).replace(/:firstName/g,e.firstName).replace(/:lastName/g,e.lastName).replace(/:title/g,e.title);
                $('.employee-list').append(employee_list);
            }
        });
    };
	
	
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
    };
 
    this.initialize();
 
};
 
HomeView['employee-li-tpl'] = $('#employee-li-tpl').html();
HomeView['home-tpl'] = $('#home-tpl').html();

//HomeView.template = Handlebars.compile($("#home-tpl").html());
//HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());