<?php

/**
 * @file
 * Display Suite Bellisimo - Header and Left/Right configuration.
 */

function ds_bellisimo__header_and_body() {
  return array(
    'label' => t('Bellisimo - Header and Body'),
    'regions' => array(
      'header' => t('Header'),
      'body' => t('Body'),
    ),
    // Uncomment if you want to include a CSS file for this layout (bellisimo__header_and_leftright.css)
     'css' => TRUE,
    // Uncomment if this is a template for a node form.
    // 'form' => TRUE,
  );
}
