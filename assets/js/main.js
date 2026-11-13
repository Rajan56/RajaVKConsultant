/* Rajan Kumar V K, personal consulting site */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Navigation ---------- */
  var nav = $("#nav"), tog = $(".nav-toggle");
  if (tog) {
    tog.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      tog.setAttribute("aria-expanded", open);
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); tog.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Scroll progress in the five phase colours, and current section ---------- */
  var fill = $("#progressFill");
  var links = $$('#nav a[href^="#"]:not(.btn)');
  var targets = links.map(function (a) { return $(a.getAttribute("href")); });
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (fill) fill.style.width = (max > 0 ? Math.min(100, h.scrollTop / max * 100) : 0) + "%";
    var pos = h.scrollTop + 140, cur = -1;
    targets.forEach(function (t, i) { if (t && t.offsetTop <= pos) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle("on", i === cur); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Hero: pressure picker ---------- */
  var PRESSURES = {
    margin: {
      q: "Which products, customers or cost drivers moved the margin, and by how much?",
      a: "A driver-based EBITDA bridge that separates price, volume, material, energy and fixed-cost effects, down to single accounts.",
      r: "A ranked list of corrective actions, each priced with its payback, and a dashboard that tracks the recovery.",
      link: ["https://rajan56.github.io/margin-recovery-case/", "See a worked margin recovery case"]
    },
    capacity: {
      q: "Where is the constraint that sets the pace of the whole process?",
      a: "Value stream mapping, OEE and bottleneck analysis on your own production or service data.",
      r: "A redesigned flow, a capacity plan and standard work, put in place together with the people who run the process.",
      link: ["#approach", "See how an assignment runs"]
    },
    energy: {
      q: "What does the energy for one unit of output really cost, and what drives it?",
      a: "An energy and CO<sub>2</sub> baseline, with weather and volume effects separated statistically from true savings.",
      r: "Efficiency measures ranked by payback, with energy KPIs that banks, buyers and regulators can read.",
      link: ["https://rajan56.github.io/DataAnalyticsWith-R/", "See an energy investment evaluated"]
    },
    digital: {
      q: "Who owns the benefit, and which KPI will prove it?",
      a: "A digital maturity assessment and a business case for each initiative: owner, benefit KPI and data needs.",
      r: "A phased roadmap from pilot to daily use, with AI, IoT or digital twins only where they pay back.",
      link: ["https://rajan56.github.io/concept-of-digital-twin/", "Read the digital twin explainer"]
    },
    esg: {
      q: "Which indicators do they need, and which data do you already hold?",
      a: "A sustainability performance framework that connects environmental indicators with operational and financial ones.",
      r: "A twin transition roadmap in which digital and green investments support each other, with measurable targets.",
      link: ["#services", "See the sustainability service"]
    }
  };
  var out = $("#pickerOut");
  function showPressure(k) {
    var p = PRESSURES[k]; if (!p || !out) return;
    var ext = p.link[0].charAt(0) !== "#";
    out.innerHTML =
      '<dl>' +
      '<div><dt>The first question I ask</dt><dd class="q">' + p.q + '</dd></div>' +
      '<div><dt>What I analyse</dt><dd>' + p.a + '</dd></div>' +
      '<div><dt>What you receive</dt><dd>' + p.r + '</dd></div>' +
      '</dl>' +
      '<p class="more"><a class="tlink" href="' + p.link[0] + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + p.link[1] + '</a></p>';
    out.classList.remove("swap"); void out.offsetWidth; out.classList.add("swap");
    $$(".chip").forEach(function (c) { c.setAttribute("aria-selected", c.dataset.k === k ? "true" : "false"); });
  }
  $$(".chip").forEach(function (c) { c.addEventListener("click", function () { showPressure(c.dataset.k); }); });
  showPressure("margin");

  /* ---------- Approach: five phases ---------- */
  var PHASES = [
    { c: "var(--crimson)", t: "Define the problem", d: "We agree what is wrong, what it costs and which number has to move. A vague worry becomes a question that data can answer.",
      h: ["Conversations with owners, managers and the people doing the work", "A walk through the process, on site or by video", "An issue tree that breaks the problem into testable parts"],
      r: ["A one-page problem statement", "The target KPI and its current value", "A scope and timeline for the work"] },
    { c: "var(--orange)", t: "Measure the baseline", d: "I collect the facts from your own systems and records, and check them before anyone relies on them.",
      h: ["Data from ERP, production, finance and energy bills", "Process mapping and time, cost and quality measurements", "Automated checks so that errors in the data are caught early"],
      r: ["A verified baseline of the current performance", "A process map with losses made visible", "A list of data gaps and how to close them"] },
    { c: "var(--yellow)", t: "Analyse the causes", d: "Statistics and models separate the causes that matter from the noise, and put a price on each one.",
      h: ["Root-cause analysis and statistical testing", "Margin bridges, regression, simulation or structural models as the problem requires", "Findings tested with the people who know the process"],
      r: ["An evidence pack: which causes matter and what each costs", "Clear charts a board can read in minutes", "No recommendation without a number behind it"] },
    { c: "var(--green)", t: "Improve: roadmap and implementation", d: "Options are ranked by effect, cost and payback. Then the changes are carried out with your team, not handed over in a report.",
      h: ["Options priced with ROI, NPV and payback", "A phased roadmap, from quick fixes to digital and sustainability investments", "Pilots, training and hands-on support during the change"],
      r: ["A roadmap with owners and dates", "A business case for each investment", "First results measured against the baseline"] },
    { c: "var(--blue)", t: "Control: keep the gain", d: "An improvement that is not measured fades. KPIs and dashboards keep it visible long after the assignment ends.",
      h: ["KPI definitions and targets agreed with management", "Dashboards built on your live data", "Standard work, control charts and a review rhythm"],
      r: ["A KPI set with a working dashboard", "A handover session and documentation", "A follow-up review after the first months"] }
  ];
  var panel = $("#phasePanel");
  function li(a) { return a.map(function (x) { return "<li>" + x + "</li>"; }).join(""); }
  function showPhase(i) {
    var p = PHASES[i]; if (!p || !panel) return;
    panel.style.setProperty("--c", p.c);
    panel.innerHTML =
      '<div><h3>' + p.t + '</h3><p class="lede">' + p.d + '</p></div>' +
      '<div><h4>What happens</h4><ul>' + li(p.h) + '</ul></div>' +
      '<div><h4>What you receive</h4><ul>' + li(p.r) + '</ul></div>';
    panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap");
    $$(".phase").forEach(function (b) { b.setAttribute("aria-selected", +b.dataset.i === i ? "true" : "false"); });
  }
  $$(".phase").forEach(function (b) {
    b.addEventListener("click", function () { showPhase(+b.dataset.i); });
    b.addEventListener("keydown", function (e) {
      var i = +b.dataset.i;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        var n = (i + (e.key === "ArrowRight" ? 1 : 4)) % 5;
        showPhase(n); $('.phase[data-i="' + n + '"]').focus();
      }
    });
  });
  showPhase(0);

  /* ---------- Services accordion ---------- */
  $$(".acc-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var body = btn.closest(".acc-item").querySelector(".acc-body");
      var open = btn.getAttribute("aria-expanded") === "true";
      $$(".acc-btn").forEach(function (o) {
        if (o !== btn) { o.setAttribute("aria-expanded", "false"); o.closest(".acc-item").querySelector(".acc-body").hidden = true; }
      });
      btn.setAttribute("aria-expanded", String(!open));
      body.hidden = open;
      body.classList.toggle("open", !open);
    });
  });
  var first = $(".acc-btn");
  if (first) first.click();

  /* ---------- Enquiry form (delivered by FormSubmit) ---------- */
  var form = $("#enquiry");
  if (form) form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var msg = $("#formMsg"), btn = form.querySelector("button[type=submit]");
    var f = {}; new FormData(form).forEach(function (v, k) { f[k] = String(v).trim(); });
    msg.className = "form-msg";
    if (!f.name || !f.email || !f.message || !form.elements.email.checkValidity()) {
      msg.classList.add("err");
      msg.textContent = "Please add your name, a valid email address and your enquiry.";
      return;
    }
    if (f._honey) return;
    btn.disabled = true;
    msg.textContent = "Sending...";
    var mail = "mailto:rajanvk56@outlook.com?subject=" + encodeURIComponent("Enquiry from " + f.name) +
      "&body=" + encodeURIComponent(f.message + "\n\n" + f.name + (f.organisation ? "\n" + f.organisation : "") + "\n" + f.email + (f.phone ? "\n" + f.phone : ""));
    fetch("https://formsubmit.co/ajax/rajanvk56@outlook.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name: f.name, email: f.email, organisation: f.organisation || "-", phone: f.phone || "-",
        topic: f.topic, message: f.message,
        _subject: "New enquiry from your consulting website: " + f.topic,
        _template: "table", _captcha: "false"
      })
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (String(res.j.success) === "false" && /activat/i.test(res.j.message || "")) {
          msg.classList.add("err");
          msg.innerHTML = 'The form is still being activated. Please <a class="tlink" href="' + mail + '">send your enquiry by email</a> or use WhatsApp.';
        } else if (!res.ok || String(res.j.success) === "false") {
          throw new Error("failed");
        } else {
          form.reset();
          msg.classList.add("ok");
          msg.textContent = "Enquiry sent. Thank you, I will reply within two working days.";
        }
      })
      .catch(function () {
        msg.classList.add("err");
        msg.innerHTML = 'The enquiry could not be sent. <a class="tlink" href="' + mail + '">Send it from your own email</a> or use WhatsApp.';
      })
      .then(function () { btn.disabled = false; });
  });

  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
