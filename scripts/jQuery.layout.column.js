(function($) {
    $.layouts
        .extend({
            column: (function () {
                function applyConfig(element, config) {
                    var count = element.children(':visible').length;
                    var parentPadding = 0;
                    var width = element.width();

                    parentPadding += parseInt(element.css('padding-left'));
                    parentPadding += parseInt(element.css('padding-right'));
                    width -= Math.floor(parentPadding * (count / 2));
                    width -= width % 2 == 0 ? 0 : (count * 2);
                    width /= count;
                    
                    var css = $.extend({
                        height: element.height(),
                        width: width,
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingLeft: 3,
                        paddingRight: 3,
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        borderBottom: config.border || '1px solid #CCC',
                        boxSizing: 'border-box',
                        display: 'inline-block'
                    }, config);

                    if (css.margin) {
                        if (typeof css.margin === 'object') {
                            css.marginTop = css.margin.top;
                            css.marginBottom = css.margin.bottom;
                        } else {
                            css.marginTop = css.marginBottom = css.margin;
                        }

                        delete css.margin;
                    }

                    if (css.padding) {
                        if (typeof css.padding === 'object') {
                            css.paddingTop = css.padding.top;
                            css.paddingBottom = css.padding.bottom;
                            css.paddingLeft = css.padding.left;
                            css.paddingRight = css.padding.right;
                        } else {
                            css.paddingTop = css.paddingBottom =
                                css.paddingLeft = css.paddingRight =
                                css.padding;
                        }

                        delete css.padding;
                    }
                    
                    var vertPadding = 0;
                    var horiPadding = 0;

                    vertPadding += parseInt(element.css('padding-top'));
                    vertPadding += parseInt(element.css('padding-bottom'));
                    vertPadding += parseInt(element.css('border-top'));
                    vertPadding += parseInt(element.css('border-bottom'));
                    vertPadding += css.marginTop;
                    vertPadding += css.marginBottom;
                    vertPadding /= count;
                    css.height -= vertPadding;
                    

                    horiPadding += parseInt(element.css('border-left'));
                    horiPadding += parseInt(element.css('border-right'));
                    horiPadding += css.marginLeft;
                    horiPadding += css.marginRight;
                    horiPadding /= count;
                    css.width -= horiPadding;

                    return css;
                }

                return {
                    doLayout: function (config) {
                        var css = applyConfig(this, config);
                        this.children(':visible')
                            .css(css);
                    }
                };
            })()
        });
})(jQuery);