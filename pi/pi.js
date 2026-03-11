let background_digits = document.getElementById("background-digits");

console.log("test");

async function getData(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

getData("1-10000.txt");

