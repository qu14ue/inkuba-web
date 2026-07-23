// Count-up de los sellos del hero: anima 0 -> valor cuando entran en viewport.
(function () {
  function animate(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var pre = el.getAttribute("data-prefix") || "";
    var suf = el.getAttribute("data-suffix") || "";
    var start = null;
    var dur = 1100;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      // easing suave (mitad de coseno)
      var val = Math.round(target * (0.5 - Math.cos(Math.PI * p) / 2));
      el.textContent = pre + val + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = pre + "0" + suf;
    requestAnimationFrame(step);
  }

  var nums = document.querySelectorAll(".sello-num[data-count]");
  if (!nums.length) return;

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach(function (n) {
      io.observe(n);
    });
  } else {
    nums.forEach(animate);
  }
})();
