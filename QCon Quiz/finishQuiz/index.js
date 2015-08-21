'use strict';

app.registerView = kendo.observable({
    onShow: function () {
        app.mobileApp.pane.loader.show();
    },
    afterShow: function () {
        app.mobileApp.pane.loader.hide();
    }
});
(function (parent) {
    var signupInit =
        function () {
            app.mobileApp.pane.loader.hide();
            if (provider.setup.offlineStorage && !app.isOnline()) {
                $('.signup-view').hide().siblings().show();
            } else {
                $('.signup-view').show().siblings().hide();
            }
        },
        signInViewModel = kendo.observable({
            signin: function () {
                app.mobileApp.pane.loader.show();
                app.mobileApp.navigate('signInView/view.html');
            }
        });

    parent.set('signInViewModel', signInViewModel);
    parent.set('onShow', function () {
        signupInit();
    });
})(app.registerView);