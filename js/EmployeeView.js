var EmployeeView = function(e) {
	
	this.render = function() {
        employee = EmployeeView['employee-tpl'].replace(/:id/g,e.id).replace(/:firstName/g,e.firstName).replace(/:lastName/g,e.lastName).replace(/:title/g,e.title).replace(/:officePhone/g,e.officePhone).replace(/:cellPhone/g,e.cellPhone);
	    this.el.html(employee);
	    
	    return this;
	};
	
	this.addLocation = function(event) {
	    event.preventDefault();
	    console.log('addLocation');
	    navigator.geolocation.getCurrentPosition(
	        function(position) {
	            $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
	        },
	        function() {
	            alert('Error getting location');
	        });
	    return false;
	};	

	this.addToContacts = function(event) {
	    event.preventDefault();
	    console.log('addToContacts');
	    if (!navigator.contacts) {
	        app.showAlert("Contacts API not supported", "Error");
	        return;
	    }
	    var contact = navigator.contacts.create();
	    contact.name = {givenName: employee.firstName, familyName: employee.lastName};
	    var phoneNumbers = [];
	    phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
	    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
	    contact.phoneNumbers = phoneNumbers;
	    contact.save();
	    return false;
	};
		 
    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
    };
    
    
 
    this.initialize();
 
 }
 
EmployeeView['employee-tpl'] = $('#employee-tpl').html();
