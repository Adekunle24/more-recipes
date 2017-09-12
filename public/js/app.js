/**
 * application MoreRecipes
 * Relation: Andela Bootcamp 26
 * author adekunle
 * framework NodeJS, Express and PostgreDb
 */
// Initiate DatePicker
$(document).ready(() => {
  const date_input = $('input[name="date"]'); // our date input has the name "date"
  const container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : 'body';
  date_input.datepicker({
    format: 'dd/mm/yyyy',
    container,
    todayHighlight: true,
    autoclose: true,
    gotoCurrent: true
  });
});

// Initiate Tooltip
$('[data-toggle="tooltip"]').tooltip();

// Initiate Angular
const app = angular.module('myApp', []);

// Propagate register event
$('#register-2').click(() => {
  $('a[href="#home"]').click();
});
// Propage login event
$('#login-2').click(() => {
  $('a[href="#menu1"]').click();
});


// Begin Angular controller here
app.controller('myController', ($scope, $http, $timeout, $window) => {
  // declare global variables

  $scope.LoginLoader = false; // login loader gif
  $scope.MasterNotify = true; // master notification display
  $scope.MasterNotifyMessage = 'You have a new notification message'; // notification message
  $scope.Ingredients = [{ item: 'Andela Oil', quantity: '1 cup' }];
  $scope.TotalRecipes = [{
    poster: 'images/recipe_2.jpg', recipe_title: 'How to make Okro soup', comment: 'I love the recipe. I tried it once and all my kids enjoyed the taste and aroma', likes_count: '56', timeline: '4 minutes ago'
  },
  {
    poster: 'images/recipe_3.jpg', recipe_title: 'How to make Homemade Pizza', comment: 'I love the recipe. I tried it once and all my kids enjoyed the taste and aroma', likes_count: '22', timeline: '3 weeks ago'
  },
  {
    poster: 'images/recipe_5.jpg', recipe_title: 'How to make Burger', comment: 'I love the recipe. I tried it once and all my kids enjoyed the taste and aroma', likes_count: '24', timeline: '7 days ago'
  },
  {
    poster: 'images/recipe_4.jpg', recipe_title: 'How to make Burger', comment: 'I love the recipe. I tried it once and all my kids enjoyed the taste and aroma', likes_count: '50', timeline: '50 seconds ago'
  },
  {
    poster: 'images/recipe_6.jpg', recipe_title: 'How to make Burger', comment: 'I love the recipe. I tried it once and all my kids enjoyed the taste and aroma', likes_count: '20', timeline: '2 days ago'
  },
  {
    poster: 'images/recipe_7.jpg', recipe_title: 'How to make Burger', comment: 'I love the recipe. I tried it once and all my kids enjoyed the taste and aroma', likes_count: '287', timeline: '3 months ago'
  }
  ];
  // close master notification
  $scope.CloseMasterNotify = function () {
    $('.master-notification').fadeOut(500);
  };
  // End Angular


  // simulate login attempt
  $scope.simulateLogin = function () {
    $scope.LoginLoader = true;
    $('.master-notification').removeClass('invisible');
    $timeout(() => {
      $scope.MasterNotifyMessage = 'This is a simulated login attempt. Adekunle, please initiate the sequelize connection';
      $scope.LoginLoader = false;
    }, 4000);
  };
  // End login simulation

  // simulate like attempt
  $scope.LikeRecipe = function (initial_value, loader) {
    loader.removeClass('invisible');
    $timeout(() => {
      const tt = parseInt(initial_value.html());
      initial_value.html(tt + 1);
      loader.addClass('invisible');
    }, 1000);
  };
  // simulate dislike attempt
  $scope.DisLikeRecipe = function (initial_value, loader) {
    loader.removeClass('invisible');
    $timeout(() => {
      const tt = parseInt(initial_value.html());
      initial_value.html(tt + 1);
      loader.addClass('invisible');
    }, 1000);
  };
  $scope.LoveRecipe = function (initial_value, loader) {
    loader.removeClass('invisible');
    $timeout(() => {
      const tt = parseInt(initial_value.html());
      initial_value.html(tt + 1);
      loader.addClass('invisible');
    }, 1000);
  };
  // add ingredient to table
  $scope.AddIngredient = function () {
    const item_dic = { item: $scope.Item, quantity: $scope.Quantity };
    $scope.Ingredients.push(item_dic);
  };

  // remove ingredient from table
  $scope.RemoveIngredient = function (index) {
    $scope.Ingredients.splice(index, 1);
  };

  // remove posted recipe
  $scope.DeletePostedRecipe = function (index) {
    $scope.TotalRecipes.splice(index, 1);
  };
});

