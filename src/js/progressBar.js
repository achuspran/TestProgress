/** 
 * Created on 04-Jun-2020
 * Author - Aswathi Prakash
 * 
*/

/**
 * loadProgressBars()- Fetch the data from the file to 
 * create progress bars and buttons as per the response
 */
function loadProgressBars() {
  fetch('http://pb-api.herokuapp.com/bars')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      } else {

        // Examine the text in the response
        response.json().then(function(thedata) {
          // store the data fetched in a variable
          var data = JSON.parse(JSON.stringify(thedata))
          if(data) {
            // iterates through the data.bars array to draw the progress bar
            // on the screen
            for (var i = 0; i < data.bars.length; i++)
            {
                var progress = document.createElement("div");
                var cont = document.getElementById("content");
                cont.appendChild(progress);
                progress.setAttribute("class", "progressBarContainer");
                progress.setAttribute("id", "progress" + i);

                var progressBar = document.createElement("div");
                progress.appendChild(progressBar);
                progressBar.setAttribute("class", "progressBar");
                progressBar.setAttribute("id", "ProgressBar" + i);
                progressBar.style.width = data.bars[i] + "%";


                var barLabel = document.createElement("label");
                progressBar.appendChild(barLabel);
                barLabel.setAttribute("class", "progressBarLabel");
                barLabel.setAttribute("id", "barLabel" + i);
                barLabel.innerHTML = data.bars[i] + "%";
            }

            var dropdown = document.createElement("select");                  
            var but = document.getElementById("controlContainer");
            but.appendChild(dropdown);
            dropdown.setAttribute("id", "progressBarNames");
        
            // iterates through data.bars array and append the dropdown list with the bar names
            for (var i = 0; i < data.bars.length; i++)
            {
                var dropdownItem = document.createElement("option");
                dropdown.appendChild(dropdownItem);
                dropdownItem.setAttribute("id", "dataList" + i);
                dropdownItem.setAttribute("value", i);
                dropdownItem.innerHTML = "#ProgessBar " + (1+i);
            }
          }

          // looping through the data.buttons array to create buttons
          // with respective values and the click event
          var buttonArea = document.getElementById("controlContainer");
          for( var j = 0; j < data.buttons.length; j++) {
              var button = document.createElement("button");
              button.innerHTML = data.buttons[j];
              button.setAttribute("value", data.buttons[j]);
              button.addEventListener('click', function () {
                  addwidth(this.value);
              });
              buttonArea.appendChild(button);
          }
      
        });
      }
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

/**
 * addwidth() show the progress in the selected bar as per the button clicked,
 * appends the button value to the existing bar value
 * @param {*} value - the value of the button clicked
 */
function addwidth(value)
{
    var v = parseInt(document.getElementById("progressBarNames").value);
    var a = document.getElementById("barLabel"+v).innerHTML;
                    
   // add the selected button value to the value of the selected Bar
    value = parseInt(value) + parseInt(a);

   // if value is greater than or equals 100, display the bar in red color         
    if (value >= 100)
    {
        document.getElementById("ProgressBar"+v).style.backgroundColor = "red";
        document.getElementById("ProgressBar"+v).style.width = "100%";
        document.getElementById("barLabel"+v).innerHTML = value + "%";                   
    } 
    //if value is less than 100 and greater than 0, display the bar in default green color
     else if (value <= 100 && value > 0)
    {
        document.getElementById("ProgressBar"+v).style.backgroundColor = "#4CAF50";
        document.getElementById("ProgressBar"+v).style.width = value + "%";
        document.getElementById("barLabel"+v).innerHTML = value + "%";
    } 
    // if value is less than or equal to 0, display the bar with no color
      else if (value <= 0)
    {
        document.getElementById("ProgressBar"+v).style.width = "0%";
        document.getElementById("barLabel"+v).innerHTML = "0%";

    } 
}