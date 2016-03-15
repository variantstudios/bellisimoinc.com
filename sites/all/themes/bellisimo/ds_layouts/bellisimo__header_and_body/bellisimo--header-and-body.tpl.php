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
  <?php if ($header): ?>
    <div class="ds-header<?php print $header_classes; ?> grid-16 alpha">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <?php if ($body): ?>
    <div class="ds-body<?php print $body_classes; ?> grid-16 omega">
      <?php print $body; ?>
    </div>
  <?php endif; ?>
  
</div>