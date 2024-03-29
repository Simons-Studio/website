const scroll_container = document.getElementById("scroll-container");

const jobs = extract_list(scroll_container);
let job_index = 0;
let delay = 2000;
let open = true;

var intervelID = setInterval(rotate_text, delay);
document.addEventListener("visibilitychange", () => {
  console.log("Visibility Change");
  if (document.hidden) {
    clearInterval(intervelID);
  } else {
    scroll_container.textContent = "";
    open = true;
    intervelID = setInterval(rotate_text, delay);
  }
});

function extract_list(element) {
  const jobs_string = element.dataset.list;
  return jobs_string.split(/[ ,]+/);
}

function rotate_text() {
  if (open) {
    const job_type = next_job_title();
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
  const type_delay = delay / (2 * string.length);
  const textInterval = setInterval(() => {
    if (index >= string.length || document.hidden) {
      clearInterval(textInterval);
    }

    index++;
    current_text = string.substring(0, index);
    container.textContent = current_text;
  }, type_delay);
}

function animate_deleting(container, delay) {
  let current_text = container.textContent;
  const type_delay = delay / (2 * current_text.length);
  const textInterval = setInterval(() => {
    if (current_text === "" || document.hidden) {
      clearInterval(textInterval);
    }

    current_text = current_text.slice(0, -1);
    container.textContent = current_text;
  }, type_delay);
}

function next_job_title() {
  const job_title = jobs[job_index];
  job_index++;
  job_index %= jobs.length;
  return job_title;
}
