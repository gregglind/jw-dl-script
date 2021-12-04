/* Spec 
> I need a basic Greasemonkey script (or browser extension/add-on for any Mac browser but would prefer Firefox) to facilitate simpler downloads of materials for a job I do. 
> I get links in this format: https://example.com/details/jessamynwest0000unse_p2k4/page/n7/mode/2up 
> I need them turned into this format which I'd like available with a download button (not right-click/save-as) somehow: https://example.com/download/jessamynwest0000unse_p2k4/jessamynwest0000unse_p2k4.pdf 
> This involves four steps 1) changing details into download 2) removing the extra junk, which varies but always starts with page if it's there, at the end of the URL 3) duplicating the last part and slapping PDF on the end of it 4) download button. Will send details about specific site URLs; this is all above board and OK with the site owner.


https://archive.org/details/womenfamilyutopi0000fost.pdf
and what I need is this link
https://archive.org/download/womenfamilyutopi0000fost/womenfamilyutopi0000fost.pdf


*/ 

const matchUrl = function (url) {
    const U = new URL(url);
    return U.pathname.match("/details/");
  };
  
  const transform = function (url) {
    console.log("in", url);
    let out = new URL(url);
    let slug = out.pathname.split('/')[2]
    out.pathname = '/'+['download',slug,slug+'.pdf'].join('/');  
    out = out.toString()
    console.log(out);
    return out;
  };
  
  const createDLButton = function (transformedUrl) {
      let U = new URL(transformedUrl)
      var el = document.createElement('a');
      el.textContent = `⬇${U.pathname}`;
      let styles = {
          border: '1px solid blue',
          margin: '0px .5em',
          display: "inline-block", 
          padding: ".1em .2em",
          color: "#fff",
          background: "#50dcf3", 
          'border-radius': '4px',
          'text-decoration': 'none'
      };
      for (const property in styles) {
          el.style[property] = styles[property]
      }
      el.href = transformedUrl;
      el.download = transformedUrl;
      return el
  };
  
  const doWork = function () {
    /* 
      1. find all and match  
      2. Transform
      3. duplicate
      4. add dl button
    */
    console.log("done!");
    document.querySelectorAll("a").forEach(function (el) {
      let url = el.href;
      if (!matchUrl(url)) return;
      let transformed = transform(url);
      let button = createDLButton(transformed);
      el.insertAdjacentElement("afterend", button);
    });
  };
  
  doWork();
  