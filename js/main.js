(function() {
    // Input counter
    document.getElementById('gugu-input').onkeyup = function () {
        document.getElementById('gugu-counter').innerHTML = (4 - this.value.length);
    };

    // Send
    var guguSendTimer = null;

    document.getElementById('gugu-send').onclick = function (e) {
        var guguInput = document.getElementById('gugu-input'),
            guguValue = guguInput.value,
            userText = guguValue.replace(/^\s+/, '').replace(/\s+$/, '');

        if (userText) {
            // Effect
            document.getElementById('gugu-send-effect').classList.add('active');

            if (guguSendTimer) {
                clearTimeout(guguSendTimer);
            }

            guguSendTimer = setTimeout(function(){
                document.getElementById('gugu-send-effect').classList.remove('active');
            }, 200);

            // Val
            /// Time
            var currentTime = new Date();
            var dd = currentTime.getDate();
            var mm = currentTime.getMonth() + 1;
            var yyyy = currentTime.getFullYear();

            var hour = currentTime.getHours()
            var minutes = currentTime.getMinutes()

            if (minutes <= 9) {
                minutes = '0' + minutes;
            }

            if (hour == 1) {
                today = dd + '/' + mm + '/' + yyyy + ' a ' + hour + ':' + minutes;
            }
            else {
                today = dd + '/' + mm + '/' + yyyy + ' às ' + hour + ':' + minutes;
            }

            var date = document.createElement('span');
            var dateText = document.createTextNode(today);
                date.appendChild(dateText);
            
            /// gugu
            var gugu = document.createElement('span');
            var guguValue = document.createTextNode(guguValue);
                gugu.className = 'gugu';
                gugu.appendChild(guguValue);
                gugu.appendChild(date);

            var space = document.createTextNode(' ');
                
            var list = document.getElementById('gugu-list');

            list.insertBefore(gugu, list.childNodes[0]);
            list.insertBefore(space, list.childNodes[0]);

            // Clear input
            guguInput.value = '';

            e.preventDefault();
        }
        else if(userText == '') {
            guguInput.value = '';

            guguInput.focus();
        }
        else {
            guguInput.focus();
        }

        e.preventDefault();
    };
})();