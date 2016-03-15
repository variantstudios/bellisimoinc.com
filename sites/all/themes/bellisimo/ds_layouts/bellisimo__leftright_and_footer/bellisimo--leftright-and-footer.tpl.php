<?php
/**
 * @file
 * Display Suite Bellisimo - Header and Left/Right template.
 *
 * Available variables:
 *
 * Layout:
 * - $classes: String of classes that can be used to style this layout.
 * - $contextual_links: Renderable array of contextual links.
 *
 * Regions:
 *
 * - $header: Rendered content for the "Header" region.
 * - $header_classes: String of classes that can be used to style the "Header" region.
 *
 * - $left: Rendered content for the "Left" region.
 * - $left_classes: String of classes that can be used to style the "Left" region.
 *
 * - $right: Rendered content for the "Right" region.
 * - $right_classes: String of classes that can be used to style the "Right" region.
 */
?>
<div class="<?php print $classes; ?> container-16 clearfix" id="bellisimo-content-container">

  
  <div>
	  <?php if ($left): ?>
	    <div class="ds-left<?php print $left_classes; ?> grid-7 alpha">
	      <?php print $left; ?>
	    </div>
	  <?php endif; ?>
	
	  <?php if ($right): ?>
	    <div class="ds-right<?php print $right_classes; ?> grid-9 omega">
	      <?php print $right; ?>
	    </div>
	  <?php endif; ?>
	</div><!-- /.content-wrapper -->
	
	  <?php if ($footer): ?>
    <div class="ds-footer<?php print $footer_classes; ?> grid-16 alpha">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

</div><!-- container -->