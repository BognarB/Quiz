'use strict';

app.dataListView = kendo.observable({
    onShow: function () {
        app.pane.loader.hide();
    },
    afterShow: function () {}
});

var provider = app.data.defaultProvider;
(function (parent) {
    var dataListViewModel = kendo.observable({
        fields: {
            Q1: '',
            Q2: '',
            Q3: '',
            Q4: '',
            Q5: '',
            Q6: '',
            Q7: '',
            Q8: '',
        },
        submit: function () {
            var userModel = new kendo.data.Model.define({
                fields: {
                    "FirstName": {
                        type: 'string'
                    },
                    "LastName": {
                        type: 'string'
                    },
                    "Company": {
                        type: 'string'
                    },
                    "Q1": {
                        type: 'string'
                    },
                    "Q2": {
                        type: 'string'
                    },
                    "Q3": {
                        type: 'string'
                    },
                    "Q4": {
                        type: 'string'
                    },
                    "Q5": {
                        type: 'string'
                    },
                    "Q6": {
                        type: 'string'
                    },
                    "Q7": {
                        type: 'string'
                    },
                    "Q8": {
                        type: 'string'
                    }
                }
            });
            var url = "http://qcondemo-50158.onmodulus.net";
            var quiz = new kendo.data.DataSource({
                transport: {
                    create: {
                        url: url + '/user',
                        type: 'POST'
                    }
                },
                schema: {
                    model: userModel,
                },
            });

            var user
            var success = function (data) {
                user = {
                    FirstName: data.result.Username,
                    Email: data.result.Email,
                    Q1: dataListViewModel.fields.Q1,
                    Q2: dataListViewModel.fields.Q2,
                    Q3: dataListViewModel.fields.Q3,
                    Q4: dataListViewModel.fields.Q4,
                    Q5: dataListViewModel.fields.Q5,
                    Q6: dataListViewModel.fields.Q6,
                    Q7: dataListViewModel.fields.Q7,
                    Q8: dataListViewModel.fields.Q8
                };
                console.log(user);
                quiz.add(new userModel(user));
                quiz.sync();
            }

            provider.Users.currentUser()
                .then(success, function (err) {
                    alert(err);
                });


        }

    });
    parent.set('dataListViewModel', dataListViewModel);
})(app.dataListView);