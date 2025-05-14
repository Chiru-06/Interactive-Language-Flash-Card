const wordBanks = {
    turkish: [
        { word: "Merhaba", translation: "Hello" },
        { word: "Teşekkürler", translation: "Thank you" },
        { word: "Su", translation: "Water" },
        { word: "Ekmek", translation: "Bread" },
        { word: "Kitap", translation: "Book" },
        { word: "Kedi", translation: "Cat" },
        { word: "Köpek", translation: "Dog" },
        { word: "Güzel", translation: "Beautiful" },
        { word: "Kalem", translation: "Pen" },
        { word: "Araba", translation: "Car" }
    ],
    german: [
        { word: "Hallo", translation: "Hello" },
    { word: "Danke", translation: "Thank you" },
    { word: "Wasser", translation: "Water" },
    { word: "Brot", translation: "Bread" },
    { word: "Buch", translation: "Book" },
    { word: "Katze", translation: "Cat" },
    { word: "Hund", translation: "Dog" },
    { word: "Schön", translation: "Beautiful" },
    { word: "Stift", translation: "Pen" },
    { word: "Auto", translation: "Car" }
    ]
  };

  const flashcard = document.getElementById("flashcard");
  const frontText = document.getElementById("frontText");
  const backText = document.getElementById("backText");
  const progressTracker = document.getElementById("progressTracker");
  const languageSelect = document.getElementById("languageSelect");

  let currentLang = localStorage.getItem("lang") || "turkish";
  let cards = [];
  let currentIndex = 0;

  function loadLanguage(lang) {
    document.body.className = lang;
    localStorage.setItem("lang", lang);
    cards = [...wordBanks[lang]];
    currentIndex = 0;
    updateCard();
  }

  function updateCard() {
    const { word, translation } = cards[currentIndex];
    frontText.textContent = word;
    backText.textContent = translation;
    progressTracker.textContent = `Card ${currentIndex + 1}/${cards.length}`;
    flashcard.classList.remove("flipped");
  }

  document.getElementById("flipBtn").onclick = () => {
    flashcard.classList.toggle("flipped");
  };

  document.getElementById("nextBtn").onclick = () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCard();
  };

  document.getElementById("shuffleBtn").onclick = () => {
    cards.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    updateCard();
  };

  document.getElementById("resetBtn").onclick = () => {
    currentIndex = 0;
    updateCard();
  };

  languageSelect.onchange = (e) => {
    loadLanguage(e.target.value);
  };

  flashcard.onclick = () => {
    flashcard.classList.toggle("flipped");
  };

  document.getElementById("addCardBtn").onclick = () => {
    const word = document.getElementById("newWord").value.trim();
    const translation = document.getElementById("newTranslation").value.trim();
    const lang = document.getElementById("addLangSelect").value;
    if (word && translation && lang) {
      wordBanks[lang].push({ word, translation });
      alert("Flashcard added!");
      if (lang === currentLang) loadLanguage(currentLang);
    } else {
      alert("Please fill all fields.");
    }
  };

  document.getElementById("removeCardBtn").onclick = () => {
    const word = document.getElementById("newWord").value.trim();
    const lang = document.getElementById("addLangSelect").value;
    if (word && lang) {
      wordBanks[lang] = wordBanks[lang].filter(card => card.word.toLowerCase() !== word.toLowerCase());
      alert("Flashcard removed if it existed.");
      if (lang === currentLang) loadLanguage(currentLang);
    } else {
      alert("Please provide word and language to remove.");
    }
  };

  languageSelect.value = currentLang;
  loadLanguage(currentLang);