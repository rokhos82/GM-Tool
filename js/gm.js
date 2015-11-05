var gm = {};

gm.states = {
    dashboard: "dashboard",
    npcs: "npcs"
};

gm.thresholds = {
    hp: {
        warn: 8,
        danger: 4
    }
};

gm.app = new angular.module("gm-tool",[]);
gm.controllers = {};
gm.controllers.main = gm.app.controller("mainCtl",["$scope",function($scope) {
    $scope.greeting = "Welcome to the GM-Tool!";
    $scope.state = gm.states.npcs;
    $scope.states = gm.states;
}]);
gm.controllers.npc = gm.app.controller("npcCtl",["$scope",function($scope) {
    $scope.list = {
        "Joe": {name: "Joe", hp: 12, dmg: 6},
        "Bob": {name: "Bob", hp: 4, dmg: 20},
        "Frank": {name: "Frank", hp: 9, dmg: 8},
        "Sue": {name: "Sue", hp: 5, dmg: 10}
    };
    
    $scope.thresholds = gm.thresholds;
}]);