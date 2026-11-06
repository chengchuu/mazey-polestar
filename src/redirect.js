import { getUrlParam, isValidUrl } from "mazey";

const destinations = getUrlParam(window.location.href, "url", { returnArray: true });
// Mazey skips bare query keys; count those too when enforcing one destination.
const parameterCount = new URLSearchParams(window.location.search).getAll("url").length;
const status = document.getElementById("redirect-status");

if (parameterCount !== 1 || destinations.length !== 1 || destinations[0] === "") {
  status.textContent = "Provide exactly one nonempty url query parameter.";
} else if (!isValidUrl(destinations[0])) {
  status.textContent = "The destination URL is invalid.";
} else {
  const destination = destinations[0];
  document.getElementById("redirect").classList.replace("base-error", "base-info");
  const destinationLink = document.getElementById("redirect-destination");
  destinationLink.textContent = destination;
  destinationLink.setAttribute("href", destination);
  status.textContent = "Review the destination before continuing.";
  const continueLink = document.getElementById("redirect-continue");
  continueLink.setAttribute("href", destination);
  continueLink.hidden = false;
}
