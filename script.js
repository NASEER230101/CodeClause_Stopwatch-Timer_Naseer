document.addEventListener('DOMContentLoaded', function() {
  let timerInterval;
  let timerMilliseconds = 0;
  let stopwatchInterval;
  let stopwatchMilliseconds = 0;

  function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((milliseconds % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
    const millisecondsDisplay = (milliseconds % 1000).toString().padStart(3, '0');

    return `${hours}:${minutes}:${seconds}.${millisecondsDisplay}`;
  }

  function openSetDialog() {
    document.getElementById('dialog').style.display = 'block';
  }

  function closeSetDialog() {
    document.getElementById('dialog').style.display = 'none';
  }

  function setTimerTime() {
    const hours = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

    const totalMilliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
    timerMilliseconds = totalMilliseconds;
    document.getElementById('timerDisplay').textContent = formatTime(timerMilliseconds);

    closeSetDialog();
  }

  function startTimer() {
    if (timerMilliseconds > 0 && !timerInterval) {
      timerInterval = setInterval(function() {
        timerMilliseconds -= 10;
        if (timerMilliseconds <= 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          document.body.style.animation = 'blink 1s infinite';
        }
        document.getElementById('timerDisplay').textContent = formatTime(timerMilliseconds);
      }, 10);
    }
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function resetTimer() {
    stopTimer();
    timerMilliseconds = 0;
    document.getElementById('timerDisplay').textContent = formatTime(timerMilliseconds);
    document.body.style.animation = 'none';
  }

  function startStopwatch() {
    if (!stopwatchInterval) {
      stopwatchInterval = setInterval(function() {
        stopwatchMilliseconds += 10;
        document.getElementById('stopwatchDisplay').textContent = formatTime(stopwatchMilliseconds);
      }, 10);
    }
  }

  function stopStopwatch() {
    if (stopwatchInterval) {
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
    }
  }

  function resetStopwatch() {
    stopStopwatch();
    stopwatchMilliseconds = 0;
    document.getElementById('stopwatchDisplay').textContent = formatTime(stopwatchMilliseconds);
  }

  document.getElementById('setTimerBtn').addEventListener('click', openSetDialog);
  document.getElementById('setTimeBtn').addEventListener('click', setTimerTime);
  document.getElementById('timerStart').addEventListener('click', startTimer);
  document.getElementById('timerStop').addEventListener('click', stopTimer);
  document.getElementById('timerReset').addEventListener('click', resetTimer);
  document.getElementById('stopwatchStart').addEventListener('click', startStopwatch);
  document.getElementById('stopwatchStop').addEventListener('click', stopStopwatch);
  document.getElementById('stopwatchReset').addEventListener('click', resetStopwatch);
});
