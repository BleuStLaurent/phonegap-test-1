var app = {

    findByName: function() {
        console.log('findByName');
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                employee_list = self['employee-li-tpl'].replace(':id',e.id).replace(':firstName',e.firstName).replace(':lastName',e.lastName).replace(':title',e.title);
                $('.employee-list').append(employee_list);
            }
        });
    },
    
    
        
	showAlert: function (message, title) {
	    if (navigator.notification) {
	        navigator.notification.alert(message, null, title, 'OK');
	    } else {
	        alert(title ? (title + ": " + message) : message);
	    }
	},    

	renderHomeView: function() {
	    var html =  $('#home-tpl').html();
	            
	    $('body').append(this['home-tpl']);
	    $('.search-key').on('keyup', $.proxy(this.findByName, this));
	},

	initialize: function() {
	    var self = this;
	    
		this['employee-li-tpl'] = $('#employee-li-tpl').html();
		this['home-tpl'] = $('#home-tpl').html();
	    
	    this.store = new LocalStorageStore(function() {
	        self.renderHomeView();
	    });
	}		
	
	/* 
	
	remove because Setting Up a Single Page Application
	
	alert example
	
	initialize: function() {
	    var self = this;
	    this.store = new LocalStorageStore(function() {
	        self.showAlert('Store Initialized', 'Info');
	    });
	    $('.search-key').on('keyup', $.proxy(this.findByName, this));
	}*/

	/*original function
    initialize: function() {
        this.store = new LocalStorageStore();
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }
    */

};

app.initialize();