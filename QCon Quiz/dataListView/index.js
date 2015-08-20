'use strict';

app.dataListView = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var dataProvider = app.data.defaultProvider;
    var processImage = function(img) {
        if (!img) {
            var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
            img = 'data:image/png;base64,' + empty1x1png;
        } else if (img.slice(0, 4) !== 'http' &&
            img.slice(0, 2) !== '//' &&
            img.slice(0, 5) !== 'data:') {
            var setup = dataProvider.setup;
            img = setup.scheme + ':' + setup.url + setup.apiKey + '/Files/' + img + '/Download';
        }

        return img;
    };

    var dataSource = new kendo.data.DataSource({
        type: 'everlive',
        transport: {
            typeName: 'Northwind',
            dataProvider: dataProvider
        },
        schema: {
            model: {
                fields: {
                    FirstName: {
                        field: 'FirstName',
                        defaultValue: ''
                    },
                    LastName: {
                        field: 'LastName',
                        defaultValue: ''
                    },
                }
            }
        },
    });

    var dataListViewModel = kendo.observable({
        dataSource: dataSource,
        itemClick: function(e) {
            app.mobileApp.navigate('#dataListView/details.html?uid=' + e.dataItem.uid);
        },
        detailsShow: function(e) {
            var item = e.view.params.uid,
                itemModel = dataSource.getByUid(item);
            itemModel.photoUrl = processImage(itemModel.photo);
            dataListViewModel.set('currentItem', itemModel);
        },
        currentItem: null
    });

    parent.set('dataListViewModel', dataListViewModel);
})(app.dataListView);