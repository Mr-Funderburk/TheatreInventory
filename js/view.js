// view items
// let items = [];
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
        image.src = "img/" + item.img;
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