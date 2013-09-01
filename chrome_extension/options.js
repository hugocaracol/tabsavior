function deleteSavedTabs(){

    var status = document.getElementById("status");
    
    chrome.storage.local.remove("tabs", function(){
        /* Error handling */
        var lastError = chrome.runtime.lastError;
        if (lastError){
            status.innerHTML = lastError;
            return;
        }
        
        status.innerHTML = "All tab info deleted.";
        setTimeout(function() {
            status.innerHTML = "";
        }, 750);

    });
    
}


document.querySelector('#delete_tabs').addEventListener('click', deleteSavedTabs);


