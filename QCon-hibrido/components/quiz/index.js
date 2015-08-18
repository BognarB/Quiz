'use strict';

app.quiz = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_quiz
// END_CUSTOM_CODE_quiz
(function(parent) {
    var quizModel = kendo.observable({
        fields: {
            dropdownlist: '',
        },
        submit: function() {}
    });

    parent.set('quizModel', quizModel);
})(app.quiz);