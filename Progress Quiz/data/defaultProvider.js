'use strict';

(function() {
    app.data.defaultProvider = new Everlive({
        offlineStorage: true,
        apiKey: '7RdaQT8Mej77w11z',
        url: '//platform.telerik.com/bs-api/v1/',
        scheme: 'https'
    });
    
    app.config = {};
    app.data.defaultProvider.data('configuration').get()
        .then(function (data) {
            data.result.forEach(function (config) {
                app.config[config.name] = config.value;
            });

        });

    document.addEventListener("online", function() {
        app.data.defaultProvider.offline(false);
        app.data.defaultProvider.sync();
    });

    document.addEventListener("offline", function() {
        app.data.defaultProvider.offline(true);
    });

}());