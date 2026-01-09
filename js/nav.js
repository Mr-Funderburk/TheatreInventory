const navAdd  = document.getElementById("navAdd");
const navView = document.getElementById("navView");
const pnlAdd  = document.getElementById("pnlAdd");
const pnlView = document.getElementById("pnlView");

navAdd.addEventListener("click", function(e){
    e.preventDefault();
    pnlAdd.style.display = "block";
    pnlView.style.display = "none";
    navAdd.classList.add("active");
    navView.classList.remove("active");
});

navView.addEventListener("click", function(e){
    e.preventDefault();
    pnlAdd.style.display = "none";
    pnlView.style.display = "block";
    navAdd.classList.remove("active");
    navView.classList.add("active");
});