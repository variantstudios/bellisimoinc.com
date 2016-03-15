<div<?php print $attributes; ?>>
  <div<?php print $content_attributes; ?>>
    <?php if ($main_menu || $secondary_menu): ?>
    <nav class="navigation">
      <?php print theme('links__menu_sub_navigation', array(
          'links' => menu_navigation_links('menu-sub-navigation'),
          'attributes' => array(
            'id' => 'sub-navigaiton',
            'class' => array('links', 'clearfix',)
          ),
          'heading' => array(
            'text' => t('Sub Navigation'),
            'level' => 'h2',
            'class' => array('element-invisible'),
          ))); ?>
    </nav>
    <?php endif; ?>
    <?php print $content; ?>
  </div>
</div>
