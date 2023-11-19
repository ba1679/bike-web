(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d657f36"],{1134:function(t,e,i){var s;
/** @license
 *
 *  Copyright (C) 2012 K. Arthur Endsley (kaendsle@mtu.edu)
 *  Michigan Tech Research Institute (MTRI)
 *  3600 Green Court, Suite 100, Ann Arbor, MI, 48105
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */(function(o,r){s=function(){return r()}.call(e,i,e,t),void 0===s||(t.exports=s)})(0,(function(){var t,e,i;return this,i=function(t){return t instanceof i?t:this instanceof i?void(this._wrapped=t):new i(t)},t=function(t,e){return t.substring(0,e.length)===e},e=function(t,e){return t.substring(t.length-e.length)===e},i.delimiter=" ",i.isArray=function(t){return!(!t||t.constructor!==Array)},i.trim=function(i,s){s=s||" ";while(t(i,s))i=i.substring(1);while(e(i,s))i=i.substring(0,i.length-1);return i},i.Wkt=function(t){this.delimiter=i.delimiter||" ",this.wrapVertices=!0,this.regExes={typeStr:/^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,spaces:/\s+|\+/,numeric:/-*\d+(\.*\d+)?/,comma:/\s*,\s*/,parenComma:/\)\s*,\s*\(/,coord:/-*\d+\.*\d+ -*\d+\.*\d+/,doubleParenComma:/\)\s*\)\s*,\s*\(\s*\(/,ogcTypes:/^(multi)?(point|line|polygon|box)?(string)?$/i,crudeJson:/^{.*"(type|coordinates|geometries|features)":.*}$/},this._stripWhitespaceAndParens=function(t){var e=t.trim(),i=e.replace(/^\(?(.*?)\)?$/,"$1");return i},this.components=void 0,t&&"string"===typeof t?this.read(t):t&&void 0!==typeof t&&this.fromObject(t)},i.Wkt.prototype.isCollection=function(){switch(this.type.slice(0,5)){case"multi":return!0;case"polyg":return!0;default:return!1}},i.Wkt.prototype.sameCoords=function(t,e){return t.x===e.x&&t.y===e.y},i.Wkt.prototype.fromObject=function(t){var e;return e=t.hasOwnProperty("type")&&t.hasOwnProperty("coordinates")?this.fromJson(t):this.deconstruct.call(this,t),this.components=e.components,this.isRectangle=e.isRectangle||!1,this.type=e.type,this},i.Wkt.prototype.toObject=function(t){var e=this.construct[this.type].call(this,t);return"object"!==typeof e||i.isArray(e)||(e.properties=this.properties),e},i.Wkt.prototype.toString=function(t){return this.write()},i.Wkt.prototype.fromJson=function(t){var e,s,o,r,n,a;if(this.type=t.type.toLowerCase(),this.components=[],t.hasOwnProperty("geometry"))return this.fromJson(t.geometry),this.properties=t.properties,this;if(r=t.coordinates,i.isArray(r[0])){for(e in r)if(r.hasOwnProperty(e))if(i.isArray(r[e][0])){for(s in a=[],r[e])if(r[e].hasOwnProperty(s))if(i.isArray(r[e][s][0])){for(o in n=[],r[e][s])r[e][s].hasOwnProperty(o)&&n.push({x:r[e][s][o][0],y:r[e][s][o][1]});a.push(n)}else a.push({x:r[e][s][0],y:r[e][s][1]});this.components.push(a)}else"multipoint"===this.type?this.components.push([{x:r[e][0],y:r[e][1]}]):this.components.push({x:r[e][0],y:r[e][1]})}else this.components.push({x:r[0],y:r[1]});return this},i.Wkt.prototype.toJson=function(){var t,e,s,o,r,n,a;if(t=this.components,e={coordinates:[],type:function(){var t,e,i;for(t in e=this.regExes.ogcTypes.exec(this.type).slice(1),i=[],e)e.hasOwnProperty(t)&&void 0!==e[t]&&i.push(e[t].toLowerCase().slice(0,1).toUpperCase()+e[t].toLowerCase().slice(1));return i}.call(this).join("")},"box"===this.type.toLowerCase()){for(s in e.type="Polygon",e.bbox=[],t)t.hasOwnProperty(s)&&(e.bbox=e.bbox.concat([t[s].x,t[s].y]));return e.coordinates=[[[t[0].x,t[0].y],[t[0].x,t[1].y],[t[1].x,t[1].y],[t[1].x,t[0].y],[t[0].x,t[0].y]]],e}for(s in t)if(t.hasOwnProperty(s))if(i.isArray(t[s])){for(o in a=[],t[s])if(t[s].hasOwnProperty(o))if(i.isArray(t[s][o])){for(r in n=[],t[s][o])t[s][o].hasOwnProperty(r)&&n.push([t[s][o][r].x,t[s][o][r].y]);a.push(n)}else t[s].length>1?a.push([t[s][o].x,t[s][o].y]):a=a.concat([t[s][o].x,t[s][o].y]);e.coordinates.push(a)}else t.length>1?e.coordinates.push([t[s].x,t[s].y]):e.coordinates=e.coordinates.concat([t[s].x,t[s].y]);return e},i.Wkt.prototype.merge=function(t){var e=this.type.slice(0,5);if(this.type!==t.type&&this.type.slice(5,this.type.length)!==t.type)throw TypeError("The input geometry types must agree or the calling this.Wkt.Wkt instance must be a multigeometry of the other");switch(e){case"point":this.components=[this.components.concat(t.components)];break;case"multi":this.components=this.components.concat("multi"===t.type.slice(0,5)?t.components:[t.components]);break;default:this.components=[this.components,t.components];break}return"multi"!==e&&(this.type="multi"+this.type),this},i.Wkt.prototype.read=function(t){var e;if(e=this.regExes.typeStr.exec(t),e)this.type=e[1].toLowerCase(),this.base=e[2],this.ingest[this.type]&&(this.components=this.ingest[this.type].apply(this,[this.base]));else{if(!this.regExes.crudeJson.test(t))throw console.log("Invalid WKT string provided to read()"),{name:"WKTError",message:"Invalid WKT string provided to read()"};if("object"!==typeof JSON||"function"!==typeof JSON.parse)throw console.log("JSON.parse() is not available; cannot parse GeoJSON strings"),{name:"JSONError",message:"JSON.parse() is not available; cannot parse GeoJSON strings"};this.fromJson(JSON.parse(t))}return this},i.Wkt.prototype.write=function(t){var e,i,s;for(t=t||this.components,i=[],i.push(this.type.toUpperCase()+"("),e=0;e<t.length;e+=1){if(this.isCollection()&&e>0&&i.push(","),!this.extract[this.type])return null;s=this.extract[this.type].apply(this,[t[e]]),this.isCollection()&&"multipoint"!==this.type?i.push("("+s+")"):(i.push(s),e!==t.length-1&&"multipoint"!==this.type&&i.push(","))}return i.push(")"),i.join("")},i.Wkt.prototype.extract={point:function(t){return String(t.x)+this.delimiter+String(t.y)},multipoint:function(t){var e,i,s=[];for(e=0;e<t.length;e+=1)i=this.extract.point.apply(this,[t[e]]),this.wrapVertices&&(i="("+i+")"),s.push(i);return s.join(",")},linestring:function(t){return this.extract.point.apply(this,[t])},multilinestring:function(t){var e,i=[];if(t.length)for(e=0;e<t.length;e+=1)i.push(this.extract.linestring.apply(this,[t[e]]));else i.push(this.extract.point.apply(this,[t]));return i.join(",")},polygon:function(t){return this.extract.multilinestring.apply(this,[t])},multipolygon:function(t){var e,i=[];for(e=0;e<t.length;e+=1)i.push("("+this.extract.polygon.apply(this,[t[e]])+")");return i.join(",")},box:function(t){return this.extract.linestring.apply(this,[t])},geometrycollection:function(t){console.log("The geometrycollection WKT type is not yet supported.")}},i.Wkt.prototype.ingest={point:function(t){var e=i.trim(t).split(this.regExes.spaces);return[{x:parseFloat(this.regExes.numeric.exec(e[0])[0]),y:parseFloat(this.regExes.numeric.exec(e[1])[0])}]},multipoint:function(t){var e,s,o;for(s=[],o=i.trim(t).split(this.regExes.comma),e=0;e<o.length;e+=1)s.push(this.ingest.point.apply(this,[o[e]]));return s},linestring:function(t){var e,i,s;for(i=this.ingest.multipoint.apply(this,[t]),s=[],e=0;e<i.length;e+=1)s=s.concat(i[e]);return s},multilinestring:function(t){var e,s,o,r;for(s=[],r=i.trim(t).split(this.regExes.doubleParenComma),1===r.length&&(r=i.trim(t).split(this.regExes.parenComma)),e=0;e<r.length;e+=1)o=this._stripWhitespaceAndParens(r[e]),s.push(this.ingest.linestring.apply(this,[o]));return s},polygon:function(t){var e,s,o,r,n,a;for(a=i.trim(t).split(this.regExes.parenComma),o=[],e=0;e<a.length;e+=1){for(n=this._stripWhitespaceAndParens(a[e]).split(this.regExes.comma),r=[],s=0;s<n.length;s+=1){var c=n[s].split(this.regExes.spaces);if(c.length>2&&(c=c.filter((function(t){return""!=t}))),2===c.length){var p=c[0],h=c[1];r.push({x:parseFloat(p),y:parseFloat(h)})}}o.push(r)}return o},box:function(t){var e,i,s;for(i=this.ingest.multipoint.apply(this,[t]),s=[],e=0;e<i.length;e+=1)s=s.concat(i[e]);return s},multipolygon:function(t){var e,s,o,r;for(s=[],r=i.trim(t).split(this.regExes.doubleParenComma),e=0;e<r.length;e+=1)o=this._stripWhitespaceAndParens(r[e]),s.push(this.ingest.polygon.apply(this,[o]));return s},geometrycollection:function(t){console.log("The geometrycollection WKT type is not yet supported.")}},i}))},b59c:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container-fluid position-relative px-0"},[e("LMap",{ref:"map",staticClass:"w-100",staticStyle:{height:"calc(100vh - 100px)"},attrs:{id:"map",zoom:t.zoom,center:t.center,zoomAnimation:!0,"max-zoom":19}},[e("LTileLayer",{attrs:{options:t.layerOptions,"tile-layer-class":t.tileLayerClass}}),t.geoJsonData.features.length?e("LGeoJson",{attrs:{geojson:t.geoJsonData,options:t.geoJsonOptions}}):t._e()],1),e("SearchCard",{attrs:{cities:t.cities,areaList:t.areaList,"key-word":t.keyWord,"city-select":t.citySelect,"area-select":t.currArea,inputPlaceholder:"請輸入路線關鍵字(非必填)",searchCardShow:t.searchCardShow},on:{"update:keyWord":[function(e){t.keyWord=e},function(e){t.keyWord=e}],"update:key-word":function(e){t.keyWord=e},"update:citySelect":function(e){t.citySelect=e},"update:city-select":function(e){t.citySelect=e},"update:areaSelect":function(e){t.currArea=e},"update:area-select":function(e){t.currArea=e},loadCityData:t.searchShapeData,cleanAreaSelect:t.cleanAreaSelect,toggleSearchCard:t.toggleSearchCard},scopedSlots:t._u([{key:"title",fn:function(){return[e("h2",{staticClass:"card-title letter-5"},[t._v("路線搜尋")])]},proxy:!0}])})],1)},o=[],r=(i("14d9"),i("e11e")),n=i.n(r),a=i("044a"),c=i("e192"),p=i.n(c),h=(i("0351"),i("ac6d"),i("6cc5"),i("1134")),l=i.n(h),u=i("2f62"),y=i("6452");window.mapboxgl=p.a;var m={name:"Route",components:{SearchCard:y["a"],LGeoJson:a["a"]},computed:{...Object(u["c"])(["cities"]),...Object(u["c"])("route",["areaSelect","noData"]),...Object(u["b"])({isMobile:"isMobile",routesData:"route/filteredRoutes"}),areaList(){return this.cities.find(t=>t.CityEngName===this.citySelect).AreaList},currArea:{get(){return this.areaSelect},set(t){this.$store.commit("route/SET_AREA_SELECT",t)}},center(){const[t]=this.geoJsonData.features;if(t&&t){const[e,i]=t.geometry.coordinates[0][0];return[i,e]}return[23.58259486,120.58552886]}},data(){return{map:null,zoom:13,tileLayerClass:(t,e)=>n.a.mapboxGL(e),layerOptions:{accessToken:"pk.eyJ1IjoiaHNpbmh1aSIsImEiOiJja3Z3NnFrejIwNWd6Mm9uMDNiNGJ0bGxkIn0.xezbS4RWCo5XLQQLjZVc_g",style:"mapbox://styles/mapbox/streets-v11",attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',tileSize:512,zoomOffset:-1},keyWord:"",citySelect:"Taipei",geoJsonData:{features:[]},geoJsonOptions:{style:function(){return{weight:7,color:"#0D706D"}},onEachFeature:function(t,e){const i=t.properties;e.bindPopup(`\n           <div class="card popup">\n              <div class="card-body">\n                <h3>${i.name}</h3>\n                <p>${i.city}</p>\n                <p>${i.start} - ${i.end}</p>\n                <p>全長: ${i.cyclingLength}</p>\n              </div>\n            </div>\n          `,{minWidth:250})}},searchCardShow:!0}},methods:{loadBikeShapeData(t=this.citySelect){return this.$store.dispatch("setIsLoading",!0),this.$store.dispatch("route/getCityRouteShape",{city:t,keyword:this.keyWord}).then(()=>{this.$store.dispatch("setIsLoading",!1)}).catch(t=>{this.$store.dispatch("setIsLoading",!1),console.log(t)})},polyRouteLine(){const t=new l.a.Wkt;this.geoJsonData={features:[]},this.routesData.forEach(e=>{this.geoJsonData.features.push({type:"Feature",geometry:t.read(e.Geometry).toJson(),properties:{name:e.RouteName,city:e.City,start:e.RoadSectionStart?e.RoadSectionStart:"無提供起點",end:e.RoadSectionEnd?e.RoadSectionEnd:"無提供終點",cyclingLength:e.CyclingLength?e.CyclingLength+" m":"-"}})})},searchShapeData(){return this.loadBikeShapeData().then(()=>{this.map.flyTo(this.center,10,{animate:!0}),this.isMobile&&(this.searchCardShow=!1)})},getLocationCity(t,e){return this.axios.get(`https://api.nlsc.gov.tw/other/TownVillagePointQuery/${e}/${t}`).then(t=>{const{ctyName:e,townName:i}=t.data,s=this.cities.find(t=>t.CityName===e),o=s.AreaList.find(t=>t.AreaName===i).AreaName;return this.citySelect=s.CityEngName,this.$store.commit("route/SET_AREA_SELECT",o),t})},cleanAreaSelect(){this.$store.commit("route/SET_AREA_SELECT",null)},toggleSearchCard(){this.searchCardShow=!this.searchCardShow}},mounted(){this.$nextTick(()=>{this.map=this.$refs.map.mapObject,navigator.geolocation.getCurrentPosition(t=>{const{latitude:e,longitude:i}=t.coords;this.getLocationCity(e,i).then(()=>{this.loadBikeShapeData(this.citySelect)})})})},watch:{routesData:{deep:!0,handler(){this.polyRouteLine()}},noData(t){t&&alert("查無路線")}}},g=m,d=i("2877"),f=Object(d["a"])(g,s,o,!1,null,null,null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-6d657f36.81d6356b.js.map