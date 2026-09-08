(function () {
  const nav = document.getElementById("main-nav");
  const toggle = document.querySelector(".menu-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      const list = item.closest(".faq-list");
      if (!list) return;
      list.querySelectorAll(".faq-item").forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const overlay = document.getElementById("popup-overlay");
  const closeBtn = document.getElementById("popup-close");
  const body = document.body;
  const active = body.dataset.popupActive === "1";
  const delay = Number(body.dataset.popupDelay || "0") * 1000;

  function closePopup() {
    if (overlay) overlay.hidden = true;
  }

  if (closeBtn) closeBtn.addEventListener("click", closePopup);
  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closePopup();
    });
  }

  if (active && overlay) {
    window.setTimeout(() => {
      overlay.hidden = false;
    }, Math.max(0, delay));
  }

  const paymentsViewport = document.querySelector(".footer-payments-viewport");
  const paymentsTrack = document.querySelector(".footer-payments-track");
  const paymentsPrev = document.querySelector(".footer-payments-prev");
  const paymentsNext = document.querySelector(".footer-payments-next");

  if (paymentsViewport && paymentsTrack && paymentsPrev && paymentsNext) {
    let offset = 0;

    function maxOffset() {
      return Math.max(0, paymentsTrack.scrollWidth - paymentsViewport.clientWidth);
    }

    function updatePaymentsNav() {
      const max = maxOffset();
      paymentsPrev.disabled = offset <= 0;
      paymentsNext.disabled = offset >= max - 1;
      paymentsTrack.style.transform = `translateX(${-offset}px)`;
    }

    function scrollPayments(direction) {
      const step = Math.max(paymentsViewport.clientWidth * 0.7, 160);
      offset = Math.min(maxOffset(), Math.max(0, offset + direction * step));
      updatePaymentsNav();
    }

    paymentsPrev.addEventListener("click", () => scrollPayments(-1));
    paymentsNext.addEventListener("click", () => scrollPayments(1));
    window.addEventListener("resize", updatePaymentsNav);
    updatePaymentsNav();
  }
})();
