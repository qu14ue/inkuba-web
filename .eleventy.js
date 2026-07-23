module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/video": "assets/video" });

  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());

  // Filtros para trabajar con portfolio.json sin hardcodear conteos en los templates
  eleventyConfig.addFilter("where", (arr, key, val) =>
    (arr || []).filter((item) => item[key] === val)
  );
  eleventyConfig.addFilter("whereTag", (arr, tag) =>
    (arr || []).filter((item) => (item.tipo || []).includes(tag))
  );
  eleventyConfig.addFilter("whereContains", (arr, key, needle) =>
    (arr || []).filter((item) =>
      String(item[key] || "").toLowerCase().includes(String(needle).toLowerCase())
    )
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
