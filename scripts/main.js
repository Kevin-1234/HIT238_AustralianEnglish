class AustralianEnglish {
  constructor() {
    this.home = document.querySelector('.home');
    this.homeCards = document.querySelectorAll('.home-card');
    this.slangs = document.querySelector('.slangs');
    this.slangCards = document.querySelectorAll('.slang-card');
    this.phrases = document.querySelector('.phrases');
    this.phrase = document.querySelectorAll('.phrase');
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

  // initialze IndexDB
  indexDBInit() {
    let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
        IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
        dbVersion = 1.0;

    // open the database    
    let request = window.indexedDB.open("EnglishResoruces", dbVersion),
        db,
        slangTx,
        phraseTx,
        slangStore,
        phraseStore;

    // when the data base is created the first time, onupgrade event is fired
    request.onupgradeneeded = function(e) {
      let db = request.result,
          // create object stores and set the keys of each record
          slangStore = db.createObjectStore("SlangStore", {keyPath:"slang"}), 
          phraseStore = db.createObjectStore("PhraseStore", {keyPath:"phrase"});
    };

    request.onerror = function(e) {
      console.log("An error has occured:" + e.target.errorCode);
    };
    
    // use '=>' instead of "function()", so that "this.slangData" is defined when it is used within the function 
    request.onsuccess = (e) => {
      // after open the db successfully, create transactions and connect them to objectstores
      console.log("success");
      db = request.result;
      slangTx = db.transaction("SlangStore", "readwrite");
      phraseTx = db.transaction("PhraseStore", "readwrite");
      slangStore = slangTx.objectStore("SlangStore");
      phraseStore = phraseTx.objectStore("PhraseStore");

      db.onerror = function(e) {
        console.log("ERROR" + e.target.errorCode);
      };

      // Add records into the slang store
      slangStore.put(
        {
          slang: "Mash",
          definition: "Potatoes that have been boiled and crushed into a soft mass, often with butter and milk.",
          imageS: "assets/images/sb_mash.png",
          imageL: "assets/images/l_mash.png",
          audio: "assets/audios/mash.mp3"
        }
      );
      slangStore.put(
        {
          slang: "Dead Horse",
          definition: "It means tomato sauce, which is any of a very large number of sauces made primarily from tomatoes.",
          imageS: "assets/images/sb_deadhorse.png",
          imageL: "assets/images/l_deadhorse.png",
          audio: "assets/audios/deadhorse.mp3"
        });

      slangStore.put(
        {
          slang: "Banger",
          definition: "Sausage",
          imageS: "assets/images/sb_banger.png",
          imageL: "assets/images/l_banger.png",
          audio: "assets/audios/banger.mp3"
        });

      slangStore.put(
        {
          slang: "Avo",
          definition: "A tropical fruit with hard, dark green skin, soft, light green flesh and a large seed inside.",
          imageS: "assets/images/sb_avo.png",
          imageL: "assets/images/l_avo.png",
          audio: "assets/audios/avo.mp3"
        });

      slangStore.put(
        {
          slang: "Dog Eye",
          definition: "Dog's eye is a pie with a filling of meat and/or other savory ingredients.",
          imageS: "assets/images/sb_dogeye.png",
          imageL: "assets/images/l_dogeye.png",
          audio: "assets/audios/dogeye.mp3"
        });

      slangStore.put(
        {
          slang: "Flat White",
          definition: "Coffee with milk or cream.",
          imageS: "assets/images/sb_flatwhite.png",
          imageL: "assets/images/l_flatwhite.png",
          audio: "assets/audios/flatwhite.mp3"
        }
      );

      // Add records into the phrase store
      phraseStore.put(
        {
          phrase: "Walking a Mile in Someone's Shoes",
          definition: "The expression 'to walk a mile in someone's shoes' means to consider someone else's feelings or experiences or challenges or thought process, to understand what it is like for this person.",
          imageL: "assets/images/walk.png"
        }
      );

      phraseStore.put(
        {
          phrase: "Go Down a Storm",
          definition: "The expression ‘to go down a storm’ means to be enthusiastically received by an audience. So, to be liked, to be whole-heartedly appreciated, to have great success. If something goes down a storm, it succeeds, or it is received incredibly well by a person or group of people.",
          imageL: "assets/images/go.png"
        }
      );
    
      phraseStore.put(
        {
          phrase: "Down the Track",
          definition: "The expression ‘Down the track’ means in the future. I'm thinking about doing this down the track, in the future as if you're walking down that path and you'll worry about something else further down the path when you get down that track.",
          imageL: "assets/images/down.png"
        }
      );

      phraseStore.put(
        {
          phrase: "Throw Caution to the Wind",
          definition: "If you 'throw caution to the wind', it is to act in a completely reckless manner, to do something without worrying about it, without worrying about the risk or the negative results that  come from doing that thing. So, it's often to take a risk and it has this element of carelessness. So, you've thrown caution, like the caution you should have, you've thrown it away to the wind, so that it blows.",
          imageL: "assets/images/throw.png"
        }
      );

      phraseStore.put(
        {
          phrase: "Draw a Blank on Something",
          definition: "The expression 'to draw a blank on something' means to fail to recall a memory or to fail in some speculative effort. it's to fail to produce an answer for something or fail to remember something.",
          imageL: "assets/images/draw.png"
        }
      );
        
    

      // creat cursors to retrieve data from the objecstores  
      let slangsCursor = slangStore.openCursor();
      let phrasesCursor = phraseStore.openCursor();
      
      // error detaction
      slangsCursor.onerror = function(event) {
        console.err("error fetching data");
      };
      phrasesCursor.onerror = function(event) {
        console.err("error fetching data");
      };

      // when slang cursor is successful
      slangsCursor.onsuccess = (event) => {
          let cursor = event.target.result;
          if (cursor) {
              let value = cursor.value;
              //store the slang records values retrieved from indexDB into an array for future use
              this.slangData.push(value);
              cursor.continue();
          }
          else {
              // after getting all the data, get names of each record and add them to each card in slangs component
              this.addSlangNames();
              // add images to the cards in slangs component
              this.addSlangImages();
              // listen the click events on all the slang cards
              this.listenSlangCards(); 
              console.log("No more items");
          }
      };
      
      // when phrase cursor is successful
      phrasesCursor.onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
          let value = cursor.value;
          // store the phrase records values retrieved from indexDB into an array 
          this.phraseData.push(value);
          cursor.continue();
      }
      else {
        // add phrase names from the data array to each phrase cards  
        this.addPhraseNames();
        // listen for the click event on each phrase cards
        this.listenPhraseCards(); 
        console.log("No more items");
      }
      };

      // when trasaction finishes, close the database
      slangTx.oncomplete = (event) => {
        phraseTx.oncomplete = (event) => {
          db.close();
        }
      };
    }
  }

  
  // display home component
  goHome() {
    // erase the current content and set all components' z-index to 0
    this.eraseContent();
    // change the home component's opacity to 1
    this.home.style.opacity = '1';
    // change the home component's z-index to 1
    this.home.style.zIndex = '1';
    // hide the back arrow at home page
    this.backArrow.style.display = 'none';
  }

  // display slangs component
  goSlangs(){
    this.eraseContent();
    this.slangs.style.opacity = '1';
    this.slangs.style.zIndex = '1';
    this.backArrow.addEventListener('click', () => this.goHome());
    this.backArrow.style.display = 'block'; 
  }

  // display phrases component
  goPhrases() {
    this.eraseContent();
    this.phrases.style.opacity = '1';
    this.phrases.style.zIndex = '1';
    this.backArrow.addEventListener('click', () => this.goHome());
    this.backArrow.style.display = 'block'; 
  }

  // display details component
  // the itemName parameter could be either a slang name or phrase name
  goDetails(itemName) {
    // iterate the slang data array
    for (let i=0; i < this.slangData.length;i++){
        // if the slang name passed in the fuction matches with one of the records in the data array
        if (itemName === this.slangData[i].slang){
          // retrieve the image url, title and definition from the data array
          // then add them to each elements in the details component
          this.detailImage.setAttribute('src', this.slangData[i].imageL);
          this.detailTitle.innerHTML =  this.slangData[i].slang;
          this.detailDef.innerHTML = this.slangData[i].definition;
          // when the item is a slang, show the audio button
          this.audioButton.style.display = 'block';
          // play audio when user clicks the speaker button
          this.audio = new Audio(this.slangData[i].audio);
          this.backArrow.addEventListener('click', () => this.goSlangs());
        }

      }
      
      // if the item is a phrase, itrate the phrase data array
      for (let x=0; x < this.phraseData.length;x++){
        // find the matching record
        if (itemName === this.phraseData[x].phrase){
          // bring data to the details component
          console.log(this.phraseData[x].imageL);
          this.detailImage.setAttribute('src', this.phraseData[x].imageL);
          this.detailTitle.innerHTML =  this.phraseData[x].phrase;
          this.detailTitle.style.fontSize = '1.4rem';
          this.detailDef.innerHTML = this.phraseData[x].definition;
          this.audioButton.style.display = 'none';
          this.backArrow.addEventListener('click', () => this.goPhrases());
        
        }
      }
      // after data has been added into the details component, erase current content, then show details component 
      australianEnglish.eraseContent();
      australianEnglish.details.style.opacity = '1';
      australianEnglish.details.style.zIndex = '1';     
  }

  // add the slang name for each slang block in 'slangs' component
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
    // define image url for each image url
    let imageUrl = this.slangData[i]["imageS"]; 
    // change background image of each block based on image url defind
    this.slangCards[i].style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${imageUrl})`; 
  }
  }

  // add the phrase name for each phrase card in 'phrases' component
  addPhraseNames() {
    for (let i=0; i<this.phraseCards.length; i++){
      this.phraseCards[i].innerHTML = this.phraseData[i]["phrase"];
    }
  }

  // listen to each click event on each slang card
  listenSlangCards() {
    for (let i=0; i<this.slangCards.length; i++){
      let slangTitle = this.slangCards[i].innerHTML;
      this.slangCards[i].addEventListener('click', () => {
        this.goDetails(slangTitle);
      })
    }
  }

  // listen to each click event on each phrase card
  listenPhraseCards(){
    for (let i=0; i<this.phrase.length; i++){
      let phraseTitle = this.phraseCards[i].innerHTML;
      this.phrase[i].addEventListener('click', () => {
        this.goDetails(phraseTitle);
      })
    }
  }


  addEventListeners() {
    // listen to click even on home buttom
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
    // listen to the audio button
    this.audioButton.addEventListener('click', () => this.audio.play());
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
}

australianEnglish = new AustralianEnglish ();



  


