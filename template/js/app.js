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
//hide all recipe-items spinner
$('.recipe-actions .fa-spin, .fa-spin').addClass('hide');

//simulate liking attempt
$('.fa-thumbs-up').click(
    function(){
         var scope = angular.element($('.app-body')).scope();
        var initial_value =  nextInDOM($(this), $('.action-value'));
        var loader =  prevInDOM($(this), $('.fa-spin'));
       scope.LikeRecipe(initial_value,loader);
    }
);

//simulate dislike attempt
$('.fa-thumbs-down').click(
    function(){
         var scope = angular.element($('.app-body')).scope();
        var initial_value =  nextInDOM($(this), $('.action-value'));
        var loader =  prevInDOM($(this), $('.fa-spin'));
       scope.DisLikeRecipe(initial_value,loader);
    }
);
//simulate love attempt
$('.fa-heart').click(
    function(){
         var scope = angular.element($('.app-body')).scope();
        var initial_value =  nextInDOM($(this), $('.action-value'));
        var loader =  prevInDOM($(this), $('.fa-spin'));
       scope.LoveRecipe(initial_value,loader);
    }
);

//handle comment content accordion
$('.accordion-handle').click(function(){
 var initial_value = nextInDOM($(this),$('.comment-content'));
 if(initial_value.css('display')=='none')
 {
     initial_value.removeClass('collapse');
     initial_value.addClass('collapsing');
    
     $(this).addClass('fa-chevron-up');
     var accordion_timeout = setTimeout(function() {
         initial_value.removeClass('collapsing');
         initial_value.addClass('in');
         initial_value.addClass('collapse');
     }, 100);
      $(this).removeClass('fa-chevron-down');
 }
 else{
      initial_value.removeClass('collapse');
     initial_value.addClass('collapsing');
     $(this).addClass('fa-chevron-down');
     var accordion_timeout = setTimeout(function() {
         initial_value.removeClass('collapsing');
         initial_value.removeClass('in');
         initial_value.addClass('collapse');
     }, 100);
       $(this).removeClass('fa-chevron-up');
 }
initial_value.toggleClass('in');
});

//handle comment-reply textbox toggle-display
$('.reply-comment').click(function(){
 var element = nextInDOM($(this),'.comment-container');
 element.toggleClass('hide');
});

//simulate random values for actions
function PushRandomActionValues()
{
    var array = [];
    var count = $('.action-value').length;
    for(var b =0; b < count; b++)
    {
        var rnd = Math.ceil(Math.random()*100);
        array.push(rnd);
    }
    var index = 0;
    $('.action-value').each(function(){
        $(this).html(array[index]);
        index = index+1;
    });
}
PushRandomActionValues();
