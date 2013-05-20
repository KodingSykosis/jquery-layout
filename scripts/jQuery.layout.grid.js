(function ($) {
    /**
        Options:
            * columns: [{
                name: '',
                header: 'selector' | jObject,
                resizable: true | false,
                size: 123,
                minSize: 80,
                maxSize: 321
            }]

        Methods:
            value('row Index', 'column index' || 'column name') returns the value of the first :input in the cell
            rows('row Index') returns an array like object of columns
            width('column index' || 'column name') returns the current width for the specified column
            height('row index') returns the current height for the specified row
            column('column index' || 'column name') returns a jQuery object with each cell for the column

        Notes:
            The row and column layout should do most of the work.
            This layout is designed to glue them together, and treat all cells
                within a column the same.
    */

    $.layouts
        .extend({
            grid: (function () {

                function applyConfig(element, config) {
                }

                return {
                    doLayout: function (element, config) {
                        var css = applyConfig(element, config);
                        element.children(':visible')
                            .css(css);
                    }
                };
            })()
        });
})(jQuery);