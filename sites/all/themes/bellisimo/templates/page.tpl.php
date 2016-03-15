<?php 
/**
 * @file
 * Alpha's theme implementation to display a single Drupal page.
 */
?>


<?php // print render($my_new_region); ?>
<?php // print render($page['my_new_region']); ?>

<?php // if ($page['myregion']): ?>
     <!-- <div id="myregion"> -->
        <?php // print render($page['myregion']); ?>
     <!-- </div> -->
<?php // endif; ?>


  <?php if (isset($page['newzone'])) : ?>
    <?php print render($page['newzone']); ?>
  <?php endif; ?>

<div<?php print $attributes; ?>>

  <?php if (isset($page['header'])) : ?>
    <?php print render($page['header']); ?>
  <?php endif; ?>
  
  <?php if (isset($page['content'])) : ?>
    <?php print render($page['content']); ?>
  <?php endif; ?>  
  
  <?php if (isset($page['footer'])) : ?>
    <?php print render($page['footer']); ?>
  <?php endif; ?>
</div>