$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if(window.scrollY>60){
            document.querySelector('#scroll-top').classList.add('active');
        }else{
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 900,
    reset: false
});

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline',{delay: 250});
srtop.reveal('.experience .timeline .container',{interval: 300}); 

document.addEventListener('visibilitychange', function(){
    if(document.visibilityState === "visible"){
        document.title = "Experience | Portfolio Bhupesh Dubey";
        $("#favicon").attr("href","../assets/images/favicon.png?v=2");
    }
    else {
        document.title = "Come Back To Bhupesh's Portfolio";
        $("#favicon").attr("href","../assets/images/favhand.png");
    }
});