// next element
function nextInDOM(_subject, _selector) {
  let next = getNext(_subject);
  while (next.length != 0) {
    const found = searchFor(_selector, next);
    if (found != null) return found;
    next = getNext(next);
  }
  return null;
}
function getNext(_subject) {
  if (_subject.next().length > 0) return _subject.next();
  return getNext(_subject.parent());
}

// previous element
// next element
function prevInDOM(_subject, _selector) {
  let previous = getPrev(_subject);
  while (previous.length != 0) {
    const found = searchFor(_selector, previous);
    if (found != null) return found;
    previous = getPrev(previous);
  }
  return null;
}
function getPrev(_subject) {
  if (_subject.prev().length > 0) return _subject.prev();
  return getPrev(_subject.parent());
}


function searchFor(_selector, _subject) {
  if (_subject.is(_selector)) return _subject;

  let found = null;
  _subject.children().each(function () {
    found = searchFor(_selector, $(this));
    if (found != null) return false;
  });
  return found;
}


$('.recipe-item-comment').click(function () {
  nextInDOM($(this), $('.comment-container')).toggleClass('invisible');
});
$('.fav-recipe-comment').click(function () {
  nextInDOM($(this), $('.toggle-comment')).toggleClass('invisible');
});
// hide all recipe-items spinner
$('.recipe-actions .fa-spin, .fa-spin').addClass('invisible');

// simulate liking attempt
$('.fa-thumbs-up').click(function () {
  const scope = angular.element($('.app-body')).scope();
  const initial_value = nextInDOM($(this), $('.action-value'));
  const loader = prevInDOM($(this), $('.fa-spin'));
  scope.LikeRecipe(initial_value, loader);
});

// simulate dislike attempt
$('.fa-thumbs-down').click(function () {
  const scope = angular.element($('.app-body')).scope();
  const initial_value = nextInDOM($(this), $('.action-value'));
  const loader = prevInDOM($(this), $('.fa-spin'));
  scope.DisLikeRecipe(initial_value, loader);
});
// simulate love attempt
$('.fa-heart').click(function () {
  const scope = angular.element($('.app-body')).scope();
  const initial_value = nextInDOM($(this), $('.action-value'));
  const loader = prevInDOM($(this), $('.fa-spin'));
  scope.LoveRecipe(initial_value, loader);
});

// handle comment content accordion
function DisplayAddRecipeComment() {
  $('.accordion-handle').click(function () {
    const initial_value = nextInDOM($(this), $('.comment-content'));
    if (initial_value.css('display') == 'none') {
      initial_value.removeClass('collapse');
      initial_value.addClass('collapsing');

      $(this).addClass('fa-chevron-up');
      var accordion_timeout = setTimeout(() => {
        initial_value.removeClass('collapsing');
        initial_value.addClass('show');
        initial_value.addClass('collapse');
      }, 100);
      $(this).removeClass('fa-chevron-down');
    } else {
      initial_value.removeClass('collapse');
      initial_value.addClass('collapsing');
      $(this).addClass('fa-chevron-down');
      var accordion_timeout = setTimeout(() => {
        initial_value.removeClass('collapsing');
        initial_value.removeClass('show');
        initial_value.addClass('collapse');
      }, 100);
      $(this).removeClass('fa-chevron-up');
    }
    initial_value.toggleClass('in');
  });
}


// handle comment-reply textbox toggle-display
$('.reply-comment').click(function () {
  const element = nextInDOM($(this), '.comment-container');
  element.toggleClass('invisible');
});

// simulate random values for actions
function PushRandomActionValues() {
  const array = [];
  const count = $('.action-value').length;
  for (let b = 0; b < count; b++) {
    const rnd = Math.ceil(Math.random() * 100);
    array.push(rnd);
  }
  let index = 0;
  $('.action-value').each(function () {
    $(this).html(array[index]);
    index += 1;
  });
}


// Javascript for Responsiveness on Load
function InitiateResponsiveness() {
  // specific width for homepage/nav tabs
  const home_tab_width = 321;
  const window_width = $(window).width();
  if (window_width < home_tab_width) {
    $('#page-tab').removeClass('flex-column').removeClass('height-300').removeClass('registration-nav').removeClass('float-left');
    $('#page-tab .nav-link').addClass('inline');
    $('#page-tab li').addClass('inline');
    $('#footer-responsive').removeClass('container-fluid');
    $('.fa-trash').removeClass('fa-2x');
  } else {
    $('#page-tab').addClass('flex-column').addClass('height-300').addClass('registration-nav').addClass('float-left');
    $('#page-tab .nav-link').removeClass('inline');
    $('#page-tab li').removeClass('inline');
    $('.fa-trash').addClass('fa-2x');
  }
}

// load methods after document is ready
$(document).ready(() => {
  DisplayAddRecipeComment();
  PushRandomActionValues();
  InitiateResponsiveness();
});
$(window).resize(() => {
  InitiateResponsiveness();
});
