var $ = require('jquery');
var todoTemplate = require("../views/partials/todo.hbs");


//AJAX
var addTodo = function() {
    var text = $('#add-todo-text').val();
    $.ajax({
        type: 'POST',
        url: '/api/todos',
        data: {
            text: text
        },
        dataType: 'json',
        success: function (data) {
            var todo = data.todo;
            var newLiHtml = todoTemplate(todo);
            $('form + ul').append(newLiHtml);
            $('#add-todo-text').val('');
            
        }
    });
}
var updateTodo = function( id, data,cb){
    $.ajax({
        type: "PUT",
        url: "/api/todos/"+id,
        data: data,
        dataType: "json",
        success: function (response) {
            cb();
        }
    });

}
var deleteTodo = function(id, cb) {
    $.ajax({
        type: "DELETE",
        url: "/api/todos/"+ id,
        data: {
            id: id
        },
        dataType: "json",
        success: function (response) {
            cb();
        }
    });
}
var deleteTodoLi = function($li){
$li.remove();
}

//Listeners
var initTodoObserver = function(){
    var target = $('ul')[0];
    var config = { attributes: true, childList: true, characterData: true};
    var observer = new MutationObserver(function(mutationRecords){
        $.each(mutationRecords, function(index, mutationRecord){
            updateTodoCount();
        });
    });
    if(target){
        observer.observe(target, config);
    }
    updateTodoCount();
}

var updateTodoCount = function () {
    $(".count").text($("li").length);
  };


//DocReady
$(document).ready(function () {
    initTodoObserver();
    $(":button").on('click', addTodo);
    $(":text").on('keypress', function(e){
        var key = e.keyCode;
        if(key == 13 || key == 169){
            addTodo();
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    $('ul').on('change', 'li :checkbox', function () {
        var $this = $(this),
        $input = $this[0],
        $li = $this.parent(),
        id = $li.attr('id'),
        checked = $input.checked,
        data = {done: checked};
        updateTodo(id, data, function(d){
            $this.parent().toggleClass('checked');
        });
      });

      $('ul').on('keydown', 'li span', function(e){
          var $this = $(this),
          $span = $this[0],
          $li = $this.parent(),
        id = $li.attr('id'),
        key = e.keyCode,
        target = e.target,
        text = $span.innerHTML,
        data = {text: text};

        $this.addClass('editing');
        if(key==27) {
            $this.removeClass('editing');
            document.execCommand('undo');
            target.blur();
        }
        else if (key == 13 || key == 169){
            updateTodo(id, data , function(d){
                $this.removeClass('editing');
                target.blur();
            });
            e.preventDefault()
        }
      });
      $('ul').on('click', 'li a', function(){
        var $this = $(this),
        $input = $this[0],
        $li = $this.parent(),
        id = $li.attr('id');
        deleteTodo(id, function(e){
            deleteTodoLi($li);
        });
      });

      //filters
      $('.show-all').on('click', function() {
          $('.hide').removeClass('hide');
      });
      $('.show-not-done').on('click', function() {
        $('.hide').removeClass('hide');
        $('.checked').addClass('hide');
    });
    $('.show-done').on('click', function() {
        $('li').addClass('hide');
        $('.checked').removeClass('hide');
    });
    $('.clear').click(function (e) { 
        var $doneLi = $('.checked');
        for (var i = 0; i< $doneLi.length; i++) {
            var $li = $($doneLi[i]);
            var id = $li.attr('id');
            (function($li){
                deleteTodo(id,function(){
                    deleteTodoLi($li)
                })
            })($li)
        }
        
    });
});