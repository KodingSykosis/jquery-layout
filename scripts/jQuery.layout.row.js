(function ($) {
    $.layouts
     .extend({
         row: (function () {
             function applyConfig(element, config) {
                 var css = $.extend({
                     height: 'auto',
                     width: element.width(),
                     position: 'relative',
                     display: 'block',
                     paddingTop: 3,
                     paddingBottom: 3,
                     paddingLeft: 3,
                     paddingRight: 3,
                     marginTop: 0,
                     marginBottom: 0,
                     marginLeft: 1,
                     marginRight: 1,
                     left: 0,
                     top: -1,
                     borderBottom: config.border || '1px solid #CCC',
                     whiteSpace: 'nowrap',
                     boxSizing: 'border-box',
                     overflow: 'hidden'
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

                 css.width -= css.marginLeft * 2;
                 return css;
             }

             return {
                 doLayout: function (config) {
                     var css = applyConfig(this, config);
                     this.children(':visible')
                         .css(css);
                     
                     if (css.borderBottom && css.borderBottom != 'none') {
                         this.children(':visible:first')
                             .css({
                                 borderTop: css.borderBottom,
                                 top: 0
                             });
                     }
                 }
             };
         })()
     });
})(jQuery);