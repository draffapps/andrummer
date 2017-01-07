var HomeView = function (service) {
    var employeeListView;

    this.initialize = function () {
        // Define a div wrapper for the view (used to attach events)
        this.$el = $('<div/>');
        this.render();
    };
    
    this.render = function() {
        this.$el.html(this.template());
        return this;
    };

    this.initialize();
}

HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());