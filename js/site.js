document.addEventListener("DOMContentLoaded", function(){
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

const notifications = document.getElementById("notifications");
const toastDetails = {
    timer: 5000,
    success: {
        icon: "fa-circle-check",
        text: "Success: Inventory item added."
    },
    error: {
        icon: "fa-circle-xmark",
        text: "Error: Problem with file upload."
    },
    warning: {
        icon: "fa-triangle-exclamation",
        text: "Warning: Something isn't right."
    },
    info: {
        icon: "fa-circle-info",
        text: "Info: Something you should know."
    }
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
}

const createToast = (id) => {
    const {icon, text} = toastDetails[id];
    const toast = document.createElement("li");
    toast.className = `toast ${id}`;
    toast.innerHTML = `<div class="column"><i class="fa-solid ${icon}"></i><span>${text}</span></div><i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast);
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

// view items
// let items = [];

// // simulated from db
// tags0 = "90s, Mean Girls";
// items[0] = {
//     img: "dress.jpg",
//     name: "Green Dress",
//     size: "Small",
//     type: "Dress",
//     tagsString: tags0,
//     tags: tags0.split(",").map(item => item.trim())
// };

// tags1 = "Boys, Men, Fancy";
// items[1] = {
//     img: "dress_pants.jpg",
//     name: "Dress Slacks",
//     size: "Small",
//     type: "Pants",
//     tagsString: tags1,
//     tags: tags1.split(",").map(item => item.trim())
// };

// tags2 = "Boys, Men, Fancy, 90s";
// items[2] = {
//     img: "dress_pants.jpg",
//     name: "Dress Slacks",
//     size: "Medium",
//     type: "Pants",
//     tagsString: tags2,
//     tags: tags2.split(",").map(item => item.trim())
// };

// loadItems(items);

const applyFiltersButton = document.getElementById("applyFilters");
applyFiltersButton.addEventListener("click", function(e){
    e.preventDefault();

    const _name = document.getElementById("txtFiltName").value.trim();
    const _size = document.getElementById("txtFiltSize").value.trim();
    const _type = document.getElementById("txtFiltType").value.trim();
    const _tags = document.getElementById("txtFiltTags").value.trim();

    if (_name == "" && _size == "" && _type == "" && _tags == "") {
        document.getElementById("cbFilterToggle").checked = false;
        return;
    }

    let filters = {
        name: _name,
        size: _size,
        type: _type,
        tags: _tags.toLowerCase().split(",").map(tag => tag.trim())
    };

    if (filters.tags.length == 1 && filters.tags[0].trim() == "") {
        filters.tags = null;
    }
    
    loadItems(items, filters);
    document.getElementById("cbFilterToggle").checked = false;
});

// full size image
const fullDiv = document.getElementById("fullImg");
fullDiv.addEventListener("click", function(){ fullDiv.style.display = "none"; });

function fullScale(img) {
    fullDiv.style.display = "block";
    fullDiv.style.backgroundImage = `url("${img}")`;
}


function loadItems(items, filters={}) {
    const itemsContainer = document.getElementById("itemsContainer");
    itemsContainer.innerHTML = "";

    let matchAll = document.getElementById("cbMatchAll").checked;

    items.forEach(item => {
        // check filters
        if (Object.keys(filters).length > 0) {
            let matchCount = 0;
            let blanks = 0;

            if (filters.name != "") {
                if (item.name.toLowerCase() == filters.name.toLowerCase()) { matchCount++; }
            } else {
                blanks++;
            }

            if (filters.size != "") {
                if (item.size.toLowerCase() == filters.size.toLowerCase()) { matchCount++; }
            } else {
                blanks++;
            }
            
            if (filters.type != "") {
                if (item.type.toLowerCase() == filters.type.toLowerCase()) { matchCount++; }
            } else {
                blanks++;
            }

            if (filters.tags == null || filters.tags.length == 0) {
                blanks++;
            } else {
                const set = new Set(item.tags.map(tag => tag.toLowerCase()));
                const matches = filters.tags.filter(t => set.has(t));
                if (matches.length > 0) { matchCount++; }
            }

            if (matchCount == 0) { return; }
            if (matchAll && matchCount != (4 - blanks)) { return; }
        }

        const box = document.createElement("div");
        box.classList.add("item");

        const divImage = document.createElement("div");
        const image = document.createElement("img");
        image.src = "img/costume/" + item.img;
        image.alt = item.name;
        image.addEventListener("click", () => { fullScale(image.src) });
        divImage.appendChild(image);
        box.appendChild(divImage);

        const divDetails = document.createElement("div");
        const h3Name = document.createElement("h3");
        h3Name.innerText = item.name;
        divDetails.appendChild(h3Name);

        const pSize = document.createElement("p");
        pSize.innerText = item.size;
        divDetails.appendChild(pSize);

        const pType = document.createElement("p");
        pType.innerText = item.type;
        divDetails.appendChild(pType);

        const pTags = document.createElement("p");
        pTags.innerText = item.tagsString;
        divDetails.appendChild(pTags);
        
        box.appendChild(divDetails);

        const divButtons = document.createElement("div");
        const editButton = document.createElement("a");
        editButton.href = "edit.php?cid=" + item.id;
        editButton.classList.add("btn");
        editButton.classList.add("edit");
        editButton.innerText = "Edit";
        const deleteButton = document.createElement("a");
        deleteButton.href = "#";
        deleteButton.classList.add("btn");
        deleteButton.classList.add("delete");
        deleteButton.innerText = "Delete";
        divButtons.appendChild(editButton);
        divButtons.appendChild(deleteButton);
        box.appendChild(divButtons);

        itemsContainer.appendChild(box);
    });
}
loadItems(items);
});