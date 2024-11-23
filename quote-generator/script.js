const getNewQuote = async () => {
  const apiUrl = "https://dummyjson.com/quotes/random";
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Display data in an HTML element
      quote.textContent = data.quote;
      author.textContent = data.author;
      // quote.textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
getNewQuote();

function tweet() {
  window.open(
    "https://twitter.com/intent/tweet?text=" +
      quote.textContent +
      " ---- by " +
      author.textContent,
    "Tweet Window",
    "width=600, height=300"
  );
}
