(function ($) {
  "use strict"
  
  /**
   * Oops!! No JQuery, I'm out.
   */
  if (!$) {
    return;
  }
  
  /**
   * simplebox is already initialized.
   */
  if ($.fn.simplebox) {
    return;
  }

  /**
   * Defaults options
   */
  var defaults = {
    modalClass: '',
    fadeDuration: 200,
    slideShow: false,
    loading: true
  }

  /**
   * initilize dom structure
   * @param {object} options 
   */
  function initialize(options) {
    var simpleboxRef = {
      $modal: $('<div class="simplebox-modal ' + options.modalClass + '" style="display: none;"></div>'),
      $modalContent: $('<div class="simplebox-content"></div>'),
      $modalTarget: $('<img class="simplebox-img" src="" alt="" style="display: none;">'),
      $loader: $('<div class="simplebox-loader" style="display: none;"></div>')
    };
    simpleboxRef.$modalTarget.appendTo(simpleboxRef.$modalContent);
    simpleboxRef.$loader.appendTo(simpleboxRef.$modal);
    simpleboxRef.$modalContent.appendTo(simpleboxRef.$modal);
    simpleboxRef.$modal.appendTo('body');
    
    simpleboxRef.$modal.click(function(e) {
      simpleboxRef.$modal.fadeOut(options.fadeDuration);
      simpleboxRef.$modalTarget.attr('src', '');
    });
    
    simpleboxRef.$modalContent.click(function(e) {
      e.stopPropagation();
    });

    if (options.loading) {
      simpleboxRef.$modalTarget.on('load', function() {
        simpleboxRef.$loader.fadeOut({
          duration: 100,
          complete: function() {
            simpleboxRef.$modalTarget.fadeIn({
              duration: 200,
              complete: function() {
                simpleboxRef.$modalTarget.removeAttr('style');
              } 
            })
          }
        });
      })
    }

    $.simplebox = {};
    $.simplebox.defaults = defaults;
    $.simplebox.$modal = simpleboxRef.$modal;
    $.simplebox.$modalTarget = simpleboxRef.$modalTarget;
    $.simplebox.$loader = simpleboxRef.$loader;
  };

  /**
   * open the modal
   * @param {Event} e 
   * @param {Object} options 
   */
  function open(e, options) {

    /**
     * This item is already opened by another handler
     */
    if (e && e.isDefaultPrevented()) {
      return;
    };
    e.preventDefault();

    var $target = $(e.currentTarget);
    $.simplebox.$modal.fadeIn({
      duration: options.fadeDuration,
      complete: function() {
        $.simplebox.$modalTarget.removeAttr('style');
        options.complete && options.complete();
      } 
    });
    $.simplebox.$modalTarget.attr('src', $target.attr('src') || $target.attr('href'));
    if (options.loading) {
      $.simplebox.$loader.removeAttr('style');
    } else {
      $.simplebox.$modalTarget.removeAttr('style');
    }
    
  };
  
  $.fn.simplebox = function(options) {
    var settings = $.extend(defaults, options);
    if (!$.simplebox) {
      initialize(settings);
    }
    this.off('click');
    return this.click(function(e) {
      open(e, settings);
    });
  };
  
  $(document).on('click', '[data-simplebox]', function(e) {
    open(e, defaults);
  });

  $(function() {
    if (!$.simplebox) {
      if ($('[data-simplebox]').length) {
        initialize(defaults);
      }
    }
  });
  
}(jQuery));
