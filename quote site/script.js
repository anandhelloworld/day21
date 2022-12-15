const quoteSection = document.createElement("section");

document.body.setAttribute(
  "class",
  "bg-dark d-flex align-items-center justify-content-center"
);
quoteSection.setAttribute("class", "bg-secondary w-75 mt-5");

document.body.appendChild(quoteSection);

async function getQuotes() {
  try {
    const res = await fetch("https://web-series-quotes-api.deta.dev/quote/");
    const data = await res.json();

    quoteSection.innerHTML = `
    <figure class="text-center rounded">
      <blockquote class="blockquote pt-4">
        <p class="text-light">${data[0].quote}</p>
      </blockquote>
      <figcaption class="blockquote-footer text-white mt-3">
        ${data[0].author} <cite title="Source Title">(${data[0].series})</cite>
      </figcaption>
    </figure>
    <button class="btn btn-primary col-6 offset-3 my-3" onClick="window.location.reload();">Click for more</button>
  `;
  } catch (error) {
    console.log(error);
  }
}

getQuotes();
