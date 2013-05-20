(function ($) {
    function createInstance(element) {
        var cls = function () { };
        cls.prototype = prototype;

        cls = new cls();
        cls.element = $(element);

        $(element).data('layout', cls);
        return cls;
    }

    $.extend({
        layouts: (function () {
            return {
                extend: $.extend
            };
        })()
    });

    var prototype = {
        init: function(config) {
            $.extend(this, {
                render: $.layouts[config.render || 'row'],
                config: config
            });

            this.element
                .on({
                    resize: $.proxy(this._onResize, this)
                });

            $(window).on({
                resize: $.proxy(this._onResize, this)
            });

            this.refresh();
            return this.element;
        },
        
        refresh: function() {
            this.render
                .doLayout
                .call(this.element, this.config);
        },
        
        render: function(name) {
            if (typeof name !== 'undefined' && $.layouts[name]) {
                this.render = $.layouts[name];
                this.refresh();
            }

            return this.render;
        },
        
        _onResize: function() {
            this.refresh();
        }
    };
    
    $.fn.layout = function (method) {
        var element = $(this);
        if (element.length > 1) {
            var args = arguments;
            this.each(function() {
                $(this).layout.apply(this, args);
            });
            
            return this;
        }

        var cls = element.data('layout');
        var initial = false;
        
        if (typeof cls === 'undefined') {
            cls = createInstance(this);
            initial = true;
        }

        // Method calling logic
        if (cls[method]) {
            return cls[method].apply(cls, Array.prototype.splice.call(arguments, 1));
        } else if (cls && cls.render[method]) {
            return cls.render[method].apply(element, Array.prototype.splice.call(arguments, 1));
        } else if (cls && (typeof method === 'object' || !method)) {
            if (initial) {
                return cls.init.apply(cls, arguments);
            } else {
                cls.refresh();
            }
        } else if (cls && typeof method == 'string' && $.layouts[method]) {
            return cls.init.call(cls, { render: method });
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.layout');
        }

        return this;

    };
})(jQuery);