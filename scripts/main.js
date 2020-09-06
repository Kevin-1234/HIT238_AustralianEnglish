class AustralianEnglish {
  constructor() {
    this.home = document.querySelector('.home');
    this.homeCards = document.querySelectorAll('.home-card');
    this.slangs = document.querySelector('.slangs');
    this.slangCards = document.querySelectorAll('.slang-card');
    this.phrases = document.querySelector('.phrases');
    this.details = document.querySelector('.details');
    this.detailImage = document.querySelector('.detail-img');
    this.detailTitle = document.querySelector('.detail-title');
    this.detailDef = document.querySelector('.detail-definition');
    this.homeButton = document.querySelector('.home-btn');
    this.backArrow = document.querySelector('.back-arrow');
    this.audio = new Audio();
    this.audioButton = document.querySelector('.audio-btn');

    this.slangData = [];

    this.indexDBInit();
    
   
    console.log(this.slangData);
    
    this.goHome();
  
  }


   
    
   test() {

    console.log(this.slangData[0]);
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
  addSlangNames = () => {
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
      for (let i=0; i < this.slangData.length;i++){
        if (itemName === this.slangData[i].slang){
          this.detailImage.setAttribute('src', this.slangData[i].imageL);
          this.detailTitle.innerHTML =  this.slangData[i].slang;
          this.detailDef.innerHTML = this.slangData[i].definition;
          // play audio when user clicks the speaker button
          this.audio = new Audio(this.slangData[i].audio);
         
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
    
    for (let i=0; i<this.slangCards.length; i++){
      
        let slangTitle = this.slangCards[i].innerHTML;
        this.slangCards[i].addEventListener('click', () => {
          this.goDetails(slangTitle);

        })
        

      

    }
  
    this.audioButton.addEventListener('click', () => this.audio.play());
  
    
  }
  

  // initialze IndexDB
  indexDBInit = () => {
    var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
        IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
        dbVersion = 1.0;

    var slangList = [];

    let request = window.indexedDB.open("EnglishResoruce", dbVersion),
        db,
        tx,
        store,
        index;


    // when the data base is created the first time, onupgrade event is fired
    request.onupgradeneeded = function(e) {
      let db = request.result,
          // set the slang name to be the key of each slang record
          store = db.createObjectStore("ResouceStore", {keyPath:"slang"}), 
          index = store.createIndex("slang", "slang", {unique: false});

    };

    request.onerror = function(e) {
      console.log("An error has occured:" + e.target.errorCode);

    };
    // use '=>' instead of "function()", so that "this.slangData" will be defined
    request.onsuccess = (e) => {
      console.log("success");
      db = request.result;
      tx = db.transaction("ResouceStore", "readwrite");
      store = tx.objectStore("ResouceStore");
      index = store.index("slang");

      db.onerror = function(e) {
        console.log("ERROR" + e.target.errorCode);
      };
      store.put(
        {
          slang: "Mash",
          definition: "Potatoes that have been boiled and crushed into a soft mass, often with butter and milk.",
          imageS: "assets/images/SB_Mash.png",
          imageL: "assets/images/L_Mash.png",
          audio: "assets/audios/Mash.mp3"
        }
      );
      store.put(
        {
          slang: "Dead Horse",
          definition: "It means tomato sauce, which is any of a very large number of sauces made primarily from tomatoes.",
          imageS: "assets/images/SB_DeadHorse.png",
          imageL: "assets/images/L_DeadHorse.png",
          audio: "assets/audios/DeadHorse.mp3"
        });

      store.put(
        {
          slang: "Banger",
          definition: "Sausage",
          imageS: "assets/images/SB_Banger.png",
          imageL: "assets/images/L_Banger.png",
          audio: "assets/audios/Banger.mp3"
        });

      store.put(
        {
          slang: "Avo",
          definition: "A tropical fruit with hard, dark green skin, soft, light green flesh and a large seed inside.",
          imageS: "assets/images/SB_Avo.png",
          imageL: "assets/images/L_Avo.png",
          audio: "assets/audios/Avo.mp3"
        });

      store.put(
        {
          slang: "Dog Eye",
          definition: "Dog's eye is a pie with a filling of meat and/or other savory ingredients.",
          imageS: "assets/images/SB_DogEye.png",
          imageL: "assets/images/L_DogEye.png",
          audio: "assets/audios/DogEye.mp3"
        });

      store.put(
        {
          slang: "Flat White",
          definition: "Coffee with milk or cream.",
          imageS: "assets/images/SB_FlatWhite.png",
          imageL: "assets/images/L_FlatWhite.png",
          audio: "assets/audios/FlatWhite.mp3"
        }
      );
      
      
      
      

      

      var slangs = store.openCursor();
      slangs.onerror = function(event) {
        console.err("error fetching data");
      };
      slangs.onsuccess = (event) => {
          let cursor = event.target.result;
          if (cursor) {
              let key = cursor.key;
              let value = cursor.value;
              let valueDic = {};
              //console.log("key:" + key);
              //let slangRecord = {};
              
              //slangRecord[key] = value;
              //console.log(slangRecord);
              
              valueDic["slang"] = "test";
              valueDic["imageS"] = value["imageS"];
              valueDic["imageL"] = value["imageL"];
              valueDic["audio"] = value["audio"];
              
              //store the data retrieved from indexDB into a array for future use
              this.slangData.push(value);
              console.log("No more items " + this.slangData );
              //slangData.push(value)
              cursor.continue();
          }
          else {
              this.test();
              this.addSlangNames(this.slangData);
              this.addSlangImages(this.slangData);
              this.addEventListeners();
              console.log("No more items " + this.slangData );
              
          }
      };
      
      
      
      
      
    
      // when trasaction finishes, close the database
      tx.oncomplete = (event) => {
        console.log("close: " + this.slangData[0]["slang"]);
        db.close();
        
      };

    }
    
    
  }

}


australianEnglish = new AustralianEnglish ();



  


