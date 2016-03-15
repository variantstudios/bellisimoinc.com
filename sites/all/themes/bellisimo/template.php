<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * 
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

function bellisimo_preprocess_html(&$vars) {
  // Make a list of base themes and the current theme.
  $themes = $GLOBALS['base_theme_info'];
  $themes[] = $GLOBALS['theme_info'];

  foreach (array_keys($themes) as $key) {
    $theme_path = dirname($themes[$key]->filename) . '/';
    if (isset($themes[$key]->info['stylesheets-conditional'])) {
      foreach (array_keys($themes[$key]->info['stylesheets-conditional']) as $condition) {
        foreach (array_keys($themes[$key]->info['stylesheets-conditional'][$condition]) as $media) {
          foreach ($themes[$key]->info['stylesheets-conditional'][$condition][$media] as $stylesheet) {
            // Add each conditional stylesheet.
            drupal_add_css(
              $theme_path . $stylesheet,
              array(
                'group' => CSS_THEME,
                'browsers' => array(
                  'IE' => $condition,
                  '!IE' => FALSE,
                ),
                'every_page' => TRUE,
              )
            );
          }
        }
      }
    }
  }
}

/**
* Implements THEME_preprocess_page()
*/
function bellisimo_preprocess_page(&$vars) {

 //ddebug_backtrace();

}

/**
* Implements THEME_preprocess_node()
*/
function bellisimo_preprocess_node(&$vars) {

}
