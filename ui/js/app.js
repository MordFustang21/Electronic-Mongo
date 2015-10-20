(function () {
    angular.module('electronicMongo', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'js/views/main.html',
                controller: 'mainCtrl as main'
            });
        })
        .controller('mainCtrl', function ($scope) {
            var vm = this;
            var mongoClient = new MongoClient();

            vm.getCollections = getCollections;

            mongoClient.connect({
                url: 'someAddress',
                port: 'somePort'
            }).then(function resolve() {
                getDBList();
            }, function reject(err) {
                console.log(err);
            });

            function getDBList() {
                mongoClient.getDBList()
                    .then(function (dbs) {
                        vm.dbList = dbs.databases;
                        $scope.$digest();
                    });
            }

            function getCollections(dbIndex) {
                mongoClient.getCollections(vm.dbList[dbIndex].name)
                    .then(function (result) {
                        vm.dbList[dbIndex].collections = result;
                        $scope.$digest();
                    }, function (err) {
                        console.log(err);
                    });
            }
        });
})();
