// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", function (data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

// changeColor.onclick = function (element) {
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'document.body.style.backgroundColor = "' + color + '";',
//     });
//   });
// };

var items = [
  "formControlRange-zoom",
  "formControlRange-word",
  "formControlRange-character",
];
items.forEach((element) => {
  document.getElementById(element).oninput = function () {
    this.style.background =
      "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
      this.value +
      "%, #fff " +
      this.value +
      "%, white 100%)";
    myFunction(element);
  };
});

function myFunction(element) {
  var val = document.getElementById(element).value; //gets the oninput value
  //   document.getElementById("output").innerHTML = val; //displays this value to the html page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (element == "formControlRange-zoom") {
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'document.body.style.zoom = "1' + val + '%";',
      });
    } else if (element == "formControlRange-word") {
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'document.body.style.wordSpacing = "' + val + 'px";',
      });
    } else {
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'document.body.style.letterSpacing = "' + val + 'px";',
      });
    }
  });
}

let SaveConfigButton = document.getElementById("save-configuration");
SaveConfigButton.onclick = function (element) {
  chrome.tabs.executeScript(
    {
      code: "window.getSelection().toString();",
    },
    function (selection) {
      console.log(selection[0]);
      var msg = new SpeechSynthesisUtterance();
      msg.text = selection[0];
      window.speechSynthesis.speak(msg);
      //   document.getElementById("output").innerHTML = selection[0];
    }
  );

  //   let color = element.target.value;
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     chrome.tabs.executeScript(tabs[0].id, {
  //       //   code: 'document.body.style.backgroundColor = "' + color + '";',
  //     });
  //   });
};
var SettingsImage = document.getElementById("settings-icon-image");
var MessageBox = document.getElementById("message-theme");
SettingsImage.onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code:
        'document.body.style.zoom = "100%";document.body.style.wordSpacing = "0px"; document.body.style.letterSpacing = "0px";',
    });
  });
  MessageBox.style.display = "block";
  items.forEach((element) => {
    console.log(element);
    document.getElementById(element).value = 0;
    document.getElementById(element).style.background =
      "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
      this.value +
      "%, #fff " +
      this.value +
      "%, white 100%)";
  });
};
