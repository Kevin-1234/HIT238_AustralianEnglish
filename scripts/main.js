class AustralianEnglish {
  constructor() {
    this.home = document.querySelector('.home');
    this.homeCards = document.querySelectorAll('.home-card');
    this.slangs = document.querySelector('.slangs');
    this.slangCards = document.querySelectorAll('.slang-card');
    this.phrases = document.querySelector('.phrases');
    this.details = document.querySelector('.details');
    this.homeButton = document.querySelector('.home-btn');
    this.backArrow = document.querySelector('.back-arrow');
    this.audio = new Audio('/images/Mash.mp3');
    this.audioButton = document.querySelector('.audio-btn');
  

    this.addSlangImages();
    this.addEventListeners();
    this.goHome();
   
  }
  // erase all content of the current component
  eraseContent(){
    this.home.style.opacity = '0';
    this.home.style.zIndex = '0';
    this.slangs.style.opacity = '0';
    this.slangs.style.zIndex = '0';
    this.phrases.style.opacity = '0';
    this.phrases.style.zIndex = '0';
    this.details.style.opacity = '0';
    this.details.style.zIndex = '0';
    
  }
  // display different pictures for each slang block
  addSlangImages() {  
  for (let i=0; i<this.slangCards.length; i++){
    // remove white space in the text content
    let imageName = this.slangCards[i].textContent.replace(/ /g, "")
    // define image url for each slang block
    let imageUrl = '/images/SB_' + imageName + '.png'; 
    // change background image of each block based on image url defind
    this.slangCards[i].style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${imageUrl})`; 
  }
  }

  // display home component
  goHome() {
    
      this.eraseContent();
      this.home.style.opacity = '1';
      this.home.style.zIndex = '1';
      this.backArrow.style.display = 'none';
    
  }

  goSlangs(){
    this.eraseContent();
    this.slangs.style.opacity = '1';
    this.slangs.style.zIndex = '1';
    this.backArrow.addEventListener('click', () => this.goHome());
    this.backArrow.style.display = 'block'; 
  }

  goPhrases() {
    this.eraseContent();
    this.phrases.style.opacity = '1';
    this.phrases.style.zIndex = '1';
    this.backArrow.addEventListener('click', () => this.goHome());
    this.backArrow.style.display = 'block'; 
  }



  goDetails(itemName) {
    /*australianEnglish.slangCards[i].addEventListener('click', () => {
      australianEnglish.eraseContent();
      australianEnglish.details.style.opacity = '1';
      australianEnglish.details.style.zIndex = '1';     
  })*/
    
  }

  

  addEventListeners() {

    this.homeButton.addEventListener('click', () => {
      this.goHome();
    })

    // choose to display slangs or phrases component based on the card clicked by the user
    for (let i=0; i<this.homeCards.length; i++){
      let cardTitle = this.homeCards[i].textContent;
      // if user clicks 'Slangs' card show slangs compnent
      if (cardTitle === "Slangs"){
        this.homeCards[i].addEventListener('click', () => {
          this.goSlangs();  
      
        })
      // if user clicks 'Phrases' card show Phrases compnent
      }else if(cardTitle === "Phrases"){
        
        this.homeCards[i].addEventListener('click', () => {
          this.goPhrases();
          })    
      }
    } 

  
    // play audio when user clicks the speaker button
    this.audioButton.addEventListener('click', () => this.audio.play());
  
    
  }
  

}


australianEnglish = new AustralianEnglish ();



  


