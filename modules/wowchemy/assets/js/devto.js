function articleToHtml(field) {
  return `
  <div class="media stream-item view-compact">
    <div class="media-body">
      <div class="section-subheading article-title mb-0 mt-0">
        <a href="${field.url}" target="_blank">${field.title}</a>
      </div>
      <a href="${field.url}" target="_blank" class="summary-link">
      <div class="article-style">
        ${field.description}
      </div>
      </a>
      <div class="article-metadata">
        <div>
          <span class="author-highlighted">${field.user.name}</span>
        </div>
        <span class="article-date">${field.readable_publish_date}</span>
        <span class="middot-divider"></span>
        <span class="article-reading-time">
          ${field.reading_time_minutes} min read
        </span>
        <span class="middot-divider"></span>
        <span class="article-categories">
          ${field.tags}
        </span>
      </div>
    </div>
    <div class="ml-3">
    <a href="${field.url}" target="_blank">
        <img src="${field.social_image}" height="84" width="150" alt="${field.description}">
      </a>
    </div>

  </div>`;
}

function fetchDevToContent( jQuery ) {
  $('devto-latest-articles').each(function(index) {
    var $element = $(this);
    $.getJSON(`https://dev.to/api/articles/latest?username=${$element.attr('username')}&per_page=${$element.attr('len')}`, function(data) {
      var result = "";
      $.each(data, function(i, field) {
        result += articleToHtml(field);
      })
      $element.html(result);
    });
  });
}

$(fetchDevToContent);
