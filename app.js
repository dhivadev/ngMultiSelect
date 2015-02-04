// app.js
var multiSelectApp = angular.module('multiSelectApp',[]);
multiSelectApp.controller("multiSelectController", function($scope){

});
multiSelectApp.directive("textBoxx", function(){
	 var template = "<div ng-show='filtering'><input type='text' ng-model='query' class='textBox'/></div>";
	 return {
	 	restrict:"AEC",
	 	template:template
	 }
	});
multiSelectApp.directive("multiSelect", function(){
 var template =  "<div class='multiSelectContainer'><div class='titleSelect'  ng-click='toggleAction()'>";
 	 template += "<span ng-show='titleShow'>Select Technology</span><span class='selecteditem'>{{selecteditems}}</span></div>";
 	 template += "<div class='filterAndDropdown' ng-hide='dropDowncontent'><text-boxx></text-boxx>";
 	 //template += "<div ng-show='filtering'><input type='text' ng-model='query' class='textBox'/></div>";
 	 template += "<ul class='menuDrop'><li ng-repeat='item in config.data | filter:query'>";
 	 template += "<input type={{inputType}} name={{type}} ng-checked='isChecked(item)' ng-click='checkboxClick(item)'/> {{item}}</li></ul></div></div>";
	 return {
	 	restrict:"AEC",
	 	template:template,
	 	scope:{
	 		filtering:"@",
	 		type:"@"
	 	},
	 	link:function(scope, element, attrs, controller){
	 		//$compile(element.contents())(scope);
	 	},
	 	compile:function(){

	 	},
	 	controller:function($scope){
	 		/*Show multiple and single selection depends on the configuration*/
	 		if($scope.type === "multiple"){
	 			$scope.inputType = "checkbox";	
	 		}else if($scope.type === "single"){
	 			$scope.inputType = "radio";	 			
	 		}else{
	 			$scope.inputType = "checkbox";	 
	 		}
	 		/*configuration for the data populated  in the options*/
			$scope.config = {
				data:['html', 'css', 'javascript', 'php']
			};	 		
			$scope.selecteditems = "";
			$scope.titleShow = true;
			var selecteditem = [];	
			/*Method for populating the selected value in a div element*/
			$scope.checkboxClick = function(item){
				var idx = selecteditem.indexOf(item);
					if($scope.inputType ==="radio"){
						selecteditem = [];
					}
				    if (idx > -1) {
				      selecteditem.splice(idx, 1);
				    }else {
				      selecteditem.push(item);
				    }

					$scope.selecteditems = selecteditem.join();

				    if(selecteditem.length>0){
				    	$scope.titleShow = false 
				    }else{
				    	$scope.titleShow = true
				    }
				}
			$scope.isChecked = function (item) {
			 	return selecteditem.indexOf(item) > -1;
			}									
	 		$scope.dropDowncontent = true;
	 		$scope.toggleAction = function(){
	 			$scope.dropDowncontent = !$scope.dropDowncontent;
	 		}
	 	}
	 }
});
