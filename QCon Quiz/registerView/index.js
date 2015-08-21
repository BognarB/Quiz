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
    var provider = app.data.defaultProvider,
        signupSuccess =
        function (data) {
            app.user = data.result;
            app.mobileApp.navigate('signInView/view.html');
        },
        signupInit =
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
                app.mobileApp.navigate('signInView/view.html');
            }
        }),
        registerViewModel = kendo.observable({
            displayName: '',
            company: '',
            password: '',
            email: '',
            register: function () {
                var attrs = {
                    DisplayName: registerViewModel.displayName,
                    Company: registerViewModel.company,
                    Email: registerViewModel.email
                };
                app.mobileApp.pane.loader.show();
                provider.Users.register(registerViewModel.email, registerViewModel.password, attrs,
                    function (data) {
                        if (data && data.result) {
                            signupSuccess(data);
                        }
                    },
                    signupInit
                );
            }
        });

    parent.set('signInViewModel', signInViewModel);
    parent.set('registerViewModel', registerViewModel);
    parent.set('onShow', function () {
        signupInit();
    });
})(app.registerView);