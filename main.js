let isTraining = false;
let score = 0;
const TIME_FOR_TRAINING = 30.0;
const CURRENT_TIMER_VALUE = $(".right-sidebar-time-time");
const CURRENT_SCORE_VALUE = $(".right-sidebar-score-score");
const BUTTON_START = $(".button-start");
const CELL = $(".cell");
const COORDINATES = $(".coordinate"); //container for current and next coordinates
const CURRENT_COORDINATE = $(".p-current-coord");
const NEXT_COORDINATE = $(".p-next-coord");
const CURRENT_PROGRESS = $(".current-progress"); //current progress for progressbar
const COLOR_GREY_FOR_TEXT = "#bababa";
const COLOR_RED_FOR_TEXT = "red";
const COLOR_ORANGE_FOR_TEXT = "orange";
const COLOR_GREEN_FOR_TEXT = "green";

$(document).ready(function () {
  reset();

  function reset() {
    isTraining = false;
    BUTTON_START.css("display", "block");
    COORDINATES.css("display", "none");
    CURRENT_TIMER_VALUE.text(TIME_FOR_TRAINING.toFixed(1));
    CURRENT_TIMER_VALUE.css("color", COLOR_GREY_FOR_TEXT);
    CURRENT_PROGRESS.css("background-color", COLOR_GREEN_FOR_TEXT);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  function getRandomCoordinate() {
    let obj = {
      1: "a",
      2: "b",
      3: "c",
      4: "d",
      5: "e",
      6: "f",
      7: "g",
      8: "h",
    };
    return obj[getRandomInt(8)] + getRandomInt(8);
  }

  CELL.click(function () {
    if (!isTraining) return false;
    if ($(this).attr("id") == CURRENT_COORDINATE.text()) {
      score++;
      CURRENT_SCORE_VALUE.text(score);
      CURRENT_COORDINATE.text(NEXT_COORDINATE.text());
      NEXT_COORDINATE.text(getRandomCoordinate());
    } else {
      let interval = 0;
      let y = setInterval(function () {
        CURRENT_SCORE_VALUE.css("color", COLOR_RED_FOR_TEXT);
        CURRENT_PROGRESS.css("background-color", COLOR_RED_FOR_TEXT);
        interval += 200;
        if (interval > 200) {
          clearInterval(y);
          CURRENT_SCORE_VALUE.css("color", COLOR_GREY_FOR_TEXT);
          CURRENT_PROGRESS.css("background-color", COLOR_GREEN_FOR_TEXT);
        }
      }, 200);
    }
  });

  BUTTON_START.click(function () {
    isTraining = true;
    score = 0;
    CURRENT_SCORE_VALUE.text(score);
    BUTTON_START.css("display", "none");
    CURRENT_COORDINATE.text(getRandomCoordinate());
    NEXT_COORDINATE.text(getRandomCoordinate());
    COORDINATES.css("display", "flex");
    let time = parseFloat(CURRENT_TIMER_VALUE.text());
    let x = setInterval(function () {
      CURRENT_TIMER_VALUE.text(time.toFixed(1));
      CURRENT_PROGRESS.css(
        "width",
        ((TIME_FOR_TRAINING - time) * 100) / TIME_FOR_TRAINING + "%"
      );
      time = time - 0.1;
      if (time.toFixed(1) < 10.0) {
        CURRENT_TIMER_VALUE.css("color", COLOR_ORANGE_FOR_TEXT);
      }
      if (time.toFixed(1) < 0) {
        clearInterval(x);
        reset();
      }
    }, 100);
  });

  $(".header-menu-item").click(function () {
    let id = $(this).attr("id");
    $(".white").css(
      "background-color",
      $("." + id + "-color1").css("background-color")
    );
    $(".black").css(
      "background-color",
      $("." + id + "-color2").css("background-color")
    );
  });
});
