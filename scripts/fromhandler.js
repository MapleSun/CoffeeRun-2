(function (window){
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var NUM_SELECTOR='#strengthNum';
    var SLIDER_SELECTOR = '#strength';
    function FormHandler(selector){
        if(!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        this.$sliderElement = $(SLIDER_SELECTOR);
        this.$numElement = $(NUM_SELECTOR);
        this.achievement=['a@b.com'];
        if (this.$formElement.length === 0){
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        var form = this;
        console.log('Setting submit handler for form');
        // hide achievement option
        $('.achievementOpt').hide();
        // check email input
        this.emailInput();

        // submit order
        this.$formElement.on('submit', function (event){
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
                // check the order info, make sure does this order match achievement
                if(form.achievement.indexOf(data['emailAddress'])==-1){
                    if(data['size'] == 'Coffee-zilla' && data['strength'] == '100'){
                        $('#achieveModal').modal('show');
                        form.achievement.push(data['emailAddress']);
                    }
                }
            });
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
            form.changeColor(parseInt($(form.$sliderElement).val()));
        });
    };

    FormHandler.prototype.changeColor = function (strength) {
        var textColor;
        if(strength < 34) {
            var green = 200+strength;
            textColor = 'rgb(0,' +green+ ',0)';
        }else if(strength > 33 && strength < 67) {
            var yellow = 255-strength;
            textColor = 'rgb('+yellow+','+yellow+',0)';
        }else{
            var red = 155+strength;
            textColor = 'rgb('+red+',0,0)';
        }
        console.log(textColor);
        this.$numElement.css('color',textColor);
        this.$numElement.text(strength);
    };

    FormHandler.prototype.addSliderHandler = function (){
        //var form = this;
        var slider = this.$sliderElement;
        this.changeColor(parseInt(slider.val()));
        slider.on('click', function (event){
            event.preventDefault();
            this.changeColor(parseInt(slider.val()));
        }.bind(this));

    };

    FormHandler.prototype.emailInput = function () {
        //var form = this;
        var emailInput = $('#emailInput');
        emailInput.on('focusout', function(event){
            event.preventDefault();
            if(this.achievement.indexOf(emailInput.val())!=-1){
                $('.achievementOpt').show();
            }else{
                $('.achievementOpt').hide();
            }
        }.bind(this));
        // the bind change the this(emailInput) in the function to another this(form)

    };






    App.FormHandler = FormHandler;
    window.App = App;
})(window);
