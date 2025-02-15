gsap.from("#header span,#header button",{
   opacity:0,
   stagger:0.5,
   duration:1
})
gsap.from("#profile #todolist",{
    opacity:0,
    stagger:0.5,
    duration:1
 })
 function goBack() {
   window.history.back();
 }
//  gsap.from(".card",{
//     y:90,
//     opacity:0,
//     duration:2,
//     stagger:0.1,
//     scrollTrigger:{
//        trigger:".card",
//        scroller:"body",
//        markers:true,
//        start:"top 80%",
//        scrub:1
//     }
  
//   })