// let hero_title = document.getElementById("hero-title");
// let title_scroll_wrapper = document.getElementById("title-scroll-wrapper");
let scroll_container = document.getElementById("scroll-container");

let job_index = 0;
let jobs = ["developer", "programmer", "hire"];
let delay = 1000;
let open = false;

const intervelID = setInterval(rotate_text, delay);

function extract_list(element) {}

function rotate_text() {
  if (open) {
    scroll_container.style.width = "fit-content";
  } else {
    scroll_container.style.width = "0px";
    scroll_container.textContent = next_job_title();
  }

  open = !open;
}

function next_job_title() {
  let job_title = jobs[job_index];
  job_index++;
  job_index %= jobs.length;
  return job_title;
}
