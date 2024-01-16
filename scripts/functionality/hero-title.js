// let hero_title = document.getElementById("hero-title");
// let title_scroll_wrapper = document.getElementById("title-scroll-wrapper");
let scroll_container = document.getElementById("scroll-container");

let job_index = 0;
let jobs = ["developer", "programmer", "hire"];
let delay = 2000;
let open = true;

const intervelID = setInterval(rotate_text, delay);

function extract_list(element) {}

function rotate_text() {
  if (open) {
    let job_type = next_job_title();
    scroll_container.classList = job_type + "-title";
    animate_typing(scroll_container, job_type, delay);
  } else {
    animate_deleting(scroll_container, delay);
  }
  open = !open;
}

function animate_typing(container, string, delay) {
  let current_text = "";
  let index = 0;
  let type_delay = delay / (2 * string.length);
  let textInterval = setInterval(() => {
    if (index >= string.length) {
      clearInterval(textInterval);
    }

    index++;
    current_text = string.substring(0, index);
    container.textContent = current_text;
  }, type_delay);
}

function animate_deleting(container, delay) {
  let current_text = container.textContent;
  let type_delay = delay / (2 * current_text.length);
  let textInterval = setInterval(() => {
    if (current_text === "") {
      clearInterval(textInterval);
    }

    current_text = current_text.slice(0, -1);
    container.textContent = current_text;
  }, type_delay);
}

function next_job_title() {
  let job_title = jobs[job_index];
  job_index++;
  job_index %= jobs.length;
  return job_title;
}
