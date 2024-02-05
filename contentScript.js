(() => {
  let counter =0;
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      counter = 1;
      highlightScript(document.body);
    }
  });

  function highlightScript(node) {
    for (let i=0; i<node.children.length; i++) {
      const element = node.children[i];
      if (element.shadowRoot?.host === element) {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(" .shadow { border: var(--border)}");
        element.shadowRoot.adoptedStyleSheets = [sheet];
        for (let j=0 ;j<element.shadowRoot.children.length;j++) {
          const dom = element.shadowRoot.children[j];
          dom.classList.add('shadow');
          highlightScript(dom);
        }
      }
    }
    if(node.shadowRoot?.host === node) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(" .shadow { border: var(--border)}");
      node.shadowRoot.adoptedStyleSheets = [sheet];
      for (let k=0; k<node.shadowRoot.children.length; k++) {
        const dom = node.shadowRoot.children[k];
        dom.classList.add('shadow');
        highlightScript(dom);
      }
    }
  }

  document.addEventListener('click', (event) => {
    let target = event.composedPath()[0];
    if (target.classList.contains('shadow')) {
      let data = {
        id : "content",
        data: target.nodeName+ "-" + counter++
      };
      chrome.runtime.sendMessage(data);
    }
  });
})();