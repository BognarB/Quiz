'use strict';

app.registerView = kendo.observable({
    onShow: function () {}
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
//            var aux = kendo.mobile.Application();
  //          aux.hideLoading();
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
            username: '',
            password: '',
            email: '',
            register: function () {
    //            var aux = kendo.mobile.Application();
      //          aux.showLoading();
                var attrs = {
                    Email: registerViewModel.email
                };
                provider.Users.register(registerViewModel.username, registerViewModel.password, attrs,
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