angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth,$location,$timeout){
   var app = this
   this.doLogin = function(loginData){
      app.loading = true
      app.errorMsg = false
      
      Auth.login(app.loginData).then(function(data){
         if(data.data.success){
            app.loading = false
            //Create success message
            app.successMsg = data.data.message + '...Redirecting...'
            //Redirect to about page
            $timeout(function(){
               $location.path('/about');
            },2000)
         }else{
            //Crete a error message
            app.loading = false
            app.errorMsg = data.data.message
         }
      })
   }
})
   