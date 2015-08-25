'use strict';

app.dataListView = kendo.observable({
    onShow: function () {
        app.mobileApp.pane.loader.show();
    },
    afterShow: function () {
        app.mobileApp.pane.loader.hide();
    }
});

var provider = app.data.defaultProvider;
(function (parent, user) {
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
        }),
        finishQuizInit = function(){
            app.mobileApp.pane.loader.hide();
            app.mobileApp.navigate('finishQuiz/view.html');
        },
        dataListViewModel = kendo.observable({
            user: {
                FirstName: '',
                Email: '',
                Company: '',
                Q1: '1',
                Q2: '1',
                Q3: '1',
                Q4: '1',
                Q5: '1',
                Q6: '1',
                Q7: '1',
                Q8: '1',
            },
            submit: function () {
				app.mobileApp.pane.loader.show();
                
                var url = app.config.modulus;
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

                var sendQuestions = function (data) {
                    
                    
                    dataListViewModel.user.FirstName = data.result.DisplayName;
                    dataListViewModel.user.Email = data.result.Email;
                    dataListViewModel.user.Company = data.result.Company;
                    if(!app.user.sent){
                    	app.user.sent = true;
                    	quiz.add(new userModel(dataListViewModel.user));
                    	quiz.sync();
                    } else {
                         notification.show("Você já enviou suas questões!");
                    }
                    
                    finishQuizInit();
                }
				
                provider.Users.currentUser()
                    .then(sendQuestions, function (err) {
                        notification.show(err.message);
                    });
            }
        });
    parent.set('dataListViewModel', dataListViewModel);
})(app.dataListView, app.user);