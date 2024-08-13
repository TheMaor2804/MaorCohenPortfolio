export const initSlider = (slider, sliderHandle, sliderValue) => {

    let sliderWidth = slider.offsetWidth;
    let handleWidth = sliderHandle.offsetWidth;

    const maxValue = 2000000000;
    const scalingFactor = 4.5;

    sliderHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        sliderWidth = slider.offsetWidth;
        handleWidth = sliderHandle.offsetWidth;
        let startX = e.clientX - sliderHandle.offsetLeft;

        const onMouseMove = (e) => {
            let x = e.clientX - startX;
            let left = Math.min(Math.max(x, 0), sliderWidth - handleWidth);


            sliderHandle.style.left = left + 'px';

            const percentage = left / (sliderWidth - handleWidth);
            const value = Math.round(maxValue * Math.pow(percentage, scalingFactor));
            sliderValue.textContent = value.toLocaleString();
        };

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);

        });
    });

}

export const resetSlider = (slider, sliderHandle, sliderValue) => {
    const maxValue = 2000000000;

    let sliderWidth = window.getComputedStyle(slider).width.replace(/px/g, "");
    let handleWidth = window.getComputedStyle(sliderHandle).width.replace("px", "");


    sliderHandle.style.left = sliderWidth - handleWidth + 'px';

    sliderValue.textContent = maxValue.toLocaleString();
}


