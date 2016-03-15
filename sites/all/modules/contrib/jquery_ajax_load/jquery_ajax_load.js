/**
* @file
* Javascript, modifications of DOM.
*
* Manipulates links to include jquery load funciton
*/

jQuery(document).ready(function() {
  jQuery.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
  });

  var trigger = Drupal.settings.jquery_ajax_load.trigger;
  var target = Drupal.settings.jquery_ajax_load.target;
  // Puede ser más de un valor, hay que usar foreach()
  jQuery(trigger).each(function() {
    var html_string = jQuery(this).attr( 'href' );
    // Hay que validar si la ruta trae la URL del sitio
    jQuery(this).attr( 'href' , target );
    var data_target = jQuery(this).attr( 'data-target' );
    if (typeof data_target === 'undefined' ) {
      data_target = target;
    }
    else {
      data_target = '#' + data_target;
    }
    jQuery(this).click(function() {
      jquery_ajax_load_load(jQuery(this), data_target, html_string);
    });
  });
  jQuery(trigger).removeClass(trigger);
});  

// Handles link calls
function jquery_ajax_load_load(el, target, url) {
  var module_path = Drupal.settings.jquery_ajax_load.module_path;
  var toggle = Drupal.settings.jquery_ajax_load.toggle;
  var animation = Drupal.settings.jquery_ajax_load.animation;
  if( toggle && jQuery(el).hasClass( "jquery_ajax_load_open" ) ) {
    jQuery(el).removeClass( "jquery_ajax_load_open" );
    if ( animation ) {
      jQuery(target).hide('slow', function() {
        jQuery(target).empty();
      });
    }
    else {
      jQuery(target).empty();
    }
  }
  else {
    var loading_html = Drupal.t('Loading'); 
    loading_html += '... <img src="';
    loading_html += module_path;
    loading_html += '/jquery_ajax_load_loading.gif">';
    jQuery(target).html(loading_html);
//  jQuery(target).load(url);
    jQuery(target).load('/jquery_ajax_load/get' + url, function() {
    if ( animation ) {
      jQuery(target).hide();
      jQuery(target).show('slow')
    }
    jQuery(el).addClass( "jquery_ajax_load_open" );
    });
  }
}
