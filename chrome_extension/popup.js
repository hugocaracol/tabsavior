

var tabSaviour = {
    
    loadAction: function(){
        document.getElementById('message').innerHTML = "Loading tab info...";
        chrome.storage.local.get('tabs', function (result) {
            /* Error handling */
            var lastError = chrome.runtime.lastError;
            if (lastError){
                document.getElementById('message').innerHTML = lastError;
                return;
            }
            tabs = result.tabs;
            if (!tabs){
                document.getElementById('message').innerHTML = "Nothing to load.";
                return;
            }
            var tabs_array = tabs.split(",");
            for(i=0; i<tabs_array.length; i++){
                var createProperties = {
                    url: tabs_array[i]
                };
                chrome.tabs.create(createProperties);
            }
        });
    },
    
    saveAction: function(){
        parentThis = this;
        chrome.tabs.query({}, function(tabs) {
            var tabs_url = new Array();
            for (i=0; i<tabs.length; i++)
                tabs_url.push(tabs[i].url);
            var urls = tabs_url.join();
            parentThis.saveToLocal(urls);

        });
    },
    
    saveToLocal: function(urls){
        chrome.storage.local.set({'tabs': urls}, function() {
            // Notify that we saved.
            document.getElementById('message').innerHTML = "Tab info saved.";
        });
    },
   

};


document.addEventListener('DOMContentLoaded', function () {

    load_bt = document.getElementById('load_bt');
    save_bt = document.getElementById('save_bt');
    load_bt.addEventListener("click", function() { tabSaviour.loadAction();});
    save_bt.addEventListener("click", function() { tabSaviour.saveAction();});

});
