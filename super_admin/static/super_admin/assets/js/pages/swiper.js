// Slides only

var swiper = new Swiper(".Slidesonly", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: false,
});

// With controls

var swiper = new Swiper(".withcontrols", {
    autoplay: {
        delay: 8000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


// With controls

var swiper = new Swiper(".Pagination", {
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


// With Pagination

var swiper = new Swiper(".withcaption", {
    autoplay: {
        delay: 12000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


// With fade

var swiper = new Swiper(".fadeeffect", {
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    effect: "fade",
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});




// countdown

// (function () {
//     const second = 1000,
//         minute = second * 60,
//         hour = minute * 60,
//         day = hour * 24;

//     //I'm adding this section so I don't have to keep updating this pen every year :-)
//     //remove this if you don't need it
//     let today = new Date(),
//         dd = String(today.getDate()).padStart(2, "0"),
//         mm = String(today.getMonth() + 1).padStart(2, "0"),
//         yyyy = today.getFullYear(),
//         nextYear = yyyy + 1,
//         dayMonth = "012/1/",
//         birthday = dayMonth + yyyy;

//     today = mm + "/" + dd + "/" + yyyy;
//     if (today > birthday) {
//         birthday = dayMonth + nextYear;
//     }
//     //end

//     const countDown = new Date(birthday).getTime(),
//         x = setInterval(function () {

//             const now = new Date().getTime(),
//                 distance = countDown - now;

//             document.getElementById("days").innerText = Math.floor(distance / (day)),
//                 document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
//                 document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
//                 document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

//             //do something later when date is reached
//             if (distance < 0) {
//                 document.getElementById("headline").innerText = "It's my birthday!";
//                 document.getElementById("countdown").style.display = "none";
//                 document.getElementById("content").style.display = "block";
//                 clearInterval(x);
//             }
//             //seconds
//         }, 0)
// }());