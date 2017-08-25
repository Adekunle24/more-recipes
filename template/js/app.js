/**
 * application MoreRecipes
 * Relation: Andela Bootcamp 26
 * author adekunle
 * framework NodeJS, Express and PostgreDb
 */

//Initiate JPinning 
$('nav').jPinning();

//Initiate DatePicker
$(document).ready(function(){
		var date_input=$('input[name="date"]'); //our date input has the name "date"
		var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
		date_input.datepicker({
			format: 'dd/mm/yyyy',
			container: container,
			todayHighlight: true,
			autoclose: true,
             gotoCurrent: true
		})
	});

//Initiate Tooltip
$('[data-toggle="tooltip"]').tooltip(); 

//Initiate Angular
var app = angular.module('myApp',[]);

//Propagate register event
$('#register-2').click(
    function(){
  $('a[href="#home"]').click();
    }
);
//Propage login event
$('#login-2').click(function(){
        $('a[href="#menu1"]').click();
});



//Begin Angular controller here
app.controller('myController',function($scope,$http,$timeout,$window)
{
    //declare global variables

    $scope.LoginLoader = false;    //login loader gif
    $scope.MasterNotify= true;      //master notification display
    $scope.MasterNotifyMessage = "You have a new notification message"; //notification message
//close master notification 
$scope.CloseMasterNotify = function(){
$('.master-notification').fadeOut(500);
};
//End Angular


    //simulate login attempt
$scope.simulateLogin = function()
{
$scope.LoginLoader = true;
$('.master-notification').removeClass('hide');
$timeout(function(){
$scope.MasterNotifyMessage = "This is a simulated login attempt. Adekunle, please initiate the sequelize connection";
$scope.LoginLoader = false;
},4000);
};
//End login simulation

});

//next element
function nextInDOM(_subject, _selector) {
    var next = getNext(_subject);
    while(next.length != 0) {
        var found = searchFor(_selector, next);
        if(found != null) return found;
        next = getNext(next);
    }
    return null;
}
function getNext(_subject) {
    if(_subject.next().length > 0) return _subject.next();
    return getNext(_subject.parent());
}
function searchFor(_selector, _subject) {
    if(_subject.is(_selector)) return _subject;
    else {
        var found = null;
        _subject.children().each(function() {
            found = searchFor(_selector, $(this));
            if(found != null) return false;
        });
        return found;
    }
}


$('.recipe-item-comment').click(function(){
  nextInDOM($(this), $('.comment-container')).toggleClass('hide');
});
