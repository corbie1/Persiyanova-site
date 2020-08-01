import '../styles/style.css'
import html from '../index.html'
import WOW from './wow.min.js'
import './jquery.magnific-popup.js'
import './slick.min.js'
import * as LazyLoad from './lazyload.min.js'

const jquery = require("jquery");
const fancybox = require("@fancyapps/fancybox"); 
const fancyboxCSS = require('@fancyapps/fancybox/dist/jquery.fancybox.css');
var Masonry = require("masonry-layout");
                  
var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
});

window.onload = function () {
    let wrapImg = document.querySelectorAll('.grid-item');
    wrapImg.forEach(elem => {
        let image = (elem.querySelector('img').getAttribute('src'));
        elem.setAttribute('href', image);
    });
  };
  var grid = document.querySelector('.grid');
    
  var msnry = new Masonry( grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      gutter: 20,
      percentPosition: true
   });







$('.b-slick__items').slick({
    arrows: true,
    dots: false,
    infinite: true,
    speed: 350,
    fade: true,
    cssEase: 'linear',
  });


var wow = new WOW({
     mobile: false
  }); 
wow.init();
  
$(document).ready(function() {
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });
});


if ($("#dropZone").length){
    $(document).ready(function() {
        
        var dropZone = $('#dropZone'),
            maxFileSize = 1000000; // максимальный размер фалйа - 1 мб.
        
        // Проверка поддержки браузером
        if (typeof(window.FileReader) == 'undefined') {
            dropZone.text('Не поддерживается браузером!');
            dropZone.addClass('error');
        }
        
        // Добавляем класс hover при наведении
        dropZone[0].ondragover = function() {
            dropZone.addClass('hover');
            return false;
        };
        
        // Убираем класс hover
        dropZone[0].ondragleave = function() {
            dropZone.removeClass('hover');
            return false;
        };
        
        // Обрабатываем событие Drop
        dropZone[0].ondrop = function(event) {
            event.preventDefault();
            dropZone.removeClass('hover');
            dropZone.addClass('drop');
            
            var file = event.dataTransfer.files[0];
            
            // Проверяем размер файла
            if (file.size > maxFileSize) {
                dropZone.text('Файл слишком большой!');
                dropZone.addClass('error');
                return false;
            }
            
            // Создаем запрос
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', uploadProgress, false);
            xhr.onreadystatechange = stateChange;
            xhr.open('POST', '/upload.php');
            xhr.setRequestHeader('X-FILE-NAME', file.name);
            xhr.send(file);
        };
        
        // Показываем процент загрузки
        function uploadProgress(event) {
            var percent = parseInt(event.loaded / event.total * 100);
            dropZone.text('Загрузка: ' + percent + '%');
        }
        
        // Пост обрабочик
        function stateChange(event) {
            if (event.target.readyState == 4) {
                if (event.target.status == 200) {
                    dropZone.text('Загрузка успешно завершена!');
                } else {
                    dropZone.text('Произошла ошибка!');
                    dropZone.addClass('error');
                }
            }
         }
        })
    };
    

$('.b-reviews__slick').slick({
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: true,
});

