class AustralianEnglish {
  constructor() {
    this.home = document.querySelector('.home');
    this.homeCards = document.querySelectorAll('.home-card');
    this.slangs = document.querySelector('.slangs');
    this.slangCards = document.querySelectorAll('.slang-card');
    this.phrases = document.querySelector('.phrases');
    this.phraseCards = document.querySelectorAll('.phrase-card');
    this.details = document.querySelector('.details');
    this.detailImage = document.querySelector('.detail-img');
    this.detailTitle = document.querySelector('.detail-title');
    this.detailDef = document.querySelector('.detail-definition');
    this.homeButton = document.querySelector('.home-btn');
    this.backArrow = document.querySelector('.back-arrow');
    this.audio = new Audio();
    this.audioButton = document.querySelector('.audio-btn');
    this.slangData = [];
    this.phraseData = [];

    this.indexDBInit();
    this.addEventListeners();   
    this.goHome();
  
  }


   
    
   
  // erase all content of the current component
  eraseContent() {
    this.home.style.opacity = '0';
    this.home.style.zIndex = '0';
    this.slangs.style.opacity = '0';
    this.slangs.style.zIndex = '0';
    this.phrases.style.opacity = '0';
    this.phrases.style.zIndex = '0';
    this.details.style.opacity = '0';
    this.details.style.zIndex = '0';
    
  }

  // display the slang name for each slang block in 'slangs' component
  addSlangNames() {
      console.log("slangList: " + this.slangData[0]);
      for (let i=0; i<this.slangCards.length; i++){
        console.log("this.slangData[0]:"+ this.slangData[0]["slang"]);
        this.slangCards[i].innerHTML = this.slangData[i]["slang"]; 
      }
     

  }

