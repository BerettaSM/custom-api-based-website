document.addEventListener('DOMContentLoaded', () => {

    /*
        Range sliders
    */

    const rangeHolders = document.querySelectorAll('div.range-holder');

    if(rangeHolders != null) {

        rangeHolders.forEach(holder => {

            /*
                There's two "holders", or divs, both with a min and max slider of some kind.
            */

            [
                [holder.querySelector('input.min'), holder.querySelector('span.min')],
                [holder.querySelector('input.max'), holder.querySelector('span.max')]
            ]

            /*
                For each holder, we take the input itself and the label its value reflects on.
            */

            .forEach(([slider,label], idx, arr) => {

                slider.addEventListener('input', e => {

                    /*
                        First we update the label with the current slider's value.
                    */

                    const value = Number(e.target.value);

                    label.innerText = value.toFixed(1);

                    /*
                        Then get the opposite set of input + label.

                        e.g.: if we're currently dealing with min, then the opposite
                              limit is the max slider + label.
                    */

                    const oppositeLimit = arr[Math.abs(idx - 1)];

                    const [oppositeInput, oppositeLabel] = oppositeLimit;

                    const oppositeValue = Number(oppositeInput.value);

                    if((idx === 0 && value > oppositeValue) || (idx === 1 && value < oppositeValue)) {

                        /*
                            If the min value is higher than max, or max value lower than min,
                            we update the opposite slider and label with the value from this
                            slider, whichever it may be.
                        */

                        oppositeInput.value = value;

                        oppositeLabel.innerText = value.toFixed(1);

                    }

                });

            });

        });

    }

    /*
        Inputs toggle
    */

    const previousButton = document.querySelector('button.carousel-control-prev');

    const nextButton = document.querySelector('button.carousel-control-next');

    let currentInput = 0; // The current input shown

    const inputs = document.querySelectorAll('.input');

    function navigate(val) {

        /*
            The result input should be an index inside the "inputs" array,
            so first we calculate what the value/index would be.
        */

        const resultInput = currentInput + val;

        if(currentInput >= 0 && currentInput < inputs.length) {

            /*
                If the value/index exists, we...

                Hide the current input.
            */

            inputs[currentInput].classList.add('d-none');

            /*
                Show the new input.
            */

            inputs[resultInput].classList.remove('d-none');

            /*
                Store the new input.
            */

            currentInput = resultInput;

            if(currentInput == 0) {

                /*
                    If it's first input, we hide the previous button.
                */

                previousButton.classList.add('d-none');

            } else if(currentInput == inputs.length -1) {

                /*
                    If it's last input, we hide the next button.
                */

                nextButton.classList.add('d-none');

            } else {

                /*
                    Else, we just show both buttons.
                */

                [
                    previousButton, nextButton
                ]
                .forEach(button => button.classList.remove('d-none'));

            }

        }

    }

    previousButton.addEventListener('click', () => navigate(-1));

    nextButton.addEventListener('click', () => navigate(1));

    let id = null;
    let outwards = true;

    function animation() {
        const body = document.querySelector('body');
        var pos = 0;
        clearInterval(id);
        id = setInterval(frame, 10);
        function frame() {
            if (pos < 0) {
                outwards = !outwards;
                pos++;
            } else if(pos > 500) {
                outwards = !outwards;
                pos--;
            } else {
                if(outwards) pos ++;
                else pos--;
                body.style.backgroundImage = `radial-gradient(circle, black , #660035 ${pos}%, black )`;
            }
        }
    }

    animation();

    const resultSpan = document.querySelector('span.result');

    const result = resultSpan.innerText.trim();

    if(result !== '') {

        const modalElement = document.getElementById('my-modal');

        const modalBody = modalElement.querySelector('div.modal-body');

        modalBody.innerText = result;

        if(result == 'No activity found with the specified parameters') {

            modalBody.classList.add('red-glow');
            modalBody.classList.remove('pink-glow');

        } else {

            modalBody.classList.add('pink-glow');
            modalBody.classList.remove('red-glow');

        }

        const modal = new bootstrap.Modal(modalElement);

        modal.show();

    }

});
