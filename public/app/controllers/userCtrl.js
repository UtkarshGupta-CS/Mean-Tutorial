angular.module('userControllers', ['userServices'])

   .controller('regCtrl', function ($http, $location, $timeout, User) {
      var app = this
      this.regUser = function (regData) {
         app.loading = true
         app.errorMsg = false

         // $http.post('/api/users',this.regData).then(function(data){ insted this we made a factory service User
         User.create(app.regData).then(function (data) {
            console.log(data.data.success)
            console.log(data.data.message)
            if (data.data.success) {
               app.loading = false
               //Create success message
               app.successMsg = data.data.message + '...Redirecting...'
               //Redirect to home page
               $timeout(function () {
                  $location.path('/');
               }, 2000)
            } else {
               app.loading = false
               //Crete a error message
               app.errorMsg = data.data.message
            }
         })
      }
   })

   .controller('facebookCtrl', function ($routeParams, Auth, $location,$window) {
      // console.log($routeParams.token)
      var app = this
      if ($window.location.pathname == '/facebookerror') {
         //error variable
         app.errorMsg = 'Facebook email not define'
      } else {
         Auth.facebook($routeParams.token)
         $location.path('/')
      }
   })
   .controller('twitterCtrl', function ($routeParams, Auth, $location,$window) {
      // console.log($routeParams.token)
      var app = this
      if ($window.location.pathname == '/twittererror') {
         //error variable
         app.errorMsg = 'Twitter email not define'
      } else {
         Auth.twitter($routeParams.token)
         $location.path('/')
      }
   })
   .controller('googleCtrl', function ($routeParams, Auth, $location,$window) {
      // console.log($routeParams.token)
      var app = this
      if ($window.location.pathname == '/googleerror') {
         //error variable
         app.errorMsg = 'Google email not define'
      } else {
         Auth.twitter($routeParams.token)
         $location.path('/')
      }
   })