gm.app = new angular.module("gm-tool",[]);
gm.controllers = {};
gm.controllers.main = gm.app.controller("mainCtl",["$scope",function($scope) {
    $scope.state = gm.states.dashboard;
    $scope.states = gm.states;
}]);
gm.controllers.dashboard = gm.app.controller("dashboardCtl",["$scope",function($scope) {
    $scope.news = [{
        title: "Test News Alert",
        text: "In the event of an actual news alert the text for said alert would be inserted here.  Since this is a test alert, there will not be much text here",
        type: 0
    },
    {
        title: "Another News Alert",
        text: "Howmany levels can we go!",
        type: 1
    }];
    $scope.greeting = "Welcome to the GM-Tool!";
}]);
// NPC Controller ----------------------------------------------------------------------------------
gm.controllers.npc = gm.app.controller("npcCtl",["$scope",function($scope) {
    $scope.list = {
        "Joe": {name: "Joe", hp: 12, dmg: 6},
        "Bob": {name: "Bob", hp: 4, dmg: 20},
        "Frank": {name: "Frank", hp: 9, dmg: 8},
        "Sue": {name: "Sue", hp: 5, dmg: 10}
    };
    
    $scope.npcs = gm.npc.list;
    $scope.types = gm.types.npc;
    $scope.selectedType = gm.types.npc[0];
    $scope.setType = function(type) {
        $scope.selectedType = type;
    };
}]);

gm.directives = {};
gm.directives.dashboard = gm.app.directive("dashboardPanel",function(){
    return {
        restrict: "E",
        templateUrl: "templates/dashboard-panel.html"
    };
});

gm.directives.npc = gm.app.directive("npcPanel",function(){
    return {
        restrict: "E",
        templateUrl: "templates/npc-panel.html"
    };
});

gm.directives.footer = gm.app.directive("siteFooter",function(){
    return {
        restrict: "E",
        templateUrl: "templates/site-footer.html"
    };
});