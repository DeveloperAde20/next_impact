/* Project content for project.html?id=...
   Only verified facts are included. Replace each "PH(...)" placeholder once official details are supplied. */
(function () {
  "use strict";
  function PH(t) { return '<p class="placeholder-note"><strong>To be supplied:</strong> ' + t + "</p>"; }

  var PROJECTS = {
    "alfsi": {
      name: "ALFSI", location: "Ibeju-Lekki, Lagos", focus: "Integrated food systems", status: "In development",
      partners: "To be confirmed", image: "assets/images/alfsi.jpg", alt: "Aquaponics greenhouse with technicians checking water quality",
      summary: "An integrated food-system initiative combining aquaponics, food processing, cold-chain infrastructure, skills development and market access.",
      opportunity: "<p>Developing sustainable livelihood and food-security opportunities in Ibeju-Lekki, Lagos.</p>" + PH("detailed description of the local context."),
      response: "<p>The project is designed as a replicable community-based agribusiness model, with success assessed through functioning enterprises, production systems, market relationships and community infrastructure.</p>",
      system: [["Aquaponics", "Integrated fish and crop production."], ["Food processing", "Adding value to production."], ["Cold-chain infrastructure", "Preserving quality and reducing losses."], ["Skills development", "Building local capability."], ["Market access", "Connecting production with demand."]],
      partnerDetail: PH("partner organisations and their roles.")
    },
    "dagbaja-oriade": {
      name: "Dagbaja Oriade", location: "Osun", focus: "Cocoa Aggregation", status: "In development",
      partners: "To be confirmed", image: "assets/images/cocoa.jpg", alt: "Cocoa beans being weighed at an aggregation centre",
      summary: "A cocoa aggregation project in Osun.",
      opportunity: PH("what is happening on the ground and why the opportunity matters."),
      response: PH("what Bottom Up Impact is developing or coordinating."),
      system: [["Cocoa aggregation", "Primary focus of the project."]],
      partnerDetail: PH("partner organisations and their roles.")
    },
    "opialu": {
      name: "Opialu", location: "Benue", focus: "Cassava Last-Mile Systems", status: "In development",
      partners: "To be confirmed", image: "assets/images/cassava.jpg", alt: "Farmers loading cassava onto a truck",
      summary: "A cassava last-mile systems project in Benue.",
      opportunity: PH("what is happening on the ground and why the opportunity matters."),
      response: PH("what Bottom Up Impact is developing or coordinating."),
      system: [["Cassava last-mile systems", "Primary focus of the project."]],
      partnerDetail: PH("partner organisations and their roles.")
    }
  };

  var id = new URLSearchParams(location.search).get("id") || "alfsi";
  var p = PROJECTS[id] || PROJECTS.alfsi;
  function set(elId, html) { var el = document.getElementById(elId); if (el) el.innerHTML = html; }
  function txt(elId, t) { var el = document.getElementById(elId); if (el) el.textContent = t; }

  document.title = p.name + " — Projects — Bottom Up Impact";
  txt("p-crumb", p.name); txt("p-name", p.name); txt("p-focus", p.focus); txt("p-focus2", p.focus);
  txt("p-summary", p.summary); txt("p-location", p.location); txt("p-status", p.status); txt("p-partners", p.partners);
  var img = document.getElementById("p-img"); if (img) { img.src = p.image; img.alt = p.alt; }
  set("p-opportunity", p.opportunity); set("p-response", p.response); set("p-partner-detail", p.partnerDetail);
  set("p-system", p.system.map(function (s) { return '<div class="system-item"><h4>' + s[0] + "</h4><p>" + s[1] + "</p></div>"; }).join(""));
})();