  // display the background pictures for each slang block in 'slangs' component
  addSlangImages() {  
  for (let i=0; i<this.slangCards.length; i++){
    // define image url for each slang block
    let imageUrl = this.slangData[i]["imageS"]; 
    // change background image of each block based on image url defind
    this.slangCards[i].style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${imageUrl})`; 
  }
  }

  addPhraseNames() {
    for (let i=0; i<this.phraseCards.length; i++){
      this.phraseCards[i].innerHTML = this.phraseData[i]["phrase"];
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

  listenSlangCards() {

    for (let i=0; i<this.slangCards.length; i++){
      
      let slangTitle = this.slangCards[i].innerHTML;
      this.slangCards[i].addEventListener('click', () => {
        this.goDetails(slangTitle);

      })
  }

  }

  goPhrases() {
    this.eraseContent();
    this.phrases.style.opacity = '1';
    this.phrases.style.zIndex = '1';
    this.backArrow.addEventListener('click', () => this.goHome());
    this.backArrow.style.display = 'block'; 
  }

  listenPhraseCards(){
    for (let i=0; i<this.phraseCards.length; i++){
      
      let phraseTitle = this.phraseCards[i].innerHTML;
      this.phraseCards[i].addEventListener('click', () => {
        this.goDetails(phraseTitle);

      })
  }
    
  }

  goDetails(itemName) {
    
    for (let i=0; i < this.slangData.length;i++){
        if (itemName === this.slangData[i].slang){
          this.detailImage.setAttribute('src', this.slangData[i].imageL);
          this.detailTitle.innerHTML =  this.slangData[i].slang;
          this.detailDef.innerHTML = this.slangData[i].definition;
          this.audioButton.style.display = 'block';
          // play audio when user clicks the speaker button
          this.audio = new Audio(this.slangData[i].audio);
          this.backArrow.addEventListener('click', () => this.goSlangs());
        }

      }
      

      for (let x=0; x < this.phraseData.length;x++){
        if (itemName === this.phraseData[x].phrase){
          console.log(this.phraseData[x].imageL);
          this.detailImage.setAttribute('src', this.phraseData[x].imageL);
          this.detailTitle.innerHTML =  this.phraseData[x].phrase;
          this.detailDef.innerHTML = this.phraseData[x].definition;
          this.audioButton.style.display = 'none';
          this.backArrow.addEventListener('click', () => this.goPhrases());
        }

      }

    
      australianEnglish.eraseContent();
      australianEnglish.details.style.opacity = '1';
      australianEnglish.details.style.zIndex = '1';     
      
    
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
    

    
  
    this.audioButton.addEventListener('click', () => this.audio.play());
  
    
  }
  

  // initialze IndexDB
  indexDBInit() {
    var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
        IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
        dbVersion = 1.0;

    

    let request = window.indexedDB.open("EnglishResoruces", dbVersion),
        db,
        slangTx,
        phraseTx,
        slangStore,
        phraseStore;
       


    // when the data base is created the first time, onupgrade event is fired
    request.onupgradeneeded = function(e) {
      let db = request.result,
          // set the slang name to be the key of each slang record
          slangStore = db.createObjectStore("SlangStore", {keyPath:"slang"}), 
          phraseStore = db.createObjectStore("PhraseStore", {keyPath:"phrase"});
          

    };

    request.onerror = function(e) {
      console.log("An error has occured:" + e.target.errorCode);

    };
    // use '=>' instead of "function()", so that "this.slangData" will be defined
    request.onsuccess = (e) => {
      console.log("success");
      db = request.result;
      slangTx = db.transaction("SlangStore", "readwrite");
      phraseTx = db.transaction("PhraseStore", "readwrite");
      slangStore = slangTx.objectStore("SlangStore");
      phraseStore = phraseTx.objectStore("PhraseStore");



      db.onerror = function(e) {
        console.log("ERROR" + e.target.errorCode);
      };
      slangStore.put(
        {
          slang: "Mash",
          definition: "Potatoes that have been boiled and crushed into a soft mass, often with butter and milk.",
          imageS: "assets/images/SB_Mash.png",
          imageL: "assets/images/L_Mash.png",
          audio: "assets/audios/Mash.mp3"
        }
      );
      slangStore.put(
        {
          slang: "Dead Horse",
          definition: "It means tomato sauce, which is any of a very large number of sauces made primarily from tomatoes.",
          imageS: "assets/images/SB_DeadHorse.png",
          imageL: "assets/images/L_DeadHorse.png",
          audio: "assets/audios/DeadHorse.mp3"
        });

      slangStore.put(
        {
          slang: "Banger",
          definition: "Sausage",
          imageS: "assets/images/SB_Banger.png",
          imageL: "assets/images/L_Banger.png",
          audio: "assets/audios/Banger.mp3"
        });

      slangStore.put(
        {
          slang: "Avo",
          definition: "A tropical fruit with hard, dark green skin, soft, light green flesh and a large seed inside.",
          imageS: "assets/images/SB_Avo.png",
          imageL: "assets/images/L_Avo.png",
          audio: "assets/audios/Avo.mp3"
        });

      slangStore.put(
        {
          slang: "Dog Eye",
          definition: "Dog's eye is a pie with a filling of meat and/or other savory ingredients.",
          imageS: "assets/images/SB_DogEye.png",
          imageL: "assets/images/L_DogEye.png",
          audio: "assets/audios/DogEye.mp3"
        });

      slangStore.put(
        {
          slang: "Flat White",
          definition: "Coffee with milk or cream.",
          imageS: "assets/images/SB_FlatWhite.png",
          imageL: "assets/images/L_FlatWhite.png",
          audio: "assets/audios/FlatWhite.mp3"
        }
      );
      
      phraseStore.put(
        {
          phrase: "Walking a Mile in Someone's Shoes",
          definition: "The expression 'to walk a mile in someone's shoes' means to consider someone else's feelings or experiences or challenges or thought process, to understand what it is like for this person.",
          imageL: "assets/images/Walk.png"
        }
          
      );

      phraseStore.put(
        {
          phrase: "Go Down a Storm",
          definition: "The expression ‘to go down a storm’ means to be enthusiastically received by an audience. So, to be liked, to be whole-heartedly appreciated, to have great success. If something \n goes down a storm, it succeeds, or it is received incredibly well by a person or group of people.",
          imageL: "assets/images/Go.png"
        }
          
      );
      phraseStore.put(
        {
          phrase: "Go Down a Storm",
          definition: "The expression ‘to go down a storm’ means to be enthusiastically received by an audience. So, to be liked, to be whole-heartedly appreciated, to have great success. If something \n goes down a storm, it succeeds, or it is received incredibly well by a person or group of people.",
          imageL: "assets/images/Go.png"
        }
          
      );
      phraseStore.put(
        {
          phrase: "Down the Track",
          definition: "The expression ‘Down the track’ means in the future. I'm thinking about doing this down the track, in the future as if you're walking down that path and you'll worry about something else further down the path when you get down that track.",
          imageL: "assets/images/Down.png"
        }
          
      );
      phraseStore.put(
        {
          phrase: "Throw Caution to the Wind",
          definition: "If you 'throw caution to the wind', it is to act in a completely reckless manner, to do\n something without worrying about it, without worrying about the risk or the negative results that \n come from doing that thing. So, it's often to take a risk and it has this element of carelessness. So, you've thrown \n caution, like the caution you should have, you've thrown it away to the wind, so that it blows.",
          imageL: "assets/images/Throw.png"
        }
          
      );
      phraseStore.put(
        {
          phrase: "Draw a Blank on Something",
          definition: "Origin: The phrase came from a tutor English in the year 1567, when the first National Lottery was created by Elizabeth Queen the first, and so what would happen is \n the lottery would take place by placing slips of paper with names on them names of the participants, of people, into a pot and there would be an equal number of slips with \n prizes written on them put into another pot, except a lot of those slips would be blank, they wouldn't have anything written on them. So, that when they were drawn out there \n would be a prize or there would be a blank. So, pairs of tickets would be drawn out, the name out of one pot and a prize or lack there of out of another pot, and unfortunately \n for most people more often than not a blank slip was drawn out and the participant got bugger all, they got nothing, they got jack squats, so they drew \n a blank, they pulled a blank card or slip out of the pot. They drew a blank.",
          imageL: "assets/images/Draw.png"
        }
          
      );
        
    

    
      let slangs = slangStore.openCursor();
      let phrases = phraseStore.openCursor();
      slangs.onerror = function(event) {
        console.err("error fetching data");
      };
      phrases.onerror = function(event) {
        console.err("error fetching data");
      };
      slangs.onsuccess = (event) => {
          let cursor = event.target.result;
          if (cursor) {
              
              let value = cursor.value;
              //store the data retrieved from indexDB into a array for future use
              this.slangData.push(value);
              console.log("No more items " + this.slangData );
              //slangData.push(value)
              cursor.continue();
          }
          else {
              
              this.addSlangNames();
              this.addSlangImages();
              this.listenSlangCards(); 
              console.log("No more items " + this.slangData );
              
          }
      };
      
      phrases.onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
              
          let value = cursor.value;
          //store the data retrieved from indexDB into a array for future use
          this.phraseData.push(value);
          console.log("No more phraseData: " + this.phraseData );
          //slangData.push(value)
          cursor.continue();
      }
      else {
          
        this.addPhraseNames(); 
        this.listenPhraseCards(); 
        console.log("No more items " + this.phraseData );
          
      }

      };
      
      
      
      
      
    
      // when trasaction finishes, close the database
      slangTx.oncomplete = (event) => {
        phraseTx.oncomplete = (event) => {
          console.log("close: " + this.slangData[0]["slang"]);
          db.close();
        }
        
        
      };
      
    }
    
    
  }

}


australianEnglish = new AustralianEnglish ();



  


