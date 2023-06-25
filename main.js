


var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

function inputLength(){
	return input.value.length;
}  

function creatElement(){
    let li =document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value= "";
    var dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);
    let checkInput=document.createElement("input");
    li.appendChild(checkInput);
    checkInput.setAttribute("type","checkbox");
    checkInput.style.cssText=" float:right;height:20px;margin-right:10px;width:50px"
    // Delete a task
    dBtn.addEventListener("click", deleteListItem);
    checkInput.addEventListener("change", taskDone);
    checkInput.addEventListener("click", function() {this.style.display="none"});

     saveData();
};

function deleteListItem(){
    this.parentNode.classList.add("delete");
    saveData();
}

function taskDone(){
    this.parentNode.classList.add("done");
    saveData();
}

function check(){
    // check input value is not empty
    if(inputLength() > 0 ){
        creatElement();
    }
}

function addListAfterClick(){
	if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
		creatElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.which ===13) { //this now looks to see if you hit "enter"/"return"
		//the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
		creatElement();
	} 
}

enterButton.addEventListener("click",check);
enterButton.addEventListener("click",addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

function saveData() {
    localStorage.setItem("ToDoList", ul.innerHTML);
}

window.addEventListener("load", function () {
    if (localStorage.getItem("ToDoList")) {
        ul.innerHTML = localStorage.getItem("ToDoList");
        var items = ul.getElementsByTagName("li");
        for (var i = 0; i < items.length; i++) {
            var dBtn = items[i].getElementsByTagName("button")[0];
            var checkInput = items[i].getElementsByTagName("input")[0];
            dBtn.addEventListener("click", deleteListItem);
            checkInput.addEventListener("click", taskDone);
        }
    }
});
