    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((item, index) => {
      if (!item.classList.contains('show')) {
        item.style.transitionDelay = `${index * 0.06}s`;
      }
      observer.observe(item);
    });