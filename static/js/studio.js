// (function () {
//   "use strict";

  
//   const generateBtn = document.getElementById("generateBtn");
//   const formError = document.getElementById("formError");
//   const emptyState = document.getElementById("emptyState");
//   const result = document.getElementById("result");

//   // chip selection
//   document.querySelectorAll(".chip-group").forEach((group) => {
//     const hiddenInput = document.getElementById(group.dataset.field);
//     group.querySelectorAll(".chip").forEach((chip) => {
//       chip.addEventListener("click", () => {
//         group
//           .querySelectorAll(".chip")
//           .forEach((c) => c.classList.remove("active"));
//         chip.classList.add("active");
//         if (hiddenInput) hiddenInput.value = chip.dataset.value;
//       });
//     });
//   });

//   // color pickers
//   function syncColorPair(pickerId, textId) {
//     const picker = document.getElementById(pickerId);
//     const textId = document.getElementById(textId);
//     if (!picker || !text) return;
//     picker.addEventListener("input", () => {
//       text.value = picker.value;
//     });
//     text.addEventListener("input", () => {
//       if (/^#[0-9A-Fa-f]{6}$/.test(text.value)) picker.value = text.value;
//     });
//   }
//   syncColorPair("primary_color", "primary_color_text");
//   syncColorPair("accent_color", "accent_color_text");

//   // generate button - ui only
//   generateBtn &&
//     generateBtn.addEventListener("click", () => {
//       const style = document.getElementById("style").value;
//       const material = document.getElementById("material").value;
//       const primary = document.getElementById("primary_color").value;
//       const accent = document.getElementById("accent_color").value;

//       // show a mock result to confirm the ui is working
//       emptyState && emptyState.classList.add("hidden");
//       if (result) {
//         result.classList.remove("hidden");
//         document.getElementById("resultName").textContent =
//           "UI Interface Ready";
//         document.getElementById("resultTagLine").textContent =
//           `${style} ${material} ${primary} / ${accent}`;
//         document.getElementById("resultDesc").textContent =
//           "Lesson 1 complete. the interface is stuctured and all input";
//         document.getElementById("resultPrice").textContent = "Lesson 1";
//         document.getElementById("resultAudience").textContent =
//           "Interface only";
//       }
//       formError.textContent = "";
//     });
// })();
(function() {
  'use strict';

  const $ = id => document.getElementById(id);
  const generateBtn = $("generateBtn"),regenBtn = $("regenBtn"),regenImgBtn = $('regenImgBtn');
  const formError = $("formError"), emptyState = $('emptyState'), loadingState = $('loadingState');
  const loaderText = $('loaderText'), stageGroq = $('stageGroq'), stageHf = $('stageHf'), result = $('result');
  const resultName = $('resultName'), resultTagline = $('resultTagline'), resultTags = $('resultTags');
  const resultPrice = $('resultPrice'), resultAudience = $('resultAudience'), resultDesc = $('resultDesc');
  const materialList = $("materialList"), featuresList = $("featuresList"), soleText = $("soleText");
  const colorwayTabs = $("colorwayTabs"),
    colorwayInfo = $("colorwayInfo"),
    sneakerStage = $("sneakerStage");
    const imgError = $('imgError'), imgFrame= $('imgFrame'), aiImage = $('aiImage');
    const captchaModal = $('captchaModal'), captchaCancel = $('captchaCancel');

    const   LOADER_MSGS = ['Querying AI...', 'Designing silhouette..', 'Choosing materials..', 'Mixing colorways..', 'finalizing specs..'];
    let loaderInterval = null, currentColorways = [], currentConcept = null, captchaWidgetId = null;

    const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

    // hcaptcha 
    window.hcaptchaReady = () => {
      captchaWidgetId = hcaptcha.render('hcaptchaWidget', {
        sitekey: window.HCAPTCHA_SITE_KEY, theme: 'dark', size: 'compact',
        callback:token => { captchaModal.classList.add('hidden'); runGenerator(token);},
        'expired-callback': () => {captchaModal.classList.add('hidden'); generateBtn.disabled = false; formError.textContent = 'CAPTCHA expired';},
      })
    }

    generateBtn?.addEventListener('click', () => {
      formError.textContent = '';
      if (typeof hcaptcha === 'undefined' || captchaWidgetId === null){ formError.textContent = 'CAPTCHA not loaded. refresh.'; return;}
      hcaptcha.reset(captchaWidgetId);
      captchaCancel.classList.remove('hidden');
    })
    captchaCancel?.addEventListener('click', () => { captchaModal.classList.add('hidden'); hcaptcha?.reset(captchaWidgetId);});

    // chips and colors
    document.querySelectorAll('.chip-group').forEach(g => {
      const inp = $(g.dataset.field);
      g.querySelectorAll('.chip').forEach(c => c.addEventListener('click',() => {
        g.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        if (inp) inp.value = c.dataset.value;
      }));
    });
  })