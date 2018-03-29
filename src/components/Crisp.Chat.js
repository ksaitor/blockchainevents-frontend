function Crisp(website_id) {
  window.CRISP_WEBSITE_ID = website_id;
  const d=document;
  const s=d.createElement("script");
  s.src="https://client.crisp.im/l.js";
  s.async=1;
  d.getElementsByTagName("head")[0].appendChild(s);
}

export default Crisp;
