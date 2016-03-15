(function($) {
  $(document).ready(function() {
  
     
  // Royal Slider
$('#home-slider').royalSlider({
    arrowsNav: true,
    loop: true,
    keyboardNavEnabled: true,
    controlsInside: false,
    imageScaleMode: 'fill',
    arrowsNavAutoHide: false,
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 695,
    controlNavigation: 'none',
    thumbsFitInViewport: false,
    navigateByClick: true,
    startSlideId: 0,
    transitionType:'move',
    globalCaption:  false,
    autoPlay:  {
    		// autoplay options go gere
    		enabled: false,
    		delay: 6000
    	}
  });
  
  /*  jQuery('#camera_wrap_4, #camera_wrap_5').camera({
				height: '695px',
				fx: 'simpleFade',
				loader: 'none',
				pagination: false,
				thumbnails: false,
				hover: false,
				overlayer: false,
				opacityOnGrid: false,
				imagePath: ''
			});*/
			
   /* jQuery('#camera_wrap_5').camera({
    			autoAdvance: false,
				height: '695px',
				fx: 'simpleFade',
				loader: 'none',
				pagination: false,
				thumbnails: false,
				hover: false,
				overlayer: false,
				opacityOnGrid: false,
				imagePath: ''
			});
			*/



/*
 $(".scroll").click(function(event){
         event.preventDefault();
         //calculate destination place
         var dest=0;
         if($(this.hash).offset().top > $(document).height()-$(window).height()){
              dest=$(document).height()-$(window).height();
         }else{
              dest=$(this.hash).offset().top;
         }
         //go to destination
         $('html,body').animate({scrollTop:dest}, 1000,'swing');
     });

			
  // REsponsive Image Map
  $('img[usemap]').rwdImageMaps();
*/

  
  });
  
   

}(jQuery));