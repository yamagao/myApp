angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
	
	// Favorite list
  $scope.favorite = function() {
    $scope.getElementById("fav").style.visibility = "hidden";
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('4HCtrl', function($scope, $http) {
	$http.jsonp("http://blogs.ifas.ufl.edu/global/category/4-h-and-youth/?json=1&count=20&callback=JSON_CALLBACK")
  .success(function (response) {$scope.posts = response.posts;$scope.cat = response.category.slug;});//modify+++++++++++
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	$scope.playlist = $stateParams;
})

.controller('PostCtrl', function($scope, $stateParams, $http) {
	$http.jsonp("http://blogs.ifas.ufl.edu/global/?json=get_post&post_id=" + $stateParams.postId + "&callback=JSON_CALLBACK")
  .success(function (response) {
		$scope.post = response.post;
	});
  $scope.para = $stateParams;
})

.controller('ListCtrl', function($scope, $stateParams, $http) {
	$http.jsonp("http://blogs.ifas.ufl.edu/global/" + $stateParams.readBy + "/" + $stateParams.slug + "/?json=1&count=20&callback=JSON_CALLBACK")
  .success(function (response) {
		if($stateParams.readBy == "category")
			$scope.list = response.category;
		else
			$scope.list = response.tag;
		$scope.posts = response.posts;
	});
})

.controller('accodionCtrl', function($scope, $http) {
	$scope.groups = [];
	
	//get favorites
	$scope.groups[0] = {
		name: 'favorite',
		items: []
	};
	$scope.groups[0].items.push({title: "a", post_count:10});
	
	//get categories
	$http.jsonp("http://blogs.ifas.ufl.edu/global/?json=get_category_index&callback=JSON_CALLBACK")
  .success(function (response) {
    $scope.groups[1] = {
      name: 'category',
      items: []
    };
		for(var i = 0; i < response.categories.length; i++){
			//exclude internal blogs or uncategorized
			$scope.exclude = [1,10,23,450,451,467,905,1082,1083,1383];
			if($scope.exclude.indexOf(response.categories[i].id) < 0){
				//replace &amp; with & for title and push the category object to item
				var tempCat = response.categories[i];
				tempCat.title = tempCat.title.replace(/&amp;/g, "&");
				$scope.groups[1].items.push(tempCat);
			}
		}
	});
	
	//get tags
	$http.jsonp("http://blogs.ifas.ufl.edu/global/?json=get_tag_index&callback=JSON_CALLBACK")
  .success(function (response) {
    $scope.groups[2] = {
      name: 'tag',
      items: []
    };
		for(var i = 0; i < response.tags.length; i++){
			//show only tags with post_count > 30
			if(response.tags[i].post_count > 30){
				//replace &amp; with & for title and push the category object to item
				var tempTag = response.tags[i];
				tempTag.title = tempTag.title.replace(/&amp;/g, "&");
				$scope.groups[2].items.push(tempTag);
			}
		}
	}); 
	
	for (var i=3; i<4; i++) {
		$scope.groups[i] = {
			name: i,
			items: []
		};
		for (var j=0; j<3; j++) {
			$scope.groups[i].items.push(i + '-' + j);
		}
	}

	/*
	* if given group is the selected group, deselect it
	* else, select the given group
	*/
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
 
});
