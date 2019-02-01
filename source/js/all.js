const clientId = 'qvtuq71csrlv5ipxo1ljzgbzqn1okh';
const limitItem = 21;
let offset = 0;
let apiUrl;
let isLoad = false;
let isLoadLastItem = false;
let liveCounter = 0;
var languageType = 'en';
// webpack
var i18n = {
  en: require('./lang-en'),
  'zh-tw': require('./lang-zh-tw')
};
var $ = require('jquery');

$(document).ready(function () {
  queryLive(procesLiveInfo);
});

$('.lang_en').click(function () {
  language('en');
});

$('.lang_tw').click(function () {
  language('zh-tw');
});

function queryLive (cb) {
  apiUrl = 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId +
            'all.js&language=' + languageType +
            '&game=League%20of%20Legends&limit=' + limitItem +
            '&offset=' + offset;
  $.ajax({
    dataType: 'json',
    url: apiUrl,
    success: function (response) {
      // console.log(response);
      isLoad = true;
      cb(null, response);
    },
    error: function (err) {
      cb(err);
    }
  });
}

function procesLiveInfo (err, data) {
  if (err) {
    console.log(err);
  } else {
    const streams = data.streams;
    const row = $('.row');
    liveCounter = streams.length;
    for (let i = 0; i < streams.length; i++) {
      row.append(getColumn(streams[i]));
    }
  }
}

function getColumn (data) {
  return `
  <div class="col">
    <div class="preview">
      <img src="${data.preview.large}" onload="this.style.opacity=1" alt="">
    </div>
    <div class="descript">
      <div class="avatar">
        <img src="${data.channel.logo}"  onload="this.style.opacity=1" alt="">
      </div>
      <div class="introduce">
        <div class="ch-name">${data.channel.status}</div>
        <div class="ch-master">${data.channel.name}</div>
      </div>
    </div>
  </div>
  `;
}

$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() + 200 >= $(document).height()) {
    if (liveCounter < limitItem) isLoadLastItem = true;

    if (isLoad && !isLoadLastItem) {
      isLoad = false;

      offset += limitItem;
      queryLive(procesLiveInfo);
      console.log('offset = ' + offset);
    }
  }
});

function language (lang) {
  if (lang !== languageType) {
    $('.row').empty();

    // add i18n
    // not webpack
    // document.querySelector(".head h1").textContent = window.i18n[lang].title;
    // webpack
    document.querySelector('.head h1').textContent = i18n[lang].title;

    languageType = lang;
    offset = 0;
    queryLive(procesLiveInfo);
  }
}
