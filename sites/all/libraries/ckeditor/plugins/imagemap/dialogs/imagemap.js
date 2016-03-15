/*
 * Copyright (c) 2011 SimplyCast
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


function sketchProc(p){
  with(p){

  var img;
  var mouseX,mouseY,pmouseX,pmouseY;
  var context;
  var target;
  var editor;
  var components=[];
  var mapName="";
  var selected = -1;
  var hasMap=false;
  var map;
//  var map= null;

  var ox=0; var oy=0;
  
  p.draw = function() {
    size(img.width,img.height);
    if(context) context.drawImage(img,0,0);

    //DRAW MAPS
    context.strokeStyle="#FF0000";
    context.lineWidth=2;
    
    for(var i in components){
    
    context.lineWidth=2;
    if(i==selected) context.lineWidth=4;
      switch(components[i].shape){
        case "circle":
          ellipse(components[i].coords[0],components[i].coords[1],components[i].coords[2]*2,components[i].coords[2]*2);
          ellipse(components[i].coords[0],components[i].coords[1],3,3);
        break;
        case "rect":
          context.strokeRect(components[i].coords[0],components[i].coords[1],components[i].coords[2]-components[i].coords[0],components[i].coords[3]-components[i].coords[1]);
          ellipse(components[i].coords[0],components[i].coords[1],3,3);
          ellipse(components[i].coords[2],components[i].coords[3],3,3);
        break;
        case "poly":
          context.beginPath();
          context.moveTo(components[i].coords[0],components[i].coords[1]);
          for(var j=2;j<components[i].coords.length;j=j+2){
            context.lineTo(components[i].coords[j],components[i].coords[j+1]);
          }
          context.closePath();
          context.stroke();
        for(var j=0;j<components[i].coords.length;j+=2) 
          ellipse(components[i].coords[j],components[i].coords[j+1],3,3);
        break;
      }
    }
    
    if($("#imageMapModalDiv").length>0) setTimeout(p.draw,1000/60);
  }

  p.ellipse=function(x,y,w,h){
    context.beginPath();
    context.arc(x,y,w/2,0,Math.PI*2,true);
    context.closePath();
    context.stroke();
  }

  p.size=function(w,h){
    $("#imageMapCanvas").attr("width",w).attr("height",h);
    this.width=w;
    this.height=h;
  }

  p.select = function(what){
    if(components.length==0) return;
    if(what>=components.length) what=components.length-1;
    if(selected==what) return; //short cut
    selected=what;
    $($("#imageMapAreas>option")[what]).attr('selected','true');
    $("#imageMapHref").val(components[what].href);
    $("#imageMapAlt").val(components[what].alt);
    $("#imageMapTitle").val(components[what].title);
    if(what<0)  $("#imageMapRegionEdit").hide();
    else $("#imageMapRegionEdit").show();
  }

  p.updateArea=function(){
    components[selected].href=$("#imageMapHref").val();
    components[selected].alt=$("#imageMapAlt").val();
    components[selected].title=$("#imageMapTitle").val();
    $("#imageMapAreas>option[value="+selected+"]").html(components[selected].shape+": "+components[selected].title);
  }

  p.removeArea=function(){
    components.splice(selected,1);
    $($("#imageMapAreas>option")[selected]).remove();
    var options = $("#imageMapAreas>option");
    for(var i=0;i<options.length;i++){
      options[i].setAttribute('value',""+i); //fix the values 
    }

    select(selected);
  }

  p.mouseDragged=function(){
    if(selected>=0) if(handleMouseDragged(selected)) return;

    for(var i=0;i<components.length;i++){
      if(handleMouseDragged(i)) return;
    }
  }

  p.dist=function(x,y,x2,y2){
    x=1.0*x;
    y=1.0*y;
    x2=1.0*x2;
    y2=1.0*y2;
    return Math.sqrt((x-x2)*(x-x2)+(y-y2)*(y-y2));
  }

  p.handleMouseDragged=function(i){
    //console.log("checking "+i);
    switch(components[i].shape){
      case "circle":
        var rad=dist(components[i].coords[0],components[i].coords[1],pmouseX+ox,pmouseY+oy);
      //console.log(rad,components[i].coords[2]);
      if(rad>-4+components[i].coords[2] && rad<4+components[i].coords[2]){
        components[i].coords[2]=dist(components[i].coords[0],components[i].coords[1],mouseX+ox,mouseY+oy);
        select(i);
        return true;
      }
      case "rect":
        case "poly":
        for(var j=0;j+1<components[i].coords.length;j=j+2){
          //console.log(j+","+dist(components[i].coords[j],components[i].coords[j+1],pmouseX+ox,pmouseY+oy)+","+mouseX+","+mouseY+","+pmouseX+","+pmouseY);
          if(dist(components[i].coords[j],components[i].coords[j+1],pmouseX+ox,pmouseY+oy)<4){ //center drag
            components[i].coords[j]=mouseX+ox;
            components[i].coords[j+1]=mouseY+oy;
            select(i);
            return true;
          }
        }
      break;
    }
    return false;
  }

  p.load=function(ckeditor,image){

    editor=ckeditor;
    target = image;
    //console.log("image load: ",image,$(image));
    img=new Image();
    img.src=image.getAttribute('src');
    //console.log(img);
    size(img.width,img.height);

    context=$("#imageMapCanvas")[0].getContext('2d');

    $("#imageMapAreas").html(""); // make sure our map-list is clean
    mapName = image.getAttribute('usemap');
    if(mapName!=undefined) mapName=mapName.replace("#",""); // retrieve possible existing map
    hasMap=false; // never assume a map has been found

    if(mapName==undefined) {
    //console.log("no map has been found. Creating one.");
      mapName = image.getAttribute('src').split('/').reverse()[0];
    } else {
      //console.log("existing imagemap found:" + mapName);

//      console.log(CKEDITOR.dom.element.createFromHtml(editor.getData()));
      maps = editor.document.$.getElementsByTagName("map");
      for (i = 0; i < maps.length; i++) { // searching existing maps
        if (maps[i].getAttribute('name')==mapName.replace("#","")){ // found our map
          //console.log("setting map to: "+maps[i].getAttribute('name'));
          map = maps[i];

          for (ii = 0; ii < map.childNodes.length; ii++){
              //console.log("found matching map area:" +  map.childNodes[ii].getAttribute('title'));
          
              var title = map.childNodes[ii].getAttribute('title');
              var shape = map.childNodes[ii].getAttribute('shape');
              var coords = map.childNodes[ii].getAttribute('coords')
              var alt = map.childNodes[ii].getAttribute('alt');
              var href = map.childNodes[ii].getAttribute('href');

              components.push({'href':href,'alt':alt,'title':title,'shape':shape.toLowerCase(),'coords':coords.split(",")});
              for(var iii in components[components.length-1].coords) {
                components[components.length-1].coords[iii]=parseFloat(components[components.length-1].coords[iii]);
              }
              $("#imageMapAreas").append("<option value='"+(components.length-1)+"'>"+shape+": "+title+"</option>");
              select(components.length-1);
           }

        hasMap=true; // only now do have a map.
        //editor.document.$.documentElement.removeChild(maps[i]);
        //maps[i].parentNode.removeChild(maps[i]);
        }
      }
    }
    if( !hasMap){
      map=new  CKEDITOR.dom.element( 'map' );
      //console.log("Generating image map name:",mapName);
      map.setAttribute('name', mapName); // set name
    }


    //set up mouse handling
    $("#imageMapCanvas").mousedown(function(evt){
          p.mousePressed=true;
          //console.log("down");
        });
    $("#imageMapCanvas").mouseup(function(evt){
          p.mousePressed=false;
          //console.log("up");
        });
    $("#imageMapCanvas").mousemove(function(evt){
        p.pmouseX=p.mouseX;
        p.pmouseY=p.mouseY;
        p.mouseX=evt.pageX-$("#imageMapCanvas").offset().left; //should be offsetX/Y, but FF4 fails
        p.mouseY=evt.pageY-$("#imageMapCanvas").offset().top;
        if(p.mousePressed) p.mouseDragged();
      });
    //console.log("components",components);
  }

  p.addArea=function(href,alt,title,shape,coords){
    //console.log("adding area: "+href+","+alt+","+title+","+shape+","+coords);
    if(shape=='poly' && coords==""){
      var points=prompt("How many sides do you want this polygon to have?","5");
      if(points<3 || points >10){
        alert("You must have more than 2 and less than 10 points");
        return;
      }
      //points++;
      coords="35,20";
      for(var i=1;i<points;i++){
        coords+= ","+(20+15*Math.cos(3.141592*2*i/points))+","+(20+15*Math.sin(3.141592*2*i/points));
      }
      //console.log(coords);
    }
    components[components.length] = {'href':href,'alt':alt,'title':title,'shape':shape.toLowerCase(),'coords':coords.split(",")};
    for(var i in components[components.length-1].coords) components[components.length-1].coords[i]=parseFloat(components[components.length-1].coords[i]);
    $("#imageMapAreas").append("<option value='"+(components.length-1)+"'>"+shape+": "+title+"</option>");
    select(components.length-1);
  }

  p.saveToHtml=function(){
    //save image map name
    target.removeAttribute('id'); // this annoying clutter keeps getting set. Remove it
    //save the map
    if(hasMap){ //create one
      map.parentNode.removeChild(map);

      map=new  CKEDITOR.dom.element( 'map' );
      //console.log("Generating new image map name:",mapName);
      map.setAttribute('name', mapName); // set name
      map.setHtml(""); //truncate contents
    }
    else {
      target.setAttribute('usemap', "#"+mapName);
    }
    //console.log("map   : ",  map.getOuterHtml());

    for(var i=0;i<components.length;i++){
      var h=CKEDITOR.dom.element.createFromHtml("<area href='"+components[i].href+"' alt='"+components[i].alt+"' title='"+components[i].title+"' shape='"+components[i].shape+"' coords='"+components[i].coords.join(',')+"'>");
      //console.log(h);
      map.append(h);
    }
    //console.log("save editor: ",editor);
    // editor.window.$.window
    //console.log("map   : ",  map.getOuterHtml());

    //editor.insertHtml( '<p>This is a new paragraph<p>');
    target.append(map);

    editor.updateElement();    
    $.modal.close();
    }
 
  }
}
