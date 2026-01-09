const btnFileUpload     = document.getElementById("btn_up_file");
const btnCameraUpload   = document.getElementById("btn_up_camera");
const inputFileUpload   = document.getElementById("up_file");
const inputCameraUpload = document.getElementById("up_camera");
const submitButton      = document.getElementById("submitAdd");
const submitDone        = document.getElementById("submitDone");
const submitFailed      = document.getElementById("submitFailed");
const theForm           = document.getElementById("addInventory");

btnFileUpload.addEventListener("click", function(e){ 
    e.preventDefault();
    inputFileUpload.click();
});

btnCameraUpload.addEventListener("click", function(e){ 
    e.preventDefault();
    inputCameraUpload.click(); 
});

inputFileUpload.addEventListener("change", function(){ updateFileName(this.files[0].name, "file"); });
inputCameraUpload.addEventListener("change", function(){ updateFileName(this.files[0].name, "camera"); });


// submit
// TODO: AJAX callback upload
submitButton.addEventListener("click", function(e){
    e.preventDefault();
    this.disabled = true;
    this.classList.add("loading");
    
    setTimeout(function(){
        submitButton.classList.add("hide-loading");
        submitDone.classList.add("finish");
    }, 3000);

    setTimeout(function(){
        submitButton.classList.remove("loading");
        submitButton.classList.remove("hide-loading");
        submitButton.disabled = false;
        submitDone.classList.remove("finish");
        submitFailed.classList.remove("finish");
        theForm.reset();
        document.getElementById("txtName").focus();
    }, 5000);
});

function updateFileName(fn, type) {
    if (fn == "") return;
    document.getElementById("selectedFileName").innerHTML = "<strong>Selected Image:</strong> " + fn;
    document.getElementById("uploadType").value = type;
}