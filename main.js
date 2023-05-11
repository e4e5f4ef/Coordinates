$(document).ready(function () {
  def();

  function def() {
    isTraining = false;
    $(".button-start").css("display", "block");
    $(".coordinate").css("display", "none");
    $(".right-sidebar-time-time").text("30.0");
    $(".right-sidebar-time-time").css("color", "#bababa");
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

  $(".coordinate").css("display", "none");
  $(".current-progress").css("width", 0);

  $(".cell").click(function () {
    if (isTraining) {
      if ($(this).attr("id") == $(".p-current-coord").text()) {
        score++;
        $(".right-sidebar-score-score").text(score);
        $(".p-current-coord").text($(".p-next-coord").text());
        $(".p-next-coord").text(getRandomCoordinate());
      } else {
        let interval = 0;
        let y = setInterval(function () {
          $(".right-sidebar-score-score").css("color", "red");
          $(".current-progress").css("background-color", "red");
          interval += 200;
          if (interval > 200) {
            clearInterval(y);
            $(".right-sidebar-score-score").css("color", "#bababa");
            $(".current-progress").css("background-color", "green");
          }
        }, 200);
      }
    }
  });

  $(".button-start").click(function () {
    isTraining = true;
    score = 0;
    $(".right-sidebar-score-score").text(score);
    $(".button-start").css("display", "none");
    $(".p-current-coord").text(getRandomCoordinate());
    $(".p-next-coord").text(getRandomCoordinate());
    $(".coordinate").css("display", "flex");
    let time = parseFloat($(".right-sidebar-time-time").text());
    let x = setInterval(function () {
      $(".right-sidebar-time-time").text(time.toFixed(1));
      $(".current-progress").css("width", ((30 - time) * 100) / 30 + "%");
      time = time - 0.1;
      if (time.toFixed(1) < 10.0) {
        $(".right-sidebar-time-time").css("color", "orange");
      }
      if (time.toFixed(1) < 0) {
        clearInterval(x);
        def();
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
