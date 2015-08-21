var notification = $("#popupNotification").kendoNotification({
    templates: [{
        type: 'warning',
        template: "<div class='warningPopup'> #= myMessage # </div>"
    },{
        type: 'error',
        template: "<div class='errorPopup'> #= myMessage # </div>"
    }],
    position: {
        top: '85%',
        left: '15%'
    }
}).data('kendoNotification');