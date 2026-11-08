(function () {
  const projects = Array.isArray(window.PORTFOLIO_PROJECTS)
    ? window.PORTFOLIO_PROJECTS
    : [];
  const filters = document.querySelector("#category-filters");
  const count = document.querySelector("#project-count");
  const grid = document.querySelector("#project-grid");
  const emptyState = document.querySelector("#empty-state");
  const noResults = document.querySelector("#no-results");

  function getCategories(items) {
    return [...new Set(items.map((project) => project.category).filter(Boolean))];
  }

  function makeFallbackCover(project) {
    const cover = document.createElement("div");
    cover.className = "project-card__fallback";
    cover.setAttribute("aria-hidden", "true");

    const browser = document.createElement("div");
    browser.className = "mini-browser";

    const toolbar = document.createElement("div");
    toolbar.className = "mini-browser__toolbar";
    for (let i = 0; i < 3; i += 1) {
      toolbar.append(document.createElement("i"));
    }

    const canvas = document.createElement("div");
    canvas.className = "mini-browser__canvas";
    const title = document.createElement("strong");
    title.textContent = project.category || "WEB PROJECT";
    const line = document.createElement("span");
    line.className = "mini-browser__line";
    canvas.append(title, line);
    browser.append(toolbar, canvas);
    cover.append(browser);
    return cover;
  }

  function makeProjectCard(project, index) {
    const card = document.createElement("article");
    card.className = "project-card";

    const link = document.createElement("a");
    link.className = "project-card__link";
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `打开作品：${project.title}`);

    const cover = document.createElement("div");
    cover.className = "project-card__cover";
    cover.dataset.tone = String(index % 4);
    if (project.cover) {
      const image = document.createElement("img");
      image.src = project.cover;
      image.alt = `${project.title} 网站预览`;
      image.loading = "lazy";
      image.addEventListener("error", () => cover.replaceChildren(makeFallbackCover(project)), { once: true });
      cover.append(image);
    } else {
      cover.append(makeFallbackCover(project));
    }

    const body = document.createElement("div");
    body.className = "project-card__body";
    const meta = document.createElement("div");
    meta.className = "project-card__meta";
    const category = document.createElement("span");
    category.className = "project-card__category";
    category.textContent = project.category;
    meta.append(category);
    if (project.year) {
      const year = document.createElement("span");
      year.className = "project-card__year";
      year.textContent = String(project.year);
      meta.append(year);
    }

    const title = document.createElement("h3");
    title.className = "project-card__title";
    title.textContent = project.title;
    const description = document.createElement("p");
    description.className = "project-card__description";
    description.textContent = project.description;
    const arrow = document.createElement("span");
    arrow.className = "project-card__arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";

    body.append(meta, title, description, arrow);
    link.append(cover, body);
    card.append(link);
    return card;
  }

  function renderApp(activeCategory = null) {
    const categories = getCategories(projects);
    const visibleProjects = activeCategory === null
      ? projects
      : projects.filter((project) => project.category === activeCategory);

    filters.replaceChildren();
    const filterOptions = [null, ...categories];
    filterOptions.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-button";
      button.textContent = category === null ? "全部" : category;
      button.dataset.category = category === null ? "" : category;
      button.setAttribute("aria-pressed", String(category === activeCategory));
      button.addEventListener("click", () => {
        renderApp(category);
        const selectedCategory = category === null ? "" : category;
        const selectedButton = [...filters.querySelectorAll(".filter-button")]
          .find((filterButton) => filterButton.dataset.category === selectedCategory);
        selectedButton?.focus();
      });
      filters.append(button);
    });

    count.textContent = `共 ${projects.length} 个作品`;
    grid.replaceChildren(...visibleProjects.map(makeProjectCard));
    emptyState.hidden = projects.length > 0;
    noResults.hidden = projects.length === 0 || visibleProjects.length > 0;
    grid.hidden = projects.length === 0 || visibleProjects.length === 0;
  }

  renderApp();
})();
