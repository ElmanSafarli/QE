let zSpacing = -1000,
    lastPos = zSpacing / 5,
    $frames = document.getElementsByClassName('frame'),
    frames = Array.from($frames),
    zVals = [];

window.onscroll = function () {
    let top = document.documentElement.scrollTop,
        delta = lastPos - top;

    lastPos = top;

    frames.forEach(function (n, i) {
        zVals.push((i * zSpacing) + zSpacing);
        zVals[i] += delta * -5.5;
        let frame = frames[i],
            transform = `translateZ(${zVals[i]}px)`,
            visibility = zVals[i] < Math.abs(zSpacing) / 1.8 ? 'visible' : 'hidden',
            opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0;

        // Set the CSS styles with transition
        frame.style.transition = 'visibility 0.75s, opacity 0.75s';
        frame.style.transform = transform;
        frame.style.visibility = visibility;
        frame.style.opacity = opacity;

        // Use transitionend event to toggle display property after animation
        frame.addEventListener('transitionend', function () {
            if (visibility === 'hidden') {
                frame.style.display = 'none';
            } else {
                frame.style.display = 'flex';
            }
        }, { once: true });

        // Reset display property when becoming visible again
        if (visibility === 'visible' && frame.style.display === 'none') {
            frame.style.display = 'flex';
        }
    });
};

window.scrollTo(0, 1)

// document.addEventListener('DOMContentLoaded', function () {
//     const themeToggle = document.querySelector('#switch');
//     const frame__content = document.querySelector('.frame__content');

//     themeToggle.addEventListener('change', function () {
//         document.body.classList.toggle('light-mode', themeToggle.checked);
//         frame__content.classList.toggle('light-mode', themeToggle.checked);
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.querySelector('#switch');

    const setTheme = (lightMode) => {
        document.documentElement.classList.toggle('dark-mode', lightMode);
        themeToggle.checked = lightMode;
    };

    const saveThemePreference = (lightMode) => {
        localStorage.setItem('light-mode', lightMode);
    };

    const loadThemePreference = () => {
        return JSON.parse(localStorage.getItem('light-mode')) || false;
    };

    setTheme(loadThemePreference());

    themeToggle.addEventListener('change', function () {
        const isLightMode = themeToggle.checked;
        setTheme(isLightMode);
        saveThemePreference(isLightMode);
    });
});