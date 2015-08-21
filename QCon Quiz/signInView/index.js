'use strict';

app.signInView = kendo.observable({
    onShow: function () {}
});
(function (parent) {
    var provider = app.data.defaultProvider,
        signinSuccess =
        function (data) {
            app.user = data.result;
            app.mobileApp.navigate('dataListView/view.html');
        },
        signinInit =
        function () {
            if (provider.setup.offlineStorage && !app.isOnline()) {
                $('.signin-view').hide().siblings().show();
            } else {
                $('.signin-view').show().siblings().hide();
            }
        },
        registerViewModel = kendo.observable({
            register: function () {
                app.mobileApp.navigate('registerView/view.html');
            }
        }),
        signInViewModel = kendo.observable({
            username: '',
            password: '',
            signin: function () {
                provider.Users.login(signInViewModel.username, signInViewModel.password,
                    function (data) {
                        if (data && data.result) {
                            signinSuccess(data);
                        } else {
                            signinInit();
                        }
                    },
                    function (err) {
                        alert('Não foi possivel conenctar!', '');
                        signinInit();
                    })
            }
        });

    parent.set('signInViewModel', signInViewModel);
    parent.set('registerViewModel', registerViewModel);
    parent.set('onShow', function () {
        provider.Users.currentUser().then(
            function (data) {
                if (data && data.result) {
                    signinSuccess(data);
                } else {
                    signinInit();
                }
            },
            signinInit
        );
    });
})(app.signInView);