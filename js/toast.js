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