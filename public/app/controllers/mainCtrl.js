angular.module('mainController', ['authServices'])

   .controller('mainCtrl', function (Auth, $location, $timeout, $rootScope) {
      var app = this
      app.loadme = false
      $rootScope.$on('$routeChangeStart', function () {
         if (Auth.isLoggedIn()) {
            // console.log('Success:User logged in')
            app.isLoggedIn = true
            Auth.getUser().then(function (data) {
               // console.log(data.data.username)
               app.username = data.data.username
               app.useremail = data.data.email
               app.loadme = true 
            })
         } else {
            // console.log('Failure:User is not logged in')
            app.isLoggedIn = false
            app.username = ''
         }

      })


      this.doLogin = function (loginData) {
         app.loading = true
         app.errorMsg = false

         Auth.login(app.loginData).then(function (data) {
            if (data.data.success) {
               app.loading = false
               //Create success message
               app.successMsg = data.data.message + '...Redirecting...'
               //Redirect to about page
               $timeout(function () {
                  $location.path('/about')
                  app.loginData = ''
                  app.success = false
               }, 2000)
            } else {
               //Crete a error message
               app.loading = false
               app.errorMsg = data.data.message
            }
         })
      }
      this.logout = function () {
         Auth.logout()
         $location.path('/logout')
         $timeout(function () {
            $location.path('/')
         }, 2000)
      }
   })