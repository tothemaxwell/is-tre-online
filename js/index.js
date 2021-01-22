
// Initial values
const STATUS_ONLINE_MESSAGE = 'online.';
const STATUS_OFFLINE_MESSAGE = 'not online.';
const TRE_UUID = '27489c71-81e8-4057-a419-fe1657c80911';
const SERVER_IP = 'furiends.nodecraft.gg';
const QUERY_URL = `https://api.mcsrvstat.us/2/${SERVER_IP}`;

// Runs on window load.
function windowInit() {
  checkForTre();
}

function checkForTre() {
  fetch(QUERY_URL)
    .then(response => response.json())
    .then(data => {
      const ids = data.players.online !== 0
        ? Object.values(data.players.uuid)
        : [];
      if (ids.includes(TRE_UUID)) {
        setStatus(STATUS_ONLINE_MESSAGE);
        setMoreInfoVisibility(true);
      } else {
        setStatus(STATUS_OFFLINE_MESSAGE);
        setMoreInfoVisibility(true);
      }
      setMoreInfo(`Checked the server ${SERVER_IP} for the UUID ${TRE_UUID}.`);
    });
}

/**
 * Sets text within '#status' element
 * @param {string} status 
 */
function setStatus(status) {
  document.getElementById('status').innerText = status;
}

/**
 * Sets text within '#more-info' element
 * @param {string} info 
 */
function setMoreInfo(info) {
  document.getElementById('more-info').innerText = info;
}

/**
 * Sets visibility of '#more-info' element, either 'hidden' or 'visible'
 * @param {boolean} visible 
 */
function setMoreInfoVisibility(visible) {
  const moreInfo = document.getElementById('more-info');
  moreInfo.style.visibility = visible ? 'visible' : 'hidden';
}

window.addEventListener("load", windowInit);
