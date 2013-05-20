(function ($) {
    $(function () {
        $('.container')
            .resizable()
            .children('.table')
            .layout('row')
            .children('.row')
            .layout('column');
    });
})(jQuery);