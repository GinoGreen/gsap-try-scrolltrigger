gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

const app = new Vue({
   el: '#app',

   data: {
      sectionIndex: 1,
      scrollPosition: 0,
      isScrolling: false,
      scrollTiming: 1,
   },

   mounted() {
      this.moveMoon();
   },

   methods: {
      moveMoon() {
         gsap.to('.moon', { 
            x: 50,
            repeat: -1,
            yoyo: true
         });
      },

      handleScroll(event) {
         let currentScrollPosition = event.srcElement.scrollTop;
         if (!this.isScrolling) {
            
            if (currentScrollPosition > this.scrollPosition) {
               console.log("Scrolling Down");
               console.log(currentScrollPosition, 'currentScrollPosition');
               console.log(this.scrollPosition, 'this.scrollPosition');
               
               if (this.sectionIndex < 3) this.sectionIndex++;
               
               this.scrollSection(this.sectionIndex)
               
            } else if (currentScrollPosition < this.scrollPosition) {
               console.log("Scrolling Up");
               console.log(currentScrollPosition, 'currentScrollPosition');
               console.log(this.scrollPosition, 'this.scrollPosition');

               if (this.sectionIndex > 1) this.sectionIndex--;
               
               this.scrollSection(this.sectionIndex);
            }
            
         }
         this.scrollPosition = event.srcElement.scrollTop;
         // console.log(event);
      },

      scrollSection(index) {
         this.isScrolling = true;

         gsap.to('main', {
            duration: this.scrollTiming,
            scrollTo: {
               y: '#section' + index,
            },
            ease: Sine.easeIn,
         });

         setTimeout(() => this.isScrolling = false, this.scrollTiming * 1000 + 100);
         
         this.sectionIndex = index;

      },
   }
});